# TrustAmust waves voting API service

TrustAmust is a platform where crowdfunding meets freelancing and blockchain tokenisation. All projects and initiatives on the TrustAmust platform are subject to public voting. Each participant of the system — the founder, adviser and the user — decide how a particular project is worthy of trust and attention.

## Verification Center

TrustAmust Verification Center is an online service designed to verify assets created on the Waves Platform.

Assets are verified based on community votes. Only WCT token holders can participate in voting for assets. After passing verification to TrustAmust (when TrustAmust is selected as the asset verification service in the Waves Client settings), the asset receives:

- Status ‘Qualified’
- Logo in Waves Client
- Ticker for the Waves DEX

To receive verification on the TrustAmust service, an asset needs to achieve the required level of one-time support from community members. This level of support is determined by the service using the value of RANK, where in order to receive verification an asset needs to receive RANK 100.

For each asset, the voting process is unlimited. It lasts until an asset reaches RANK 100 (i.e. when one-time community support reaches the required level). After receiving RANK 100, the voting process stops and the TrustAmust Oracle records the asset verification data on the Waves blockchain.

Based on that rating, projects will be assigned a status or qualification level over the Waves Asset Verification Protocol. Thus, in addition to the rating, a decentralised association will be created with statuses set by WCT voting.

## The voting process

Assets can only be evaluated from a user’s desktop client. For mobile apps, the service is currently available only for viewing.

The voting process for any asset can be initiated by any user, provided that Waves Keeper is installed in their browser and there are at least 10 WCT in their balance. No WCT is transferred from the user’s address by the service during the vote, and there are no charges.

Users can vote only once and for one asset at a time. They can participate in another vote after the project reaches RANK100.

The number of WCT in the voting address affects the weight of the vote throughout the voting period.

To vote on a service using TrustAmust you should:

- Choose from the list of projects on the main page (Launchpad).
- Click ‘Vote’.
- Confirm your action in Waves Keeper. You voted!
- To maintain the weight of your vote, do not move WCT assets from the voting wallet until the end of the voting period.

## Build & deploy

### Available commands

To list all available commands run:

`yarn run`

### Lint

To run linter against sources:

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
