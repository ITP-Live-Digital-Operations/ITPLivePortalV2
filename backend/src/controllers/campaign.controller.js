const models = require("../../models");
const Campaign = models.Campaign;
const Influencer = models.Influencer;


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


exports.addCampaign = (req, res) => {
  const campaign = {
    campaignName: req.body.campaignName,
    market: req.body.market,
    clientId: req.body.clientId,
    createdBy: req.body.createdBy,
  };

  Campaign.create(campaign)
    .then((data) => {
      res.status(201).send({
        status: "success",
        message: "Campaign created successfully",
        
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
  };

exports.addInfluencersToCampaign = (req, res) => {
  const campaignId = req.params.id;
  const influencerIds = req.body.influencers;

  //Find the campaign
  Campaign.findByPk(campaignId)
    .then((campaign) => {
      if (!campaign) {
        res.status(404).send({
          status: "error",
          message: "Campaign not found",
        });
      } else {
        //If campaign is found, add the influencers
        campaign
          .addInfluencers(influencerIds)
          .then((data) => {
            res.status(201).send({
              status: "success",
              message: "Influencers added to campaign successfully",
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: "error",
              message: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}
    