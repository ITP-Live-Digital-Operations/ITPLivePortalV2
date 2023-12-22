const models = require("../../models");
const Campaign = models.Campaign;
const Influencer = models.Influencer;
const CampaignFile = models.CampaignFiles;
const SalesBrief = models.SalesBrief;
const path = require("path");

const { campaignUpload } = require('../../config/multerConfig');


exports.getCampaigns = (req, res) => {
  Campaign.findAll({
    include: [
      {
        model: models.Clients,
        as: "client",
      },
      {
        model: models.Influencer,
        attributes: ["id", "Name"],
      },
    ],
    order: [["id", "DESC"]],
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
  Campaign.findByPk(req.params.id, {
    include: [
      {
        model: models.Clients,
        as: "client",
      },
      {
        model: models.SalesBrief,
        as: "salesBrief",
      },
      {
        model: models.CampaignFiles,
        as: "campaignFiles",
      },
      {
        model: models.Influencer,
        attributes: ["id", "Name"],
        include: [
          {
            model: models.InfluencerStatistics,
            where: { campaignId: req.params.id },
            as: "influencerStatistics",
            required: false,
          },
        ],
      },
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
    brandId: req.body.brandId,
    createdBy: req.body.createdBy,
    briefId: req.body.briefId,
  };

  Campaign.create(campaign)
    .then((data) => {
      SalesBrief.findByPk(req.body.briefId).then((brief) => {
        brief.update({ campaignId: data.id }).then(() => {
          res.status(201).send({
            campaign: data,
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

  console.log(campaignId);
  console.log(influencerIds);

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
};

exports.editCampaignInfluencers = (req, res) => {
  const campaignId = req.params.id;
  const influencerIds = req.body.influencers;

  Campaign.findByPk(campaignId)
    .then((campaign) => {
      if (!campaign) {
        res.status(404).send({
          status: "error",
          message: "Campaign not found",
        });
      } else {
        // Directly remove all associations from the join table
        campaign
          .getInfluencers()
          .then((influencers) => {
            campaign
              .removeInfluencers(influencers)
              .then(() => {
                // Add the new influencers after removing the old ones
                campaign
                  .addInfluencers(influencerIds)
                  .then(() => {
                    res.status(201).send({
                      status: "success",
                      message: "Influencers updated successfully",
                    });
                  })
                  .catch((err) => {
                    res.status(500).send({
                      status: "error",
                      message: err.message,
                    });
                  });
              })
              .catch((err) => {
                res.status(500).send({
                  status: "error",
                  message: err.message,
                });
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
};

exports.getCampaignInfluencers = (req, res) => {
  const campaignId = req.params.id;

  Campaign.findByPk(campaignId, {
    include: [
      {
        model: models.Influencer,
        attributes: ["id", "Name"],
      },
    ],
  })
    .then((campaign) => {
      if (!campaign) {
        res.status(404).send({
          status: "error",
          message: "Campaign not found",
        });
      } else {
        res.status(200).send(campaign);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.editCampaign = (req, res) => {
  const campaignId = req.params.id;
  const campaign = {
    campaignName: req.body.campaignName,
    market: req.body.market,
    clientId: req.body.clientId,
    createdBy: req.body.createdBy,
  };

  Campaign.update(campaign, {
    where: { id: campaignId },
  })
    .then((data) => {
      if (data == 1) {
        res.status(200).send({
          status: "success",
          message: "Campaign updated successfully",
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Campaign not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.uploadCampaignFile = (req, res) => {
  campaignUpload.single("file")(req, res, (err) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    } else {
      const file = req.file;
      const campaignId = Number(req.body.campaignId);
      const uploadedBy = Number(req.body.uploadedBy);

      let fileType;

      const ext = file.originalname.split(".").pop();
      if (
        ext === "xlsx" ||
        ext === "xls" ||
        ext === "ods" ||
        file.mimetype.includes("sheet")
      ) {
        fileType = "sheet";
      } else if (
        ext === "ppt" ||
        ext === "pptx" ||
        ext === "odp" ||
        file.mimetype.includes("presentation")
      ) {
        fileType = "presentation";
      } else if (ext === "pdf" || file.mimetype.includes("pdf")) {
        fileType = "pdf";
      } else if (
        ext === "doc" ||
        ext === "docx" ||
        ext === "odt" ||
        file.mimetype.includes("word") ||
        file.mimetype.includes("text")
      ) {
        fileType = "document";
      }

      const campaignFile = {
        campaignId: campaignId,
        fileName: file.filename,
        fileType: fileType,
        fileSize: file.size,
        uploadedBy: uploadedBy,
      };

      CampaignFile.create(campaignFile)
        .then((data) => {
          res.status(201).send({
            status: "success",
            message: "File uploaded successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        });
    }
  });
};


exports.downloadCampaignFile = (req, res) => {
  const id = req.params.id;
  CampaignFile.findByPk(id)
    .then((file) => {
      if (!file) {
        res.status(404).send({
          status: "error",
          message: "File not found",
        });
      } else {
        const file = path.resolve(__dirname, "../../uploads/campaignFiles/" + file.fileName);
        const encodedFilename = encodeURIComponent(file.fileName);
        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + encodedFilename
        );
        res.sendFile(file);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
  };