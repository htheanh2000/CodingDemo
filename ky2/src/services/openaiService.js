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

// Generate a fresh IELTS Writing Task 2 prompt using OpenAI
export const generateRandomPrompt = async () => {
  if (!OPENAI_API_KEY) {
    throw new Error('Vui lòng thêm VITE_OPENAI_API_KEY vào file .env');
  }

  const system = `You are an IELTS Writing Task 2 prompt generator.
Return ONLY valid JSON with fields: {"title","description","prompt"}.
Use neutral topics suitable for students worldwide. Title should be 'IELTS Writing Task 2'. Description: 'You should spend about 40 minutes on this task.'`;

  const user = `Create one diverse IELTS Writing Task 2 prompt.
Types allowed: agree-disagree, discuss-both-views, advantages-disadvantages, problem-solution.
Respond in JSON only.`;

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ],
      temperature: 0.8,
      max_tokens: 400
    })
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Lỗi khi tạo đề với OpenAI');
  }

  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content || '';
  try {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
    const jsonContent = jsonMatch ? jsonMatch[1] : content;
    const parsed = JSON.parse(jsonContent);
    return {
      title: parsed.title || 'IELTS Writing Task 2',
      description: parsed.description || 'You should spend about 40 minutes on this task.',
      prompt: parsed.prompt || content
    };
  } catch {
    return {
      title: 'IELTS Writing Task 2',
      description: 'You should spend about 40 minutes on this task.',
      prompt: content
    };
  }
};

