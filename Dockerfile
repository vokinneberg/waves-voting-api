FROM node:12.3.1-alpine as build

RUN apk update
RUN apk add --no-cache --virtual .build-deps libstdc++ binutils-gold curl g++ git gcc gnupg libgcc linux-headers make python libc6-compat bash

WORKDIR /app
COPY . .

RUN yarn clean
RUN yarn install
RUN yarn build

FROM node:12.3.1-alpine

WORKDIR /var/www/trustamust-mvp

USER root

RUN apk update
RUN apk add --no-cache --virtual .build-deps libstdc++ binutils-gold curl g++ git gcc gnupg libgcc linux-headers make python libc6-compat bash
RUN rm -rf /var/cache/apk/*

COPY --from=build /app/build /var/www/trustamust-mvp
COPY --from=build /app/package-lock.json /var/www/trustamust-mvp/package-lock.json
COPY --from=build /app/package.json /var/www/trustamust-mvp/package.json

RUN yarn install

EXPOSE 80
ENTRYPOINT [ "node", "./app.js" ]