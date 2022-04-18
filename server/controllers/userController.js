const User = require('../models/user');

exports.login = (req, res) => {
    $user = User.authenticate(req.body.userName, req.body.password)
    if ($user) {
        $user = User.updateSession($user.id)
        res.cookie('session', $user.session, { maxAge: 1000 * 900 });
    }
    res.status(200).json($user);
}

exports.checkAuthentication = (req, res, next) => {

    if (req.cookies.session) {
        $user = User.getUserFromSession(req.cookies.session)
        res.status(200).json($user);

    } else {

        res.status(200).json({});

    }

}