FROM node:16-alpine AS dependencies
WORKDIR /1zap
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

ENV PORT=3003
EXPOSE 3003

CMD [ "npm", "dev" ]