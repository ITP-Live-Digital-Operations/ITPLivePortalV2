'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Mohamad Hammoud',
        email: 'mohamad.hammoud@itp.com',
        password: 'U2FsdGVkX188TjiXiUZ4wQt2nG41BvdPt+0WPIPxG9E=',
        status: 'active',
        role: 'superadmin',
        privilege_level: 10,
        parentId: null,
        hash: 'e33af144848642d3d45bbdd01ca94d426de1366a55b73e79d4293c59af311ac8',
        createdAt: '2023-03-10 11:34:30',
        updatedAt: '2023-03-10 11:34:30'
      },
      {
        id: 14,
        name: 'Ahmad Bashour',
        email: 'ahmad.bashour@itp.com',
        password: 'U2FsdGVkX18J/vDAIp4QtyGWjopkCiUYe2ZpA/GEjdI=',
        status: 'Active',
        role: 'admin',
        privilege_level: 9,
        parentId: 1,
        hash: '7ccda24c3923c4023cc2c547626379db28842ac776d9545fb9c2ddf2761c0ae4',
        createdAt: '2023-03-14 09:37:00',
        updatedAt: '2023-03-14 09:37:00'
      },
      {
        id: 15,
        name: 'Talent Head',
        email: 'talentHead@itp.com',
        password: 'U2FsdGVkX1/av/kn8AIJGLiyg6gxiGiXZKF0OYLpJ7c=',
        status: 'Active',
        role: 'talent',
        privilege_level: 8,
        parentId: 14,
        hash: '08ae9bfe7318cf58a10b4e27ef23766870763a3421d4731fd4b158829c59e30b',
        createdAt: '2023-03-14 09:39:55',
        updatedAt: '2023-03-14 09:39:55'
      },
      {
        id: 16,
        name: 'Sales Head',
        email: 'salesHead@itp.com',
        password: 'U2FsdGVkX19eRtt2hbpgAPb4ihuuSiiPxwpIB2pjIo0=',
        status: 'Active',
        role: 'sales',
        privilege_level: 8,
        parentId: 14,
        hash: '8c06734b9922b3ac02435545264c8ac40e2771aa1ab1514a236cbde9d617c270',
        createdAt: '2023-03-14 09:40:34',
        updatedAt: '2023-03-14 09:40:34'
      },
      {
        id: 17,
        name: 'Lara Nasser Eddine',
        email: 'lara.nassereddine@itp.com',
        password: 'U2FsdGVkX19ENiyf4DbAXwRepB6Sz0vb4qUK6YI5iHM=',
        status: 'Active',
        role: 'talent',
        privilege_level: 6,
        parentId: 15,
        hash: '166c12d23440a3730a21f327a9371bf212a60fef08acdfa55f4db84b7784466a',
        createdAt: '2023-03-14 09:41:31',
        updatedAt: '2023-03-14 09:41:31'
      },
      {
        id: 18,
        name: 'Remy Farah',
        email: 'remy.farah@itp.com',
        password: 'U2FsdGVkX198yqFBaOAn1wzs/J8hhaCCy0OUrwcTbD0=',
        status: 'Active',
        role: 'talent',
        privilege_level: 6,
        parentId: 15,
        hash: '9161130bed49aa2c4284eaa52875ba1831221eb1c1acf758f6709d825ed1fb45',
        createdAt: '2023-03-14 09:42:16',
        updatedAt: '2023-03-14 09:42:16'

      }


    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
