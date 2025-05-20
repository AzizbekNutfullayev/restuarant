const express = require('express');
const router = express.Router();
const { createBron } = require('../controllers/bron/bronController');

router.post('/create', createBron);

module.exports = router;
