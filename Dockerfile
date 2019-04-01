FROM node:10.12.0-alpine as build

RUN apk update
RUN apk add --no-cache --virtual .build-deps libstdc++ binutils-gold curl g++ git gcc gnupg libgcc linux-headers make python libc6-compat bash

WORKDIR /app
COPY . .

RUN npm run clean

WORKDIR /app/server
RUN npm install

WORKDIR /app
RUN npm install

RUN npm run build

FROM node:10.12.0-alpine

USER root

RUN apk update
RUN apk add --no-cache --virtual .build-deps libstdc++ binutils-gold curl g++ git gcc gnupg libgcc linux-headers make python libc6-compat bash
RUN apk add --no-cache nginx
RUN rm -rf /var/cache/apk/*

RUN mkdir /run/nginx
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /var/www/trustamust-mvp
COPY --from=build /app/node_modules /var/www/trustamust-mvp/node_modules
COPY --from=build /app/server/node_modules /var/www/trustamust-mvp/server/node_modules

WORKDIR /var/www/trustamust-mvp
EXPOSE 80
ENTRYPOINT [ "node", "./server/app.js" ]