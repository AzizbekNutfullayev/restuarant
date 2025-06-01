const express = require("express");
const { getToyxonalar } = require("../controllers/users/toyxonaController");
const { route } = require("./toyxonaRoutes");
const { getToyxonalarImage } = require("../controllers/users/getImgtouxona");
const router = express.Router();

router.get("/",getToyxonalar);
router.get('/img',getToyxonalarImage)

module.exports = router;
