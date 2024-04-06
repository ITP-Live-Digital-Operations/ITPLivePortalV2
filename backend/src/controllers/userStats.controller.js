const models = require('../../models');
const SalesBrief = models.SalesBrief;
const Log = models.Logs;


exports.countUploadedBriefsByUser = (req, res) => {
  SalesBrief.findAll({
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('CreatedbyID')), 'count'],
    ],
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: ['name'],
      },
    ],
    group: ['user.id', 'user.name'],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
};


exports.countAddedLogsByUser = (req, res) => {
  Log.findAll({
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('userID')), 'count'],
    ],
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: ['name'],
      },
    ],
    group: ['user.id', 'user.name'],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
};


