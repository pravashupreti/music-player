const User = require('../models/user');

exports.login = (req, res) => {
    $user = User.authenticate(req.body.userName, req.body.password)
    if ($user) {
        User.updateSession($user.id)
    }
    res.status(200).json($user);
}

exports.checkSession = (req, res, next) => {}