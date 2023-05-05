'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('file', [{"id":1,"filename":"1683281457522-Performance Marketing - Feb - 2023 - EOM Report.xlsx","originalname":"Performance Marketing - Feb - 2023 - EOM Report.xlsx","mimetype":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","brief_id":1,"uploaded_by":18,"fileType":"sheet","createdAt":"2023-05-05 10:10:57","updatedAt":"2023-05-05 10:10:57"},{"id":2,"filename":"1683281470961-ITP LI.pptx","originalname":"ITP LI.pptx","mimetype":"application/vnd.openxmlformats-officedocument.presentationml.presentation","brief_id":1,"uploaded_by":18,"fileType":"presentation","createdAt":"2023-05-05 10:11:10","updatedAt":"2023-05-05 10:11:10"},{"id":3,"filename":"1683281632038-EA - Ramadan 2023 - V2.xlsx","originalname":"EA - Ramadan 2023 - V2.xlsx","mimetype":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","brief_id":1,"uploaded_by":18,"fileType":"sheet","createdAt":"2023-05-05 10:13:52","updatedAt":"2023-05-05 10:13:52"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('file', null, {});
  },
};