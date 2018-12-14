const package = require('../package.json');

exports.home = function home (req, res, next) {
  const {name, version, description} = package;
  res.send({
    name,
    version,
    description
  });
  return next();
};