const { updateInfluencers } = require('./scripts/updateInfluencers');

async function testUpdateInfluencerProfile() {
  const testInfluencerId = 11; // Replace with an actual influencer ID from your database
  try {
    await updateInfluencers(1, testInfluencerId);
    console.log(`Successfully tested update for influencer ${testInfluencerId}`);
  } catch (error) {
    console.error(`Error testing update for influencer ${testInfluencerId}:`, error);
  }
}

testUpdateInfluencerProfile();