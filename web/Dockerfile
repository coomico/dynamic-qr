FROM node:22-alpine AS build

WORKDIR /web

COPY . .

RUN npm ci

ENV VITE_API_URL=http://localhost:3002

RUN npm run build

#serve static dist
FROM nginx:alpine AS prod

WORKDIR /web

COPY --from=build /web/dist/ /web/dist

COPY ./default.conf /etc/nginx/conf.d/