let playlist = []
let shuffleBucket = []
let authenticatedUser = null
let playingSong

// Media player config
let playIn = "LOOP"




window.onload = function() {
    checkAuthentication();

    // login 
    document.getElementById("login").onclick = userLoginFn
    document.getElementById("userLoginForm").onsubmit = userLoginFn


    // logout
    document.getElementById("logoutBtn").onclick = function() {
        logout().then(() => {
            displayLogin()
            displayLandingPage(true)

            displaySongList(false)
            displayPlayList(false)
            displayMusicPlayer(false)

            // Reset all music player config
            const audio = document.getElementById('audio');
            audio.pause()
            audio.src = null
            playlist = []
            shuffleBucket = []
            authenticatedUser = null
            playingSong = undefined

        })
    }

    // search
    document.getElementById("searchSongBtn").onclick = musicSearchFn
    document.getElementById("searchSong").onkeyup = musicSearchFn

    // play song
    document.getElementById("playBtn").onclick = function() {
        const audio = document.getElementById('audio');
        if (audio.src) {
            audio.play();

            document.getElementById("playBtn").style.display = "none"
            document.getElementById("pauseBtn").style.display = "inline-block"

        }

    }
    document.getElementById("pauseBtn").onclick = function() {
        const audio = document.getElementById('audio');
        if (audio.src) {
            audio.pause();

            document.getElementById("playBtn").style.display = "inline-block"
            document.getElementById("pauseBtn").style.display = "none"

        }

    }

    document.getElementById("prevSongBtn").onclick = function() {

        if (playIn == "SHUFFLE") {
            playNewSong(getShuffledSong())
            return
        }


        if (playingSong) {

            let index = playlist.findIndex(x => x.id == playingSong.id)

            index--
            if (index >= 0) {
                playNewSong(playlist[index].id)
            } else {

                playNewSong(playlist[playlist.length - 1].id)
            }

        }

    }

    document.getElementById("nextSongBtn").onclick = function() {

        if (playIn == "SHUFFLE") {
            playNewSong(getShuffledSong())
            return
        }

        if (playingSong) {

            let index = playlist.findIndex(x => x.id == playingSong.id)

            index++
            if (index < playlist.length) {
                playNewSong(playlist[index].id)
            } else {

                playNewSong(playlist[0].id)
            }

        }


    }

    document.getElementById("playInLoop").onclick = function() {
        document.getElementById("playInLoop").style.display = "none"
        document.getElementById("playInShuffle").style.display = "inline-block"
        document.getElementById("playInRepetOnce").style.display = "none"
        playIn = "SHUFFLE"

    }
    document.getElementById("playInShuffle").onclick = function() {
        document.getElementById("playInLoop").style.display = "none"
        document.getElementById("playInShuffle").style.display = "none"
        document.getElementById("playInRepetOnce").style.display = "inline-block"
        playIn = "REPEAT_ONCE"
    }
    document.getElementById("playInRepetOnce").onclick = function() {
        document.getElementById("playInLoop").style.display = "inline-block"
        document.getElementById("playInShuffle").style.display = "none"
        document.getElementById("playInRepetOnce").style.display = "none"
        playIn = "LOOP"
    }

    document.getElementById('progressContainer').addEventListener('click', setProgressFn);


    const audio = document.getElementById('audio');
    audio.addEventListener('timeupdate', updateProgressFn);
    audio.addEventListener('timeupdate', updateTimeDurationFn);

    audio.addEventListener('ended', nextSongFn);


}

let nextSongFn = function(e) {

    if (playIn == "SHUFFLE") {
        playNewSong(getShuffledSong())
        return
    }
    if (playIn == "LOOP") {

        if (playingSong) {

            let index = playlist.findIndex(x => x.id == playingSong.id)

            index++
            if (index < playlist.length) {
                playNewSong(playlist[index].id)
            } else {

                playNewSong(playlist[0].id)
            }

        }
        return
    }

    if (playIn == "REPEAT_ONCE") {
        if (playingSong) {
            playNewSong(playingSong.id)
        }
    }
}

let setProgressFn = function(e) {
    const audio = document.getElementById('audio');

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

let updateTimeDurationFn = function(e) {

    const currTime = document.getElementById('currentTime');
    const durTime = document.getElementById("timeDuration")

    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = (currentTime == null) ? 0 :
        Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    // define seconds currentTime
    function get_sec(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);

    // change currentTime DOM
    currTime.innerHTML = min + ':' + sec;

    // define minutes duration
    let min_d = (isNaN(duration) === true) ? '0' :
        Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }

    // define seconds duration

    get_sec_d(duration);

    // change duration DOM
    durTime.innerHTML = min_d + ':' + sec_d;

}


let updateProgressFn = function(event) {
    let progress = document.getElementById('progress')

    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

}



let userLoginFn = function(event) {
    event.preventDefault();

    login(document.getElementById("username").value,
        document.getElementById("password").value).then(user => {

        if (user.id) {
            document.getElementById("username").value = ""
            document.getElementById("password").value = ""

            loadUserPage(user)

        } else {
            let loginMsgElement = document.getElementById("loginMsg")
            loginMsgElement.innerHTML = user.message
            loginMsgElement.style.display = "block"
        }

    })
}

let musicSearchFn = function() {
    let searchString = document.getElementById("searchSong").value
    searchSong(document.getElementById("searchSong").value).then((res) => {
        if (searchString) {
            document.getElementById("songListTableLabel").innerHTML = `Result of "${searchString}"`
        } else {
            document.getElementById("songListTableLabel").innerHTML = "Songs You may like"
        }
        renderSongList(res)
    })
}

async function loadUserPage(user) {
    displaySearchBar()



    await getSongList().then(res => {
        renderSongList(res)
    })



    await getPlayList().then(res => {
        playlist = res
        renderPlayList(res)
    })

    displayLandingPage(false)

    displaySongList(true)
    displayPlayList(true)

    displayMusicPlayer(true)

}

async function checkAuthentication() {
    let user = await fetch('http://localhost:3000/user/checkAuthentication').then(response => response.json());

    if (user.id) {
        await loadUserPage(user)
    }
}

async function getSongList() {
    return await fetch('http://localhost:3000/songs').then(response => response.json());
}

async function getPlayList() {
    return await fetch('http://localhost:3000/user/playlist').then(response => response.json());
}

async function searchSong(searchString) {
    let result = await fetch('http://localhost:3000/songs/search', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            searchString: searchString,
        })
    }).then(res => res.json());
    return result

}


async function login(userName, password) {

    let user = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    }).then(res => res.json());

    authenticatedUser = user

    return user

}

async function logout() {

    let user = await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        }
    })

}

function displaySearchBar() {
    document.getElementById('searchBar').style.display = "inline-block"
    document.getElementById('loginForm').style.display = "none"
}

function displayLogin() {
    document.getElementById('loginForm').style.display = "inline-block"
    document.getElementById('searchBar').style.display = "none"
}

function displaySongList(status) {
    if (status)
        document.getElementById("songList").style.display = "block"
    else
        document.getElementById("songList").style.display = "none"

}


function displayPlayList(status) {
    if (status)
        document.getElementById("playList").style.display = "block"
    else
        document.getElementById("playList").style.display = "none"

}


function displayMusicPlayer(status) {
    if (status)
        document.getElementById("musicPlayer").style.display = "block"
    else
        document.getElementById("musicPlayer").style.display = "none"

}


function displayLandingPage(status) {
    if (status)
        document.getElementById("welcomePage").style.display = "block"
    else
        document.getElementById("welcomePage").style.display = "none"
}


function renderSongList(songLists) {
    let songListDataElement = document.getElementById("songListData")
    let trHTML = '';
    songLists.forEach(data => {
        trHTML += `<tr> 
                    <td>${data.id}</td> 
                    <td>${data.title}</td> 
                    <td>${data.releaseDate}</td> 
                    <td>
                        <div class="add-action" id="addSongToPlaylist${data.id}" > </div>
                    </td> 
                </tr>`
    });
    songListDataElement.innerHTML = trHTML

    songLists.forEach(data => {
        document.getElementById(`addSongToPlaylist${data.id}`).onclick = function(event) {
            addToPlayList(`${data.id}`).then(res => {
                renderPlayList(res)
                playlist = res
            });

        }
    });

}

async function addToPlayList(songId) {

    let playlist = await fetch('http://localhost:3000/user/playlist/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            songId: songId
        })
    }).then(res => res.json());

    return playlist
}


function renderPlayList(songLists) {
    let playListDataElement = document.getElementById("playListData")
    let trHTML = '';
    songLists.forEach(data => {
        trHTML += `<tr> 
                    <td>${data.id}</td> 
                    <td>${data.title}</td> 
                    <td>
                        <div class="remove-action" id="removeSongFromPlaylist${data.id}" > </div>
                        <div class="play-action" id="playSong${data.id}" > </div>

                    </td> 
                </tr>`
    });
    playListDataElement.innerHTML = trHTML

    songLists.forEach(data => {
        document.getElementById(`removeSongFromPlaylist${data.id}`).onclick = function(event) {
            removeFromPlayList(`${data.id}`).then(res => {
                renderPlayList(res)
                playlist = res
            });
        }
        document.getElementById(`playSong${data.id}`).onclick = function(event) {
            playNewSong(`${data.id}`)
        }
    });


}

async function removeFromPlayList(songId) {

    let playlist = await fetch('http://localhost:3000/user/playlist/remove', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            songId: songId
        })
    }).then(res => res.json());

    return playlist

}

let currentPlayingSong;
let playListStyle

async function playNewSong(id) {

    const audio = document.getElementById('audio');

    let song = playlist.find(x => x.id == id)

    playingSong = song

    audio.src = `./musics/${song.fileName}`;
    audio.play();


    document.getElementById("playingSongTitle").innerHTML = song.title

    document.getElementById("playBtn").style.display = "none"
    document.getElementById("pauseBtn").style.display = "inline-block"
}

function getShuffledSong() {
    if (shuffleBucket.length == playlist.length)
        shuffleBucket = []
    while (true) {
        let selectedSong = playlist[Math.floor(Math.random() * playlist.length)]
        let findInBucket = shuffleBucket.find(x => x.id == selectedSong.id)

        if (!findInBucket) {
            shuffleBucket.push(selectedSong)
            return selectedSong.id
        }
    }
}