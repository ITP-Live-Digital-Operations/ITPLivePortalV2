'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('log_packages', [{"id":5,"logID":3,"packageID":5,"createdAt":"2023-03-12 15:33:16","updatedAt":"2023-03-12 15:33:16"},{"id":6,"logID":3,"packageID":6,"createdAt":"2023-03-12 15:33:16","updatedAt":"2023-03-12 15:33:16"},{"id":7,"logID":4,"packageID":7,"createdAt":"2023-03-12 19:03:42","updatedAt":"2023-03-12 19:03:42"},{"id":8,"logID":4,"packageID":8,"createdAt":"2023-03-12 19:03:42","updatedAt":"2023-03-12 19:03:42"},{"id":9,"logID":5,"packageID":9,"createdAt":"2023-03-20 13:38:19","updatedAt":"2023-03-20 13:38:19"},{"id":10,"logID":5,"packageID":10,"createdAt":"2023-03-20 13:38:19","updatedAt":"2023-03-20 13:38:19"},{"id":11,"logID":6,"packageID":11,"createdAt":"2023-03-22 12:39:15","updatedAt":"2023-03-22 12:39:15"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('log_packages', null, {});
  },
};