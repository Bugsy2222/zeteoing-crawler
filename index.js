// index.js - Basic Web3/IPFS crawler for Render
const axios = require('axios');

async function crawlIPFS() {
  try {
    // Public IPFS gateway (free, no key)
    const gateway = 'https://ipfs.io/ipfs/';
    // Example known hash (Wikipedia mirror – replace with real targets later)
    const hash = 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco';

    console.log(`[${new Date().toISOString()}] Fetching IPFS content for hash: ${hash}`);
    const response = await axios.get(gateway + hash, {
  timeout: 10000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; Web3Crawler/1.0)"
  }
});
    const preview = response.data.substring(0, 500); // First 500 chars for log
    console.log('Content preview:', preview);

    // In future: save to database/file, index keywords, etc.
    console.log('Crawl cycle complete\n');
  } catch (error) {
    console.error('Crawl error:', error.message);
  }
}

// Run immediately, then every 60 seconds
crawlIPFS();
setInterval(crawlIPFS, 60000);
