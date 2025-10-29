# 🚀 CodingDemo - Tổng Hợp 3 Dự Án Full Stack

Collection của 3 dự án học tập từ cơ bản đến nâng cao, từ frontend vanilla JavaScript đến full-stack MERN với AI integration.

## 📚 Giới Thiệu

Đây là 3 dự án được phát triển qua các kỳ học:

1. **Kỳ 1**: Snake Game - Game cổ điển với vanilla JavaScript
2. **Kỳ 2**: IELTS Writing Practice - Ứng dụng luyện viết với AI feedback
3. **Kỳ 3**: Expense Tracker - Ứng dụng quản lý chi tiêu với RAG và AI OCR

## 🎮 Kỳ 1: Snake Game

Game Snake cổ điển được xây dựng với HTML5 Canvas và Tailwind CSS.

**Tech Stack:**
- Vanilla JavaScript
- HTML5 Canvas API
- Tailwind CSS
- LocalStorage API

**Tính năng:**
- Điều khiển rắn bằng phím mũi tên
- Lưu điểm cao nhất
- Game over screen với animation
- Giao diện đẹp mắt

**Cách chạy:**
Mở file `ky1/snake-game.html` trực tiếp trong trình duyệt.

## 📝 Kỳ 2: IELTS Writing Practice

Ứng dụng giúp luyện viết IELTS Writing Task 2 với AI chấm điểm chi tiết theo đúng tiêu chí IELTS.

**Tech Stack:**
- React 19
- Vite
- Tailwind CSS
- OpenAI GPT-4o-mini API

**Tính năng:**
- Chấm điểm theo 4 tiêu chí IELTS
- Phân tích chi tiết và gợi ý cải thiện
- Lịch sử làm bài
- Đề bài IELTS mẫu

**Cách chạy:**
```bash
cd ky2
npm install
# Tạo file .env với VITE_OPENAI_API_KEY
npm run dev
```

## 💰 Kỳ 3: Expense Tracker

Ứng dụng quản lý chi tiêu full-stack với AI OCR, RAG search, và dashboard thống kê.

**Tech Stack:**
- **Backend**: Node.js, Express, MongoDB, JWT, OpenAI API
- **Frontend**: React 19, Tailwind CSS, Recharts
- **AI Features**: GPT-4o Vision (OCR), Text Embeddings (RAG)

**Tính năng:**
- Authentication với JWT
- Upload hóa đơn và AI tự động OCR
- RAG search để tìm hóa đơn tương tự
- Dashboard với charts thống kê
- Quản lý expenses với CRUD đầy đủ

**Cách chạy:**

Backend:
```bash
cd ky3/backend
npm install
# Tạo .env với MONGODB_URI, JWT_SECRET, OPENAI_API_KEY
npm run dev
```

Frontend:
```bash
cd ky3/frontend
npm install
npm run dev
```

## 🛠️ Tech Stack Tổng Quan

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React 19, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **AI Integration**: OpenAI API (GPT-4o, GPT-4o-mini, Embeddings)
- **Build Tools**: Vite
- **Data Visualization**: Recharts
- **File Upload**: Multer

## 📖 Chi Tiết

Xem file [DU_AN_3_KY.md](./DU_AN_3_KY.md) để biết chi tiết đầy đủ về từng dự án.

## 📝 License

MIT License

## 👤 Tác giả

Sophie - htheanh2000@gmail.com

