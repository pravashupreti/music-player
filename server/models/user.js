const users = require('../data/users')
const crypto = require('crypto');


module.exports = class User {

    constructor(id, userName) {
        this.id = id
        this.userName = userName
    }

    static authenticate(userName, password) {
        return users.filter(x => x.userName == userName && x.password === crypto.createHash('md5').update(password).digest('hex'))
    }

    static updateSession(userId) {
        let userIndex = users.findIndex((user, index) => user.id === userId)
        users[userIndex].session = Date.now() + users[userIndex].userName

        return users[userIndex]

    }


}