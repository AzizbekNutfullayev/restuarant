// routes/toyxonaRoutes.js

const express = require("express");
const router = express.Router();
const { getToyxonalar } = require("../controllers/toyxonaController");
const { toyxonalr } = require("../controllers/restuarant/toyxonani_qoshish");

router.get("/", getToyxonalar);
router.post('/toyxona',toyxonalr)

module.exports = router;
