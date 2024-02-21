// variables
const submitButton = document.getElementById("submitButton");
const inputEmail = document.getElementById("inputEmail");
const inputPwd = document.getElementById("inputPwd");
let emailError = document.getElementById("emailError");
let pwdError = document.getElementById("pwdError");
let emailValid = false;
let pwdValid = false;

// FUNCTIONS
// active button
function BtnActivate(){
    if(pwdValid == true && emailValid == true){
        submitButton.disabled = false;
    }else{
        submitButton.disabled = true;
    }
}

// EVENT LISTENERS
// email
inputEmail.addEventListener("focusout", (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    if (emailValue == "") {
        emailError.innerHTML = `Email field cannot be empty.`;
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
    if(pwdValue == ""){
        pwdError.innerHTML = `Password field cannot be empty.`;
        e.target.style.background = "#FEEFEC";
        pwdValid = false;
    }else{
        pwdValid = true;
        BtnActivate();
    }
})
inputPwd.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    pwdError.innerHTML = "";
})

// ENDPOINT
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