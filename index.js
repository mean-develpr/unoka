const package = require('./package.json');

const restify = require('restify');
const server = restify.createServer();

const models = require('./models');

//Logger
const logger = require('./log4js').logger;

// Models
models.init();

// Add basic restify middleware
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Routes
const home = require('./controllers/home');
const employee = require('./controllers/employee');
const team = require('./controllers/team');

server.get('/', home.home);

server.get('/employee', employee.getAll);
server.get('/employee/:id', employee.get);
server.post('/employee', employee.create);
server.put('/employee/:id', employee.update);
server.del('/employee/:id', employee.remove);

server.get('/team', team.getAll);
server.get('/team/:id', team.get);
server.post('/team', team.create);
server.put('/team/:id', team.update);
server.del('/team/:id', team.remove);

server.listen(process.env.PORT || 4000, process.env.URL || '127.0.0.1', () => {
    logger.log(`${package.name}@${package.version} listening at ${server.url}`);
});

server.on('InternalServer', function(req, res, err, callback) {
    logger.error(err.name, err.message, err.stack);
    return callback();
});

server.on('NotFound', function(req, res, err, callback) {
    logger.error(err.name, err.message, err.stack);
    return callback();
});

server.on('BadRequest', function(req, res, err, callback) {
    logger.error(err.name, err.message, err.stack);
    return callback();
});

server.on('SequelizeValidation', function(req, res, err, callback) {
    logger.error(err.name, err.message, err.stack);
    logger.error("SequelizeValidation");
    res.send(400, err.toString());
    return callback();
});