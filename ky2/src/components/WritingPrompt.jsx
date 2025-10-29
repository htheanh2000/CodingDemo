import React from 'react';

const WritingPrompt = ({ prompt, type = 'Task 2' }) => {
  const samplePrompts = {
    'Task 1': {
      title: 'IELTS Writing Task 1',
      description: 'You should spend about 20 minutes on this task.',
      prompt: `The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`
    },
    'Task 2': {
      title: 'IELTS Writing Task 2',
      description: 'You should spend about 40 minutes on this task.',
      prompt: `Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children).

To what extent do you agree or disagree?

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`
    }
  };

  const currentPrompt = prompt || samplePrompts[type];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {currentPrompt.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{currentPrompt.description}</p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {currentPrompt.prompt}
        </p>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {type === 'Task 1' ? (
          <p>Minimum 150 words • Time limit: 20 minutes</p>
        ) : (
          <p>Minimum 250 words • Time limit: 40 minutes</p>
        )}
      </div>
    </div>
  );
};

export default WritingPrompt;

