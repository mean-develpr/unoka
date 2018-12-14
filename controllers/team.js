const models = require('../models');
const errors = require('restify-errors');
//Logger
const logger = require('../log4js').logger;

exports.getAll = async(req, res, next) => {
    try {

        const teams = await models.team.findAll();
        res.send(teams);
        return next();

    } catch (err) {
        logger.error(err);
        return next(new errors.InternalServerError(err, 'Get operation failed'));
    }
};

exports.get = async(req, res, next) => {
    try {
        const team = await models.team.findByPk(req.params.id);

        if (!team) {
            return next(new errors.NotFoundError("Team not found"));
        }

        res.send(team);
        return next();

    } catch (err) {
        logger.error(err);
        return next(new errors.InternalServerError(err, 'Get operation failed'));
    }
};

exports.create = async(req, res, next) => {

    if (!req.body.team) {
        return next(new errors.BadRequestError("Missing `team` information"));
    }

    try {

        const team = await models.team.create(req.body.team);
        res.send(team);
        return next();

    } catch (err) {
        logger.error(err);
        if (err.name === 'SequelizeValidationError') {
            return next(new errors.SequelizeValidationError(err, 'Create operation failed'));
        } else {
            return next(new errors.InternalServerError(err, 'Create operation failed'));
        }
    }
};

exports.update = async(req, res, next) => {

    if (!req.body.data) {
        return next(new errors.BadRequestError("Missing `team` data"));
    }

    try {

        const team = await models.team.findByPk(req.params.id);

        if (!team) {
            return next(new errors.NotFoundError("Team not found"));
        }

        const updatedTeam = await team.update(req.body.data);

        res.send(updatedTeam);
        return next();

    } catch (err) {
        logger.error(err);

        if (err.name === 'SequelizeValidationError') {
            return next(new errors.SequelizeValidationError(err, 'Update operation failed'));
            //res.send(400, err.toString());
        } else {
            return next(new errors.InternalServerError(err, 'Update operation failed'));
            //console.error(err);
            //res.send(500);
        }
    }
};

exports.remove = async(req, res, next) => {
    try {
        await models.team.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send();
        return next();
    } catch (err) {
        logger.error(err);
        return next(new errors.InternalServerError(err, 'Remove operation failed'));
    }
}

//TODO relationship team-user CRUD operations
/* exports.getAllTeamEmployee
exports.addEmployee
exports.addLeader
exports.removeLeader
exports.removeEmployee

exports.getAllTeamEmployee = async(req, res, next) => {
    try {
        await models.team-employee.findAll()
        res.send();
        return next();
    } catch (err) {
        logger.error(err);
        return next(new errors.InternalServerError(err, 'Remove operation failed'));
    }

};
*/