FROM node:8.12.0-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

WORKDIR /app/node
RUN npm install

FROM php:7.2-apache

COPY --from=0 /app/build /var/www/html/
COPY --from=0 /app/node /var/www/html/node/
COPY ./v1-backend /var/www/html/

ENV POSTGRES_PASSWORD=""

# congif apache
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf
RUN apt-get update
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod env

# install php supportive files
# RUN DEBIAN_FRONTEND=noninteractive apt-get -y --force-yes install \
#     php7.1-pgsql \
#     php-pear \
#     php-mbstring \
#     php7.1-curl

RUN chown -R www-data:www-data /var/www/html/
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_RUN_DIR /var/www/html
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

# WORKDIR /
# RUN rm /var/www/html/index.html

EXPOSE 80
EXPOSE 443
EXPOSE 8080

WORKDIR /var/www/html
COPY ./start.sh start.sh
RUN chmod +x start.sh

CMD ["sh", "start.sh", "run"]