# 🚀 Quick Start Guide

## ⚠️ Lưu ý trước khi chạy

### 1. MongoDB
Cần có MongoDB đang chạy:
```bash
# Kiểm tra MongoDB
mongosh --version

# Hoặc cài đặt MongoDB
# macOS: brew install mongodb-community
# Sau đó: brew services start mongodb-community

# Hoặc dùng MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
```

### 2. OpenAI API Key
1. Vào: https://platform.openai.com/api-keys
2. Tạo API key mới
3. Thêm vào file `backend/.env`:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

## 🏃 Chạy ứng dụng

### Terminal 1 - Backend
```bash
cd ky3/backend
npm install  # Nếu chưa cài
npm run dev  # Chạy trên port 5000
```

### Terminal 2 - Frontend
```bash
cd ky3/frontend
npm install  # Nếu chưa cài
npm run dev  # Chạy trên port 3000
```

## 📱 Truy cập

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 Sử dụng

1. **Đăng ký tài khoản mới** hoặc đăng nhập
2. **Upload hóa đơn**: Chọn ảnh hóa đơn/receipt
3. **AI sẽ tự động**:
   - OCR và trích xuất thông tin
   - Tạo expense records
   - Tạo embeddings cho RAG search
4. **Xem Dashboard**: Thống kê chi tiêu với charts
5. **Quản lý expenses**: Xem, xóa các khoản chi tiêu

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Kiểm tra MongoDB có chạy không
ps aux | grep mongod

# Hoặc dùng MongoDB Atlas (cloud)
# Sửa MONGODB_URI trong .env thành connection string từ Atlas
```

### OpenAI API Error
- Kiểm tra API key đúng chưa
- Kiểm tra có credit trong OpenAI account
- Đợi vài giây rồi thử lại

### Port đã được sử dụng
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

## 📝 File .env mẫu

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_super_secret_jwt_key_change_this
OPENAI_API_KEY=sk-your-openai-api-key-here
```

## ✅ Checklist

- [ ] MongoDB đã được cài và chạy
- [ ] Có OpenAI API key
- [ ] File .env đã được tạo và cấu hình
- [ ] Backend đang chạy (port 5000)
- [ ] Frontend đang chạy (port 3000)

