import React, { useState } from 'react';

const HistoryPanel = ({ history, onLoadHistory }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 z-50"
      >
        <span>📚</span>
        Lịch sử ({history.length})
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed bottom-24 right-6 w-96 max-h-96 bg-white rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Lịch sử làm bài</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    onLoadHistory(item);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Bài {history.length - index}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.essay.substring(0, 100)}...
                  </p>
                  {item.feedback?.score && (
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                        Band {item.feedback.score}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
                    localStorage.removeItem('ielts_writing_history');
                    window.location.reload();
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Xóa toàn bộ lịch sử
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPanel;

