'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('package', [
      {
        id: 5,
        platform: 'Instagram',
        deliverable: 'Carousel posts',
        createdAt: new Date('2023-03-12 15:33:16'),
        updatedAt: new Date('2023-03-12 15:33:16')
      },
      {
        id: 6,
        platform: 'Twitter',
        deliverable: 'Twitter threads',
        createdAt: new Date('2023-03-12 15:33:16'),
        updatedAt: new Date('2023-03-12 15:33:16')
      },
      {
        id: 7,
        platform: 'Snapchat',
        deliverable: 'Snap stories',
        createdAt: new Date('2023-03-12 19:03:42'),
        updatedAt: new Date('2023-03-12 19:03:42')
      },
      {
        id: 8,
        platform: 'Instagram',
        deliverable: 'IGTV',
        createdAt: new Date('2023-03-12 19:03:42'),
        updatedAt: new Date('2023-03-12 19:03:42')
      }

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('package', null, {});
     
  }
};
