const users = require('../data/users')
module.exports = class User {

    constructor(id, userName) {
        this.id = id
        this.userName = userName
    }

}