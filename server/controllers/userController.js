const User = require('../models/user');

exports.login = (req, res) => {
    let user = User.authenticate(req.body.userName, req.body.password)
    if (user) {
        user = User.updateSession(user.id)
        res.cookie('session', user.session, { maxAge: 1000 * 3600 });
    }
    res.status(200).json(user);
}

exports.logout = (req, res) => {
    if (req.cookies.session) {
        let user = User.getUserFromSession(req.cookies.session)
        User.clearSession(user)
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