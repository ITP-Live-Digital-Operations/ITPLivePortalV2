const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath = "./INFLUENCERS DATA-CleanedData.csv"
const outputJsonPath = "./INFLUENCERS DATA-CleanedData.json"

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

const defaultValues = {
    id: null,
    Name: '',
    Gender: null,
    Number: null,
    Email: null,
    MainContentLanguage: null,
    SubContentLang: null,
    MainVertical: null,
    SubVertical: null,
    Occupation: null,
    ItpRelationship: null,
    Nationality: null,
    SecondNationality: null,
    CountryLocation: null,
    CityLocation: null,
    Address: null,
    InstagramHandle: null,
    InstagramFollowers: null,
    InstagramLink: null,
    TiktokHandle: null,
    TiktokFollowers: null,
    TiktokLink: null,
    SnapchatHandle: null,
    SnapchatFollowers: null,
    SnapchatLink: null,
    TwitterHandle: null,
    TwitterFollowers: null,
    TwitterLink: null,
    FacebookHandle: null,
    FacebookFollowers: null,
    FacebookLink: null,
    YoutubeHandle: null,
    YoutubeFollowers: null,
    YoutubeLink: null,
    AudienceMalePer: null,
    AudienceFemalePer: null,
    AgeGroup1317: null,
    AgeGroup1824: null,
    AgeGroup2534: null,
    AgeGroup3544: null,
    AgeGroup4554: null,
    AgeGroup55: null,
    AudienceTopCountries1: null,
    AudienceTopCountries1Percentage: null,
    AudienceTopCountries2: null,
    AudienceTopCountries2Percentage: null,
    AudienceTopCountries3: null,
    AudienceTopCountries3Percentage: null,
    KSALicense: null,
    UAELicense: null,
    AgencyContactPerson: null,
    AgencyNumber: null,
    AgencyEmail: null,
    PreviousBrands: null,
    Bio: null,
    Notes: null,
    Status: 'Active',
    updatedBy: 1,
    createdAt: formatDate(),
    updatedAt: formatDate()
  };
  

  csv()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    // Fill in the missing fields with default values
    const updatedJsonArray = jsonArray.map((item) => {
      const newItem = { ...defaultValues, ...item };
      return newItem;
    });

    // Write the updated JSON array to a file
    fs.writeFile(outputJsonPath, JSON.stringify(updatedJsonArray, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file has been written');
      }
    });
  })
  .catch((err) => {
    console.error('Error processing CSV:', err);
  });