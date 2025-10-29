// OpenAI API Service
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export const analyzeEssay = async (essay, prompt) => {
  if (!OPENAI_API_KEY) {
    throw new Error('Vui lòng thêm VITE_OPENAI_API_KEY vào file .env');
  }

  const systemPrompt = `Bạn là một giám khảo IELTS chuyên nghiệp. Hãy chấm điểm và phân tích bài viết IELTS Writing Task 2 theo các tiêu chí:
1. Task Response (Trả lời đúng đề bài)
2. Coherence and Cohesion (Mạch lạc và liên kết)
3. Lexical Resource (Từ vựng)
4. Grammatical Range and Accuracy (Ngữ pháp)

Trả lời bằng tiếng Việt, format JSON với cấu trúc:
{
  "score": số điểm từ 0-9,
  "analysis": "phân tích tổng quan chi tiết",
  "strengths": ["điểm mạnh 1", "điểm mạnh 2"],
  "improvements": ["cần cải thiện 1", "cần cải thiện 2"],
  "suggestions": "gợi ý cụ thể để cải thiện"
}`;

  const userPrompt = `Đề bài:
${prompt}

Bài viết của học sinh:
${essay}

Hãy chấm điểm và phân tích chi tiết.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Lỗi khi gọi OpenAI API');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Try to parse JSON from the response
    try {
      // Extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;
      return JSON.parse(jsonContent);
    } catch (parseError) {
      // If JSON parsing fails, return structured response
      return {
        score: null,
        analysis: content,
        strengths: [],
        improvements: [],
        suggestions: 'Vui lòng xem phân tích chi tiết ở trên.'
      };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

