const axios = require("axios");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.voidthread.in";
const TEMP_DIR = path.join(process.cwd(), "temp");

function extractPayload(payload) {
  return payload?.data ?? payload ?? [];
}

async function fetchCollectionProducts(slug) {
  const API_URL = `${BASE_URL}/api/v1/core/collections/${slug}/products`;
  console.log(`[Pre-build] Fetching ${slug} collection from: ${API_URL}`);

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    console.warn(
      `[Pre-build] Could not fetch ${slug}, using empty data. Error: ${e.message}`,
    );
    return {
      slug,
      timestamp: new Date().toISOString(),
      products: [],
    };
  }
}

async function fetchAllCollections() {
  const API_URL = `${BASE_URL}/api/v1/core/collections`;
  console.log(`[Pre-build] Fetching all collections from: ${API_URL}`);

  try {
    const response = await axios.get(API_URL);

    console.log({response})

    return response.data;
  } catch (e) {
    console.warn(
      `[Pre-build] Could not fetch collections, using empty data. Error: ${e.message}`,
    );
    return { data: [] };
  }
}

async function fetchNewDrops() {
  return fetchCollectionProducts("new-drops");
}

async function fetchAllProducts() {
  const API_URL = `${BASE_URL}/api/v1/core/products`;
  console.log(`[Pre-build] Fetching all products from: ${API_URL}`);

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (e) {
    console.warn(
      `[Pre-build] Could not fetch all products, using empty data. Error: ${e.message}`,
    );
    return {
      timestamp: new Date().toISOString(),
      products: [],
    };
  }
}

function writeJsonFile(fileName, data) {
  const filePath = path.join(TEMP_DIR, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`[Pre-build] Successfully created ${filePath}`);
}

async function prebuild() {
  try {
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }

    const collectionsData = await fetchAllCollections();
    const collections = extractPayload(collectionsData);
    writeJsonFile("collections.json", collections);

    await Promise.all(
      collections.map(async (collection) => {
        const products = await fetchCollectionProducts(collection.slug);
        writeJsonFile(
          `${collection.slug}.json`,
          extractPayload(products),
        );
      }),
    );

    const newDropsData = await fetchNewDrops();
    const productsData = await fetchAllProducts();

    writeJsonFile("new-drops.json", extractPayload(newDropsData));
    writeJsonFile("products.json", extractPayload(productsData));
  } catch (error) {
    console.error("[Pre-build] Failed:", error.message);
    process.exit(1);
  }
}

prebuild();
