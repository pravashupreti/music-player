const User = require('../models/user');

exports.login = (req, res) => {
    let user = User.authenticate(req.body.userName, req.body.password)
    if (user.id) {
        user = User.updateSession(user.id)
        res.cookie('session', user.session, { maxAge: 1000 * 3600 });
        res.status(200).json(user);
    } else {
        res.status(403).json({
            message: "Username or password doesnot match"
        });
    }
}

exports.logout = (req, res) => {
    if (req.cookies.session) {
        let user = User.getUserFromSession(req.cookies.session)
        User.clearSession(user.id)
        res.status(200).json(user);

    } else {

        res.status(200).json({});

    }
}

exports.checkAuthentication = (req, res, next) => {

    if (req.cookies.session) {
        let user = User.getUserFromSession(req.cookies.session)
        res.status(200).json(user);

    } else {

        res.status(200).json({});

    }

}

exports.addSongToPlaylist = (req, res, next) => {

    if (req.cookies.session) {
        let user = User.getUserFromSession(req.cookies.session)
        if (user.id) {
            let playlist = User.addSongToPlaylist(req.body.songId, user.id)
            return res.status(200).json(playlist)
        } else {
            res.status(200).json({});

        }

    } else {

        res.status(200).json({});

    }

}

exports.removeSongFromPlaylist = (req, res, next) => {

    if (req.cookies.session) {
        let user = User.getUserFromSession(req.cookies.session)
        if (user.id) {
            let playlist = User.removeSongsFromPlaylist(req.body.songId, user.id)
            return res.status(200).json(playlist)
        } else {
            res.status(200).json({});

        }

    } else {

        res.status(200).json({});

    }

}

exports.getPlayList = (req, res) => {
    if (req.cookies.session) {
        let user = User.getUserFromSession(req.cookies.session)
        if (user.id) {
            let playlist = User.getPlayList(user.id)
            return res.status(200).json(playlist)
        } else {
            res.status(200).json({});

        }

    } else {

        res.status(200).json({});

    }
}