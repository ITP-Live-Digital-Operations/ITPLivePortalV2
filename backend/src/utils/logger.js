const { createLogger, format, transports, winston } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path');
require('dotenv/config');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};



const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
});



const logger = createLogger({
  level: 'info',
  levels,
  format: combine(
    label({ label: 'my-app' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'logs', 'error-%DATE%.log'),
      level: 'error',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs', 'combined-%DATE%.log'),
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
    }),
    new transports.Console({
      format: combine(
        label({ label: 'my-app' }),
        timestamp(),
        format.colorize(),
        myFormat
      )
    }),
   /*  new transports.Syslog({
      host: process.env.LOG_HOST,
      port: process.env.LOG_PORT,
      protocol: process.env.LOG_PROTOCOL,
      app_name: 'my-app',
      format: format.json(),
    }) */
  ],
  exitOnError: false,
});

const httpLogStream = {
  write: (message) => {
    logger.http(message.trim());
  }
};

module.exports = {
  logger,
  httpLogStream,
};
