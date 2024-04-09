const { where } = require('sequelize');
const models = require('../../models');
const SalesBrief = models.SalesBrief;
const Log = models.Logs;
const Influencer = models.Influencer;
const Celebrity = models.Celebrity;
const Clients = models.Clients;
const File = models.File;
const UserTasks = models.UserTasks;
const User = models.User;

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
    // Map over the data to reshape each item
    const reshapedData = data.map(item => {
      return {
        count: item.dataValues.count,
        name: item.dataValues.user.name,
      };
    });

    res.status(200).send(reshapedData);
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
      const reshapedData = data.map(item => {
        return {
          count: item.dataValues.count,
          name: item.dataValues.user.name,
        };
      });
      res.status(200).send(reshapedData);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
};

exports.countAddedInfluencersByUser = (req, res) => {
  Influencer.findAll({
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('updatedBy')), 'count'],
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
      const reshapedData = data.map(item => {
        return {
          count: item.dataValues.count,
          name: item.dataValues.user.name,
        };
      });
      res.status(200).send(reshapedData);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
}

exports.countAddedCelebritiesByUser = (req, res) => {
  Celebrity.findAll({
    where: { Status: "Active" },
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('updatedBy')), 'count'],
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
      const reshapedData = data.map(item => {
        return {
          count: item.dataValues.count,
          name: item.dataValues.user.name,
        };
      });
      res.status(200).send(reshapedData);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
}

exports.countAddedClientsByUser = (req, res) => {
  Clients.findAll({
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('updatedBy')), 'count'],
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
      const reshapedData = data.map(item => {
        return {
          count: item.dataValues.count,
          name: item.dataValues.user.name,
        };
      });
      res.status(200).send(reshapedData);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
}

exports.countAddedFilesByUser = (req, res) => {
  File.findAll({
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('uploaded_by')), 'count'],
    ],
    include: [
      {
        model: models.User,
        as: 'uploaded by',
        attributes: ['name'],
      },
    ],
    group: ['uploaded by.name'],
  })
    .then((data) => {
      const reshapedData = data.map(item => {
        return {
          count: item.dataValues.count,
          name: item.dataValues['uploaded by'].name,
        };
      });
      res.status(200).send(reshapedData);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'error',
        message: err.message,
      });
    });
}

exports.countTalentTasks = (req, res) => {
  models.User.findAll({
    attributes: [
      'name',
      [models.sequelize.fn('COUNT', models.sequelize.col('assignedUsers.id')), 'count'],
    ],
    include: [{
      model: models.Task,
      as: 'assignedUsers',
      attributes: [],
      through: {
        attributes: [],
      },
    }],
    group: ['User.id', 'User.name'], // Group by User fields to aggregate tasks
    having: models.sequelize.literal('COUNT(assignedUsers.id) > 0'), // Filter users with more than 0 tasks
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
}


