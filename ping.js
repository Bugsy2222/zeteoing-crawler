const fetch = require("node-fetch");

// Replace this with your app URL
const APP_URL = "https://your-app-name.onrender.com";

async function ping() {
  try {
    const res = await fetch(APP_URL);
    console.log(`Pinged ${APP_URL}: ${res.status}`);
  } catch (err) {
    console.error("Error pinging:", err);
  }
}

// Ping every 10 minutes
setInterval(ping, 600000);

// Run immediately once
ping();
