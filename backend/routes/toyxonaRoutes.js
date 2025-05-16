// routes/toyxonaRoutes.js

const express = require("express");
const router = express.Router();
const { getToyxonalar } = require("../controllers/toyxonaController");

router.get("/", getToyxonalar);

module.exports = router;
