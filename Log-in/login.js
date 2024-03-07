// variables
const submitButton = document.getElementById("submitButton");
const inputEmail = document.getElementById("inputEmail");
const inputPwd = document.getElementById("inputPwd");
const emailError = document.getElementById("emailError");
const pwdError = document.getElementById("pwdError");
const loginError = document.getElementById("loginError");
let emailValid = false;
let pwdValid = false;
const generalHomeURL = '../General-HomePage/GenHome.html';
const publisherHomeURL = '../Publisher-Home/PubHome.html';



// FUNCTIONS
// active button
function BtnActivate() {
    if (pwdValid == true && emailValid == true) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function validateEmail(email) {
    const specReg = /(?=.*[@])/;
    const match = email.match(specReg);
    
    if (!match) {
        return "Email address must contain the '@' symbol!";
    } else {
        const emailParts = email.split("@");

        if (emailParts.length === 1) {
            return "Email address must contain more than just the '@' symbol!";
        } else if (emailParts[0].length === 0) {
            return "Email address cannot be empty before '@' symbol!";
        } else if (emailParts[0].length < 4) {
            return "Please ensure you have at least 4 characters before the '@' symbol!";
        } else if (emailParts.length === 2 && email.charAt(email.length - 1) === '@') {
            return "Last part of email is missing or empty!";
        } else {
            const lastPart = emailParts[1];

            if (!lastPart.includes(".")) {
                return "Please enter '.' (period) after the '@' in your email address!";
            } else {
                const domainParts = lastPart.split(".");
                const beforeDot = domainParts[0];

                if (beforeDot.trim() === "" || beforeDot.length < 2) {
                    return "Please ensure you have at least 2 characters before the '.' (dot) symbol!";
                } else if (email.charAt(email.length - 1) === '.' || domainParts[1].length < 2) {
                    return "Please ensure you have at least 2 characters after the '.' (dot) symbol!";
                } else {
                    return null;
                }
            }
        }
    }
}

// EVENT LISTENERS
// email
inputEmail.addEventListener('input', (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    if (emailValue == "") {
        emailError.innerHTML = `<p>Email field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        emailValid = false;
    } else {
        e.target.style.background = "";
        e.target.style.border = "";
        emailError.innerHTML = "";
        loginError.innerHTML = "";
        emailValid = true;
        BtnActivate();
    }
})

inputEmail.addEventListener("focusout", (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    if (emailValue == "") {
        emailError.innerHTML = `<p>Email field cannot be empty.</p>`;
        e.target.style.border = "0.1125rem solid rgb(243, 82, 93)";
        e.target.style.background = "#FEEFEC";
        emailValid = false;
    } else {
        var error = validateEmail(emailValue);

        if (error !== null) {
            emailError.innerHTML = `<p>${error}</p>`;
            e.target.style.border = "0.1125rem solid rgb(243, 82, 93)";
            e.target.style.background = "#FEEFEC";
        } else {
            emailValid = true;
            e.target.style.background = "rgb(241, 255, 231)";
            e.target.style.border = "0.1125rem solid rgb(98, 173, 107)";

            BtnActivate();
        }
    } 
})
        
inputEmail.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    e.target.style.border = "";
    emailError.innerHTML = "";
    loginError.innerHTML = "";
    BtnActivate();
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
        e.target.style.background = "";
        e.target.style.border = "";
        pwdError.innerHTML = "";
        loginError.innerHTML = "";
        pwdValid = true;
        BtnActivate();
    }
})

inputPwd.addEventListener('focusout', (e) => {
    e.preventDefault();
    const pwdValue = inputPwd.value;
    if (pwdValue == "") {
        pwdError.innerHTML = `<p>Password field cannot be empty.</p>`;
        e.target.style.border = "0.1125rem solid rgb(243, 82, 93)";
        e.target.style.background = "#FEEFEC";
        pwdValid = false;
        BtnActivate();
    } else {
        pwdValid = true;
        e.target.style.background = "rgb(241, 255, 231)";
        e.target.style.border = "0.1125rem solid rgb(98, 173, 107)";
        BtnActivate();
    }
})

inputPwd.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    e.target.style.border = "";
    pwdError.innerHTML = "";
    loginError.innerHTML = "";
    BtnActivate();
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
                            window.location.assign(publisherHomeURL);
                            break;
                    }
                    break;

                case 401:
                    console.error(responseToken.data);
                    break;
            }

            break;
        case 422:
            loginError.innerHTML = "<p>" + responseLogin.data.loginError + "</p>";
            break;

    }
})