const mongoose = require("mongoose");
const cveSchema = new mongoose.Schema({
  cveId: { type: String, unique: true, required: true },
  identifier: String,
  description: String,
  publishedDate: Date,
  lastModifiedDate: Date,
  status: String,
  metrics: Object,
  references: [String],
  cpeMatch: [Object],
});

module.exports = mongoose.model("CVE", cveSchema);
