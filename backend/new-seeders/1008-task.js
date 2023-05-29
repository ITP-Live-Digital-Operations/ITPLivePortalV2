'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('task', [{"id":1,"assigned_by":15,"assigned_to":18,"brief_id":1,"deadline":"2023-05-20 17:02:11","created_at":"2023-03-16 17:02:11","status":"Deactivated","weight":5,"createdAt":"2023-03-16 17:02:11","updatedAt":"2023-05-23 05:50:43"},{"id":2,"assigned_by":15,"assigned_to":18,"brief_id":2,"deadline":"2023-05-31 21:00:00","created_at":"2023-05-23 06:03:08","status":"Not Started","weight":3,"createdAt":"2023-05-23 06:03:08","updatedAt":"2023-05-23 06:03:08"},{"id":3,"assigned_by":15,"assigned_to":18,"brief_id":3,"deadline":"2023-05-30 21:00:00","created_at":"2023-05-23 07:14:02","status":"Deactivated","weight":4,"createdAt":"2023-05-23 07:14:02","updatedAt":"2023-05-23 07:22:55"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('task', null, {});
  },
};