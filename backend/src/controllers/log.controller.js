const models = require("../../models");
const Log = models.Logs;
const Package = models.Package;
const logItem = models.logItem;
const User = models.User;
const Influencer = models.Influencer;
const db = require("../../models");
const { QueryTypes } = require("sequelize");

exports.create = (req, res) => {
  try {
    const {
      UserID,
      InfluencerID,
      Campaign,
      type,
      Time_to_reply,
      Notes,
      Currency,
      Rate,
      rateLogItems,
      packageItems,
    } = req.body;

    Log.create({
      userID: UserID,
      influencerID: InfluencerID,
      campaign: Campaign,
      type: type,
      time_to_reply: Time_to_reply,
      notes: Notes,
      currency: Currency,
      rate: Rate,
    }).then((log) => {
      const logID = log.id;

      if (type === "single" && rateLogItems.length > 0) {
        logItem
          .bulkCreate(
            rateLogItems.map((item) => {
              return {
                platform: item.Platform,
                deliverable: item.Deliverable,
                quantity: item.Quantity,
                currency: item.Currency,
                rate: item.Rate,
                logID: logID,
              };
            })
          )
          .then(() => {
            res.status(201).send({
              status: "success",
            });
          });
      } else if (type === "package" && packageItems.length > 0) {
        Package.bulkCreate(
          packageItems.map((item) => {
            return {
              platform: item.Platform,
              deliverable: item.Deliverable,
              quantity: item.Quantity,
              logID: logID,
            };
          })
        ).then(() => {
          res.status(201).send({
            status: "success",
          });
        });
      }
      res.status(201).send({
        status: "success",
        message: "Logs created successfully",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Logs.",
    });
  }
};

exports.getInfluencerLogs = (req, res) => {
  const id = req.params.id;
  try {
    Log.findAll({
      where: { influencerID: id },
      include: [
        { model: logItem, as: "logItems" },
        { model: Package, as: "packages" },
      ],
    }).then((log) => {
      if (!log) {
        return res.status(404).send({
          message: "Log not found",
        });
      }
      res.status(200).send(log);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving logs.",
    });
  }
};

exports.getLogs = (req, res) => {
  try {
    Log.findAll({
      include: [
        { model: logItem, as: "logItems" },
        { model: Package, as: "packages" },
      ],
    }).then((logs) => {
      res.status(200).send(logs);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving logs.",
    });
  }
};

exports.deleteLog = (req, res) => {
  const id = req.params.id;
  try {
    Log.destroy({
      where: { id: id },
    }).then(() => {
      res.status(200).send({
        status: "success",
        message: "Log deleted successfully",
      });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the log.",
    });
  }
};

exports.getLogById = (req, res) => {
  const id = req.params.id;
  try {
    Log.findOne({
      where: { id: id },
      include: [
        { model: logItem, as: "logItems" },
        { model: Package, as: "packages" },
      ],
    }).then((log) => {
      if (!log) {
        return res.status(404).send({
          message: "Log not found",
        });
      }
      res.status(200).send(log);
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving log.",
    });
  }
};

exports.updateSingleLog = (req, res) => {
  const id = req.params.id;
  const {
    UserID,
    InfluencerID,
    Campaign,
    Notes,
    Time_to_reply,
    Item,
    logItemId,
  } = req.body;

  console.log(Item[0]);
  try {
    Log.findOne({
      where: { id: id },
    }).then((log) => {
      if (!log) {
        return res.status(404).send({
          message: "Log not found",
        });
      }
      log
        .update({
          userID: UserID,
          influencerID: InfluencerID,
          campaign: Campaign,
          notes: Notes,
          time_to_reply: Time_to_reply,
        })
        .then(() => {
          logItem
            .findOne({
              where: { id: logItemId },
            })
            .then((item) => {
              console.log(item);
              if (!item) {
                return res.status(404).send({
                  message: "Log item not found",
                });
              }
              item
                .update({
                  platform: Item[0].Platform,
                  deliverable: Item[0].Deliverable,
                  quantity: Item[0].Quantity,
                  currency: Item[0].Currency,
                  rate: Item[0].Rate,
                })
                .then(() => {
                  res.status(200).send({
                    status: "success",
                    message: "Log updated successfully",
                  });
                });
            });
        });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving log.",
    });
  }
};

exports.updatePackageLog = (req, res) => {
  const id = req.params.id;

  const {
    UserID,
    InfluencerID,
    Campaign,
    Notes,
    Time_to_reply,
    Currency,
    Rate,
    package,
    packageIds,
  } = req.body;

  try{
    Log.findOne({
      where : { id : id }
    }).then(( logPackage ) => {
        if(!logPackage){
          return res.status(404).send({
            message: 'Log not Found'
          })
        }
        logPackage.update({
          userID: UserID,
          influencerID: InfluencerID,
          campaign: Campaign,
          notes: Notes,
          time_to_reply: Time_to_reply,
          currency: Currency,
          rate: Rate
        })
        .then(() => {
            for(let i = 0; i < packageIds.length; i++){
              Package.findOne({
                where: { id: packageIds[i] }
              }).then((packageItem) => {
                if(!packageItem){
                  return res.status(404).send({
                    message: 'Package Item not Found'
                  })
                }
                packageItem.update({
                  platform: package[i].Platform,
                  deliverable: package[i].Deliverable,
                  quantity: package[i].Quantity
                })
              })
            }
        
        })
    })
  }
  catch{
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving log.",
      });
  }
  
}
