// Logger
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

exports.logger = logger;