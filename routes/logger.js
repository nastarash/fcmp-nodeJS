const appRoot = require('app-root-path');
const winston = require('winston');

const loggerOptions = {
    file: {
        level: 'info',
        name: 'file.info',
        filename: `${appRoot}/logs/app.log`,
        timestamp: true,
        handleExceptions: true
    },
    console: {
        level: 'debug',
        timestamp: true,
        handleExceptions: true

    }
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(loggerOptions.file),
        new winston.transports.Console(loggerOptions.console)
    ],
    exitOnError: false,
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;