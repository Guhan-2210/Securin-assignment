const axios = require("axios");
const CVE = require("../models/cve.model");
const { NVD_API } = require("../config/env");

async function fetchCVEData(startIndex = 0, resultsPerPage = 1000) {
  try {
    const { data } = await axios.get(NVD_API, {
      params: { startIndex, resultsPerPage },
    });

    if (data.vulnerabilities) {
      const cveEntries = data.vulnerabilities.map((item) => ({
        cveId: item.cve.id,
        identifier: item.cve.sourceIdentifier,
        description: item.cve.descriptions?.[0]?.value || "No description",
        publishedDate: new Date(item.cve.published),
        lastModifiedDate: new Date(item.cve.lastModified),
        status: item.cve.vulnStatus,
        metrics: item.cve.metrics,
        references: item.cve.references?.map((ref) => ref.url) || [],
        cpeMatch:
          item.cve.configurations?.flatMap((config) =>
            config.nodes?.flatMap((node) => node.cpeMatch || [])
          ) || [],
      }));

      for (const entry of cveEntries) {
        await CVE.updateOne({ cveId: entry.cveId }, entry, { upsert: true });
      }

      console.log(`Inserted/Updated ${cveEntries.length} records`);
    }
  } catch (error) {
    console.error("Error fetching CVE data:", error.message);
  }
}

async function syncAllCVEData() {
  let startIndex = 0,
    resultsPerPage = 1000;
  while (true) {
    await fetchCVEData(startIndex, resultsPerPage);
    startIndex += resultsPerPage;
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Avoid API rate limits
  }
}

module.exports = { syncAllCVEData };
