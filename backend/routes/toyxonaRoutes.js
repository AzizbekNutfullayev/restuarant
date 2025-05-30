const express = require("express");
const router = express.Router();
const { toyxonalr } = require("../controllers/restuarant/toyxonani_qoshish");
const { viewToyxona } = require("../controllers/restuarant/viewToyxoan");
const { updateToyxona } = require("../controllers/restuarant/tahrirlashToyxona");
const { addToyxona } = require("../controllers/restuarant/addToyxonalar");
const authMiddleware = require("../middleware/authentication");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { uploadToyxonaImages } = require("../controllers/restuarant/imgUplodes");

router.post("/",addToyxona); 
router.patch("/:id", updateToyxona);
router.post('/toyxona',toyxonalr)
router.get('/owner/:id', viewToyxona);
router.post("/upload-images", authMiddleware, uploadMiddleware, uploadToyxonaImages);

module.exports = router;
