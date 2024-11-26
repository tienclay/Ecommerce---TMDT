# src/Dockerfile (Project A)

# Sử dụng Node.js image chính thức
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock
COPY package.json yarn.lock ./

# Cài đặt các dependencies cho production
RUN yarn install --production

# Sao chép toàn bộ mã nguồn vào image
COPY . .

# Biên dịch mã nguồn (nếu cần)
RUN yarn build

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["yarn", "start:prod"]  
