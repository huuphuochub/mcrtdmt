FROM node:20

WORKDIR /app

# Cài dependencies trước
COPY package*.json ./
RUN npm install

# Copy toàn bộ source (tạm thời, sau sẽ override bằng volume)
COPY . .

# Dùng ts-node + start:dev để chạy
CMD ["npm", "run", "start:dev"]
