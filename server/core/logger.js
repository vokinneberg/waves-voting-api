import * as winston from 'winston';
import config from './config';

const logFormat = winston.format.printf(({ level, message, stack, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message} ${stack}`;
});

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.label({label: 'waves-voting'}),
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new (winston.transports.Console)({
      colorize: true,
    }),
  ],
});

export default logger;
