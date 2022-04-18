window.onload = function() {
    checkAuthentication();

}

async function checkAuthentication() {
    let authenticatedUser = await fetch('http://localhost:3000/user/checkAuthentication').then(response => response.json());
    // if (!authenticatedUser) {
    await login('pravash', '1234')

    // }
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

    console.log($user)

}