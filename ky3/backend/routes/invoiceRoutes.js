import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';
import { protect } from '../middleware/auth.js';
import { extractInvoiceData, generateEmbedding } from '../services/openaiService.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Upload and process invoice
router.post('/upload', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Convert image to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const imageBase64 = imageBuffer.toString('base64');

    // Extract data using OpenAI Vision
    const extractedData = await extractInvoiceData(imageBase64);

    // Generate embedding for RAG
    const embeddingText = `${extractedData.merchant} ${extractedData.rawText}`;
    const embeddings = await generateEmbedding(embeddingText);

    // Save invoice
    const invoice = await Invoice.create({
      user: req.user._id,
      imageUrl: `/uploads/${req.file.filename}`,
      extractedData,
      embeddings,
      status: 'completed',
    });

    // Create expense records
    if (extractedData.items && extractedData.items.length > 0) {
      const expenses = extractedData.items.map(item => ({
        user: req.user._id,
        invoice: invoice._id,
        category: 'Other', // Auto-categorize based on merchant/item name
        merchant: extractedData.merchant,
        amount: item.total || item.price,
        date: extractedData.date ? new Date(extractedData.date) : new Date(),
        description: item.name,
      }));
      
      await Expense.insertMany(expenses);
    } else if (extractedData.totalAmount) {
      // Single expense if no items breakdown
      await Expense.create({
        user: req.user._id,
        invoice: invoice._id,
        category: 'Other',
        merchant: extractedData.merchant,
        amount: extractedData.totalAmount,
        date: extractedData.date ? new Date(extractedData.date) : new Date(),
      });
    }

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Invoice upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all invoices
router.get('/', protect, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search invoices using RAG
router.post('/search', protect, async (req, res) => {
  try {
    const { query } = req.body;
    
    // Get all user invoices
    const allInvoices = await Invoice.find({ user: req.user._id });
    
    // Use RAG to find similar invoices
    const { searchSimilarInvoices } = await import('../services/openaiService.js');
    const results = await searchSimilarInvoices(query, allInvoices);
    
    res.json(results.map(r => r.invoice));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single invoice
router.get('/:id', protect, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

