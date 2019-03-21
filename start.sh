#!/bin/sh
nginx
./wait-for.sh mongo-db:27017 && exec node ./server/app.js

