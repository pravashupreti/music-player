const express = require('express');
const musicController = require('../controllers/musicController');

const router = express.Router();


router.get('/', musicController.getMusic);

module.exports = router;