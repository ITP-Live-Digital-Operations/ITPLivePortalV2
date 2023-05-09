'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('salesbrief', [{"id":1,"Agency":"itp live ","Client":"hp","ClientIndustry":"Tech","CampaignName":"Hp Ram ","CampaignOverview":"1 month ","CampaignObjective":"Awareness","CampaignObjectiveDetails":"`awareness","NumberofRecommendations":10,"Currency":"AED","Budget":"200000.00","CampaignStartDate":null,"CampaignEndDate":null,"CampaignMessagePhaseOne":null,"CampaignMessagePhaseTwo":null,"CampaignMessagePhaseThree":null,"ContentDeliverables":null,"BrandExclusivityDurationinDays":null,"VideoProduction":false,"VideoEditing":false,"InfluencerAgeRange":null,"InfluencerLocation":null,"InfluencerNationality":null,"InfluencerGender":null,"SimilarProfileLink":null,"InfluencerInterest":null,"InfluencerNumberOfFollowers":null,"NoteForNumberOfFollowers":null,"AudienceLocation":null,"AudienceNationality":null,"AudienceGender":null,"AudienceInterest":null,"ConfirmedInfluencerHandles":null,"PreviousBrandAmbassadorsName":null,"BudgetSheetId" : null, "PresentationId" : null,"assigned" : 1, "Status" : "Active" ,"CreatedbyID":16,"ViewedByTalent":true,"Ready":false,"createdAt":"2023-03-16 16:59:58","updatedAt":"2023-03-16 17:00:11"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('salesbrief', null, {});
  },
};