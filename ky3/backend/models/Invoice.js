import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  extractedData: {
    // Data extracted by OpenAI Vision
    merchant: String,
    date: Date,
    items: [{
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    }],
    totalAmount: Number,
    tax: Number,
    paymentMethod: String,
    rawText: String, // Full OCR text for RAG
  },
  embeddings: {
    // Vector embeddings for RAG search
    type: [Number],
    default: [],
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Invoice', invoiceSchema);

