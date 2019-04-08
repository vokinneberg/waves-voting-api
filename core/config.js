const config = {
  serverHttpHost: process.env.SERVER_HTTP_METHOD || 'https',
  serverHttpMethod: process.env.SERVER_HTTP_HOST || 'stage.trustamust.com/dashboard',
  authData: process.env.AUTH_DATA || 'IAmVoting',
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'debug',
  dbHost: process.env.DB_HOST || 'mongo-db:27017',
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  serverPort: process.env.SERVER_PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || 'example',
  jwtExpires: process.env.JWT_EXPIRES || 1,
  saltRounds: process.env.SALT_ROUNDS || 10,
};

export default config;