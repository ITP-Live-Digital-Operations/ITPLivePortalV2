const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const baseUrl = 'https://itplive.itpshare.com/api/v1/influencers/getInfluencerProfileV2/';
const startId = 4242;// add 300 
const endId = 5000;
const batchSize = 15;

const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1vaGFtYWQgSGFtbW91ZCIsInJvbGUiOiJzdXBlcmFkbWluIiwicHJpdmlsZWdlX2xldmVsIjoxMCwiaWF0IjoxNzI0MjI0MjU1LCJleHAiOjE3MjQyNjc0NTV9.Tps-c4XKV4AbuNpuUjj2ciBc6QSLPFI1zVVWdbibprI";

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function fetchInfluencer(id) {
  try {
    const response = await axios.get(`${baseUrl}${id}`, {
      headers: {
        'Authorization': authToken
      }
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { 
      status: error.response ? error.response.status : 500, 
      data: error.response ? error.response.data : null 
    };
  }
}

async function processInfluencers(currentId) {
  if (currentId > endId) {
    console.log('Reached the end of the range. Exiting...');
    rl.close();
    return;
  }

  const batchEndId = Math.min(currentId + batchSize - 1, endId);
  console.log(`Processing batch: ${currentId} to ${batchEndId}`);

  let batchReport = {
    totalProcessed: 0,
    successful: 0,
    failed: 0,
    errors: []
  };

  for (let id = currentId; id <= batchEndId; id++) {
    const { status, data } = await fetchInfluencer(id);
    console.log(`ID ${id}: Status ${status}`);
    batchReport.totalProcessed++;

    if (status === 200) {
      console.log(`Influencer data for ID ${id}:`, JSON.stringify(data, null, 2));
      batchReport.successful++;
    } else {
      console.log(`Error for ID ${id}: Status ${status}`);
      batchReport.failed++;
      batchReport.errors.push(`ID ${id}: Status ${status}`);
    }
  }

  console.log('\nBatch Report:');
  console.log(`Total Processed: ${batchReport.totalProcessed}`);
  console.log(`Successful: ${batchReport.successful}`);
  console.log(`Failed: ${batchReport.failed}`);
  if (batchReport.errors.length > 0) {
    console.log('Errors:');
    batchReport.errors.forEach(error => console.log(error));
  }

  const answer = await askQuestion('\nContinue to the next batch? (y/n): ');
  if (answer.toLowerCase() === 'y') {
    await processInfluencers(batchEndId + 1);
  } else {
    console.log('Exiting...');
    rl.close();
  }
}

processInfluencers(startId);