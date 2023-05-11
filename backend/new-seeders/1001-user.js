'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{"id":1,"name":"Mohamad Hammoud","email":"mohamad.hammoud@itp.com","password":"U2FsdGVkX195dFro4MdQoV8wWAK6pNCL3RU01tBEOxs=","status":"Active","role":"superadmin","privilege_level":10,"parentId":null,"hash":"e33af144848642d3d45bbdd01ca94d426de1366a55b73e79d4293c59af311ac8","createdAt":"2023-03-10 17:34:30","updatedAt":"2023-03-17 18:51:55"},{"id":14,"name":"Ahmad Bashour","email":"ahmad.bashour@itp.com","password":"U2FsdGVkX1/YzQakh9RcGFVFKoQz0lmR/sK/mZqupnE=","status":"Active","role":"admin","privilege_level":9,"parentId":1,"hash":"7ccda24c3923c4023cc2c547626379db28842ac776d9545fb9c2ddf2761c0ae4","createdAt":"2023-03-14 15:37:00","updatedAt":"2023-04-13 12:41:12"},{"id":15,"name":"Rachelle Maksoud","email":"talentHead@itp.com","password":"U2FsdGVkX1/av/kn8AIJGLiyg6gxiGiXZKF0OYLpJ7c=","status":"Active","role":"talent","privilege_level":8,"parentId":14,"hash":"08ae9bfe7318cf58a10b4e27ef23766870763a3421d4731fd4b158829c59e30b","createdAt":"2023-03-14 15:39:55","updatedAt":"2023-03-14 15:39:55"},{"id":16,"name":"Sales Head","email":"salesHead@itp.com","password":"U2FsdGVkX19eRtt2hbpgAPb4ihuuSiiPxwpIB2pjIo0=","status":"Active","role":"sales","privilege_level":8,"parentId":14,"hash":"8c06734b9922b3ac02435545264c8ac40e2771aa1ab1514a236cbde9d617c270","createdAt":"2023-03-14 15:40:34","updatedAt":"2023-03-14 15:40:34"},{"id":18,"name":"Remy Farah","email":"remy.farah@itp.com","password":"U2FsdGVkX198yqFBaOAn1wzs/J8hhaCCy0OUrwcTbD0=","status":"Active","role":"talent","privilege_level":6,"parentId":15,"hash":"9161130bed49aa2c4284eaa52875ba1831221eb1c1acf758f6709d825ed1fb45","createdAt":"2023-03-14 15:42:16","updatedAt":"2023-03-14 15:42:16"},{"id":19,"name":"Safwan Nawfal","email":"safwan.nawfal@itp.com","password":"U2FsdGVkX1+bmEXuVIwOxFh69WSNAHEz34ivCuZDCjI=","status":"Active","role":"superadmin","privilege_level":10,"parentId":1,"hash":"4de97d80af532f7789b6f6293517f5036452a985a3b606eff978bb7e6b94b6b8","createdAt":"2023-04-04 17:13:31","updatedAt":"2023-04-04 17:13:31"},{"id":20,"name":"Perla Maria Daoud","email":"pmd@itp.com","password":"U2FsdGVkX1/2zA0GoO4zBtR4Cgn9TwefaxBKBCBHVfg=","status":"Active","role":"talent","privilege_level":8,"parentId":1,"hash":"d68d932204a2e2cc11e595e46994698594908a0a8a44fa852f12dfca6b77f667","createdAt":"2023-04-06 13:53:18","updatedAt":"2023-04-06 13:53:18"},{"id":21,"name":"Rutuja Manjrekar","email":"rutuja.manjrekar@itp.com","password":"U2FsdGVkX18zb0Q9ip+qCmnnsCy+fOCdsXg9nVKip0g=","status":"Active","role":"talent","privilege_level":5,"parentId":15,"hash":"0bdc4b86ce8e4b51e4bbb292678e0600d2f4cca689f5a08bcebfed59ffd5cc77","createdAt":"2023-05-05 10:23:31","updatedAt":"2023-05-05 10:23:31"},{"id":22,"name":"Rand Alfatlawi","email":"rand.alfatlawi@itp.com","password":"U2FsdGVkX199VNCVPJ/V41eCVP2dJffAbdw8/o4OM4E=","status":"Active","role":"talent","privilege_level":5,"parentId":15,"hash":"657051411884f67d304be7ca8ad2cc2df20593e4f54535b265ba30cc569dc42e","createdAt":"2023-05-05 10:24:16","updatedAt":"2023-05-05 10:24:16"},{"id":23,"name":"Zineb Khaoudi","email":"zineb.khaoudi@itp.com","password":"U2FsdGVkX1/cm0jjuc2603UmDlmTP/LksBKGnA8iwYE=","status":"Active","role":"talent","privilege_level":5,"parentId":15,"hash":"368bc83c87a02cb9ab788043e1e3c8b6054e8b708189cd1bb38e63c50fd6db0a","createdAt":"2023-05-05 10:25:14","updatedAt":"2023-05-05 10:25:14"},{"id":24,"name":"Briksam Elbaroudy","email":"briksam.elbaroudy@itp.com","password":"U2FsdGVkX18hk2pc0Ujlphjjrezruk3CZBH9+r+MU0k=","status":"Active","role":"talent","privilege_level":5,"parentId":15,"hash":"be96f2845996d49c0a1ab5f6c371d17fe0ca37e2e5ef70fa8d5d96d767a9f266","createdAt":"2023-05-05 10:26:17","updatedAt":"2023-05-05 10:26:17"},{"id":25,"name":"Ruqayyah Alsubhi","email":"ruqayyah.alsubhi@os.itp.com","password":"U2FsdGVkX1/l36tnWo07qqC6BQ0rDBI5hC2sf+0RCSA=","status":"Active","role":"talent","privilege_level":5,"parentId":15,"hash":"64d18b5e3cda4b8e11c979cff5e0a73b1b760524ce24f883f40c5cd237456e4c","createdAt":"2023-05-05 10:26:54","updatedAt":"2023-05-05 10:26:54"},{"id":26,"name":"Mohammad Elgohary","email":"mohammad.elgohary@itp.com","password":"U2FsdGVkX1/3IjegknmV/e8pULrqd8dLDrcihesks5o=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"9e100c286a31aee5475408b127580200c29ee2bf53b3ff4db54fec3322af0129","createdAt":"2023-05-05 10:29:04","updatedAt":"2023-05-05 10:29:04"},{"id":27,"name":"Nourhan Dahie","email":"nourhan.dahie@itp.com","password":"U2FsdGVkX1+ChuM57DZrpGT6mkwTt/AI5cTnkdkZr/M=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"98fbe4fd753b65d56042fca7daa5c1fea70132e3624f43c9753374129a740564","createdAt":"2023-05-05 10:30:08","updatedAt":"2023-05-05 10:30:08"},{"id":28,"name":"Jaques Elias Jurdak","email":"jaques.jurdak@itp.com","password":"U2FsdGVkX1+PJ6Y6POCH+ur5G/yH5CyrAaa8patgI/k=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"6e185d49c9b786e559be0b7fff919b68ce1ded20ee449fcea24f872e1505b561","createdAt":"2023-05-05 10:30:46","updatedAt":"2023-05-05 10:30:46"},{"id":29,"name":"Kerem Akarlar","email":"kerem.akarlar@itp.com","password":"U2FsdGVkX18L4Qi7zlm4142hrpWtSnU6J8JtxCDhH/U=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"50f3ac96ed5603734f3b071ef8a7fb1a64a0b90d554fd6d260a0d65d165fb71f","createdAt":"2023-05-05 10:31:58","updatedAt":"2023-05-05 10:31:58"},{"id":30,"name":"Jill D'Silva","email":"jill.dsilva@itp.com","password":"U2FsdGVkX192YdYpXGUouE7K/dtPkjj4AUAb2MwPSQs=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"c819af9338d4360eb18460da92563ec31bdbe7ec02d0102495647a412165e240","createdAt":"2023-05-05 10:32:28","updatedAt":"2023-05-05 10:32:28"},{"id":31,"name":"Fouad El Chaar","email":"fouad.elchaar@itp.com","password":"U2FsdGVkX1+Kq3z6ATZf/TeoljwcKm3O6R1xeXvjQTc=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"9f5437de8b80af37fb985600ba01d21cd4e52ee7e8fac0d7c6127df300c8eb70","createdAt":"2023-05-05 10:33:07","updatedAt":"2023-05-05 10:33:07"},{"id":32,"name":"Monika Vasiliauskaite","email":"monika.vasiliauskaite@itp.com","password":"U2FsdGVkX190vnkW1aWf+cjUcWyt93dkR3b0NPuAstk=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"bbb71f7d07aa4a38d12e81bf64e700e81ef856a8c41d65bc467feae05ba24ccf","createdAt":"2023-05-05 10:33:47","updatedAt":"2023-05-05 10:33:47"},{"id":33,"name":"Max Juby","email":"max.juby@itp.com","password":"U2FsdGVkX19EXYLbWbFWuIWrQyqIeZv9iB/P7NidPV4=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"be673af2f9910fd88feb730db67da14ee1af4f0bcc71da2ee8f88f216ff158a2","createdAt":"2023-05-05 10:34:38","updatedAt":"2023-05-05 10:34:38"},{"id":34,"name":"Megan Kemp","email":"megan.kemp@itp.com","password":"U2FsdGVkX18RH9OorcNX5l0Q2i1R74PJfDI4g+h0WEI=","status":"Active","role":"sales","privilege_level":5,"parentId":16,"hash":"72727b28fff1a681e2571f7cb97068f12514e09a09c47ff3cb4af2abb096933f","createdAt":"2023-05-05 10:35:30","updatedAt":"2023-05-05 10:35:30"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};