FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_OPTIONS="--max-old-space-size=256"

CMD ["npm", "run", "dev"]
