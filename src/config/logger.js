import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.prettyPrint({depth: 5, colorize: false}),
  defaultMeta: { service: 'clin-arranger' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.prettyPrint({depth: 5, colorize: true}),
  }));
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default logger;