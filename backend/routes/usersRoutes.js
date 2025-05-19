const express = require("express");
const { getToyxonalar } = require("../controllers/users/toyxonaController");
const router = express.Router();

router.get("/",getToyxonalar);


module.exports = router;
