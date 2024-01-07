// variables
const submitButton = document.getElementById("submitButton");
const inputEmail = document.getElementById("input-Email");
const inputPwd = document.getElementById("input-Pwd");
const emailError = document.getElementById("email_error");
const pwdError = document.getElementById("pwd_Error");
let emailValid = false;
let pwdValid = false;
const generalHomeURL = '../General-HomePage/GenHome.html';

// FUNCTIONS
// active button
function BtnActivate() {
    if (pwdValid == true && emailValid == true) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// EVENT LISTENERS
// email
inputEmail.addEventListener("focusout", (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    if (emailValue == "") {
        emailError.innerHTML = `<p>Email field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        emailValid = false;
    } else {
        emailValid = true;
        BtnActivate();
    }
})
inputEmail.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    emailError.innerHTML = "";
})

// password
inputPwd.addEventListener("focusout", (e) => {
    e.preventDefault();
    const pwdValue = inputPwd.value;
    if (pwdValue == "") {
        pwdError.innerHTML = `<p>Password field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        pwdValid = false;
    } else {
        pwdValid = true;
        BtnActivate();
    }
})
inputPwd.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    pwdError.innerHTML = "";
})

/*
EVENT LISTENERS - SUBMIT BUTTON
*/

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const postData = {
        "email": inputEmail.value,
        "password": inputPwd.value
    };

    const responseLogin = await login(postData);
    console.log(responseLogin);

    switch (responseLogin.status) {
        case 200:
            const responseToken = await token();
            
            switch (responseToken.status) {
                case 302:
                    
                    switch (responseToken.data.rank) {
                        case 'general':
                            
                            window.location.assign(generalHomeURL);
                            break;
                    
                        case 'publisher':
                            console.log("Ő egy publisher lesz");
                            break;
                    }
                    break;
            
                case 401:
                    console.error(responseToken.data);
                    break;
            }

            break;
        case 422:
            console.error(responseLogin.data);
            break;
    
    }

    
    inputEmail.value = '';
    inputPwd.value = '';
})

async function login() {
    const postData = {
        email: inputEmail.value,
        password: inputPwd.value
    };
    
    const response = await fetch('http://localhost:9990/webresources/User/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hálózati hiba: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Válasz a backendtől:', data);
    })
    .catch(error => {
        console.error('Hálózati hiba:', error);
    });
}

async function token(){
    const tokenResponese = await fetch('http://localhost:8080/webresources/user/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(tokenResponese =>{
        if (!tokenResponese.ok) {
            throw new Error('Hálózati hiba: ' + response.statusText);
        }

        return tokenResponese.json();
    })

    .then(data => {
        console.log("Válasz a backendtől: ", data);
    })

    .catch(error => {
        console.error('Hálózati hiba:', error);
    })
}