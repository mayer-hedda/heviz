// Switch profile type
var publisher = document.getElementById("Publisher");
var general = document.getElementById("General");

var birthdateDiv = document.getElementById("birthdate");
var companyNameDiv = document.getElementById("companyName");
var generalP = document.getElementById("GenP");
var publisherP = document.getElementById("PubP");

var button = document.getElementById("submitButton");
button.disabled = true;

var isPublisher = false;

function switchToPublisher() {
    isPublisher = true;

    birthdateDiv.hidden = true;
    companyNameDiv.hidden = false;

    publisherP.hidden = false;
    generalP.hidden = true;

    // Az aktív gombhoz tartozó osztályok kezelése
    publisher.classList.add("active-btn");
    general.classList.add("disabled-btn");

    publisher.classList.remove("disabled-btn");
    general.classList.remove("active-btn");
}

function switchToGeneral() {
    isPublisher = false;

    birthdateDiv.hidden = false;
    companyNameDiv.hidden = true;

    publisherP.hidden = true;
    generalP.hidden = false;

    // Az aktív gombhoz tartozó osztályok kezelése
    general.classList.add("active-btn");
    publisher.classList.add("disabled-btn");

    general.classList.remove("disabled-btn");
    publisher.classList.remove("active-btn");
}

publisher.addEventListener("click", (e) => {
    e.preventDefault();
    switchToPublisher();
})

general.addEventListener("click", (e) => {
    e.preventDefault();
    switchToGeneral();
})


// Check registration details
var firstName = document.getElementById("inputFirst");
var lastName = document.getElementById("inputLast");
var username = document.getElementById("inputUser");
var email = document.getElementById("inputEmail");
var password = document.getElementById("inputPwd");
var passwordAgain = document.getElementById("inputPwdAgain");
var aszf = document.getElementById("checkAszf");
var companyName = document.getElementById("inputCompany");
var birthdate = document.getElementById("datepicker");

var firstNameError = document.getElementById("firstNameError");
var lastNameError = document.getElementById("lastNameError");
var usernameError = document.getElementById("usernameError");
var emailError = document.getElementById("emailError");
var birthdateError = document.getElementById("birthdateError");
var companyNameError = document.getElementById("companyNameError");
var firstPwdError = document.getElementById("firstPwdError");
var lastPwdError = document.getElementById("lastPwdError");
var aszfError = document.getElementById("aszfError");
var registerError = document.getElementById("registerError");


// first name
function checkFirstName(firstName) {
    if(!firstName || firstName.trim() === "") {
        return "<p>The first name field cannot be empty!</p>";
    } else if(!/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ].*$/.test(firstName)) {
        return "<p>The first name can only start with a letter!</p>";
    } else if(firstName.length < 3) {
        return "<p>First name must be at least 3 character long!</p>";
    } else if(firstName.length > 50) {
        return "<p>The first name cannot be longer than 50 characters!</p>";
    } else {
        return true;
    }
}

firstName.addEventListener("focusin", () => {
    firstNameError.innerHTML = "";
    firstName.classList.remove("bad");
    firstName.classList.remove("correct");
})
firstName.addEventListener("focusout", () => {
    var result = checkFirstName(firstName.value);
    if(result !== true) {
        firstName.classList.add("bad");
        firstNameError.innerHTML = result;
    } else {
        firstName.classList.add("correct");
    }

    checkDetails();
})

// last name
function checkLastName(lastName) {
    if(!lastName || lastName.trim() === "") {
        return "<p>The last name field cannot be empty!</p>";
    } else if(!/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ].*$/.test(lastName)) {
        return "<p>The last name can only start with a letter!</p>";
    } else if(lastName.length < 3) {
        return "<p>Last name must be at least 3 character long!</p>";
    } else if(lastName.length > 50) {
        return "<p>The last name cannot be longer than 50 characters!</p>";
    } else {
        return true;
    }
}

lastName.addEventListener("focusin", () => {
    lastNameError.innerHTML = "";
    lastName.classList.remove("bad");
    lastName.classList.remove("correct");
})
lastName.addEventListener("focusout", () => {
    var result = checkLastName(lastName.value);
    if(result !== true) {
        lastName.classList.add("bad");
        lastNameError.innerHTML = result;
    } else {
        lastName.classList.add("correct");
    }

    checkDetails();
})

// username
function checkUsername(username) {
    if(!username || username.trim() === "") {
        return "<p>The username field cannot be empty!</p>";
    } else if(!/^[a-z].*$/.test(username)) {
        return "<p>Username must start with a lowercase letter!</p>";
    } else if(username.length < 3) {
        return "<p>Username must be at least 3 characters long!</p>";
    } else if(username.length > 50) {
        return "<p>The username cannot be longer than 50 characters!</p>";
    } else if(!username.match("^[a-zA-Z0-9._]*$")) {
        return "<p>Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)!</p>"
    } else {
        return true;
    }
}

username.addEventListener("focusin", () => {
    usernameError.innerHTML = "";
    username.classList.remove("bad");
    username.classList.remove("correct");
})
username.addEventListener("focusout", () => {
    var result = checkUsername(username.value);
    if(result !== true) {
        username.classList.add("bad");
        usernameError.innerHTML = result;
    } else {
        username.classList.add("correct");
    }

    checkDetails();
})

// email
function checkEmail(email) {
    if (!email || email.trim() === '') {
        return "<p>The email field cannot be empty!</p>";
    } else {
        var specReg = /(?=.*[@])/;
        if (!specReg.test(email)) {
            return "<p>Email address must contain the '@' symbol!</p>";
        } else {
            var emailParts = email.split("@");
    
            if (emailParts.length === 1) {
                return "<p>Email address must contain more than just the '@' symbol!</p>";
            } else {
                if (emailParts[0].length === 0) {
                    return "<p>Email address cannot be empty before '@' symbol!</p>";
                } else if (emailParts[0].length < 4) {
                    return "<p>Please ensure you have at least 4 characters before the '@' symbol!</p>";
                } else if (emailParts.length === 1 && email.charAt(email.length - 1) === '@') {
                    return "<p>Last part of email is missing or empty!</p>";
                } else {
                    var lastPart = emailParts[1];
    
                    if (!lastPart.includes(".")) {
                        return "<p>Please enter '.' (period) after the '@' in your email address!</p>";
                    } else {
                        var domainParts = lastPart.split(".");
                        var beforeDot = domainParts[0];
    
                        if (beforeDot.trim() === '' || beforeDot.length < 2) {
                            return "<p>Please ensure you have at least 2 characters before the '.' (dot) symbol!</p>";
                        } else if (email.charAt(email.length - 1) === '.' || domainParts[1].length < 2) {
                            return "<p>Please ensure you have at least 2 characters after the '.' (dot) symbol!</p>";
                        } else {
                            return true;
                        }
                    }
                }
            }
        }
    }
}

email.addEventListener("focusin", () => {
    emailError.innerHTML = "";
    email.classList.remove("bad");
    email.classList.remove("correct");
})
email.addEventListener("focusout", () => {
    var result = checkEmail(email.value);
    if(result != true) {
        email.classList.add("bad");
        emailError.innerHTML = result;
    } else {
        email.classList.add("correct");
    }

    checkDetails();
})

// password
function checkPassword(password) {
    var kisbetuRegex = /[a-z]/;
    var nagybetuRegex = /[A-Z]/;
    var szamRegex = /[0-9]/;
    var specialisKarakterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if(!password || password.trim() === "") {
        return "<p>The password field cannot be empty!</p>";
    } else if(password.length < 8) {
        return "<p>Password must be at least 8 characters long!</p>";
    } else if(password.length > 100) {
        return "<p>The password cannot be longer than 100 characters!</p>";
    } else if (!kisbetuRegex.test(password) || !nagybetuRegex.test(password) || !szamRegex.test(password) || !specialisKarakterRegex.test(password)) {
        return "<p>The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!</p>";
    } else {
        return true;
    }
}
function matchPasswords(password, passwordAgain) {
    if(password === passwordAgain) {
        return true;
    }
    
    return "<p>The passwords do not match!</p>";
}

password.addEventListener("focusin", () => {
    firstPwdError.innerHTML = "";
    password.classList.remove("bad");
    password.classList.remove("correct");
})
password.addEventListener("focusout", () => {
    var result = checkPassword(password.value);
    if(result !== true) {
        password.classList.add("bad");
        firstPwdError.innerHTML = result;
    } else {
        password.classList.add("correct");
    }

    checkDetails();
})

passwordAgain.addEventListener("focusin", () => {
    lastPwdError.innerHTML = "";
    passwordAgain.classList.remove("bad");
    passwordAgain.classList.remove("correct");

    if(checkPassword(password.value) === true) {
        password.classList.remove("bad");
        password.classList.add("correct");
    }
})
passwordAgain.addEventListener("focusout", () => {
    var result = matchPasswords(password.value, passwordAgain.value);
    if(result != true) {
        password.classList.add("bad");
        password.classList.remove("correct");
        passwordAgain.classList.add("bad");
        lastPwdError.innerHTML = result;
    } else {
        if(checkPassword(password.value) === true ) {
            password.classList.add("correct");
            passwordAgain.classList.add("correct");
        } else {
            password.classList.add("bad");
            passwordAgain.classList.add("bad");
        }
        
    }

    checkDetails();
})

// aszf
function checkAszf(aszf) {
    if(!aszf.checked) {
        return "<p>You must agree to the terms and conditions!</p>";
    } else {
        return true;
    }
}

aszf.addEventListener("click", () => {
    var result = checkAszf(aszf);
    if(result !== true) {
        aszfError.innerHTML = result;
    } else {
        aszfError.innerHTML = "";
    }

    checkDetails();
})

// company name
function checkCompanyName(companyName) {
    if(!companyName || companyName.trim() === "") {
        return "<p>The company name field cannot be empty!</p>";
    } else if(companyName.length > 50) {
        return "<p>The company name cannot be longer than 50 characters!</p>";
    } else {
        return true;
    }
}

companyName.addEventListener("focusin", () => {
    companyNameError.innerHTML = "";
    companyName.classList.remove("bad");
    companyName.classList.remove("correct");
})
companyName.addEventListener("focusout", () => {
    var result = checkCompanyName(companyName.value);
    if(result !== true) {
        companyName.classList.add("bad");
        companyNameError.innerHTML = result;
    } else {
        companyName.classList.add("correct");
    }

    checkDetails();
})

// birthdate
var minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 100);
var minDateString = minDate.toISOString().slice(0, 10);

birthdate.setAttribute('min', minDateString);

var maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 15);
var maxDateString = maxDate.toISOString().slice(0, 10);

birthdate.setAttribute('max', maxDateString);

function checkBirthdate(birthdate) {
    if (!birthdate.value || birthdate.value.trim() === '') {
        return "The birthdate field cannot be empty!";
    } else {
        var date = new Date(birthdate.value);

        if (isNaN(date.getTime())) {
            return "Invalid birthdate format!";
        } else {
            var now = new Date();

            if (date.getTime() >= now.getTime()) {
                return "Invalid birthdate format!";
            } else {
                var ageDiff = now.getFullYear() - date.getFullYear();
                var birthdateThisYear = new Date(now.getFullYear(), date.getMonth(), date.getDate());

                if (birthdateThisYear.getTime() > now.getTime()) {
                    ageDiff--;
                }

                if (ageDiff < 15) {
                    return "You are too young!";
                } else {
                    return true;
                }
            }
        }
    }
}

birthdate.addEventListener("focusin", () => {
    birthdateError.innerHTML = "";
    birthdate.classList.remove("bad");
    birthdate.classList.remove("correct");
})
birthdate.addEventListener("focusout", () => {
    var result = checkBirthdate(birthdate);
    if(result !== true) {
        birthdate.classList.add("bad");
        birthdateError.innerHTML = result;
    } else {
        birthdate.classList.add("correct");
    }

    checkDetails();
})


function checkDetails() {
    if(isPublisher === false) {
        if(checkFirstName(firstName.value) === true && checkLastName(lastName.value) === true && checkUsername(username.value) === true && checkEmail(email.value) === true && checkBirthdate(birthdate) === true && checkPassword(password.value) === true && matchPasswords(password.value, passwordAgain.value) === true && checkAszf(aszf) === true) {
            button.disabled = false;

            button.addEventListener("click", async (e) => {
                e.preventDefault();

                var postData = {
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "username": username.value,
                    "email": email.value,
                    "birthdate": birthdate.value,
                    "password": password.value,
                    "aszf": true
                }

                var response = await generalRegistration(postData);

                if(response.status == 200) {
                    window.location.href = '../Log-in/login.html';
                } else if(response.status == 409) {
                    registerError.innerHTML = "<p>This email address or username is already taken!</p>";
                } else if(response.status == 422) {
                    if (response.data.hasOwnProperty("firstNameError")) {
                        firstNameError.innerHTML = `<p>${response.data.firstNameError}</p>`;
                    } else if(response.data.hasOwnProperty("lastNameError")) {
                        lastNameError.innerHTML = `<p>${response.data.lastNameError}</p>`;
                    } else if(response.data.hasOwnProperty("usernameError")) {
                        usernameError.innerHTML = `<p>${response.data.usernameError}</p>`;
                    } else if(response.data.hasOwnProperty("emailError")) {
                        emailError.innerHTML = `<p>${response.data.emailError}</p>`;
                    } else if(response.data.hasOwnProperty("birthdateError")) {
                        birthdateError.innerHTML = `<p>${response.data.birthdateError}</p>`;
                    } else if(response.data.hasOwnProperty("passwordError")) {
                        firstPwdError.innerHTML = `<p>${response.data.passwordError}</p>`;
                    } else if(response.data.hasOwnProperty("aszfError")) {
                        aszfError.innerHTML = `<p>${response.data.aszfError}</p>`;
                    }
                } else {
                    console.log(response.error);
                }
            })
        } else {
            button.disabled = true;
        }
    } else {
        if(checkFirstName(firstName.value) === true && checkLastName(lastName.value) === true && checkUsername(username.value) === true && checkEmail(email.value) === true && checkCompanyName(companyName.value) === true && checkPassword(password.value) === true && matchPasswords(password.value, passwordAgain.value) === true && checkAszf(aszf) === true) {
            button.disabled = false;

            button.addEventListener("click", async (e) => {
                e.preventDefault();

                var postData = {
                    "firstName": "",
                    "lastName": lastName.value,
                    "username": username.value,
                    "email": email.value,
                    "companyName": companyName.value,
                    "password": password.value,
                    "aszf": true
                }

                var response = await publisherRegistration(postData);

                if(response.status == 200) {
                    window.location.href = '../Log-in/login.html';
                } else if(response.status == 409) {
                    registerError.innerHTML = "<p>This email address or username is already taken!</p>";
                } else if(response.status == 422) {
                    if (response.data.hasOwnProperty("firstNameError")) {
                        firstNameError.innerHTML = `<p>${response.data.firstNameError}</p>`;
                    } else if(response.data.hasOwnProperty("lastNameError")) {
                        lastNameError.innerHTML = `<p>${response.data.lastNameError}</p>`;
                    } else if(response.data.hasOwnProperty("usernameError")) {
                        usernameError.innerHTML = `<p>${response.data.usernameError}</p>`;
                    } else if(response.data.hasOwnProperty("emailError")) {
                        emailError.innerHTML = `<p>${response.data.emailError}</p>`;
                    } else if(response.data.hasOwnProperty("companyNameError")) {
                        companyNameError.innerHTML = `<p>${response.data.companyNameError}</p>`;
                    } else if(response.data.hasOwnProperty("passwordError")) {
                        firstPwdError.innerHTML = `<p>${response.data.passwordError}</p>`;
                    } else if(response.data.hasOwnProperty("aszfError")) {
                        aszfError.innerHTML = `<p>${response.data.aszfError}</p>`;
                    }
                } else {
                    console.log(response.error);
                }
            })
        } else {
            button.disabled = true;
        }
    }
}