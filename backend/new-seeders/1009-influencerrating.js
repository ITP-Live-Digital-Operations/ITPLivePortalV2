'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('influencerRating', [{"id":1,"influencer_id":2,"responseRate":4,"contentQuality":2,"creativity":5,"flexibility":3,"campaignPerformance":5,"notes":"Easy to work with","createdBy_id":14,"createdAt":"2023-04-10 16:26:55","updatedAt":"2023-04-10 16:26:55"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('influencerRating', null, {});
  },
};