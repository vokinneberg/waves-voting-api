#!/bin/sh
nginx
./wait_for.sh mongo_db:27017 -t 20 -- node ./app.js

