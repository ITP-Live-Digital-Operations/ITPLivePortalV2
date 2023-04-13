'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('task', [{"id":1,"assigned_by":15,"assigned_to":18,"brief_id":1,"created_at":"2023-03-16 15:02:11","status":"In Progress","weight":5,"createdAt":"2023-03-16 15:02:11","updatedAt":"2023-03-16 15:02:25"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('task', null, {});
  },
};