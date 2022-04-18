const Music = require('../models/music');

exports.getMusic = (req, res) => {

    res.status(200).json(Music.getMusic());
}