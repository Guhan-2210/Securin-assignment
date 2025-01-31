const CVE = require("../models/cve.model");

exports.getCVEById = async (req, res) => {
  const cve = await CVE.findOne({ cveId: req.params.id });
  if (!cve) return res.status(404).json({ message: "CVE not found" });
  res.json(cve);
};

exports.getCVEByYear = async (req, res) => {

  const startDate = new Date(`${req.params.year}-01-01`);
  const endDate = new Date(`${req.params.year}-12-31`);
  const cves = await CVE.find({ publishedDate: { $gte: startDate, $lte: endDate } });
  res.json(cves);
};

exports.getCVEByScore = async (req, res) => {

  const min = parseFloat(req.params.min);
const max = parseFloat(req.params.max);

console.log(min, max); // Debugging check

const cves = await CVE.find({
  $or: [
    { "metrics.cvssMetricV2": { $elemMatch: { "cvssData.baseScore": { $gte: min, $lte: max } } } },
    { "metrics.cvssMetricV3": { $elemMatch: { "cvssData.baseScore": { $gte: min, $lte: max } } } }
  ]
});

console.log(cves); // Debugging check

  res.json(cves);
};

exports.getCVEByModifiedDate = async (req, res) => {
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - req.params.days);
  const cves = await CVE.find({ lastModifiedDate: { $gte: daysAgo } });
  res.json(cves);
};
