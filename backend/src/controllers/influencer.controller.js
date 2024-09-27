const { Sequelize } = require("sequelize");
const models = require("../../models");
const Campaign = models.Campaign;
const Influencer = models.Influencer;
const InfluencerRating = models.InfluencerRating;
const User = models.User;
const InfluencerStatistics = models.InfluencerStatistics;
const InfluencerMetrics = models.influencerMetrics;
const InfluencerRemarks = models.influencerRemarks;
const { runMigration } = require("../../scripts/migrateInfluencerData");

exports.createInfluencer = (req, res) => {
  const influencer = req.body;
  Influencer.create(influencer)
    .then((data) => {
      if(data.id){
      runMigration(data.id);
      }else{
        console.log("No Influencer Id.")
      }
      InfluencerMetrics.create({
        influencerId: data.id,
      })
        .then((data) => {
          res.status(200).send({
            status: "success",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        });
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencers = (req, res) => {
  Influencer.findAll({ where: { Status: "Active" },
  include: [{ model: InfluencerMetrics, as: "influencerMetrics" }],
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

exports.getInfluencer = (req, res) => {
  const influencerId = Number(req.params.id);
  Influencer.findByPk(influencerId, {
    include: [{ model: InfluencerStatistics, as: "influencerStatistics" }],
  })

    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencerNameById = (req, res) => {
  const influencerId = Number(req.params.id);
  Influencer.findByPk(influencerId, { attributes: ["name"] })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.deleteInfluencer = (req, res) => {
  Influencer.update({ Status: "InActive" }, { where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.updateInfluencer = (req, res) => {
  Influencer.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencerIdsandNames = (req, res) => {
  Influencer.findAll({
    where: { Status: "Active" },
    attributes: ["id", "name"],
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

exports.getInfluencerNames = (req, res) => {
  Influencer.findAll({ attributes: ["id", "name"] })
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

exports.createInfluencerRating = (req, res) => {
  const influencerRating = req.body;
  InfluencerRating.create(influencerRating)
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getAverageInfluencerRating = (req, res) => {
  const influencerId = Number(req.params.id);
  InfluencerRating.findAll({
    where: { influencer_id: influencerId },
    attributes: [
      "responseRate",
      "contentQuality",
      "creativity",
      "flexibility",
      "campaignPerformance",
    ],
  })
    .then((data) => {
      let sum = 0;
      data.forEach((element) => {
        sum =
          sum +
          element.responseRate +
          element.contentQuality +
          element.creativity +
          element.flexibility +
          element.campaignPerformance;
      });
      let average = sum / (data.length * 5);
      res.status(200).send({ average });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencerRating = (req, res) => {
  const influencerId = Number(req.params.id);
  InfluencerRating.findAll({
    where: { influencer_id: influencerId },
    include: [
      {
        model: User,
        as: "userID",
        attributes: ["name"],
      },
    ],
  })
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getGenders = (req, res) => {
  Influencer.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("gender")), "genders"],
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

exports.getCities = (req, res) => {
  Influencer.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("CityLocation")), "cities"],
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

exports.getVerticals = (req, res) => {
  Influencer.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("mainVertical")), "verticals"],
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

exports.getLocations = (req, res) => {
  Influencer.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("countryLocation")), "locations"],
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

exports.getNationalities = (req, res) => {
  Influencer.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("Nationality")), "nationalities"],
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

exports.getAllInfluencersWithAverageRating = (req, res) => {
  Influencer.findAll({
    where: { Status: "Active" },
    include: [
      {
        model: InfluencerRating,
        as: "influencerRating",
        attributes: [
          "responseRate",
          "contentQuality",
          "creativity",
          "flexibility",
          "campaignPerformance",
        ],
      },
      { model: InfluencerMetrics, as: "influencerMetrics" },
    ],
  })
    .then((data) => {
      let influencers = [];
      data.forEach((element) => {
        let sum = 0;
        element.influencerRating.forEach((rating) => {
          sum =
            sum +
            rating.responseRate +
            rating.contentQuality +
            rating.creativity +
            rating.flexibility +
            rating.campaignPerformance;
        });
        let itpAverageRating = sum / (element.influencerRating.length * 5);
        influencers.push({ ...element.get(), itpAverageRating });
      });
      res.status(200).send({ influencers });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencerStatisticsById = (req, res) => {
  const influencerId = Number(req.params.id);
  InfluencerStatistics.findAll({ where: { influencerId: influencerId } })
    .then((statData) => {
      const campaignPromises = statData.map((stat) => {
        return Campaign.findOne({ where: { id: stat.campaignId } }).then(
          (data) => {
            if (data && data.campaignName) {
              stat.setDataValue("campaignName", data.campaignName);
            }
            return stat;
          }
        );
      });

      return Promise.all(campaignPromises);
    })
    .then((statDataWithCampaignNames) => {
      const serializedData = statDataWithCampaignNames.map((stat) =>
        stat.get({ plain: true })
      );
      res.status(200).send({ statData: serializedData });
    })
    .catch((err) => {
      console.error("Error occurred:", err.message);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.addInfluencerStats = (req, res) => {
  const influencerId = Number(req.body.influencerId);
  const campaignId = Number(req.body.campaignId);
  const platformDeliverable = req.body.platformDeliverable;
  const stats = req.body.stats;
  const poc = req.body.poc;

  const platform = platformDeliverable.split(" ")[0];
  const deliverable = platformDeliverable.split(" ")[1];
  let frame = null;
  let setNumber = null;
  const year = new Date().getFullYear();
  let totalInteractions, engagementRate;
  let currentStat;
  console.log(platform);
  for (let i = 0; i < stats.rows.length; i++) {
    currentStat = stats.rows[i];

    switch (platformDeliverable) {
      case "Instagram Stories":
        frame = i + 1;
        totalInteractions =
          Number(currentStat.interactions) + Number(currentStat.stickerTaps);
        engagementRate =
          currentStat.views !== 0
            ? ((Number(currentStat.interactions) +
                Number(currentStat.stickerTaps)) /
                Number(currentStat.views)) *
              100
            : 0;
        break;
      case "Instagram Post":
      case "Instagram Reel":
        setNumber = i + 1;
        totalInteractions =
          Number(currentStat.likes) +
          Number(currentStat.comments) +
          Number(currentStat.shares) +
          Number(currentStat.saves);
        engagementRate =
          currentStat.reach !== 0
            ? ((Number(currentStat.likes) +
                Number(currentStat.comments) +
                Number(currentStat.shares) +
                Number(currentStat.saves)) /
                Number(currentStat.reach)) *
              100
            : 0;
        break;
      case "Snapchat Stories":
        frame = i + 1;
        totalInteractions =
          Number(currentStat.screenshots) +
          Number(currentStat.replies) +
          Number(currentStat.clicks);
        engagementRate =
          currentStat.views !== 0
            ? ((Number(currentStat.screenshots) +
                Number(currentStat.replies) +
                Number(currentStat.clicks)) /
                Number(currentStat.views)) *
              100
            : 0;
        break;
      case "YouTube Shorts":
      case "YouTube Videos":
      case "YouTube Stream":
        setNumber = i + 1;
        totalInteractions =
          Number(currentStat.likes) +
          Number(currentStat.dislikes) +
          Number(currentStat.comments);
        engagementRate =
          currentStat.videoViews !== 0
            ? ((Number(currentStat.likes) +
                Number(currentStat.dislikes) +
                Number(currentStat.comments)) /
                Number(currentStat.videoViews)) *
              100
            : 0;
        break;
      case "Tiktok Videos":
        setNumber = i + 1;
        totalInteractions =
          Number(currentStat.likes) +
          Number(currentStat.comments) +
          Number(currentStat.shares) +
          Number(currentStat.saves);
        engagementRate =
          currentStat.videoViews !== 0
            ? ((Number(currentStat.likes) +
                Number(currentStat.comments) +
                Number(currentStat.shares) +
                Number(currentStat.saves)) /
                Number(currentStat.videoViews)) *
              100
            : 0;
        break;
      case "Facebook Post":
        setNumber = i + 1;
        totalInteractions =
          Number(currentStat.likes) +
          Number(currentStat.comments) +
          Number(currentStat.shares);
        engagementRate =
          currentStat.reach !== 0
            ? ((Number(currentStat.likes) +
                Number(currentStat.comments) +
                Number(currentStat.shares)) /
                Number(currentStat.reach)) *
              100
            : 0;
        break;
      case "X Post":
        setNumber = i + 1;
        totalInteractions =
          Number(currentStat.likes) +
          Number(currentStat.comments) +
          Number(currentStat.retweets);
        engagementRate =
          currentStat.impressions !== 0
            ? ((Number(currentStat.likes) +
                Number(currentStat.comments) +
                Number(currentStat.retweets)) /
                Number(currentStat.impressions)) *
              100
            : 0;
        break;
      case "Twitch Stream":
        setNumber = i + 1;
        totalInteractions =
          Number(currentStat.likes) +
          Number(currentStat.dislikes) +
          Number(currentStat.comments);
        engagementRate =
          currentStat.views !== 0
            ? ((Number(currentStat.likes) +
                Number(currentStat.dislikes) +
                Number(currentStat.comments)) /
                Number(currentStat.views)) *
              100
            : 0;
        break;
      default:
        totalInteractions = 0;
        engagementRate = 0;
    }

    InfluencerStatistics.create({
      influencerId: influencerId,
      campaignId: campaignId,
      platform: platform,
      deliverable: platformDeliverable,
      frame: frame,
      setNumber: setNumber,
      POC: poc,
      year: year,
      totalInteractions: totalInteractions,
      engagementRate: engagementRate,
      ...currentStat,
    })
      .then((data) => {
        res.status(200).send({
          status: "success",
        });
      })
      .catch((err) => {
        console.error("Error occurred:", err.message);
        res.status(500).send({
          status: "error",
          message: err.message,
        });
      });
  }
};

exports.createInfluencerRemark = (req, res) => {
  const influencerRemark = req.body;
  InfluencerRemarks.create(influencerRemark)
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Influencer Remark Created",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencerRemarkById = (req, res) => {
  InfluencerRemarks.findByPk(req.params.id, 
    { include: 
            [
              {
                model: Influencer,
                as: "influencer",
                attributes: ["id", "Name"],
              },
            ]  
    }
    
    )
    .then((data) => {
      res.status(200).send( data );
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}

exports.getInfluencerRemarks = (req, res) => {
  const influencerId = Number(req.params.id);
  InfluencerRemarks.findAll({
    where: { influencerId: influencerId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
     
    order: [["updatedAt", "DESC"]],
  })
    .then((data) => {
      res.status(200).send( data );
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.updateInfluencerRemark = (req, res) => {
  
  InfluencerRemarks.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Influencer Remark Updated",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.deleteInfluencerRemark = (req, res) => {
  InfluencerRemarks.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Influencer Remark Deleted",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getInfluencersSearchProfiles = (req, res) => {
 
  Influencer.findAll({
    where: { Status: "Active" },
    attributes: ['id', 'Name', 'profilePicture'],
    order: [['id', 'DESC']],
  })
    .then((influencers) => {
      res.status(200).send({ influencers });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}
