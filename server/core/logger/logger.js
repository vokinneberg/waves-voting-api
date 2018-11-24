import * as winston from 'winston';
import config from '../config/config';

const logger = winston.createLogger({
  level: config.logLevel,
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    }),
  ],
});

export default logger;
