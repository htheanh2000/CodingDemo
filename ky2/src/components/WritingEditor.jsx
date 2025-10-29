import React, { useState, useEffect } from 'react';

const WritingEditor = ({ onSubmit, isLoading, initialEssay = '' }) => {
  const [essay, setEssay] = useState(initialEssay);
  const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Update when initialEssay changes (when loading from history)
  useEffect(() => {
    setEssay(initialEssay);
  }, [initialEssay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (essay.trim().length < 50) {
      alert('Vui lòng viết ít nhất 50 từ để submit bài!');
      return;
    }
    onSubmit(essay);
  };

  const handleClear = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ bài viết?')) {
      setEssay('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Viết bài của bạn</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Từ: <span className={`font-semibold ${wordCount < 150 ? 'text-red-500' : 'text-green-600'}`}>
              {wordCount}
            </span>
          </span>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Xóa
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Bắt đầu viết bài của bạn ở đây..."
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || essay.trim().length < 50}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang chấm điểm...
              </span>
            ) : (
              '📝 Gửi bài và nhận feedback'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritingEditor;

