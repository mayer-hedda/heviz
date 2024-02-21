// variables
const submitButton = document.getElementById("submitButton");
const inputEmail = document.getElementById("inputEmail");
const inputPwd = document.getElementById("inputPwd");
const emailError = document.getElementById("emailError");
const pwdError = document.getElementById("pwdError");
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
inputPwd.addEventListener('input', (e) => {
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
                            window.location.assign('../Profile/profile.html');
                            // console.log("Ő egy publisher lesz");
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
}