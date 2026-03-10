const axios = require('axios');

// List of working IPFS gateways (in order of preference)
const gateways = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://dweb.link/ipfs/',
  'https://w3s.link/ipfs/',
  'https://nftstorage.link/ipfs/'
];

async function crawlIPFS() {
  const hash = 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco';
  
  console.log(`[${new Date().toISOString()}] Fetching IPFS content for hash: ${hash}`);
  
  // Try each gateway until one works
  for (let i = 0; i < gateways.length; i++) {
    const gateway = gateways[i];
    
    try {
      console.log(`Trying gateway ${i + 1}/${gateways.length}: ${gateway}`);
      
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
      
      console.log(`✓ Success with gateway: ${gateway}`);
      console.log("Content preview:", preview);
      console.log("Content length:", content.length);
      console.log("Crawl cycle complete\n");
      
      return; // Success - exit function
      
    } catch (error) {
      console.error(`✗ Failed with gateway ${gateway}:`, error.message);
      
      // If this was the last gateway, log final failure
      if (i === gateways.length - 1) {
        console.error("All gateways failed. Will retry in next cycle.\n");
      }
    }
  }
}

// Run immediately
crawlIPFS();

// Then run every 60 seconds
setInterval(crawlIPFS, 60000);

console.log("IPFS crawler started. Running every 60 seconds...");
