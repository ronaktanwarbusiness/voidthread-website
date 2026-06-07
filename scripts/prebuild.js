const axios = require("axios");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:8080";
const TEMP_DIR = path.join(process.cwd(), "temp");

async function fetchCollectionProducts(slug) {
  const API_URL = `${BASE_URL}/api/v1/core/collections/${slug}/products`;
  console.log(`[Pre-build] Fetching ${slug} collection from: ${API_URL}`);
  
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    console.warn(`[Pre-build] Could not fetch ${slug}, using dummy data. Error: ${e.message}`);
    return { 
      slug,
      timestamp: new Date().toISOString(),
      products: [] 
    };
  }
}

async function fetchNewDrops() {
  return await fetchCollectionProducts("new-drops");
}

async function prebuild() {
  try {
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }

    const newDropsData = await fetchNewDrops();
    


    const FILE_PATH = path.join(TEMP_DIR, "new-drops.json");
    fs.writeFileSync(FILE_PATH, JSON.stringify(newDropsData.data, null, 2));
    console.log(`[Pre-build] Successfully created ${FILE_PATH}`);
  } catch (error) {
    console.error("[Pre-build] Failed:", error.message);
    process.exit(1);
  }
}

prebuild();
