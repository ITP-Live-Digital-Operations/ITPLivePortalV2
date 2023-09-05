const models = require('../../models');
const Log = models.Logs;
const Package = models.Package;
const logItem = models.logItem;
const User = models.User;
const Influencer = models.Influencer;
const db = require('../../models');
const { QueryTypes } = require('sequelize');



/* exports.create = (req, res) => {
  let logID;
  let packageID;

  const { UserID, InfluencerID, Campaign, Currency, Rate, Notes, Time_to_reply, length, fields } = req.body

  Log.create({
    userID: UserID,
    influencerID: InfluencerID,
    campaign: Campaign,
    currency: Currency,
    rate: Rate,
    notes: Notes,
    time_to_reply: Time_to_reply
  }).then(log => {

    logID = log.id
    for (let i = 0; i < length; i++) {
      Package.create({
        platform: fields[i].Platform,
        deliverable: fields[i].Deliverable
      }).then(package => {
        
        packageID = package.id
        Log_package.create({
          logID: logID,
          packageID: packageID
        }).then(log_package => {
          res.status(201).send({
            status: "success",

          })
        })
      })

    }
  })

} */

exports.create = (req, res) => {
  try{
    const { UserID, InfluencerID, Campaign, type, Time_to_reply, Notes, Currency, Rate, rateLogItems, packageItems } = req.body
    
    Log.create({
      userID: UserID,
      influencerID: InfluencerID,
      campaign: Campaign,
      type: type,
      time_to_reply: Time_to_reply,
      notes: Notes,
      currency: Currency,
      rate: Rate
    }).then(log => {
      const logID = log.id

      if (type === 'single' && rateLogItems.length > 0) {
        logItem.bulkCreate(rateLogItems.map(item => {
          return { 
          platform :item.Platform,
          deliverable : item.Deliverable,
          quantity : item.Quantity,
          currency : item.Currency,
          rate : item.Rate,
          logID : logID,
         } })).then(() => {
          res.status(201).send({
            status: "success",
          })
        })
      }
      else if (type === 'package' && packageItems.length > 0) {
        Package.bulkCreate(packageItems.map(item => { 
          return {platform :item.Platform,
          deliverable : item.Deliverable,
          quantity : item.Quantity,
          logID : logID,
          }
         })).then(() => {
          res.status(201).send({
            status: "success",
          })
        })
      }
      res.status(201).send({
        status: "success",
        message: "Logs created successfully"
    })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Logs."
    });
  }
}

exports.getInfluencerLogs = (req, res) => {
  const id = req.params.id;
  try{
  Log.findOne({
    where : {id: id},
    include: [ { model: logItem, as: 'logItems' }, { model: Package, as: 'packages' } ]
  }).then(log => {
    if(!log){
      return res.status(404).send({
        message: "Log not found"
      })
    }
    res.status(200).send(log)
  })
} catch (err) {
  res.status(500).send({
      message:
          err.message || "Some error occurred while retrieving logs."
  });
}
}

exports.getLogs = (req, res) => {
  try{
  Log.findAll({
    include: [ { model: logItem, as: 'logItems' }, { model: Package, as: 'packages' } ]
  }).then(logs => {
    res.status(200).send(logs)
  })
} catch (err) {
  res.status(500).send({
      message:
          err.message || "Some error occurred while retrieving logs."
  });
}
}

exports.deleteLog = (req, res) => {
  const id = req.params.id;
  try{
  Log.destroy({
    where: {id: id}
  }).then(() => {
    res.status(200).send({
      status: "success",
      message: "Log deleted successfully"
    })
  })
} catch (err) {
  res.status(500).send({
      message:
          err.message || "Some error occurred while deleting the log."
  });
}
}



/* exports.getLogs = (req, res) => {
  db.sequelize.query(`
  SELECT logs.id, DATE_FORMAT(DATE(logs.datecreated), '%d-%m-%Y') AS Date, 
  users.name AS Contact, 
  influencer.Name AS Influencer,
  logs.campaign AS Campaign, 
  package.platform AS Platform, 
  package.deliverable AS Deliverable, 
  logs.currency as Currency, 
  logs.rate AS Rate, 
  logs.notes AS Notes, 
  logs.time_to_reply AS Time_to_reply
  FROM logs
  INNER JOIN users ON logs.userID = users.id
  INNER JOIN influencer ON logs.influencerID = influencer.id
  JOIN log_packages ON logs.id = log_packages.logID
  JOIN package ON log_packages.packageID = package.id
`,
    {
      type: QueryTypes.SELECT,
      raw: true,
    }
  ).then(results => {
 
      res.status(200).send(results);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving logs."
    });
  })
} */

/* exports.getInfluencerLogs = (req, res) => {
  const id = req.params.id;
  db.sequelize.query(`
  SELECT logs.id, DATE_FORMAT(DATE(logs.datecreated), '%d-%m-%Y') AS Date,
  users.name AS Contact, 
  influencer.Name AS Influencer,
  logs.campaign AS Campaign, 
  package.platform AS Platform, 
  package.deliverable AS Deliverable, 
  logs.currency as Currency, 
  logs.rate AS Rate, 
  logs.notes AS Notes, 
  logs.time_to_reply AS Time_to_reply
  FROM logs
  INNER JOIN users ON logs.userID = users.id
  INNER JOIN influencer ON logs.influencerID = influencer.id
  INNER JOIN log_packages ON logs.id = log_packages.logID
  INNER JOIN package ON log_packages.packageID = package.id
  Where influencer.id = ${id}
`,
    {
      type: QueryTypes.SELECT,
      raw: true,
    }
  ).then(results => {
       
      res.status(200).send(results);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving logs."
    });
  })
} */

/* exports.deleteLog = (req, res) => {
  const id = req.params.id;

  Log.sequelize.transaction((t) => {

    // First, find all related log_packages
    return Log_package.findAll({ where: { logID: id } }, { transaction: t })
        .then(log_packages => {

            // Then delete all related packages
            const packageDeletes = log_packages.map(log_package => {
                return Package.destroy({ where: { id: log_package.packageID } }, { transaction: t });
            });

            // Wait for all packages to be deleted
            return Promise.all(packageDeletes)
                .then(() => {
                    // Now, we can delete all related log_packages
                    const logPackageDeletes = log_packages.map(log_package => {
                        return Log_package.destroy({ where: { id: log_package.id } }, { transaction: t });
                    });

                    // Wait for all log_packages to be deleted
                    return Promise.all(logPackageDeletes);
                });
        })
        .then(() => {
            // Now, we can delete the log
            return Log.destroy({ where: { id: id } }, { transaction: t });
        });
})
.then(() => {
    // If the execution reaches this line, no errors were thrown.
    // We can commit the transaction.
    res.status(200).send({ status: "success" });
})
.catch((error) => {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    console.error(error);
    res.status(500).send({ status: "failure", error: error });
});

} */