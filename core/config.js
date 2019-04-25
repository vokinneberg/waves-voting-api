const config = {
    serverHost: process.env.SERVER_HTTP_HOST || 'stage.trustamust.com',
    authData: process.env.AUTH_DATA || 'IAmVoting',
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'debug',
    dbHost: process.env.DB_HOST || 'mongo-db:27017',
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    serverPort: process.env.SERVER_PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || 'example',
    jwtAdminExpires: process.env.JWT_ADMIN_EXPIRES || 60 * 24, // 24 hour
    jwtVoteExpires: process.env.JWT_VOTE_EXPIRES || 5, // 5 minutes
    saltRounds: process.env.SALT_ROUNDS || 10,
    votingMaximumRank: process.env.VOTING_MAXIMUM_RANK || 100,
    votingMinumumStake: process.env.VOTING_MINIMUM_STAKE || 10,
    votingTicker: process.env.VOTING_TICKER || 'WCT-TEST',
    votingAssetId:
        process.env.VOTING_ASSET_ID ||
        '9ck6zXLp6npJTNsy4oJKCR1W8tQgjVfjjDvxKqNtQFhX',
    snapshotCronPattern: process.env.SNAPSHOT_CRON_PATTERN || '* 5 * * *',
    uploadSizeLimit: process.env.UPLOAD_SIZE_LIMIT || '4mb',
    minioHost: process.env.MINIO_HOST || '104.248.101.178',
    minioPort: process.env.MINIO_PORT || 9000,
    minioAccessKey: process.env.MINIO_ACCESS_KEY || 'minio',
    minioSecretKey: process.env.MINIO_SECRET_KEY || 'nWgn59qU4EJOOMkGnYALGAmmJ',
}

export default config
