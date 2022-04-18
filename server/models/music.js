const musics = require('../data/musics')

module.exports = class Music {

    constructor(id, title, releaseDate) {
        this.id = id
        this.title = this.title
        this.releaseDate = releaseDate
    }

    static getMusic() {
        return musics
    }
}