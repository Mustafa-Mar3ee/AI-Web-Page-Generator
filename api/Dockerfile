FROM node:alpine AS Production
ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","run","start"]