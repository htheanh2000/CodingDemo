# 🚀 Hướng Dẫn Deploy lên VPS

## Prerequisites
- VPS với Docker và Docker Compose đã được cài đặt
- SSH access đến VPS
- Domain name (optional, có thể dùng IP trực tiếp)

## Ports được sử dụng
- **Port 3005**: Kỳ 1 - Snake Game
- **Port 3006**: Kỳ 2 - IELTS Writing Practice  
- **Port 3007**: Kỳ 3 Frontend - Expense Tracker
- **Port 3008**: Kỳ 3 Backend - Expense Tracker API
- **Port 27018**: MongoDB (mapped from internal 27017)

## Bước 1: Clone repository trên VPS

```bash
ssh root@31.97.109.177
cd /opt  # hoặc thư mục bạn muốn
git clone https://github.com/htheanh2000/CodingDemo.git
cd CodingDemo
```

## Bước 2: Tạo file .env

```bash
cp .env.example .env
nano .env
```

Cập nhật các giá trị:
- `MONGODB_URI`: mongodb://mongodb:27017/expense-tracker (hoặc MongoDB Atlas URI)
- `JWT_SECRET`: một chuỗi secret mạnh
- `OPENAI_API_KEY`: API key của bạn

## Bước 3: Build và chạy với Docker Compose

```bash
docker-compose up -d --build
```

## Bước 4: Kiểm tra các services

```bash
# Xem logs
docker-compose logs -f

# Xem status
docker-compose ps

# Test các ports
curl http://localhost:3005  # Ky1
curl http://localhost:3006  # Ky2
curl http://localhost:3007  # Ky3 Frontend
curl http://localhost:3008/api/health  # Ky3 Backend
```

## Bước 5: Truy cập từ browser

- **Kỳ 1**: http://31.97.109.177:3005
- **Kỳ 2**: http://31.97.109.177:3006
- **Kỳ 3**: http://31.97.109.177:3007

## Các lệnh quản lý

```bash
# Stop tất cả
docker-compose down

# Restart một service cụ thể
docker-compose restart ky1-snake
docker-compose restart ky2-ielts
docker-compose restart ky3-backend
docker-compose restart ky3-frontend

# Xem logs của service
docker-compose logs -f ky3-backend

# Update code và rebuild
git pull
docker-compose up -d --build
```

## Troubleshooting

### Port đã được sử dụng
Nếu port bị conflict, sửa file `docker-compose.yml` và thay đổi ports mapping.

### MongoDB connection error
Kiểm tra MongoDB container đang chạy:
```bash
docker-compose ps mongodb
docker-compose logs mongodb
```

### Frontend không kết nối được Backend
Kiểm tra `VITE_API_URL` trong `docker-compose.yml` phải đúng với IP VPS.

### Permission issues với uploads
```bash
chmod -R 777 ky3/backend/uploads
```

## Security Notes

⚠️ **Quan trọng**:
- Đảm bảo file `.env` không được commit lên git
- Sử dụng firewall để chỉ mở các ports cần thiết
- Cân nhắc sử dụng Nginx reverse proxy với SSL
- Thay đổi JWT_SECRET mạnh mẽ trong production

