const playlists = require('../data/playlists')
module.exports = class Playlist {
    constructor(userId, musicId = []) {
        this.userId = userId
        this.musicId = musicId
    }

}