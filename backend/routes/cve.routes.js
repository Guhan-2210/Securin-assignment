const express = require("express");
const router = express.Router();
const cveController = require("../controllers/cve.controller");

/**
 * @swagger
 * /cve/{id}:
 *   get:
 *     summary: Retrieve a CVE by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The CVE ID
 *     responses:
 *       200:
 *         description: A CVE object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cveId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 publishedDate:
 *                   type: string
 *                   format: date-time
 *                 lastModifiedDate:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: CVE not found
 */
router.get("/:id", cveController.getCVEById);

/**
 * @swagger
 * /cve/year/{year}:
 *   get:
 *     summary: Retrieve CVEs by year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *         description: The year to filter CVEs
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: A list of CVEs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cves:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalRecords:
 *                   type: integer
 */
router.get("/year/:year", cveController.getCVEByYear);

/**
 * @swagger
 * /cve/score/{min}/{max}:
 *   get:
 *     summary: Retrieve CVEs by score range
 *     parameters:
 *       - in: path
 *         name: min
 *         required: true
 *         schema:
 *           type: number
 *         description: Minimum CVSS score
 *       - in: path
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum CVSS score
 *     responses:
 *       200:
 *         description: A list of CVEs within the score range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/score/:min/:max", cveController.getCVEByScore);

/**
 * @swagger
 * /cve/modified/{days}:
 *   get:
 *     summary: Retrieve CVEs modified in the last number of days
 *     parameters:
 *       - in: path
 *         name: days
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of days to look back for modified CVEs
 *     responses:
 *       200:
 *         description: A list of recently modified CVEs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/modified/:days", cveController.getCVEByModifiedDate);

module.exports = router;
