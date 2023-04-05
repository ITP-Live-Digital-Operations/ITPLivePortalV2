'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('logs', [
      {
        id: 3,
        userID: 1,
        influencerID: 1,
        campaign: 'pepis',
        currency: 'SAR',
        rate: '5000.00',
        datecreated: '2023-03-12 15:33:16',
        notes: 'friendly',
        time_to_reply: '2 days',
        createdAt: '2023-03-12 15:33:16',
        updatedAt: '2023-03-12 15:33:16'
      },
      {
        id: 4,
        userID: 1,
        influencerID: 3,
        campaign: 'NIVEA',
        currency: 'SAR',
        rate: '20000.00',
        datecreated: '2023-03-12 19:03:42',
        notes: 'good chat',
        time_to_reply: '1 day',
        createdAt: '2023-03-12 19:03:42',
        updatedAt: '2023-03-12 19:03:42'
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('logs', null, {});
    
  }
};
