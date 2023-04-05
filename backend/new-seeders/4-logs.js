'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('logs', [{"id":3,"userID":1,"influencerID":1,"campaign":"pepis","currency":"SAR","rate":"5000.00","datecreated":"2023-03-12 17:33:16","notes":"friendly","time_to_reply":"2 days","createdAt":"2023-03-12 17:33:16","updatedAt":"2023-03-12 17:33:16"},{"id":4,"userID":1,"influencerID":3,"campaign":"NIVEA","currency":"SAR","rate":"20000.00","datecreated":"2023-03-12 21:03:42","notes":"good chat","time_to_reply":"1 day","createdAt":"2023-03-12 21:03:42","updatedAt":"2023-03-12 21:03:42"},{"id":5,"userID":1,"influencerID":12,"campaign":"asas","currency":"SAR","rate":"52000.00","datecreated":"2023-03-20 13:38:19","notes":"dsdsd","time_to_reply":"sdsds","createdAt":"2023-03-20 13:38:19","updatedAt":"2023-03-20 13:38:19"},{"id":6,"userID":1,"influencerID":null,"campaign":"dsds","currency":"AED","rate":"2323.00","datecreated":"2023-03-22 12:39:15","notes":"qqwqw","time_to_reply":"qwqwqw","createdAt":"2023-03-22 12:39:15","updatedAt":"2023-03-22 12:39:15"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('logs', null, {});
  },
};