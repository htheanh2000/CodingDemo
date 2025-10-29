import { useEffect, useState } from 'react';
import { expenseAPI } from '../services/api';

const ExpenseList = ({ refreshKey }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, [refreshKey]);

  const loadExpenses = async () => {
    try {
      const res = await expenseAPI.getAll();
      setExpenses(res.data);
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      await expenseAPI.delete(id);
      setExpenses(expenses.filter(e => e._id !== id));
    } catch (error) {
      alert('Failed to delete expense');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        No expenses found. Upload an invoice to get started!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Merchant</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-medium">{expense.merchant}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {expense.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-green-600">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;

