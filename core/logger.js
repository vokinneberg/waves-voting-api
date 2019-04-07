import * as winston from 'winston';
import config from './config';

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({label: 'waves-voting'}),
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new (winston.transports.Console)({
      console: {
        level: config.logLevel,
        handleExceptions: true,
        json: config.nodeEnv === 'production',
        colorize: true,
      },
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

export default logger;
