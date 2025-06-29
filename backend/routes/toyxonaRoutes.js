const express = require("express");
const router = express.Router();
const { toyxonalr } = require("../controllers/restuarant/toyxonani_qoshish");
const { viewToyxona } = require("../controllers/restuarant/viewToyxoan");
const { updateToyxona } = require("../controllers/restuarant/tahrirlashToyxona");
const { addToyxona } = require("../controllers/restuarant/addToyxonalar");
const { uploadToyxonaImage } = require("../controllers/restuarant/imgUplodes");
const authMiddleware = require("../middleware/authentication");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { getImgs } = require("../controllers/restuarant/getimg");

router.post("/",addToyxona); 
router.patch("/:id", updateToyxona);
router.post('/toyxona',toyxonalr)
router.get('/owner/:id', viewToyxona);
router.post("/upload-image", authMiddleware, uploadMiddleware, uploadToyxonaImage);
router.get('/getImg/:id', getImgs);

module.exports = router;
