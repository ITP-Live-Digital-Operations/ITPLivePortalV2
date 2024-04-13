const { Sequelize } = require("sequelize");
const models = require("../../models");
const clientMetrics = models.clientMetrics;
const campaignMetrics = models.campaignMetrics;
const influencerCampaignMetrics = models.influencerCampaignMetrics;
const InfluencerMetrics = models.influencerMetrics;

exports.getClientMetrics = (req, res) => {
  clientMetrics
    .findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error retrieving client metrics", err);
    });
};

exports.getCampaignMetrics = (req, res) => {
  campaignMetrics
    .findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error retrieving campaign metrics", err);
    });
};

exports.getCampaignMetricsByClientId = (req, res) => {
  campaignMetrics
    .findAll({
      where: {
        clientId: req.params.clientId,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error retrieving campaign metrics", err);
    });
};

exports.getInfluencerCampaignMetricsByCampaignId = (req, res) => {
  influencerCampaignMetrics
    .findAll({
      where: {
        campaignId: req.params.campaignId,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error retrieving campaign metrics", err);
    });
};

exports.getInfluencerCampaignMetricsByInfluencerId = (req, res) => {
  influencerCampaignMetrics
    .findAll({
      where: {
        influencerId: req.params.influencerId,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error retrieving campaign metrics", err);
    });
};

exports.topInfluencersByCPE = (req, res) => {
  InfluencerMetrics.findAll({
    where: { CPE: { [models.Sequelize.Op.ne]: null } },
    attributes: ["influencerId", "influencerName", "CPE"],
    order: [["CPE", "ASC"]],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.topInfluencersByCPM = (req, res) => {
  InfluencerMetrics.findAll({
    where: { CPM: { [models.Sequelize.Op.ne]: null } },
    attributes: ["influencerId", "influencerName", "CPM"],
    order: [["CPM", "ASC"]],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.topInfluencersMarginOfProfit = (req, res) => {
  InfluencerMetrics.findAll({
    where: { marginOfProfit: { [models.Sequelize.Op.ne]: null } },
    attributes: ["influencerId", "influencerName", "marginOfProfit"],
    order: [["marginOfProfit", "DESC"]],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};
