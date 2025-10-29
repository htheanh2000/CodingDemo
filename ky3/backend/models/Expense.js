import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other'],
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: String,
  tags: [String],
}, {
  timestamps: true,
});

// Index for better query performance
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

export default mongoose.model('Expense', expenseSchema);

