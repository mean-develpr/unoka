const models = require('../models');
const errors = require('restify-errors');
//Logger
const logger = require('../log4js').logger;

exports.getAll = async (req, res, next) => {
  try {

    const employees = await models.employee.findAll();
    res.send(employees);
    return next();

  } catch (err) {
    logger.error(err);
    return next(new errors.InternalServerError(err, 'Get operation failed'));
  }
};

exports.get = async (req, res, next) => {
  try {
    const employee = await models.employee.findByPk(req.params.id);

    if (!employee) {
      return next(new errors.NotFoundError("Employee not found"));
    }

    res.send(employee);
    return next();

  } catch (err) {
    logger.error(err);
    return next(new errors.InternalServerError(err, 'Get operation failed'));
  }
};

exports.create = async (req, res, next) => {

  if (!req.body.employee) {
    return next(new errors.BadRequestError("Missing `employee` information"));
  }

  try {

    const employee = await models.employee.create(req.body.employee);
    res.send(employee);
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

exports.update = async (req, res, next) => {

  if (!req.body.data) {
    return next(new errors.BadRequestError("Missing `employee` data"));
  }

  try {

    const employee = await models.employee.findByPk(req.params.id);

    if (!employee) {
      return next(new errors.NotFoundError("Employee not found"));
    }

    const updatedEmployee = await employee.update(req.body.data);

    res.send(updatedEmployee);
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

exports.remove = async (req, res, next) => {
  try {
    await models.employee.destroy({
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

};