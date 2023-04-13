const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/config.json').development;
const moment = require('moment');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);


const modelsDir = path.join(__dirname, '../models');


modelFiles = ['user.js', 'influencer.js', 'celebrity.js', 'logs.js', 'package.js', 'log_package.js', 'salesbrief.js', 'task.js', 'influencerrating.js', 'timeform.js']


async function exportData() {

 




  const seedDir = path.join(__dirname, '..', 'new-seeders');
 
  let counter = 1000; 
  for (const file of modelFiles) {
    
    counter++;
    const modelFn = require(path.join(modelsDir, file));
    
    const model = modelFn(sequelize, Sequelize.DataTypes);

    const records = await model.findAll();
    const seeds = records.map(record => 
      { 
        const jsonRecord = record.toJSON();
        for (const key in jsonRecord) {
          if (jsonRecord[key] instanceof Date) {
            jsonRecord[key] = moment(jsonRecord[key]).format('YYYY-MM-DD HH:mm:ss');
          }
        }
        return jsonRecord;
      });
    const fileName = `${counter}-${model.name.toLowerCase()}.js`;
    const filePath = path.join(seedDir, fileName);
    
    const fileContent = `'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('${model.getTableName()}', ${JSON.stringify(seeds)}, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('${model.getTableName()}', null, {});
  },
};`;
    
    fs.writeFileSync(filePath, fileContent, 'utf8');
  }
  
}


exportData()
    .then(() => {
        console.log('Exported successfully');
        process.exit(0);


    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    }
    );


