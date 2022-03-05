import path from 'path';
import winston from 'winston';

const { timestamp, label, combine, json } = winston.format;

const logDir = `${path.resolve('./')}/logs`;

const logger = winston.createLogger({
  format: combine(label({ label: 'icecream-store' }), timestamp(), json()),
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
    new winston.transports.File({ filename: `${logDir}/combined.log` }),
  ],
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

export default logger;
