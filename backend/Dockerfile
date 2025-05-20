FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npx", "ts-node", "./src/index.ts"]