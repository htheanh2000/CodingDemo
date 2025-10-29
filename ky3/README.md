# 💰 Expense Tracker - MERN Stack với RAG

Ứng dụng quản lý chi tiêu thông minh với khả năng OCR hóa đơn và RAG (Retrieval Augmented Generation) để tìm kiếm hóa đơn.

## 🚀 Tính năng

- 🔐 **Authentication** - Đăng ký/Đăng nhập với JWT
- 📸 **Upload Hóa đơn** - Upload hình ảnh hóa đơn/receipt
- 🤖 **AI OCR** - Sử dụng OpenAI Vision API để trích xuất thông tin tự động
- 📊 **Dashboard** - Thống kê chi tiêu với charts đẹp
- 🔍 **RAG Search** - Tìm kiếm hóa đơn thông minh với vector embeddings
- 💾 **MongoDB** - Lưu trữ dữ liệu với MongoDB
- 📱 **Responsive** - Giao diện đẹp với Tailwind CSS

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- OpenAI API (Vision + Embeddings)
- Multer (file upload)
- bcryptjs (password hashing)

### Frontend
- React 19
- React Router
- Tailwind CSS
- Recharts (charts)
- Axios (API calls)

## 📦 Cài đặt

### 1. Backend Setup

```bash
cd ky3/backend
npm install

# Tạo file .env
cp .env.example .env

# Cập nhật .env với các giá trị:
# - MONGODB_URI (MongoDB connection string)
# - JWT_SECRET (secret key cho JWT)
# - OPENAI_API_KEY (OpenAI API key)

npm run dev
```

### 2. Frontend Setup

```bash
cd ky3/frontend
npm install
npm run dev
```

### 3. MongoDB

Đảm bảo MongoDB đang chạy:
```bash
# Nếu chưa có MongoDB, cài đặt:
# macOS: brew install mongodb-community
# Hoặc dùng MongoDB Atlas (cloud)
```

## 🔑 Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your-openai-api-key
```

## 📁 Cấu trúc Project

```
ky3/
├── backend/
│   ├── models/          # MongoDB models
│   │   ├── User.js
│   │   ├── Invoice.js
│   │   └── Expense.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── invoiceRoutes.js
│   │   └── expenseRoutes.js
│   ├── services/        # Business logic
│   │   └── openaiService.js
│   ├── middleware/      # Express middleware
│   │   └── auth.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── services/    # API services
    │   ├── context/     # React context
    │   └── App.jsx
    └── ...
```

## 🎯 API Endpoints

### Auth
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy user hiện tại

### Invoices
- `POST /api/invoices/upload` - Upload hóa đơn
- `GET /api/invoices` - Lấy tất cả hóa đơn
- `POST /api/invoices/search` - Tìm kiếm với RAG

### Expenses
- `GET /api/expenses` - Lấy tất cả chi tiêu
- `GET /api/expenses/stats` - Thống kê chi tiêu
- `POST /api/expenses` - Tạo chi tiêu
- `PUT /api/expenses/:id` - Cập nhật
- `DELETE /api/expenses/:id` - Xóa

## 🤖 RAG System

Hệ thống RAG (Retrieval Augmented Generation) sử dụng:
1. **OpenAI Embeddings API** để tạo vector embeddings từ text hóa đơn
2. **Cosine Similarity** để tìm hóa đơn tương tự
3. Lưu embeddings trong MongoDB để search nhanh

## 📊 Dashboard Features

- Tổng chi tiêu
- Thống kê theo category
- Thống kê theo tháng
- Danh sách chi tiêu gần đây
- Charts với Recharts

## 🚀 Chạy ứng dụng

1. **Start MongoDB** (nếu chạy local)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. Truy cập: http://localhost:3000

## 📝 Cách sử dụng

1. Đăng ký/Đăng nhập
2. Upload hình ảnh hóa đơn
3. AI tự động trích xuất thông tin
4. Xem dashboard với thống kê
5. Quản lý chi tiêu

## 🎓 Học được gì?

- MERN Stack architecture
- JWT Authentication
- File upload với Multer
- OpenAI Vision API
- Vector embeddings và RAG
- MongoDB aggregation
- React Context API
- Data visualization với Recharts

## 🔒 Security Notes

- Passwords được hash với bcrypt
- JWT tokens cho authentication
- File upload validation
- API key protection (nên dùng backend proxy trong production)

