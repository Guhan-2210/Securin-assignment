require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/cve_db",
  NVD_API: process.env.NVD_API || "https://services.nvd.nist.gov/rest/json/cves/2.0",
  SYNC_INTERVAL: process.env.SYNC_INTERVAL || "* * * * *", // Midnight daily
  PORT: process.env.PORT || 3000
};
