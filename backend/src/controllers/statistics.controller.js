const { Sequelize } = require("sequelize");
const models = require("../../models");
const clientMetrics = models.clientMetrics;
const campaignMetrics = models.campaignMetrics;

exports.getClientMetrics =  (req, res) => {
    clientMetrics.findAll({
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        console.log("Error retrieving client metrics", err);
        });
    };

exports.getCampaignMetrics =  (req, res) => {
    campaignMetrics.findAll({

    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        console.log("Error retrieving campaign metrics", err);
        });
    }

exports.getCampaignMetricsByClientId =  (req, res) => {
    campaignMetrics.findAll({
        where: {
            clientId: req.params.clientId
        }
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        console.log("Error retrieving campaign metrics", err);
        });
    }
