const models = require("../../models");
const Campaign = models.Campaign;
const InfluencerStatistics = models.InfluencerStatistics;

exports.getCampaigns = (req, res) => {
  Campaign.findAll({
    include: [
      {
        model: models.Clients,
        as: "client",
      },
      {
        model: models.Influencer,
        attributes: ['id', 'Name' ],
      }
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getCampaignById = (req, res) => {
  Campaign.findByPk(req.params.id , { 
     include: [
      {
        model: models.Clients,
        as: "client",
      },
      {
        model: models.Influencer,
        attributes: ['id', 'Name' ],
          include: [
            {
              model: models.InfluencerStatistics,
              where: { campaignId : req.params.id },
              as: "influencerStatistics"
            }
          ]
      }
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};
