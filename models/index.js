const fs = require('fs');
const {promisify} = require('util');
const Sequelize = require('sequelize');
const logger = require('../log4js').logger;

const readdir = promisify(fs.readdir);

const models = {};
const seedData = require('./seedData');

async function authenticate (sequelize) {
  try {
    await sequelize.authenticate();
    logger.info('Successfully connected to SQLite DB');
  } catch (err) {
    logger.error('Unable to connect to SQLite DB', err);
    process.exit(1);
  }
}

async function loadModels (sequelize) {
  try {
    const files = await readdir(__dirname);
    
    for (const filename of files) {
      const [model, extension] = filename.split('.');

      if (model !== 'index' && extension === 'js') {
        models[model] = exports[model] = sequelize.import(`${__dirname}/${model}`);
      }
    }
    logger.info('Successfully loaded Sequelize models');
  } catch (err) {
    logger.error('Unable to load Sequelize models', err);
    process.exit(1);
  }
}

async function synchronize (sequelize) {
  try {
    await sequelize.sync({ force: true });
    logger.info('DB successfully synchronized');
  } catch (err) {
    logger.error('Unable to synchronize DB', err);
    process.exit(1);
  }
}

async function seed () {
  try {
    logger.info(Object.keys(models))
    for (const model in seedData) {
      await models[model].bulkCreate(seedData[model]);
    }
    logger.info('Successfully seeded data');
  } catch (err) {
    logger.error('Error seeding data', err);
    process.exit(1);
  }
}

exports.init = async () => {
  const sequelize = new Sequelize('unochaDb', null, null, {
    dialect: "sqlite",
    storage: './unocha.sqlite',
  });

  await authenticate(sequelize);
  await loadModels(sequelize);
  await synchronize(sequelize);
  await seed();
};
