const express = require("express");
const connectDB = require("./config/database");
const cveRoutes = require("./routes/cve.routes");
const cron = require("node-cron");
require("dotenv").config();
const cors = require("cors");
const { PORT } = require("./config/env");
const { syncAllCVEData } = require("./services/cve.service");
const { SYNC_INTERVAL } = require("./config/env");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/cve", cveRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

cron.schedule(SYNC_INTERVAL, async () => {
  console.log("Running CVE data sync...");
  await syncAllCVEData();
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
