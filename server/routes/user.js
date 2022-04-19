const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/checkAuthentication', userController.checkAuthentication);

router.post('/playlist/add', userController.addSongToPlaylist);
router.post('/playlist/remove', userController.removeSongFromPlaylist);

router.get('/playlist', userController.getPlayList);

module.exports = router;