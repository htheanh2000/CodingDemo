# 📚 Tổng Hợp 3 Dự Án - Kỳ 1, 2, 3

---

## 🎮 KỲ 1: Game Rắn (Snake Game)

### 📋 Mô Tả Dự Án
Dự án đầu tiên là một game cổ điển Snake được xây dựng bằng HTML, JavaScript thuần và Tailwind CSS. Game có giao diện hiện đại, mượt mà với các hiệu ứng đẹp mắt.

### 🛠️ Công Nghệ Sử Dụng
- **HTML5** - Cấu trúc trang web
- **JavaScript (Vanilla)** - Logic game
- **Tailwind CSS** - Styling và giao diện
- **Canvas API** - Render game graphics
- **LocalStorage** - Lưu điểm cao nhất

### ✨ Tính Năng Chính
1. **Điều khiển rắn** bằng phím mũi tên (↑ ↓ ← →)
2. **Hệ thống điểm số** với cộng điểm khi ăn thức ăn
3. **Lưu kỷ lục** vào LocalStorage, tự động load khi vào lại
4. **Game Over screen** với animation khi thua
5. **Đếm số từ** và hiển thị thời gian chơi
6. **Giao diện đẹp** với gradient, shadow, và animations

### 📁 Cấu Trúc File
```
ky1/
├── snake-game.html    # File HTML chính
└── snake-game.js      # Logic game
```

### 🎯 Kỹ Năng Học Được
- Làm việc với Canvas API
- Xử lý sự kiện keyboard
- Game loop và animation
- LocalStorage API
- Tailwind CSS cơ bản
- JavaScript ES6+

### 🚀 Cách Chạy
Mở file `snake-game.html` trực tiếp trong trình duyệt.

---

## 📝 KỲ 2: IELTS Writing Practice với AI

### 📋 Mô Tả Dự Án
Ứng dụng web giúp học viên luyện tập viết IELTS Writing Task 2 với AI chấm điểm và phản hồi chi tiết. Sử dụng OpenAI GPT-4 để phân tích bài viết theo đúng tiêu chí chấm điểm IELTS.

### 🛠️ Công Nghệ Sử Dụng
- **React 19** - Frontend framework
- **Vite** - Build tool nhanh
- **Tailwind CSS** - Styling
- **OpenAI API (GPT-4o-mini)** - AI chấm điểm
- **LocalStorage** - Lưu lịch sử làm bài

### ✨ Tính Năng Chính
1. **Hiển thị đề bài IELTS** - Task 2 với sample prompts
2. **Editor viết bài** - Textarea với đếm từ tự động
3. **AI chấm điểm** - Chấm theo 4 tiêu chí IELTS:
   - Task Response
   - Coherence and Cohesion
   - Lexical Resource
   - Grammatical Range and Accuracy
4. **Phân tích chi tiết**:
   - Điểm số (Band 0-9)
   - Phân tích tổng quan
   - Điểm mạnh
   - Cần cải thiện
   - Gợi ý cụ thể
5. **Lịch sử làm bài** - Lưu tối đa 50 bài, xem lại và so sánh
6. **Đề bài ngẫu nhiên** - Nút để lấy đề mới

### 📁 Cấu Trúc File
```
ky2/
├── src/
│   ├── components/
│   │   ├── WritingPrompt.jsx    # Hiển thị đề bài
│   │   ├── WritingEditor.jsx    # Editor viết bài
│   │   ├── AIFeedback.jsx       # Hiển thị kết quả AI
│   │   └── HistoryPanel.jsx     # Lịch sử làm bài
│   ├── services/
│   │   └── openaiService.js     # Service gọi OpenAI API
│   ├── App.jsx
│   └── index.css
├── .env.example                  # Template API key
└── README.md
```

### 🎯 Kỹ Năng Học Được
- React Hooks (useState, useEffect)
- Component composition
- API calls với async/await
- Error handling
- Loading states
- LocalStorage management
- OpenAI API integration
- Prompt engineering
- Responsive design với Tailwind

### 🚀 Cách Chạy
```bash
cd ky2
npm install
# Tạo file .env và thêm VITE_OPENAI_API_KEY
npm run dev
```

### 🔑 API Key Cần Thiết
- OpenAI API Key (lấy tại https://platform.openai.com/api-keys)

---

## 💰 KỲ 3: Expense Tracker - MERN Stack với RAG

### 📋 Mô Tả Dự Án
Ứng dụng quản lý chi tiêu thông minh sử dụng MERN Stack (MongoDB, Express, React, Node.js) với tính năng RAG (Retrieval Augmented Generation). Cho phép người dùng upload hóa đơn, AI tự động OCR và trích xuất thông tin, sau đó tạo dashboard thống kê chi tiêu.

### 🛠️ Công Nghệ Sử Dụng

#### Backend
- **Node.js + Express** - RESTful API server
- **MongoDB + Mongoose** - Database
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload
- **OpenAI API**:
  - GPT-4o Vision - OCR và trích xuất thông tin hóa đơn
  - Text Embeddings - Tạo vector cho RAG search

#### Frontend
- **React 19** - UI framework
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - API calls
- **Vite** - Build tool

### ✨ Tính Năng Chính

#### 1. Authentication & Authorization
- Đăng ký/Đăng nhập với JWT
- Bảo mật password với bcrypt
- Protected routes

#### 2. Invoice Upload & OCR
- Upload hình ảnh hóa đơn/receipt
- AI tự động OCR và trích xuất:
  - Merchant (cửa hàng)
  - Ngày tháng
  - Danh sách items
  - Tổng tiền, thuế
  - Phương thức thanh toán
  - Raw text (để RAG)

#### 3. RAG System (Retrieval Augmented Generation)
- Tạo vector embeddings từ text hóa đơn
- Lưu embeddings vào MongoDB
- Tìm kiếm hóa đơn tương tự bằng cosine similarity
- Cho phép tìm kiếm bằng ngôn ngữ tự nhiên

#### 4. Expense Management
- Tự động tạo expense records từ hóa đơn
- Phân loại theo category:
  - Food
  - Transport
  - Shopping
  - Entertainment
  - Bills
  - Health
  - Other
- CRUD operations cho expenses

#### 5. Dashboard & Analytics
- **Summary Cards**: 
  - Tổng chi tiêu
  - Số lượng transactions
  - Chi tiêu trung bình
- **Charts**:
  - Pie chart: Chi tiêu theo category
  - Bar chart: Chi tiêu theo tháng
- **Expense List**: Danh sách chi tiêu gần đây với filter

#### 6. Data Persistence
- Lưu trữ hóa đơn với hình ảnh
- Lưu embeddings cho RAG
- Lưu expense records
- Indexed queries cho performance

### 📁 Cấu Trúc File

```
ky3/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Invoice.js       # Invoice model với embeddings
│   │   └── Expense.js       # Expense model
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication endpoints
│   │   ├── invoiceRoutes.js # Invoice upload & RAG search
│   │   └── expenseRoutes.js # Expense CRUD & stats
│   ├── services/
│   │   └── openaiService.js # OpenAI API integration
│   ├── middleware/
│   │   └── auth.js         # JWT verification
│   ├── uploads/            # Uploaded images
│   └── server.js           # Express server
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── InvoiceUpload.jsx
    │   │   ├── ExpenseStats.jsx
    │   │   └── ExpenseList.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js       # API service layer
    │   └── App.jsx
    └── ...
```

### 🎯 Kỹ Năng Học Được

#### Backend
- RESTful API design
- MongoDB schema design
- Authentication & Authorization với JWT
- File upload handling
- Error handling middleware
- Environment variables
- OpenAI API integration:
  - Vision API cho OCR
  - Embeddings API cho vector search
- RAG implementation
- Cosine similarity calculation
- MongoDB aggregation

#### Frontend
- React Context API (state management)
- Protected routes
- Form handling và validation
- File upload với preview
- Data visualization với Recharts
- Loading và error states
- Responsive design
- API integration

#### Full Stack
- MERN Stack architecture
- CORS configuration
- Proxy setup
- Authentication flow
- Image storage
- Database relationships
- Performance optimization

### 🚀 Cách Chạy

#### 1. Setup MongoDB
```bash
# Cài MongoDB hoặc dùng MongoDB Atlas
brew install mongodb-community
# Hoặc: https://www.mongodb.com/cloud/atlas
```

#### 2. Backend
```bash
cd ky3/backend
npm install
cp .env.example .env
# Sửa .env với MONGODB_URI, JWT_SECRET, OPENAI_API_KEY
npm run dev  # Chạy trên port 5001
```

#### 3. Frontend
```bash
cd ky3/frontend
npm install
npm run dev  # Chạy trên port 3000
```

#### 4. Truy cập
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

### 🔑 Environment Variables

**Backend `.env`**:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key
OPENAI_API_KEY=sk-your-openai-api-key
```

### 📊 API Endpoints

#### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy user hiện tại

#### Invoices
- `POST /api/invoices/upload` - Upload hóa đơn
- `GET /api/invoices` - Lấy tất cả hóa đơn
- `GET /api/invoices/:id` - Lấy chi tiết hóa đơn
- `POST /api/invoices/search` - Tìm kiếm với RAG

#### Expenses
- `GET /api/expenses` - Lấy expenses (có filter)
- `GET /api/expenses/stats` - Thống kê chi tiêu
- `POST /api/expenses` - Tạo expense
- `PUT /api/expenses/:id` - Cập nhật
- `DELETE /api/expenses/:id` - Xóa

---

## 🎓 Tiến Trình Học Tập

### Kỳ 1: Frontend Cơ Bản
- ✅ HTML/CSS/JavaScript thuần
- ✅ Canvas API
- ✅ LocalStorage
- ✅ Game development cơ bản

### Kỳ 2: React & API Integration
- ✅ React hooks và components
- ✅ API calls và async/await
- ✅ State management
- ✅ OpenAI API integration
- ✅ Error handling

### Kỳ 3: Full Stack Development
- ✅ MERN Stack architecture
- ✅ Database design (MongoDB)
- ✅ Authentication (JWT)
- ✅ File upload
- ✅ RAG system với embeddings
- ✅ Data visualization
- ✅ Full-stack integration

---

## 🔮 Tương Lai & Mở Rộng

### Có thể thêm vào các dự án:

**Kỳ 1 (Snake Game)**:
- Multiplayer mode
- Power-ups và special items
- Leaderboard online
- Different game modes

**Kỳ 2 (IELTS Writing)**:
- Writing Task 1 support
- More detailed feedback
- Writing templates
- Progress tracking
- Export PDF reports

**Kỳ 3 (Expense Tracker)**:
- Budget planning
- Recurring expenses
- Export reports (PDF/Excel)
- Multiple currencies
- Collaborative sharing
- Mobile app version
- Advanced RAG với langchain
- Auto-categorization với ML

---

## 📝 Tổng Kết

Ba dự án này đã đi qua từ cơ bản đến nâng cao:

1. **Kỳ 1**: Lập trình frontend cơ bản với vanilla JavaScript
2. **Kỳ 2**: React framework và tích hợp AI API
3. **Kỳ 3**: Full-stack development với database, authentication, và RAG system

Mỗi dự án đều có tính thực tế cao và có thể mở rộng thêm nhiều tính năng. Đây là một lộ trình học tập toàn diện từ frontend cơ bản đến full-stack development hiện đại.

---

*Tài liệu được tạo ngày: $(date)*
*Tác giả: Sophie*
*Email: htheanh2000@gmail.com*

