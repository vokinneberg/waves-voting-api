const config = {
  serverHttpHost: process.env.SERVER_HTTP_METHOD || 'https',
  serverHttpMethod: process.env.SERVER_HTTP_HOST || 'stage.trustamust.com/dashboard',
  authData: process.env.AUTH_DATA || 'IAmVoting',
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'debug',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '27017',
  dbName: process.env.DB_NAME || 'waves-voting',
  dbUser: process.env.DB_USER || 'waves-voting-user',
  dbPassword: process.env.DB_PASSWORD || 'example',
  serverPort: process.env.SERVER_PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || 'example',
  jwtExpires: process.env.JWT_EXPIRES || 1,
};

export default config;
