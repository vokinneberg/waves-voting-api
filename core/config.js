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
  jwtAdminExpires: process.env.JWT_ADMIN_EXPIRES || 60 * 60 * 24, // 24 hour
  voteExpires: process.env.VOTE_EXPIRES || 1, // 1 minute
  saltRounds: process.env.SALT_ROUNDS || 10,
  votingMaximumRank: process.env.VOTING_MAXIMUM_RANK || 10,
  votingMinumumStake: process.env.VOTING_MINIMUM_STAKE || 100,
  votingTicker: process.env.VOTING_TICKER || 'WCT-TEST',
  votingAssetId: process.env.VOTING_ASSET_ID || '2P266KWxiVTWEjSHE7NDiSxR52V2PkSLaWBpFisJjrjb',
  dataProviderId: process.env.DATA_PROVIDER_ID || '3Mvy79q2zLpWBhdZJCqdfH22y5k4JxY4e2L',
  wavesNodeAddress: process.env.WAVES_NODE_ADDRESS || 'https://testnodes.wavesnodes.com',
  snapshotCronPattern: process.env.SNAPSHOT_CRON_PATTERN || '*/5 * * * *',
  cleanUpCronPattern: process.env.CLEAN_UP_CRON_PATTERN || '*/1 * * * *',
  uploadSizeLimit: process.env.UPLOAD_SIZE_LIMIT || '4mb',
  minioHost: process.env.MINIO_HOST || 'minio.trustamust.com',
  minioPort: process.env.MINIO_PORT || 9000,
  minioUseSsl: process.env.MINIO_USE_SSL || false,
  minioAccessKey: process.env.MINIO_ACCESS_KEY || 'minio',
  minioSecretKey: process.env.MINIO_SECRET_KEY || 'nWgn59qU4EJOOMkGnYALGAmmJ',
};

export default config;
