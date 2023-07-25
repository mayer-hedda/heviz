
// *
// !
// TODO
//?

// Flatpickr inicializálás --> dátum választóhoz, hogy tudjam szerkeszteni css-ben
// flatpickr("#datepicker", {
//      Itt állíthatod be a testreszabásokat a dátumválasztóhoz
//     theme: "DatePlaceholder" // Adj meg egy egyedi osztálynevet a saját témádnak
// });

/*
function valami() {
    if (seged === true) {
         Itt megváltoztathatod a témát vagy hozzáadhatsz egy CSS osztályt az elemhez
         Például, ha egy HTML elemnek adnál hozzá egy CSS osztályt, így teheted meg:
        document.getElementById("elem-id").classList.add("ez-egy-css-osztaly");
    } else {
        seged2 = false;
    }
}
*/

// FOR CHANGE WHAT PROFILE ARE YOU WANT TO REGISTER
const General = document.getElementById("General");
const Publisher = document.getElementById("Publisher");
let GenP = document.getElementById("GenP");
let PubP = document.getElementById("PubP");

let names = document.getElementById("names");
let birthDate = document.getElementById("birthDate");
let company = document.getElementById("company");

let GenSeged = false;

//Swith to general inputs
General.addEventListener("click", (e) => {
    e.preventDefault();
    //switch to invisible
    company.hidden = true;
    names.hidden = true;
    PubP.hidden = true;

    //switch to visable 
    birthDate.hidden = false;
    GenP.hidden = false;

    //class remove
    General.classList.remove("disabled-btn");
    Publisher.classList.remove("active-btn");
    //add class
    General.classList.add("active-btn");
    Publisher.classList.add("disabled-btn");
})

// Swith to publisher inputs
Publisher.addEventListener("click", (e) => {
    e.preventDefault();
    //switch to invisible
    birthDate.hidden = true;
    GenP.hidden = true;

    //switch to visable 
    names.hidden = false;
    company.hidden = false;
    PubP.hidden = false;

    //class remove
    Publisher.classList.remove("disabled-btn");
    General.classList.remove("active-btn");
    //add class
    Publisher.classList.add("active-btn");
    General.classList.add("disabled-btn");
})

//*INPUTS FOR VALIDATION
const inputFirst = document.getElementById("inputFirst");
const inputLast = document.getElementById("inputLast");
const inputUser = document.getElementById("inputUser");
const inputEmail = document.getElementById("inputEmail");
const datepicker = document.getElementById("datepicker");
const inputCompany = document.getElementById("inputCompany");
const inputPwd = document.getElementById("inputPwd");
const inputPwdAgain = document.getElementById("inputPwdAgain");

//*ERRORS
let firstError = document.getElementById("firstError");
let lastError = document.getElementById("lastError");
let userError = document.getElementById("userError");
let emailError = document.getElementById("emailError");
let birthError = document.getElementById("birthError");
let companyError = document.getElementById("companyError");
let firstPwdError = document.getElementById("firstPwdError");
let lastPwdError = document.getElementById("lastPwdError");
let AszfError = document.getElementById("AszfError");

let FistnameValid = false;
let LastnameValid = false;
let UsernameValid = false;
let EmailValid = false;
let DateValid = false;
let CompanyValid = false;
let PwdValid = false;
let PwdAgainValid = false;

//? CHECKING VALUES
function validateFirst(firstValue) {
    if (firstValue.lenght < 3) {
        console.log("Firstname error");
        firstError.innerHTML = `<p>Firstname must be at least 3 characters long.</p>`;
        FistnameValid = false;
    } else {
        console.log("Firstname pass");
        FistnameValid = true;

        //TODO: First letter to uppercase
    }
}

function validateLast(lastValue) {
    if (lastValue.lenght < 3) {
        console.log("Lastname error");
        lastError.innerHTML = `<p>Firstname must be at least 3 characters long.</p>`;
        LastnameValid = false;
    } else {
        console.log("Lastname pass");
        LastnameValid = true;

        //TODO: First letter to uppercase
    }
}

function validateUserName(userValue) {
    const invalidChars = new RegExp("-.?!%#*,");    //This characters are not allowed in the username
    if (userValue.lenght < 3) {
        console.log("User name error");
        lastError.innerHTML = `<p>Username must be at least 3 characters long.</p>`;
        UsernameValid = false;
    } else {
        console.log("Username lenght: pass");

        if (invalidChars.test(userValue) == true) {
            lastError.innerHTML = `<p>Invalid username. Please avoid using special characters like: - . ? ! % # ,*</p>`;
            UsernameValid = false;
        } else {
            console.log("Username characters: pass");
            UsernameValid = true;
        }
    }
}

function validateEmail(emailValue) {
    if (emailValue.lenght < 3) {
        emailError.innerHTML = `<p>Email address must be at least 3 characters long.</p>`;
        console.log("Email error: lenght");
        EmailValid = false;
    } else {
        const firsPartOfEmail = emailValue.slice(0, emailValue.indexOf('@'));
        console.log("Value before @: " + firsPartOfEmail);

        if (firsPartOfEmail == "") {
            emailError.innerHTML = `<p>Email address cannot empty before "@" symbol.</p>`;
            EmailValid = false;
        } else {
            if (firsPartOfEmail.lenght < 3) {
                emailError.innerHTML = `<p>Please ensure you have at least 3 characters before the "@" symbol.</p>`;
                EmailValid = false;
            } else {
                console.log("First part of email pass");
                EmailValid = true;
            }
        }
    }

    //TODO: Check the last part of the email
}

//TODO: (date of today) - 100 years => this will be the oldest date you can enter
//TODO: (date of today) - 15 years => this will be the youngest date you can enter
function validateDate(dateValue){

}