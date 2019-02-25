const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

const printText = printf((info) =>
    `${info['timestamp']} [${info['level'].toUpperCase()}] - ${info['message']}`
);

const logger = winston.createLogger({
    format: combine(timestamp(), printText),
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = logger;
