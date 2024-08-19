const { sequelize, Influencer, InstagramProfile } = require('./models');
const axios = require('axios');
const ExcelJS = require('exceljs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function checkInstagramUsernameExists(username) {
  const url = `https://www.instagram.com/${username}`;
  try {
    const response = await axios.get(url, {
      timeout: 10000, // 10 seconds timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Check for specific text in the response to determine if the page exists
    const pageContent = response.data;
    const userNotFound = pageContent.includes('"the link you followed may be broken"') || pageContent.includes("Sorry, this page isn't available.");

    if (userNotFound) {
      return { exists: false, status: 404 };
    }

    // If we don't see the "not found" message, we assume the profile exists
    return { exists: true, status: 200 };

  } catch (error) {
    if (error.response) {
      return { exists: false, status: error.response.status };
    }
    if (error.code === 'ECONNABORTED') {
      return { exists: 'unknown', status: 'timeout' };
    }
    return { exists: 'unknown', status: error.code || 'network error' };
  }
}


async function getAllInstagramProfiles() {
  return await InstagramProfile.findAll({
    include: [{ model: Influencer, as: 'influencer' }]
  });
}

async function checkUsernames(profiles, startIndex) {
  const results = [];

  for (let i = 0; i < profiles.length; i++) {
    const profile = profiles[i];
    const checkResult = await checkInstagramUsernameExists(profile.username);
    results.push({
      profileId: profile.id,
      username: profile.username,
      influencerId: profile.influencerId,
      exists: checkResult.exists,
      status: checkResult.status
    });
    console.log(`Checked ${startIndex + i + 1}: ${profile.username}, Exists: ${checkResult.exists}, Status: ${checkResult.status}`);
  }

  return results;
}

async function saveToExcel(data, filename) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Instagram Username Check Results');

  worksheet.addRow(['Profile ID', 'Username', 'Influencer ID', 'Exists', 'Status Code']);

  data.forEach(item => {
    worksheet.addRow([item.profileId, item.username, item.influencerId, item.exists, item.status]);
  });

  worksheet.columns.forEach(column => {
    column.width = Math.max(12, ...worksheet.getColumn(column.letter).values.map(v => v ? v.toString().length : 0));
  });

  await workbook.xlsx.writeFile(filename);
}

function promptToContinue() {
  return new Promise((resolve) => {
    rl.question('Do you want to continue to the next batch (Y), repeat this batch (R), or stop (N)? ', (answer) => {
      resolve(answer.toLowerCase());
    });
  });
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    const allProfiles = await getAllInstagramProfiles();
    console.log(`Total Instagram profiles to check: ${allProfiles.length}`);

    let startIndex = 0;
    let batchNumber = 1;
    let allResults = [];

    while (startIndex < allProfiles.length) {
      const endIndex = Math.min(startIndex + 500, allProfiles.length);
      const batch = allProfiles.slice(startIndex, endIndex);

      console.log(`\nProcessing batch ${batchNumber} (profiles ${startIndex + 1} to ${endIndex})...`);

      let batchResults;
      do {
        batchResults = await checkUsernames(batch, startIndex);
        console.log('Batch results:');
        console.table(batchResults);

        const nonExistentUsernames = batchResults.filter(result => result.exists === false);
        const unknownStatusUsernames = batchResults.filter(result => result.exists === 'unknown');
        console.log(`Found ${nonExistentUsernames.length} non-existent Instagram usernames in this batch.`);
        console.log(`Found ${unknownStatusUsernames.length} Instagram usernames with unknown status in this batch.`);

        if (endIndex < allProfiles.length || batchResults.some(result => result.exists === 'unknown')) {
          const userChoice = await promptToContinue();
          if (userChoice === 'n') {
            console.log('Process stopped by user.');
            allResults = [...allResults, ...batchResults];
            break;
          } else if (userChoice === 'y') {
            allResults = [...allResults, ...batchResults];
            break;
          } else if (userChoice === 'r') {
            console.log('Repeating the batch...');
            // The loop will continue, effectively repeating the batch
          } else {
            console.log('Invalid choice. Repeating the batch...');
            // The loop will continue, effectively repeating the batch
          }
        } else {
          allResults = [...allResults, ...batchResults];
          break;
        }
      } while (true);

      if (startIndex + 500 >= allProfiles.length) {
        break;
      }

      startIndex = endIndex;
      batchNumber++;
    }

    const finalFilename = 'instagram_username_check_results_final.xlsx';
    await saveToExcel(allResults, finalFilename);
    console.log(`\nAll results saved to ${finalFilename}`);
    console.log(`Total Instagram profiles checked: ${allResults.length}`);
    console.log(`Total non-existent Instagram usernames found: ${allResults.filter(r => r.exists === false).length}`);
    console.log(`Total profiles with unknown status: ${allResults.filter(r => r.exists === 'unknown').length}`);

    await sequelize.close();
    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
}

main();