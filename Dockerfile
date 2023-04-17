FROM node:16-alpine AS dependencies

WORKDIR /1zap_front

COPY package*.json ./
COPY package-lock.json ./

RUN npm install
# RUN npm build

COPY . .

EXPOSE 3000
ENV PORT 3000

# CMD ["yarn", "start"]
CMD npm run dev
