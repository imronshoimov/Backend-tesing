FROM node:latest
WORKDIR /app

ADD package*.json ./
RUN npm install

ADD . .

RUN npm install

EXPOSE 8080
CMD ["node", "index.js"]