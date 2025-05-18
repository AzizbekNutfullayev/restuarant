// routes/toyxonaRoutes.js

const express = require("express");
const router = express.Router();
const { getToyxonalar } = require("../controllers/toyxonaController");
const { toyxonalr } = require("../controllers/restuarant/toyxonani_qoshish");
const { viewToyxona } = require("../controllers/restuarant/viewToyxoan");
const { addToyxona } = require("../controllers/toyxonaController");

router.post("/", addToyxona); 

router.get("/", getToyxonalar);
router.post('/toyxona',toyxonalr)
router.get('/owner/:id', viewToyxona);

module.exports = router;
