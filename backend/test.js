const readline = require('readline');
const { updateInfluencers } = require('./scripts/updateInfluencers');
const { runMigration } = require('./scripts/migrateInfluencerData');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function updateInfluencerProfile(influencerId) {
  try {
    await runMigration(influencerId);
    await updateInfluencers(1, influencerId);
    console.log(`Successfully updated influencer ${influencerId}`);
  } catch (error) {
    console.error(`Error updating influencer ${influencerId}:`, error);
  }
}

async function promptForInfluencer() {
  return new Promise((resolve) => {
    rl.question('Enter the influencer ID to update: ', (answer) => {
      resolve(parseInt(answer, 10));
    });
  });
}

async function promptForContinue() {
  return new Promise((resolve) => {
    rl.question('Do you want to update another influencer? (y/n): ', (answer) => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

async function main() {
  let continueUpdating = true;

  while (continueUpdating) {
    const influencerId = await promptForInfluencer();
    
    if (isNaN(influencerId)) {
      console.log('Invalid influencer ID. Please enter a number.');
    } else {
      await updateInfluencerProfile(influencerId);
    }

    continueUpdating = await promptForContinue();
  }

  rl.close();
  console.log('Script completed. Goodbye!');
}

main();