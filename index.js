const axios = require('axios');

async function crawlIPFS() {
  try {
    const gateway = 'https://ipfs.io/ipfs/';
    const hash = 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco';

    console.log(`[${new Date().toISOString()}] Fetching IPFS content for hash: ${hash}`);

    const response = await axios.get(gateway + hash, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/json",
        "Connection": "keep-alive"
      }
    });

    const content = typeof response.data === "string"
      ? response.data
      : JSON.stringify(response.data);

    const preview = content.substring(0, 500);
    console.log("Content preview:", preview);

    console.log("Crawl cycle complete\n");

  } catch (error) {
    console.error("Crawl error:", error.message);
  }
}

crawlIPFS();
setInterval(crawlIPFS, 60000);
