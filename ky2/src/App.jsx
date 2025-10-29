import { useState, useEffect } from 'react';
import WritingPrompt from './components/WritingPrompt';
import WritingEditor from './components/WritingEditor';
import AIFeedback from './components/AIFeedback';
import HistoryPanel from './components/HistoryPanel';
import { analyzeEssay } from './services/openaiService';

function App() {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ielts_writing_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading history:', e);
      }
    }
  }, []);

  // Update word count
  useEffect(() => {
    const count = essay.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(count);
  }, [essay]);

  const handleSubmit = async (essayText) => {
    setIsLoading(true);
    setFeedback(null);

    try {
      // Get current prompt
      const prompt = currentPrompt || 
        'Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?';

      // Call OpenAI API
      const result = await analyzeEssay(essayText, prompt);
      
      setFeedback(result);
      setEssay(essayText);

      // Save to history
      const historyItem = {
        essay: essayText,
        feedback: result,
        prompt: prompt,
        timestamp: new Date().toISOString(),
        wordCount: essayText.trim().split(/\s+/).filter(word => word.length > 0).length
      };

      const newHistory = [historyItem, ...history].slice(0, 50); // Keep last 50 items
      setHistory(newHistory);
      localStorage.setItem('ielts_writing_history', JSON.stringify(newHistory));

    } catch (error) {
      alert(`Lỗi: ${error.message}\n\nVui lòng kiểm tra:\n1. VITE_OPENAI_API_KEY đã được thêm vào file .env\n2. API key có đủ credit\n3. Kết nối internet ổn định`);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadHistory = (historyItem) => {
    setEssay(historyItem.essay);
    setFeedback(historyItem.feedback);
    setCurrentPrompt(historyItem.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewPrompt = () => {
    const prompts = [
      {
        title: 'IELTS Writing Task 2',
        description: 'You should spend about 40 minutes on this task.',
        prompt: 'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children).\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.'
      },
      {
        title: 'IELTS Writing Task 2',
        description: 'You should spend about 40 minutes on this task.',
        prompt: 'Many people believe that social networking sites (such as Facebook) have had a huge negative impact on both individuals and society.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.'
      },
      {
        title: 'IELTS Writing Task 2',
        description: 'You should spend about 40 minutes on this task.',
        prompt: 'Some people think that the government should fund music, dance, and arts lessons for children. Others think that they should be funded by private businesses or by children\'s families.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.'
      }
    ];

    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
    setEssay('');
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📝 IELTS Writing Practice
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Luyện tập viết IELTS với AI chấm điểm thông minh
              </p>
            </div>
            <button
              onClick={handleNewPrompt}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md"
            >
              🎲 Đề mới
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Writing Prompt */}
        <WritingPrompt prompt={currentPrompt} />

        {/* Writing Editor */}
        <WritingEditor 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
          initialEssay={essay}
        />

        {/* AI Feedback */}
        {feedback && <AIFeedback feedback={feedback} wordCount={wordCount} />}

        {/* History Panel */}
        <HistoryPanel history={history} onLoadHistory={handleLoadHistory} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-gray-600 text-sm">
          <p>💡 Lưu ý: Cần thêm VITE_OPENAI_API_KEY vào file .env để sử dụng tính năng AI chấm điểm</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
