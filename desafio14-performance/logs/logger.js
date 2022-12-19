import winston from 'winston';

const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: '/logs/warning.log', level: 'warning' }),
        new winston.transports.File({ filename: '/logs/error.log', level: 'error' })
    ]
})

function logInfo(req, _, next) {
    let info = 'METHOD: ' + req.method + ' | URL: ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(info);
    next();
}

function logWarn(req, _, next) {
    let warn = 'METHOD: ' + req.method + ' | URL: ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(warn);
    next();
}

function logError(req, _, next) {
    let error = 'METHOD: ' + req.method + ' | URL: ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.error(error);
    next();
}

export { logger, logInfo, logWarn, logError };