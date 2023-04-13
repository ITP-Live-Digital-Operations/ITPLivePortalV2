'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('package', [{"id":5,"platform":"Instagram","deliverable":"Carousel posts","createdAt":"2023-03-12 17:33:16","updatedAt":"2023-03-12 17:33:16"},{"id":6,"platform":"Twitter","deliverable":"Twitter threads","createdAt":"2023-03-12 17:33:16","updatedAt":"2023-03-12 17:33:16"},{"id":7,"platform":"Snapchat","deliverable":"Snap stories","createdAt":"2023-03-12 21:03:42","updatedAt":"2023-03-12 21:03:42"},{"id":8,"platform":"Instagram","deliverable":"IGTV","createdAt":"2023-03-12 21:03:42","updatedAt":"2023-03-12 21:03:42"},{"id":9,"platform":"Facebook","deliverable":"Groups","createdAt":"2023-03-20 15:38:19","updatedAt":"2023-03-20 15:38:19"},{"id":10,"platform":"Youtube","deliverable":"Livestreams","createdAt":"2023-03-20 15:38:19","updatedAt":"2023-03-20 15:38:19"},{"id":11,"platform":"Facebook","deliverable":"Groups","createdAt":"2023-03-22 14:39:15","updatedAt":"2023-03-22 14:39:15"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('package', null, {});
  },
};