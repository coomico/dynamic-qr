FROM node:22-alpine

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "npm", "run", "dev" ]