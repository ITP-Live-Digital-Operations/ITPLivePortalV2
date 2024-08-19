const { sequelize, Influencer, InstagramProfile, TikTokProfile, YouTubeProfile } = require('./models');
const axios = require('axios');
const ExcelJS = require('exceljs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function checkUsernameExists(platform, username) {
  let url;
  switch (platform) {
    case 'instagram':
      url = `https://www.instagram.com/${username}/`;
      break;
    case 'tiktok':
      url = `https://www.tiktok.com/@${username}`;
      break;
    case 'youtube':
      url = `https://www.youtube.com/@${username}`;
      break;
    default:
      throw new Error('Unsupported platform');
  }

  try {
    const response = await axios.get(url);
    return { exists: true, status: response.status };
  } catch (error) {
    if (error.response) {
      return { exists: false, status: error.response.status };
    }
    throw error;
  }
}

async function getAllProfiles() {
  const instagramProfiles = await InstagramProfile.findAll({
    include: [{ model: Influencer, as: 'influencer' }]
  });
  const tiktokProfiles = await TikTokProfile.findAll({
    include: [{ model: Influencer, as: 'influencer' }]
  });
  const youtubeProfiles = await YouTubeProfile.findAll({
    include: [{ model: Influencer, as: 'influencer' }]
  });

  return [
    ...instagramProfiles.map(p => ({ platform: 'instagram', ...p.toJSON() })),
    ...tiktokProfiles.map(p => ({ platform: 'tiktok', ...p.toJSON() })),
    ...youtubeProfiles.map(p => ({ platform: 'youtube', ...p.toJSON() }))
  ];
}

async function checkUsernames(profiles) {
  const results = [];

  for (const profile of profiles) {
    const checkResult = await checkUsernameExists(profile.platform, profile.username);
    results.push({
      platform: profile.platform,
      username: profile.username,
      influencerId: profile.influencerId,
      exists: checkResult.exists,
      status: checkResult.status
    });
  }

  return results;
}

async function saveToExcel(data, filename) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Username Check Results');

  worksheet.addRow(['Platform', 'Username', 'Influencer ID', 'Exists', 'Status Code']);

  data.forEach(item => {
    worksheet.addRow([item.platform, item.username, item.influencerId, item.exists, item.status]);
  });

  worksheet.columns.forEach(column => {
    column.width = Math.max(12, ...worksheet.getColumn(column.letter).values.map(v => v ? v.toString().length : 0));
  });

  await workbook.xlsx.writeFile(filename);
}

function promptToContinue() {
  return new Promise((resolve) => {
    rl.question('Do you want to continue to the next batch? (y/n) ', (answer) => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    const allProfiles = await getAllProfiles();
    console.log(`Total profiles to check: ${allProfiles.length}`);

    let startIndex = 0;
    let batchNumber = 1;
    let allResults = [];

    while (startIndex < allProfiles.length) {
      const endIndex = Math.min(startIndex + 50, allProfiles.length);
      const batch = allProfiles.slice(startIndex, endIndex);

      console.log(`\nProcessing batch ${batchNumber} (profiles ${startIndex + 1} to ${endIndex})...`);

      const batchResults = await checkUsernames(batch);
      allResults = [...allResults, ...batchResults];

      console.log('Batch results:');
      console.table(batchResults);

      const nonExistentUsernames = batchResults.filter(result => !result.exists);
      console.log(`Found ${nonExistentUsernames.length} non-existent usernames in this batch.`);

      const batchFilename = `username_check_results_batch_${batchNumber}.xlsx`;
      await saveToExcel(batchResults, batchFilename);
      console.log(`Batch results saved to ${batchFilename}`);

      if (endIndex < allProfiles.length) {
        const continueBatches = await promptToContinue();
        if (!continueBatches) {
          console.log('Process stopped by user.');
          break;
        }
      }

      startIndex = endIndex;
      batchNumber++;
    }

    const finalFilename = 'username_check_results_final.xlsx';
    await saveToExcel(allResults, finalFilename);
    console.log(`\nAll results saved to ${finalFilename}`);
    console.log(`Total profiles checked: ${allResults.length}`);
    console.log(`Total non-existent usernames found: ${allResults.filter(r => !r.exists).length}`);

    await sequelize.close();
    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
}

main();