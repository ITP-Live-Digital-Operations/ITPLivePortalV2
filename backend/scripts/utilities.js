const axios = require("axios");
const winston = require("winston");
const fs = require("fs").promises;
const path = require("path");
const { promisify } = require("util");

const sleep = promisify(setTimeout);

async function saveApiResponse(platform, username, data) {
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = `${platform}_${username}_${timestamp}.json`;
  const dirPath = path.join(__dirname, "api_responses");
  const filePath = path.join(dirPath, filename);

  try {
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    logger.info(
      `Saved ${platform} API response for ${username} to ${filePath}`
    );
  } catch (error) {
    logger.error(
      `Error saving ${platform} API response for ${username}:`,
      error
    );
  }
}

class RateLimiter {
  constructor(maxRequests, perSeconds) {
    this.maxRequests = maxRequests;
    this.perSeconds = perSeconds;
    this.tokens = maxRequests;
    this.lastRefilled = Date.now();
  }

  async waitForToken() {
    const now = Date.now();
    const ellapsedMs = now - this.lastRefilled;
    this.tokens += ellapsedMs * (this.maxRequests / (this.perSeconds * 1000));
    this.lastRefilled = now;

    if (this.tokens > this.maxRequests) {
      this.tokens = this.maxRequests;
    }

    if (this.tokens < 1) {
      const msToWait =
        ((1 - this.tokens) * (this.perSeconds * 1000)) / this.maxRequests;
      await sleep(msToWait);
      return this.waitForToken();
    }

    this.tokens -= 1;
  }
}
// 1 request,  per 1 second
const rateLimiter = new RateLimiter(1, 1);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const API_BASE_URL = "https://api.modash.io/v1";
const API_TOKEN = "TgqrbMQC7GVeBxaDFVv31abgd4BrQo4k";

// 4. API instance creation
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});


async function fetchProfileData(platform, userId, profileId, influencerId) {

  try {
   await rateLimiter.waitForToken();
    const response = await api.get(`/${platform}/profile/${userId}/report`);
    /* await saveApiResponse(platform, userId, response.data); */
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.code === "bad_request") {
      const incident = {
        influencerId,
        platform,
        username: userId,
        profileId,
        error: error.response.data.message,
      };
      await saveIncidentToFile(incident);
    }
    logger.error(`Error fetching ${platform} data for ${userId}:`, error);
    return null;
  }
}


async function saveIncidentToFile(incident) {
  const filePath = path.join(__dirname, 'invalid_profiles_log.json');
  
  try {
    // Check if file exists
    let incidents = [];
    if (await fileExists(filePath)) {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      incidents = JSON.parse(fileContent);
    }
    
    // Append the new incident
    incidents.push(incident);
    
    // Write back the updated incidents array to the file
    await fs.writeFile(filePath, JSON.stringify(incidents, null, 2), 'utf-8');
  } catch (error) {
    logger.error(`Failed to save incident to file:`, error);
  }
}

// Helper function to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

const getNestedProperty = (obj, path) => {
  return path
    .split(".")
    .reduce(
      (prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : null),
      obj
    );
};

module.exports = {
  RateLimiter,
  logger,
  fetchProfileData,
  getNestedProperty,
};
