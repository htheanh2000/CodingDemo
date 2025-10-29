# 🎓 Coding Demo - 3 Kỳ Học

Repository demo code cho 3 kỳ học lập trình web từ cơ bản đến full-stack.

## 📚 3 Kỳ Học

### Kỳ 1: Snake Game (HTML/CSS/JavaScript)
- Tech Stack: HTML5, CSS3, JavaScript vanilla
- Canvas API để vẽ game
- LocalStorage để lưu high score
- Link: http://31.97.109.177:3005

### Kỳ 2: IELTS Writing Practice (React + AI)
- Tech Stack: React, Tailwind CSS, OpenAI API
- AI chấm điểm bài viết IELTS
- LocalStorage để lưu lịch sử
- Link: http://31.97.109.177:3006

### Kỳ 3: Expense Tracker (Full Stack MERN + AI)
- Tech Stack: React, Node.js, MongoDB, OpenAI
- Upload invoice và AI extract data
- RAG search với embeddings
- Backend: http://31.97.109.177:3008
- Frontend: http://31.97.109.177:3007

## 🚀 Deploy

Xem chi tiết tại [DEPLOY.md](DEPLOY.md)

### Quick Start trên VPS:

```bash
# Clone repository
git clone https://github.com/htheanh2000/CodingDemo.git
cd CodingDemo

# Tạo file .env
cp env.example .env
nano .env  # Thêm OPENAI_API_KEY=sk-your-key-here

# Build và chạy
docker-compose up -d --build
```

## 🔧 Troubleshooting

### OpenAI API Key Error
Nếu gặp lỗi 401 với OpenAI API:
- Xem [QUICK_FIX_API_KEY.md](QUICK_FIX_API_KEY.md) - Hướng dẫn nhanh
- Xem [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Chi tiết đầy đủ

### Scripts hỗ trợ:

```bash
# Kiểm tra cấu hình env
./check-env.sh

# Tự động fix lỗi API key
./fix-api-key.sh
```

## 📁 Cấu trúc

```
CodingDemo/
├── ky1/              # Snake Game (Static HTML)
├── ky2/              # IELTS Writing Practice (React)
├── ky3/              # Expense Tracker (Full Stack)
│   ├── backend/      # Node.js + Express + MongoDB
│   └── frontend/     # React + Tailwind
├── docker-compose.yml
├── env.example       # Template cho biến môi trường
└── README.md         # File này
```

## 📖 Tài liệu

- [DEPLOY.md](DEPLOY.md) - Hướng dẫn deploy chi tiết
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Troubleshooting
- [QUICK_FIX_API_KEY.md](QUICK_FIX_API_KEY.md) - Fix nhanh lỗi API key
- [ky2/README.md](ky2/README.md) - Chi tiết về kỳ 2
- [ky3/README.md](ky3/README.md) - Chi tiết về kỳ 3

## 🔑 Environment Variables

Tạo file `.env` ở root với:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
MONGODB_URI=mongodb://mongodb:27017/expense-tracker
JWT_SECRET=your_secret_key
PORT=3008
```

Xem chi tiết tại `env.example`

## 📝 Notes

- Ky2 và Ky3 **cần OPENAI_API_KEY** trong file `.env` ở root
- Ky2: API key được build vào static files (build time)
- Ky3: API key được inject vào container (runtime)
- Sau khi sửa `.env`, **bắt buộc** rebuild containers
