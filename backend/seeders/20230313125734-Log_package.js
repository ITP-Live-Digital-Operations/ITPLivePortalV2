'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('log_packages', [
      { id: 5, logID: 3, packageID: 5, createdAt: new Date('2023-03-12 15:33:16'), updatedAt: new Date('2023-03-12 15:33:16') },
      { id: 6, logID: 3, packageID: 6, createdAt: new Date('2023-03-12 15:33:16'), updatedAt: new Date('2023-03-12 15:33:16') },
      { id: 7, logID: 4, packageID: 7, createdAt: new Date('2023-03-12 19:03:42'), updatedAt: new Date('2023-03-12 19:03:42') },
      { id: 8, logID: 4, packageID: 8, createdAt: new Date('2023-03-12 19:03:42'), updatedAt: new Date('2023-03-12 19:03:42') },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('log_packages', null, {});
     
  }
};
