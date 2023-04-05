'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('salesbrief', [{"id":1,"Agency":"itp live ","Client":"hp","ClientIndustry":"Tech","CampaignName":"Hp Ram ","CampaignOverview":"1 month ","CampaignObjective":"Awareness","CampaignObjectiveDetails":"`awareness","NumberofRecommendations":10,"Currency":"AED","Budget":"200000.00","CreatedbyID":16,"ViewedByTalent":true,"Ready":false,"createdAt":"2023-03-16 12:59:58","updatedAt":"2023-03-16 13:00:11"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('salesbrief', null, {});
  },
};