const express = require('express');
const router = express.Router();

const { addToyxonaAdmin } = require('../controllers/admin/AddtoyxonalarAdmin');
const { getAllToyxonalar } = require('../controllers/admin/getOlltoyxona');



router.post("/adminToyxona", addToyxonaAdmin);
router.get('/getAlltoyxona',getAllToyxonalar)

module.exports = router;
