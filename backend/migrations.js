const Umzug = require("umzug");
const models = require("./models");

const migrationsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize
    // modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor
    ],
    path: "./migrations", // path to folder containing migrations
    pattern: /^\d{14}-\w+\.js$/
  }
};

var seedsConfig = {
  storage: "sequelize",
  storageOptions: {
    sequelize: models.sequelize,
    modelName: 'SequelizeData' // Or whatever you want to name the seeder storage table
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.sequelize.constructor
    ],
    path: "./seeders", // path to folder containing seeds
    pattern: /^\d{14}-\w+\.js$/
  }
};

const migrator = new Umzug(migrationsConfig);
const seeder = new Umzug(seedsConfig);

module.exports = () => migrator.up().then(() => seeder.up());