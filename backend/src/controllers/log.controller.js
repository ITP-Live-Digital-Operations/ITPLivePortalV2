const models = require('../../models');
const Log = models.Logs;
const Package = models.Package;
const Log_package = models.Log_package;
const User = models.User;
const Influencer = models.Influencer;
const db = require('../../models');
const { QueryTypes } = require('sequelize');


exports.create = (req, res) => {
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

}

exports.getLogs = (req, res) => {
  db.sequelize.query(`
  SELECT DATE_FORMAT(DATE(logs.datecreated), '%d-%m-%Y') AS Date, 
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



  /* Log.findAll({
    attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('logs.datecreated'), '%d-%m-%Y'), 'Date'],
        ['users.name', 'Contact'],
        ['influencer.Name', 'Influencer'],
        ['logs.campaign', 'Campaign'],
        ['package.platform', 'Platform'],
        ['package.deliverable', 'Deliverable'],
        ['logs.currency', 'Currency'],
        ['logs.rate', 'Rate'],
        ['logs.notes', 'Notes'],
        ['logs.time_to_reply', 'Time_to_reply'],
    ],
    include: [
        { model: User, attributes: [] },
        { model: Influencer, attributes: [] },
        { model: Log_package, include: [{ model: Package, attributes: [] }] },
    ],
        
      }).then(logs => {
        console.log(logs)
        res.status(200).send(logs);
      }); */
}

exports.getInfluencerLogs = (req, res) => {
  const id = req.params.id;
  db.sequelize.query(`
  SELECT  DATE_FORMAT(DATE(logs.datecreated), '%d-%m-%Y') AS Date,
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


  
  /*   Log.findAll({
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('logs.datecreated'), '%d-%m-%Y'), 'Date'],
          [sequelize.col('users.name'), 'Contact'],
          [sequelize.col('influencer.Name'), 'Influencer'],
          [sequelize.col('logs.campaign'), 'Campaign'],
          [sequelize.col('package.platform'), 'Platform'],
          [sequelize.col('package.deliverable'), 'Deliverable'],
          [sequelize.col('logs.currency'), 'Currency'],
          [sequelize.col('logs.rate'), 'Rate'],
          [sequelize.col('logs.notes'), 'Notes'],
          [sequelize.col('logs.time_to_reply'), 'Time_to_reply']
        ],
        include: [
          {
            model: User,
            attributes: [],
            where: { id: sequelize.col('logs.userID') }
          },
          {
            model: Influencer,
            attributes: [],
            where: { ID: sequelize.col('logs.influencerID') }
          },
          {
            model: Log_package,
            attributes: [],
            where: { logID: sequelize.col('logs.id') },
            include: [{ model: Package, attributes: [] }]
          }
        ],
        where: { influencerID: req.params.id }
      }).then(logs => {
        res.status(200).send(logs);
        });
         */
}