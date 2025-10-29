import React from 'react';

const AIFeedback = ({ feedback, wordCount }) => {
  if (!feedback) return null;

  const { score, analysis, strengths, improvements, suggestions } = feedback;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Kết quả chấm điểm</h3>
        
        {/* Score Display */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex flex-col items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
            <span className="text-4xl font-bold text-white">{score || 'N/A'}</span>
            <span className="text-sm text-blue-100">Điểm số</span>
          </div>
          <div className="flex-1">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 text-sm mb-2">
                <span className="font-semibold">Độ dài bài viết:</span> {wordCount} từ
              </p>
              {score && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Banding:</span>
                    <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                      Band {score}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overall Analysis */}
      {analysis && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>📊</span> Phân tích tổng quan
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{analysis}</p>
          </div>
        </div>
      )}

      {/* Strengths */}
      {strengths && strengths.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>✅</span> Điểm mạnh
          </h4>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                <span className="text-green-600 mt-1">•</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {improvements && improvements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>🔧</span> Cần cải thiện
          </h4>
          <ul className="space-y-2">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2 bg-orange-50 p-3 rounded-lg">
                <span className="text-orange-600 mt-1">•</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span> Gợi ý
          </h4>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{suggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFeedback;

