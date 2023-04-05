const { sequelize } = require('../models/index')
const app = require('./app');
const { logger } = require('./utils/logger');
const db = require('../models/index')
const path = require('path');
const fs = require('fs');
const express = require('express');




const PORT = process.env.PORT ||  3000;

console.log(`Port = ${PORT} `)
const angularAppPath = path.join(__dirname, '../../frontend/dist/frontend');
app.use(express.static(angularAppPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/frontend/index.html'));
  });



app.listen( {port: PORT}, async () => {
try{
    logger.info(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log('Backend started up');
    await db.sequelize.sync({ force: true });
    const seedersPath = path.join(__dirname, '../new-seeders');
    const seederFiles = await fs.promises.readdir(seedersPath);

    for ( const file of seederFiles ) {
        if (file.endsWith('.js')){
            const seeder = require(path.join(seedersPath, file));
            await seeder.up(db.sequelize.getQueryInterface(), db.Sequelize);
            console.log(`Seeder ${file} ran successfully`);
        }
    }
    console.log('All seeders ran successfully');
    await sequelize.authenticate();
    logger.info('Database Connected');
      }catch(err){
                console.log(`Error occured: ${err.message}`);
}

});
