import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InvoiceUpload from './InvoiceUpload';
import ExpenseStats from './ExpenseStats';
import ExpenseList from './ExpenseList';
import { useState } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUploadSuccess = () => {
    // Trigger refresh of stats and list
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📊 Expense Tracker Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Invoice Upload */}
        <InvoiceUpload onUploadSuccess={handleUploadSuccess} />

        {/* Stats */}
        <ExpenseStats refreshKey={refreshKey} />

        {/* Expense List */}
        <div className="mt-6">
          <ExpenseList refreshKey={refreshKey} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

