const  models  = require('../../models');
const Campaign = models.Campaign;


exports.getCampaigns =  (req, res) => {
    Campaign.findAll()
     .then(data => {
          
          res.status(200).send(data);
     })
     .catch(err => {
          console.log(err);
          res.status(500).send({
                status: "error",
                message: err.message
          });
     });
    }

exports.getCampaignById =  (req, res) => {
    Campaign.findByPk(req.params.id)
     .then(data => {
          res.status(200).send(data);
     })
     .catch(err => {
          res.status(500).send({
                status: "error",
                message: err.message
          });
     });
    }

