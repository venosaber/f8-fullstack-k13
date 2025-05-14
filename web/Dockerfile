# Sử dụng base image Node
FROM node:20.10.0

# Đặt thư mục làm việc bên trong container
WORKDIR /app/web

# Sao chép package.json và package-lock.json (nếu có)
# Việc chỉ copy file này trước giúp tận dụng cache của Docker
# nếu các file này không thay đổi thì không cần chạy lại npm install
COPY package.json ./
# Nếu bạn có package-lock.json, hãy copy nó.
# Nếu không chắc, có thể bỏ qua dòng copy package-lock.json, npm install sẽ tự tạo.
# COPY package-lock.json ./

# Cài đặt dependencies
# Điều này sẽ tạo ra node_modules tương thích với Linux bên trong image
RUN npm install --legacy-peer-deps

# Sao chép toàn bộ mã nguồn còn lại của project web vào thư mục làm việc
COPY . .

# Lệnh để chạy ứng dụng khi container khởi động
# CMD ["npm", "run", "dev"] # Dòng này có thể bị ghi đè bởi command trong docker-compose.yml