# projectA/Dockerfile
FROM node:18-alpine

# Tạo thư mục app
WORKDIR /app

# Sao chép package.json và yarn.lock
COPY package.json yarn.lock ./

# Cài đặt dependencies
RUN yarn install --production

# Sao chép mã nguồn
COPY . .

# Build project
RUN yarn build

# Expose port
EXPOSE 3000

# Chạy ứng dụng
CMD ["yarn", "start:prod"]
