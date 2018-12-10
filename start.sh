#!/bin/sh
nginx
./wait-for.sh mongo-db:27017 && node ./server/app.js

