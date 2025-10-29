import OpenAI from 'openai';

// Lazy initialization - only create when needed
const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

// Extract data from invoice image using OpenAI Vision
export const extractInvoiceData = async (imageBase64) => {
  try {
    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert at extracting information from invoices and receipts. 
          Extract all relevant information and return it as JSON with this structure:
          {
            "merchant": "store name",
            "date": "YYYY-MM-DD",
            "items": [{"name": "item name", "quantity": 1, "price": 0.00, "total": 0.00}],
            "totalAmount": 0.00,
            "tax": 0.00,
            "paymentMethod": "cash/card/etc",
            "rawText": "full text from image"
          }`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Extract all information from this invoice/receipt image. Return valid JSON only.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    
    // Try to parse JSON from response
    try {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(jsonContent);
    } catch (parseError) {
      // Fallback: return structured data from text
      return {
        merchant: 'Unknown',
        date: new Date().toISOString().split('T')[0],
        items: [],
        totalAmount: 0,
        tax: 0,
        paymentMethod: 'Unknown',
        rawText: content,
      };
    }
  } catch (error) {
    console.error('OpenAI Vision API Error:', error);
    throw error;
  }
};

// Generate embeddings for RAG
export const generateEmbedding = async (text) => {
  try {
    const openai = getOpenAI();
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('OpenAI Embedding API Error:', error);
    throw error;
  }
};

// RAG: Search similar invoices
export const searchSimilarInvoices = async (query, allInvoices) => {
  try {
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding(query);
    
    // Calculate cosine similarity
    const similarities = allInvoices
      .filter(inv => inv.embeddings && inv.embeddings.length > 0)
      .map(invoice => {
        const similarity = cosineSimilarity(queryEmbedding, invoice.embeddings);
        return { invoice, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5); // Top 5 similar

    return similarities;
  } catch (error) {
    console.error('RAG Search Error:', error);
    return [];
  }
};

// Cosine similarity helper
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

