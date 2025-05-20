const express = require('express');
const router = express.Router();
const { createBron } = require('../controllers/bron/bronController');
const { getAllBronlar } = require('../controllers/bron/bronController');
const { getOwnerBronlar } = require('../controllers/bron/bronController');

router.post('/create', createBron);
router.get('/all', getAllBronlar); 
router.get('/owner/:owner_id', getOwnerBronlar);
module.exports = router;
