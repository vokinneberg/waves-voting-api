FROM node:10.15.3-alpine as build

RUN apk update
RUN apk add --no-cache --virtual .build-deps libstdc++ binutils-gold curl g++ git gcc gnupg libgcc linux-headers make python libc6-compat bash
RUN apk add vips-dev fftw-dev build-base --update-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/ \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

WORKDIR /app
COPY . .

RUN npm run clean
RUN npm install
RUN npm run build

FROM node:10.15.3-alpine

WORKDIR /var/www/trustamust-mvp

USER root

RUN apk update
RUN apk add --no-cache --virtual .build-deps libstdc++ binutils-gold curl g++ git gcc gnupg libgcc linux-headers make python libc6-compat bash
RUN apk add vips-dev fftw-dev build-base --update-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/ \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/main
RUN apk add --no-cache nginx
RUN rm -rf /var/cache/apk/*

RUN mkdir /run/nginx
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /var/www/trustamust-mvp
COPY --from=build /app/package-lock.json /var/www/trustamust-mvp/package-lock.json
COPY --from=build /app/package.json /var/www/trustamust-mvp/package.json

RUN npm install

EXPOSE 80
ENTRYPOINT [ "node", "./app.js" ]