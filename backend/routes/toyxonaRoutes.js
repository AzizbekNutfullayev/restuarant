const express = require("express");
const router = express.Router();
const { toyxonalr } = require("../controllers/restuarant/toyxonani_qoshish");
const { viewToyxona } = require("../controllers/restuarant/viewToyxoan");
const { updateToyxona } = require("../controllers/restuarant/tahrirlashToyxona");
const { addToyxona } = require("../controllers/restuarant/addToyxonalar");

router.post("/",addToyxona); 
router.patch("/:id", updateToyxona);
router.post('/toyxona',toyxonalr)
router.get('/owner/:id', viewToyxona);

module.exports = router;
