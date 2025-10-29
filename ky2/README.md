# 📝 IELTS Writing Practice App

Ứng dụng luyện tập viết IELTS với AI chấm điểm thông minh sử dụng React, Tailwind CSS và OpenAI API.

## 🚀 Tính năng

- ✍️ **Viết bài IELTS Writing Task 2** với đề bài mẫu
- 🤖 **AI chấm điểm và phân tích** chi tiết theo tiêu chí IELTS
- 📊 **Hiển thị điểm số** (Band 0-9) và phân tích từng tiêu chí
- 📚 **Lưu lịch sử** làm bài vào localStorage
- 💡 **Gợi ý cải thiện** cụ thể từ AI
- 🎲 **Đề bài ngẫu nhiên** để luyện tập

## 🛠️ Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Tạo file .env:**
```bash
cp .env.example .env
```

3. **Thêm OpenAI API Key vào file .env:**
```
VITE_OPENAI_API_KEY=your_api_key_here
```

Lấy API key tại: https://platform.openai.com/api-keys

4. **Chạy ứng dụng:**
```bash
npm run dev
```

## 📁 Cấu trúc project

```
ky2/
├── src/
│   ├── components/
│   │   ├── WritingPrompt.jsx    # Hiển thị đề bài
│   │   ├── WritingEditor.jsx    # Text editor để viết bài
│   │   ├── AIFeedback.jsx       # Hiển thị kết quả AI
│   │   └── HistoryPanel.jsx     # Lịch sử làm bài
│   ├── services/
│   │   └── openaiService.js     # Service gọi OpenAI API
│   ├── App.jsx                  # Component chính
│   └── index.css                # Global styles
├── .env.example                 # Template cho API key
└── README.md
```

## 🎯 Cách sử dụng

1. Chọn đề bài hoặc nhấn "🎲 Đề mới" để có đề bài ngẫu nhiên
2. Viết bài của bạn vào text editor
3. Nhấn "📝 Gửi bài và nhận feedback" để AI chấm điểm
4. Xem kết quả chi tiết: điểm số, phân tích, điểm mạnh, cần cải thiện
5. Xem lại các bài đã làm trong "📚 Lịch sử"

## 🔑 API Keys

Ứng dụng sử dụng OpenAI API (GPT-4o-mini) để chấm điểm và phân tích bài viết IELTS.

**Lưu ý:** 
- API key được lưu ở client-side, chỉ dùng cho development
- Trong production, nên tạo backend API để bảo mật API key

## 📚 Tech Stack

- ⚛️ React 19
- 🎨 Tailwind CSS
- 🤖 OpenAI API (GPT-4o-mini)
- 💾 localStorage
- ⚡ Vite

## 🎓 Học được gì?

- React Hooks (useState, useEffect)
- API calls với fetch
- Component composition
- LocalStorage
- Error handling
- Loading states
- Responsive design với Tailwind
