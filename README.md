# TrustAmust waves voting API service

Service providing API for TrustAmust waves voting MVP.

## Build & deploy

### Available commands

To list all available commands run:

`yarn run`

### Lint

To run linter agains sources:

`yarn lint`

We use airbnb linter rules with few changes such as:

- Underscore dangle allowed after this keyword
  
- Function parameters reassign allowed for properties

### Test

To run tests:

`yarn test`

### Build

To be sure that all packages are up to date first run:

`yarn clean`

And then run build:

`yarn build`

You can olways use sigle-string comand:

`yarn clean && yarn build`

Resulting artifacts could be found in ./build folder.

### Start

To start service with nodemon run:

`yarn start`

Note that you will need mongodb instance running localy or remotely.

### Enviroment variables

- **AUTH_DATA** - Word used for Waves authentication. Default value 'IAmVoting'.

- **NODE_ENV** - Node environment variable. Default value 'development'.

- **LOG_LEVEL** - Service log level. Default value 'debug'.

- **DB_HOST** - MongoDB host. Default value 'mongo-db:27017'.

- **DB_NAME** - Database name.

- **DB_USER** - Database user.
  
- **DB_PASSWORD** - Database password.
  
- **SERVER_PORT** - Port service is running on. Default value 8080.

- **JWT_SECRET** - Secret used to sigh and validate JWT.
  
- **JWT_ADMIN_EXPIRES** - Admin console JWT lifetime. Default 24 hours.
  
- **JWT_VOTE_EXPIRES** - Vote endpoint JWt lifetime. Default 5 minutes.
  
- **SALT_ROUNDS**  - Admin password hash salt rounds. Default 10.

- **VOTING_MAXIMUM_RANK** - Rank limit when voting stops. Default 100.
  
- **VOTING_MINIMUM_STAKE** - Minimum stake to participate in voting. Default 10.
  
- **VOTING_TICKER** - Asset ticker user can vote with. Default 'WCT'.

- **SNAPSHOT_CRON_PATTERN** - Interval for snapshot to be taken. Default is every 5 minutes.
  
- **UPLOAD_SIZE_LIMIT** - Upload document size limit. Default 4 Mb.
  
- **MINIO_HOST** - Minio server host.
  
- **MINIO_PORT** - Minio server port. Default 9000.
  
- **MINIO_ACCESS_KEY** - Minio access key.
  
- **MINIO_SECRET_KEY** - Minio secret key.

## API Reference

`GET /api/health` - health check endpoint. Returns HTTP OK 200 if service works smoothly.
