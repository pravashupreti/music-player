const express = require('express');
const musicController = require('../controllers/musicController');

const router = express.Router();


router.get('/', musicController.getMusic)
router.post('/search', musicController.search)

module.exports = router;