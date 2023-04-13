'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('timeform',  [{"id":1,"user_id":1,"Date":"2023-04-13 21:00:00","Agency":"Bridges","Client":"xcxcx","MainTaskType":"Create a budget sheet","ExtraNotes":"","TimeSpentInHours":"1","createdAt":"2023-04-13 10:38:55","updatedAt":"2023-04-13 10:38:55"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('timeform', null, {});
  },
};