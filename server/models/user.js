const users = require('../data/users')
const musics = require('../data/musics')
const crypto = require('crypto');


module.exports = class User {

    constructor(id, userName) {
        this.id = id
        this.userName = userName
        this.playlist = []
    }

    static authenticate(userName, password) {
        let index = users.findIndex(x => x.userName == userName && x.password === crypto.createHash('md5').update(password).digest('hex'))
        if (index < 0) return {}

        return users[index]
    }

    static updateSession(userId) {
        let userIndex = users.findIndex((user, index) => user.id == userId)
        if (userIndex < 0) return {}
        users[userIndex].session = Date.now() + users[userIndex].userName

        return {
            id: users[userIndex].id,
            userName: users[userIndex].userName,
            session: users[userIndex].session,
        }

    }

    static getUserFromSession(session) {
        let userIndex = users.findIndex((user, index) => user.session === session)
        if (userIndex < 0) return {}
        return {
            id: users[userIndex].id,
            userName: users[userIndex].userName,
        }
    }

    static clearSession(userId) {

        let userIndex = users.findIndex((user, index) => user.id === userId)
        if (userIndex < 0) return {}
        users[userIndex].session = null
        return {
            id: users[userIndex].id,
            userName: users[userIndex].userName,
        }

    }

    static removeSongsFromPlaylist(songId, userId) {
        let userIndex = users.findIndex((user, index) => user.id === userId)
        if (userIndex < 0) return {}
        let playlistIndex = users[userIndex].playlist.findIndex(x => x == songId)

        users[userIndex].playlist.splice(playlistIndex, 1)

        return User.getPlayList(userId)
    }

    static addSongToPlaylist(songId, userId) {

        let userIndex = users.findIndex((user, index) => user.id === userId)
        if (userIndex < 0) return {}

        users[userIndex].playlist.find(x => x == songId) ? '' : users[userIndex].playlist.push(songId)

        return User.getPlayList(userId)


    }

    static getPlayList(userId) {
        let userIndex = users.findIndex((user, index) => user.id === userId)
        if (userIndex < 0) return {}

        let playlist = users[userIndex].playlist.map(x => {
            let songIndex = musics.findIndex(y => y.id == x)
            if (songIndex < 0) return {}
            return musics[songIndex]
        }).filter(z => z.id ? true : false)

        return playlist
    }

}