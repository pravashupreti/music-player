const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/checkAuthentication', userController.checkAuthentication);

module.exports = router;