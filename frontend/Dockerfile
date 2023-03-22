FROM node:18.14.2 as builder

ARG NODE_VERSION=18.14.2

WORKDIR /react-app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /react-app/build /usr/share/nginx/html