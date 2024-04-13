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
const InfluencerRemarks = models.influencerRemarks;
const influencerCampaignMetrics = models.influencerCampaignMetrics;
const InfluencerMetrics = models.influencerMetrics;

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
    order: [[models.sequelize.literal('count DESC')]],
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
    where : {userID : { [models.Sequelize.Op.ne]: 1 }},
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
    order: [[models.sequelize.literal('count DESC')]],
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
    where : { updatedBy : { [models.Sequelize.Op.ne]: 1 }},
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
    order: [[models.sequelize.literal('count DESC')]],
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
    where: { Status: "Active", updatedBy : { [models.Sequelize.Op.ne]: 1 }},
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
    order: [[models.sequelize.literal('count DESC')]],
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
    where : {updatedBy : { [models.Sequelize.Op.ne]: 1 }},
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
    order: [[models.sequelize.literal('count DESC')]],
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
    where : {uploaded_by : { [models.Sequelize.Op.ne]: 1 }},
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
    order: [[models.sequelize.literal('count DESC')]], // Descending order by count of files
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
    order: [[models.sequelize.literal('count DESC')]], // Descending order by count of tasks
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

exports.countInfluencerRemarksByUser = (req, res) => {
  InfluencerRemarks.findAll({
    where : { createdById : { [models.Sequelize.Op.ne]: 1 }},
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('createdById')), 'count'],
    ],
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: ['name'],
      },
    ],
    group: ['user.id', 'user.name'],
    order: [[models.sequelize.literal('count DESC')]],
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

exports.countInfluencerCampaigns = (req, res) => {
  influencerCampaignMetrics.findAll({
    attributes: [
      [models.sequelize.fn('COUNT', models.sequelize.col('influencerId')), 'count'],
    ],
    include: [
      {
        model: models.Influencer,
        as: 'influencer',
        attributes: ['Name'],
      },
    ],
    group: ['influencer.id', 'influencer.Name'],
    // descinding by count of influencer campaigns
    order: [[models.sequelize.literal('count DESC')]],
  })
    .then((data) => {
      const reshapedData = data.map(item => {
        return {
          count: item.dataValues.count,
          name: item.dataValues.influencer.Name,
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


