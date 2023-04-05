'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('influencer', [{"id":1,"Name":"Johnny dam","Gender":"Male","Number":1234567890,"Email":"johndoe@email.com","MainContentLanguage":"English","SubContentLang":"Spanish","MainVertical":"Fashion","SubVertical":"Beauty","Occupation":"Influencer","ItpRelationship":"Represented","Nationality":"American","SecondNationality":"Mexican","CountryLocation":"United States","CityLocation":"New York","Address":"123 Main Street","InstagramHandle":"johndoe","InstagramFollowers":100000,"InstagramLink":"https://www.instagram.com/johndoe","TiktokHandle":"johndoetiktok","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/johndoetiktok","SnapchatHandle":"johndoesnap","SnapchatFollowers":25000,"SnapchatLink":"https://www.snapchat.com/add/johndoesnap","TwitterHandle":"johndoetwitter","TwitterFollowers":75000,"TwitterLink":"https://twitter.com/johndoetwitter","FacebookHandle":"johndoefacebook","FacebookFollowers":50000,"FacebookLink":"https://www.facebook.com/johndoefacebook","YoutubeHandle":"johndoeyoutube","YoutubeFollowers":100000,"YoutubeLink":"https://www.youtube.com/johndoeyoutube","AudienceMalePer":"40.00","AudienceFemalePer":"60.00","AgeGroup1317":"10.00","AgeGroup1824":"20.00","AgeGroup2534":"30.00","AgeGroup3544":"20.00","AgeGroup4554":"10.00","AgeGroup55":"10.00","AudienceTopCountries1":"United States","AudienceTopCountries1Percentage":"30.00","AudienceTopCountries2":"United Kingdom","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"Canada","AudienceTopCountries3Percentage":"10.00","KSALicense":true,"UAELicense":true,"AgencyContactPerson":"Jane Doe","AgencyNumber":2147483647,"AgencyEmail":"janedoe@email.com","PreviousBrands":"Nike, Adidas, Puma","Bio":"John Doe is a fashion and beauty influencer based in New York.","Notes":"Likes to collaborate with sustainable and ethical brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 16:29:57"},{"id":3,"Name":"Jane Doe","Gender":"Female","Number":123456789,"Email":"jane.doe@example.com","MainContentLanguage":"English","SubContentLang":"French","MainVertical":"Fashion","SubVertical":"Beauty","Occupation":"Model","ItpRelationship":"Collaboration","Nationality":"American","SecondNationality":"Canadian","CountryLocation":"United States","CityLocation":"New York","Address":"123 Main St","InstagramHandle":"@janedoe","InstagramFollowers":100000,"InstagramLink":"https://www.instagram.com/janedoe","TiktokHandle":"@janedoe","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/@janedoe","SnapchatHandle":"janedoe","SnapchatFollowers":20000,"SnapchatLink":"https://www.snapchat.com/add/janedoe","TwitterHandle":"@janedoe","TwitterFollowers":80000,"TwitterLink":"https://twitter.com/janedoe","FacebookHandle":"Jane Doe","FacebookFollowers":70000,"FacebookLink":"https://www.facebook.com/janedoe","YoutubeHandle":"UCjanedoe","YoutubeFollowers":60000,"YoutubeLink":"https://www.youtube.com/channel/UCjanedoe","AudienceMalePer":"40.00","AudienceFemalePer":"60.00","AgeGroup1317":"10.00","AgeGroup1824":"20.00","AgeGroup2534":"30.00","AgeGroup3544":"25.00","AgeGroup4554":"15.00","AgeGroup55":"10.00","AudienceTopCountries1":"United States","AudienceTopCountries1Percentage":"30.00","AudienceTopCountries2":"Canada","AudienceTopCountries2Percentage":"25.00","AudienceTopCountries3":"United Kingdom","AudienceTopCountries3Percentage":"20.00","KSALicense":true,"UAELicense":false,"AgencyContactPerson":"John Smith","AgencyNumber":987654321,"AgencyEmail":"john.smith@example.com","PreviousBrands":"Brand 1 Brand 2 Brand 3","Bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Notes":"This is a note about Jane Doe","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":4,"Name":"John Smith","Gender":"Male","Number":9876543210,"Email":"johnsmith@example.com","MainContentLanguage":"English","SubContentLang":"Spanish","MainVertical":"Technology","SubVertical":"Gaming","Occupation":"Content Creator","ItpRelationship":"Endorsement","Nationality":"British","SecondNationality":"Spanish","CountryLocation":"United Kingdom","CityLocation":"London","Address":"456 Main Rd, London, UK 10000","InstagramHandle":"johnsmith","InstagramFollowers":50000,"InstagramLink":"https://www.instagram.com/johnsmith","TiktokHandle":"johnsmith","TiktokFollowers":30000,"TiktokLink":"https://www.tiktok.com/@johnsmith","SnapchatHandle":"johnsmith","SnapchatFollowers":5000,"SnapchatLink":"https://www.snapchat.com/add/johnsmith","TwitterHandle":"johnsmith","TwitterFollowers":10000,"TwitterLink":"https://twitter.com/johnsmith","FacebookHandle":"johnsmith","FacebookFollowers":15000,"FacebookLink":"https://www.facebook.com/johnsmith","YoutubeHandle":"johnsmith","YoutubeFollowers":5000,"YoutubeLink":"https://www.youtube.com/johnsmith","AudienceMalePer":"70.00","AudienceFemalePer":"30.00","AgeGroup1317":"15.00","AgeGroup1824":"25.00","AgeGroup2534":"30.00","AgeGroup3544":"20.00","AgeGroup4554":"10.00","AgeGroup55":"10.00","AudienceTopCountries1":"United Kingdom","AudienceTopCountries1Percentage":"40.00","AudienceTopCountries2":"United States","AudienceTopCountries2Percentage":"30.00","AudienceTopCountries3":"Australia","AudienceTopCountries3Percentage":"30.00","KSALicense":true,"UAELicense":false,"AgencyContactPerson":"Jane Doe","AgencyNumber":123456789,"AgencyEmail":"janedoe@agency.com","PreviousBrands":"Brand X Brand Y Brand Z","Bio":"I am a technology and gaming content creator based in London.","Notes":"Interested in endorsement deals with gaming and tech brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":5,"Name":"Emily Brown","Gender":"Female","Number":97155555555,"Email":"emilybrown@example.com","MainContentLanguage":"English","SubContentLang":"French","MainVertical":"Beauty","SubVertical":"Fashion","Occupation":"Influencer","ItpRelationship":"Collaboration","Nationality":"American","SecondNationality":"French","CountryLocation":"United States","CityLocation":"New York","Address":"789 Fifth Ave, New York, NY 10019","InstagramHandle":"emilybrown","InstagramFollowers":200000,"InstagramLink":"https://www.instagram.com/emilybrown","TiktokHandle":"emilybrown","TiktokFollowers":100000,"TiktokLink":"https://www.tiktok.com/@emilybrown","SnapchatHandle":"emilybrown","SnapchatFollowers":15000,"SnapchatLink":"https://www.snapchat.com/add/emilybrown","TwitterHandle":"emilybrown","TwitterFollowers":3000,"TwitterLink":"https://twitter.com/emilybrown","FacebookHandle":"emilybrown","FacebookFollowers":10000,"FacebookLink":"https://www.facebook.com/emilybrown","YoutubeHandle":"emilybrown","YoutubeFollowers":0,"YoutubeLink":"https://www.youtube.com/emilybrown","AudienceMalePer":"20.00","AudienceFemalePer":"80.00","AgeGroup1317":"10.00","AgeGroup1824":"25.00","AgeGroup2534":"30.00","AgeGroup3544":"20.00","AgeGroup4554":"15.00","AgeGroup55":"10.00","AudienceTopCountries1":"United States","AudienceTopCountries1Percentage":"50.00","AudienceTopCountries2":"Canada","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"Australia","AudienceTopCountries3Percentage":"20.00","KSALicense":false,"UAELicense":true,"AgencyContactPerson":"John Doe","AgencyNumber":1111111111,"AgencyEmail":"johndoe@agency.com","PreviousBrands":"BrandBrandBrand C","Bio":"I am a beauty and fashion influencer based in New York.","Notes":"Interested in collaboration deals with beauty and fashion brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":6,"Name":"Emily Johnson","Gender":"Female","Number":1234567890,"Email":"emilyjohnson@example.com","MainContentLanguage":"English","SubContentLang":"French","MainVertical":"Fashion","SubVertical":"Beauty","Occupation":"Influencer","ItpRelationship":"Sponsored Content","Nationality":"American","SecondNationality":"Canadian","CountryLocation":"United States","CityLocation":"New York","Address":"123 Main St, New York, USA 10001","InstagramHandle":"emilyjohnson","InstagramFollowers":80000,"InstagramLink":"https://www.instagram.com/emilyjohnson","TiktokHandle":"emilyj","TiktokFollowers":40000,"TiktokLink":"https://www.tiktok.com/@emilyj","SnapchatHandle":"emilyj","SnapchatFollowers":10000,"SnapchatLink":"https://www.snapchat.com/add/emilyj","TwitterHandle":"emilyjohnson","TwitterFollowers":20000,"TwitterLink":"https://twitter.com/emilyjohnson","FacebookHandle":"emilyj","FacebookFollowers":25000,"FacebookLink":"https://www.facebook.com/emilyj","YoutubeHandle":"emilyj","YoutubeFollowers":25000,"YoutubeLink":"https://www.youtube.com/emilyj","AudienceMalePer":"20.00","AudienceFemalePer":"80.00","AgeGroup1317":"10.00","AgeGroup1824":"25.00","AgeGroup2534":"30.00","AgeGroup3544":"25.00","AgeGroup4554":"5.00","AgeGroup55":"5.00","AudienceTopCountries1":"United States","AudienceTopCountries1Percentage":"60.00","AudienceTopCountries2":"Canada","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"United Kingdom","AudienceTopCountries3Percentage":"20.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Mark Lee","AgencyNumber":1122334455,"AgencyEmail":"marklee@agency.com","PreviousBrands":"asasas","Bio":"Fashion and beauty influencer from New York.","Notes":"Open to sponsored content collaborations with beauty and lifestyle brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":7,"Name":"William Kim","Gender":"Male","Number":3456789012,"Email":"williamkim@example.com","MainContentLanguage":"English","SubContentLang":"Korean","MainVertical":"Fitness","SubVertical":"Bodybuilding","Occupation":"Fitness Trainer","ItpRelationship":"Product Placement","Nationality":"South Korean","SecondNationality":"American","CountryLocation":"South Korea","CityLocation":"Seoul","Address":"456 Main St, Seoul, South Korea 10002","InstagramHandle":"williamkim","InstagramFollowers":100000,"InstagramLink":"https://www.instagram.com/williamkim","TiktokHandle":"williamk","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/@williamk","SnapchatHandle":"williamk","SnapchatFollowers":20000,"SnapchatLink":"https://www.snapchat.com/add/williamk","TwitterHandle":"williamkim","TwitterFollowers":15000,"TwitterLink":"https://twitter.com/williamkim","FacebookHandle":"williamk","FacebookFollowers":10000,"FacebookLink":"https://www.facebook.com/williamk","YoutubeHandle":"williamkim","YoutubeFollowers":20000,"YoutubeLink":"https://www.youtube.com/williamkim","AudienceMalePer":"80.00","AudienceFemalePer":"20.00","AgeGroup1317":"5.00","AgeGroup1824":"25.00","AgeGroup2534":"40.00","AgeGroup3544":"20.00","AgeGroup4554":"5.00","AgeGroup55":"5.00","AudienceTopCountries1":"South Korea","AudienceTopCountries1Percentage":"70.00","AudienceTopCountries2":"United States","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"Canada","AudienceTopCountries3Percentage":"10.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Kim Lee","AgencyNumber":2147483647,"AgencyEmail":"kimlee@agency.com","PreviousBrands":"qwwewewev","Bio":"Fitness trainer and bodybuilder based in Seoul.","Notes":"Looking for product placement opportunities with fitness and bodybuilding brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":9,"Name":"Williams Kim","Gender":"Male","Number":3456789012,"Email":"williamkim@example.com","MainContentLanguage":"English","SubContentLang":"Korean","MainVertical":"Fitness","SubVertical":"Bodybuilding","Occupation":"Fitness Trainer","ItpRelationship":"Product Placement","Nationality":"South Korean","SecondNationality":"American","CountryLocation":"South Korea","CityLocation":"Seoul","Address":"456 Main St, Seoul, South Korea 10002","InstagramHandle":"williamkims","InstagramFollowers":100000,"InstagramLink":"https://www.instagram.com/williamkim","TiktokHandle":"williamk","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/@williamk","SnapchatHandle":"williamk","SnapchatFollowers":20000,"SnapchatLink":"https://www.snapchat.com/add/williamk","TwitterHandle":"williamkim","TwitterFollowers":15000,"TwitterLink":"https://twitter.com/williamkim","FacebookHandle":"williamk","FacebookFollowers":10000,"FacebookLink":"https://www.facebook.com/williamk","YoutubeHandle":"williamkim","YoutubeFollowers":20000,"YoutubeLink":"https://www.youtube.com/williamkim","AudienceMalePer":"80.00","AudienceFemalePer":"20.00","AgeGroup1317":"5.00","AgeGroup1824":"25.00","AgeGroup2534":"40.00","AgeGroup3544":"20.00","AgeGroup4554":"5.00","AgeGroup55":"5.00","AudienceTopCountries1":"South Korea","AudienceTopCountries1Percentage":"70.00","AudienceTopCountries2":"United States","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"Canada","AudienceTopCountries3Percentage":"10.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Kim Lee","AgencyNumber":2147483647,"AgencyEmail":"kimlee@agency.com","PreviousBrands":"qwwewewev","Bio":"Fitness trainer and bodybuilder based in Seoul.","Notes":"Looking for product placement opportunities with fitness and bodybuilding brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":10,"Name":"Williams Kimoso","Gender":"Male","Number":3456789012,"Email":"williamkim@example.com","MainContentLanguage":"English","SubContentLang":"Korean","MainVertical":"Fitness","SubVertical":"Bodybuilding","Occupation":"Fitness Trainer","ItpRelationship":"Product Placement","Nationality":"South Korean","SecondNationality":"American","CountryLocation":"South Korea","CityLocation":"Seoul","Address":"456 Main St, Seoul, South Korea 10002","InstagramHandle":"williamkimso","InstagramFollowers":100000,"InstagramLink":"https://www.instagram.com/williamkim","TiktokHandle":"williamk","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/@williamk","SnapchatHandle":"williamk","SnapchatFollowers":20000,"SnapchatLink":"https://www.snapchat.com/add/williamk","TwitterHandle":"williamkim","TwitterFollowers":10000,"TwitterLink":"https://twitter.com/williamkim","FacebookHandle":"williamk","FacebookFollowers":20000,"FacebookLink":"https://www.facebook.com/williamk","YoutubeHandle":"williamkim","YoutubeFollowers":20000,"YoutubeLink":"https://www.youtube.com/williamkim","AudienceMalePer":"80.00","AudienceFemalePer":"20.00","AgeGroup1317":"5.00","AgeGroup1824":"25.00","AgeGroup2534":"40.00","AgeGroup3544":"20.00","AgeGroup4554":"5.00","AgeGroup55":"5.00","AudienceTopCountries1":"South Korea","AudienceTopCountries1Percentage":"70.00","AudienceTopCountries2":"Austria","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"Canada","AudienceTopCountries3Percentage":"10.00","KSALicense":true,"UAELicense":true,"AgencyContactPerson":"Kim Lee","AgencyNumber":2147483647,"AgencyEmail":"kimlee@agency.com","PreviousBrands":"qwwewewev","Bio":"Fitness trainer and bodybuilder based in Seoul.","Notes":"Looking for product placement opportunities with fitness and bodybuilding brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":11,"Name":"Lena Park","Gender":"Female","Number":1234567890,"Email":"lenapark@example.com","MainContentLanguage":"English","SubContentLang":"Spanish","MainVertical":"Fashion","SubVertical":"Accessories","Occupation":"Influencer","ItpRelationship":"Sponsorship","Nationality":"Mexican","SecondNationality":"Canadian","CountryLocation":"Mexico","CityLocation":"Mexico City","Address":"789 Main St, Mexico City, Mexico 20001","InstagramHandle":"lenapark","InstagramFollowers":200000,"InstagramLink":"https://www.instagram.com/lenapark","TiktokHandle":"lenapark","TiktokFollowers":100000,"TiktokLink":"https://www.tiktok.com/@lenapark","SnapchatHandle":"lenapark","SnapchatFollowers":50000,"SnapchatLink":"https://www.snapchat.com/add/lenapark","TwitterHandle":"lenapark","TwitterFollowers":30000,"TwitterLink":"https://twitter.com/lenapark","FacebookHandle":"lenapark","FacebookFollowers":25000,"FacebookLink":"https://www.facebook.com/lenapark","YoutubeHandle":"lenapark","YoutubeFollowers":50000,"YoutubeLink":"https://www.youtube.com/lenapark","AudienceMalePer":"30.00","AudienceFemalePer":"70.00","AgeGroup1317":"15.00","AgeGroup1824":"30.00","AgeGroup2534":"35.00","AgeGroup3544":"15.00","AgeGroup4554":"3.00","AgeGroup55":"2.00","AudienceTopCountries1":"Mexico","AudienceTopCountries1Percentage":"80.00","AudienceTopCountries2":"Canada","AudienceTopCountries2Percentage":"10.00","AudienceTopCountries3":"United States","AudienceTopCountries3Percentage":"5.00","KSALicense":true,"UAELicense":false,"AgencyContactPerson":"Juan Perez","AgencyNumber":2147483647,"AgencyEmail":"juanperez@agency.com","PreviousBrands":"xyzabc","Bio":"Fashion influencer with a passion for accessories.","Notes":"Interested in sponsorships with fashion and accessory brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":12,"Name":"Daniel Lee","Gender":"Male","Number":1098765432,"Email":"daniellee@example.com","MainContentLanguage":"English","SubContentLang":"French","MainVertical":"Travel","SubVertical":"Adventure","Occupation":"Blogger","ItpRelationship":"Sponsorship","Nationality":"Canadian","SecondNationality":"French","CountryLocation":"Canada","CityLocation":"Toronto","Address":"123 Main St, Toronto, Canada M4J 2W8","InstagramHandle":"daniellee","InstagramFollowers":150000,"InstagramLink":"https://www.instagram.com/daniellee","TiktokHandle":"daniellee","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/@daniellee","SnapchatHandle":"daniellee","SnapchatFollowers":20000,"SnapchatLink":"https://www.snapchat.com/add/daniellee","TwitterHandle":"daniellee","TwitterFollowers":10000,"TwitterLink":"https://twitter.com/daniellee","FacebookHandle":"daniellee","FacebookFollowers":5000,"FacebookLink":"https://www.facebook.com/daniellee","YoutubeHandle":"daniellee","YoutubeFollowers":10000,"YoutubeLink":"https://www.youtube.com/daniellee","AudienceMalePer":"50.00","AudienceFemalePer":"50.00","AgeGroup1317":"10.00","AgeGroup1824":"20.00","AgeGroup2534":"30.00","AgeGroup3544":"25.00","AgeGroup4554":"10.00","AgeGroup55":"5.00","AudienceTopCountries1":"Canada","AudienceTopCountries1Percentage":"70.00","AudienceTopCountries2":"France","AudienceTopCountries2Percentage":"15.00","AudienceTopCountries3":"United States","AudienceTopCountries3Percentage":"10.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Sophie Martin","AgencyNumber":2147483647,"AgencyEmail":"sophiemartin@agency.com","PreviousBrands":"abcxyz","Bio":"Travel blogger and adventure seeker based in Toronto.","Notes":"Open to sponsorships with travel and adventure brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":13,"Name":"Maria Rodriguez","Gender":"Female","Number":8765432109,"Email":"mariarodriguez@example.com","MainContentLanguage":"English","SubContentLang":"Spanish","MainVertical":"Food","SubVertical":"Healthy Eating","Occupation":"Nutritionist","ItpRelationship":"Product Placement","Nationality":"Mexican","SecondNationality":"American","CountryLocation":"Mexico","CityLocation":"Guadalajara","Address":"456 Main St, Guadalajara, Mexico 45010","InstagramHandle":"mariarodriguez","InstagramFollowers":80000,"InstagramLink":"https://www.instagram.com/mariarodriguez","TiktokHandle":"mariarodriguez","TiktokFollowers":40000,"TiktokLink":"https://www.tiktok.com/@mariarodriguez","SnapchatHandle":"mariarodriguez","SnapchatFollowers":10000,"SnapchatLink":"https://www.snapchat.com/add/mariarodriguez","TwitterHandle":"mariarodriguez","TwitterFollowers":15000,"TwitterLink":"https://twitter.com/mariarodriguez","FacebookHandle":"mariarodriguez","FacebookFollowers":30000,"FacebookLink":"https://www.facebook.com/mariarodriguez","YoutubeHandle":"mariarodriguez","YoutubeFollowers":30000,"YoutubeLink":"https://www.youtube.com/mariarodriguez","AudienceMalePer":"30.00","AudienceFemalePer":"70.00","AgeGroup1317":"5.00","AgeGroup1824":"15.00","AgeGroup2534":"30.00","AgeGroup3544":"30.00","AgeGroup4554":"15.00","AgeGroup55":"5.00","AudienceTopCountries1":"Mexico","AudienceTopCountries1Percentage":"85.00","AudienceTopCountries2":"United States","AudienceTopCountries2Percentage":"10.00","AudienceTopCountries3":"Canada","AudienceTopCountries3Percentage":"5.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Jose Garcia","AgencyNumber":2147483647,"AgencyEmail":"josegarcia@agency.com","PreviousBrands":"lmnopqrs","Bio":"Nutritionist promoting healthy eating habits.","Notes":"Interested in product placement opportunities with healthy food brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":17,"Name":"Anastasia Ivanova","Gender":"Female","Number":7890123456,"Email":"anastasiaivanova@example.com","MainContentLanguage":"Russian","SubContentLang":"English","MainVertical":"Fashion","SubVertical":"Luxury","Occupation":"Blogger","ItpRelationship":"Sponsorship","Nationality":"Russian","SecondNationality":"British","CountryLocation":"Russia","CityLocation":"Moscow","Address":"123 Main St, Moscow, Russia 119146","InstagramHandle":"anastasiaivanova","InstagramFollowers":200000,"InstagramLink":"https://www.instagram.com/anastasiaivanova","TiktokHandle":"anastasiaivanova","TiktokFollowers":50000,"TiktokLink":"https://www.tiktok.com/@anastasiaivanova","SnapchatHandle":"anastasiaivanova","SnapchatFollowers":10000,"SnapchatLink":"https://www.snapchat.com/add/anastasiaivanova","TwitterHandle":"anastasiaivanova","TwitterFollowers":15000,"TwitterLink":"https://twitter.com/anastasiaivanova","FacebookHandle":"anastasiaivanova","FacebookFollowers":5000,"FacebookLink":"https://www.facebook.com/anastasiaivanova","YoutubeHandle":"anastasiaivanova","YoutubeFollowers":10000,"YoutubeLink":"https://www.youtube.com/anastasiaivanova","AudienceMalePer":"30.00","AudienceFemalePer":"70.00","AgeGroup1317":"5.00","AgeGroup1824":"15.00","AgeGroup2534":"40.00","AgeGroup3544":"25.00","AgeGroup4554":"10.00","AgeGroup55":"5.00","AudienceTopCountries1":"Russia","AudienceTopCountries1Percentage":"80.00","AudienceTopCountries2":"United Kingdom","AudienceTopCountries2Percentage":"10.00","AudienceTopCountries3":"Germany","AudienceTopCountries3Percentage":"5.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Vladimir Petrov","AgencyNumber":987654321,"AgencyEmail":"vladimirpetrov@agency.com","PreviousBrands":"mnopqrst","Bio":"Fashion blogger promoting luxury brands.","Notes":"Open to sponsorships with luxury fashion brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"},{"id":18,"Name":"Kateryna Ivanenko","Gender":"Female","Number":380987654321,"Email":"katerynaivanenko@example.com","MainContentLanguage":"Ukrainian","SubContentLang":"English","MainVertical":"Travel","SubVertical":"Adventure","Occupation":"Travel Blogger","ItpRelationship":"Affiliate Marketing","Nationality":"Ukrainian","SecondNationality":"Canadian","CountryLocation":"Ukraine","CityLocation":"Kyiv","Address":"123 Main St, Kyiv, Ukraine 02000","InstagramHandle":"katerynaivanenko","InstagramFollowers":80000,"InstagramLink":"https://www.instagram.com/katerynaivanenko","TiktokHandle":"katerynaivanenko","TiktokFollowers":20000,"TiktokLink":"https://www.tiktok.com/@katerynaivanenko","SnapchatHandle":"katerynaivanenko","SnapchatFollowers":10000,"SnapchatLink":"https://www.snapchat.com/add/katerynaivanenko","TwitterHandle":"katerynaivanenko","TwitterFollowers":2000,"TwitterLink":"https://twitter.com/katerynaivanenko","FacebookHandle":"katerynaivanenko","FacebookFollowers":10000,"FacebookLink":"https://www.facebook.com/katerynaivanenko","YoutubeHandle":"katerynaivanenko","YoutubeFollowers":5000,"YoutubeLink":"https://www.youtube.com/katerynaivanenko","AudienceMalePer":"40.00","AudienceFemalePer":"60.00","AgeGroup1317":"10.00","AgeGroup1824":"20.00","AgeGroup2534":"40.00","AgeGroup3544":"20.00","AgeGroup4554":"5.00","AgeGroup55":"5.00","AudienceTopCountries1":"Ukraine","AudienceTopCountries1Percentage":"70.00","AudienceTopCountries2":"Canada","AudienceTopCountries2Percentage":"20.00","AudienceTopCountries3":"United States","AudienceTopCountries3Percentage":"10.00","KSALicense":false,"UAELicense":false,"AgencyContactPerson":"Yuriy Popov","AgencyNumber":1234567890,"AgencyEmail":"yuriypopov@agency.com","PreviousBrands":"uvwxyza","Bio":"Travel blogger exploring the world one adventure at a time.","Notes":"Interested in affiliate marketing opportunities with travel and adventure brands.","Status":"Active","updatedBy":1,"createdAt":"2023-03-16 12:53:23","updatedAt":"2023-03-16 12:53:23"}], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('influencer', null, {});
  },
};