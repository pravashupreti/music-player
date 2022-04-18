let playlist = []
let authenticatedUser = null


window.onload = function() {
    checkAuthentication();

    // login 
    document.getElementById("login").onclick = function() {
        login(document.getElementById("username").value,
            document.getElementById("password").value).then(res => {
            console.log(res)
            if (res.id) {
                document.getElementById("username").value = ""
                document.getElementById("password").value = ""
                displaySearchBar()
                displaySongList(true)

            }

        })
    }

    // logout
    document.getElementById("logoutBtn").onclick = function() {
        logout().then(() => {
            displayLogin()
            displayMusicList(false)
        })
    }

}

async function checkAuthentication() {
    let user = await fetch('http://localhost:3000/user/checkAuthentication').then(response => response.json());

    if (user.id) {
        displaySearchBar()

        await getSongList().then(res => {
            renderSongList(res)
            displaySongList(true)
        })



        // await login('pravash', '1234')
    }
}

async function getSongList() {
    return await fetch('http://localhost:3000/songs').then(response => response.json());
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
            });
        }
        document.getElementById(`playSong${data.id}`).onclick = function(event) {
            playSong(res)
        }
    });


}

function removeFromPlayList() {

}

function playSong() {

}