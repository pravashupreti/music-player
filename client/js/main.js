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
            }

        })
    }

    // logout
    document.getElementById("logoutBtn").onclick = function() {
        logout().then(() => displayLogin())
    }

}

async function checkAuthentication() {
    let authenticatedUser = await fetch('http://localhost:3000/user/checkAuthentication').then(response => response.json());

    if (authenticatedUser.id) {
        displaySearchBar()

        // await login('pravash', '1234')
    }
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