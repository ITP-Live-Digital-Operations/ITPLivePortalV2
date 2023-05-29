'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('influencerRating', [{"id":1,"influencer_id":2,"responseRate":4,"contentQuality":2,"creativity":5,"flexibility":3,"campaignPerformance":5,"notes":"Easy to work with","createdBy_id":14,"createdAt":"2023-04-10 16:26:55","updatedAt":"2023-04-10 16:26:55"},{"id":2,"influencer_id":2,"responseRate":5,"contentQuality":3,"creativity":4,"flexibility":5,"campaignPerformance":4,"notes":"","createdBy_id":18,"createdAt":"2023-05-23 07:21:50","updatedAt":"2023-05-23 07:21:50"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('influencerRating', null, {});
  },
};