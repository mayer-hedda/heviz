
// *
// !
// TODO
//?

/*
JELSZÓ CHECKHEZ:
TRUE: aA12348! + bB123bh!
FALSE: 123456789
        AA12348!  ~
        bb123bh!  ~
        Cc!bbEL    ~
        Cc!bbELK    ~
        Dd12BBjj   ~

*/

// Flatpickr inicializálás --> dátum választóhoz, hogy tudjam szerkeszteni css-ben
// flatpickr("#datepicker", {
//      Itt állíthatod be a testreszabásokat a dátumválasztóhoz
//     theme: "DatePlaceholder" // Adj meg egy egyedi osztálynevet a saját témádnak
// });

/* 
*halvany feheres zold: #F1FFE7  -- rgb(241, 255, 231) -->bg
*Zöld: #62AD6B   -- rgb(98, 173, 107) --> keret

*Piri: #F3525D  -- rgb(243, 82, 93) --> keret
*Piri2: #FFD6DC -- rgb(255, 214, 220) --> bg

*/

// *FOR CHANGE WHAT PROFILE ARE YOU WANT TO REGISTER
const General = document.getElementById("General");
const Publisher = document.getElementById("Publisher");
let GenP = document.getElementById("GenP");
let PubP = document.getElementById("PubP");


let birthDate = document.getElementById("birthDate");
let company = document.getElementById("company");

var isPublisher = false;

console.log("ispublisher default: " + isPublisher);

//? Swith to publisher function 

function SwitchToPublisher() {
    isPublisher = true;

    //* switch to invisible
    birthDate.hidden = true;
    GenP.hidden = true;

   
    company.hidden = false;
    PubP.hidden = false;

    //* modify the classes of the buttons
    Publisher.classList.remove("disabled-btn");
    General.classList.remove("active-btn");

    Publisher.classList.add("active-btn");
    General.classList.add("disabled-btn");

    //* call Publisher events
    PublisherEvents();

    //* check the submit button
    Publisher_Submit_Activate(submitButton);
    console.log("isPublisher value: " + isPublisher);
}


//? Swith to general function
function SwitchToGeneral() {
    isPublisher = false;

    //* switch to invisible
    company.hidden = true;
    
    PubP.hidden = true;

    birthDate.hidden = false;
    GenP.hidden = false;

    //* modify the classes of the buttons
    General.classList.remove("disabled-btn");
    Publisher.classList.remove("active-btn");

    General.classList.add("active-btn");
    Publisher.classList.add("disabled-btn");

    //* call the General events
    GeneralEvents();

    //* check the submit button
    General_Submit_Activate(submitButton);
    console.log("isPublisher value: " + isPublisher);

}

General.addEventListener("click", (e) => {
    e.preventDefault();
    SwitchToGeneral();
})

Publisher.addEventListener("click", (e) => {
    e.preventDefault();
    SwitchToPublisher();
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
const checkAszf = document.getElementById("check-Aszf");

const submitButton = document.getElementById("submitButton");

//*ERRORS
let firstError = document.getElementById("firstError");
let lastError = document.getElementById("lastError");
let userError = document.getElementById("userError");
let emailError = document.getElementById("emailError");
let birthError = document.getElementById("birthError");
let companyError = document.getElementById("companyError");
let firstPwdError = document.getElementById("firstPwdError");
let lastPwdError = document.getElementById("lastPwdError");
let checkbox = document.getElementById("check-Aszf");
let AszfError = document.getElementById("AszfError");

let FirstnameValid = false;
let LastnameValid = false;
let UsernameValid = false;
let EmailValid = false;
let DateValid = false;      //! TODO: Date validation
let CompanyValid = false;
let PwdValid = false;
let PwdAgainValid = false;

//? CHECKING VALUES
function validateFirst(firstValue) {
    if (firstValue.length < 3) {
        console.log("Firstname error: length");
        firstError.innerHTML = `<p>Firstname must be at least 3 characters long.</p>`;
        inputFirst.style.background = "rgb(255, 214, 220)";
        inputFirst.style.borderColor = "rgb(243, 82, 93)";
        FirstnameValid = false;
    } else {
        FirstnameValid = true;
        inputFirst.style.background = "rgb(241, 255, 231)";
        inputFirst.style.borderColor = "rgb(98, 173, 107)";
        console.log("Firstname pass -- " + FirstnameValid);
        console.log("isPublisher: " + isPublisher);
    }
}

function validateLast(lastValue) {
    if (lastValue.length < 3) {
        lastError.innerHTML = `<p>Last name must be at least 3 characters long.</p>`;
        LastnameValid = false;
        inputLast.style.background = "rgb(255, 214, 220)";
        inputLast.style.borderColor = "rgb(243, 82, 93)";
        console.log("Lastname error: length -- " + LastnameValid);
    } else {
        LastnameValid = true;
        inputLast.style.background = "rgb(241, 255, 231)";
        inputLast.style.borderColor = "rgb(98, 173, 107)";
        console.log("Lastname pass  -- " + LastnameValid);
        console.log("isPublisher: " + isPublisher);
    }
}

function validateUserName(userValue) {
    const invalidChars = new RegExp("(?=.*[-?!%#*,(`^ˇ˘°˛˙´˝¨;/:><@{}\"\\\\\\[\\]()])");   //This characters are not allowed in the username

    if (userValue.length < 3) {
        userError.innerHTML = `<p>Username must be at least 3 characters long.</p>`;
        UsernameValid = false;
        inputUser.style.background = "rgb(255, 214, 220)";
        inputUser.style.borderColor = "rgb(243, 82, 93)";
        console.log("User name error: length  --- " + UsernameValid);
    } else {

        if (invalidChars.test(userValue) == true) {
            userError.innerHTML = `<p>Invalid username. Please avoid using special characters exept: _ (underscore) and . (dot)</p>`;
            UsernameValid = false;
            inputUser.style.background = "rgb(255, 214, 220)";
            inputUser.style.borderColor = "rgb(243, 82, 93)";
            console.log("Username length: pass --- ");
            console.log("Username characters: error --- " + UsernameValid);
        } else {
            UsernameValid = true;
            inputUser.style.background = "rgb(241, 255, 231)";
            inputUser.style.borderColor = "rgb(98, 173, 107)";
            console.log("Username characters: pass --- " + UsernameValid);
        }
    }
}

function validateEmail(emailValue) {
    //* to check @ character
    const specReg = new RegExp("(?=.*[@])");

    if (emailValue.length < 3) {
        emailError.innerHTML = `<p>Email address must be at least 3 characters long.</p>`;
        EmailValid = false;
        inputEmail.style.background = "rgb(255, 214, 220)";
        inputEmail.style.borderColor = "rgb(243, 82, 93)";
        console.log("Email error: length -- " + EmailValid);
    } else {
        if (specReg.test(emailValue) == true) {

            //* megvizsgálom, hogy az @ előtti rész megfelel-e a feltételeknek
            const firsPartOfEmail = emailValue.slice(0, emailValue.indexOf('@'));
            console.log("Value before @: " + firsPartOfEmail);

            if (firsPartOfEmail == "") {
                emailError.innerHTML = `<p>Email address cannot empty before "@" symbol.</p>`;
                EmailValid = false;
                inputEmail.style.background = "rgb(255, 214, 220)";
                inputEmail.style.borderColor = "rgb(243, 82, 93)";
                console.log("First part of email is empty --- " + EmailValid);
            } else {
                if (firsPartOfEmail.length < 3) {
                    emailError.innerHTML = `<p>Please ensure you have at least 3 characters before the "@" symbol.</p>`;
                    EmailValid = false;
                    inputEmail.style.background = "rgb(255, 214, 220)";
                    inputEmail.style.borderColor = "rgb(243, 82, 93)";
                    console.log("First part of email length is not enough --- " + EmailValid);
                } else {
                    // EmailValid = true;
                    console.log("First part of email pass -- " + EmailValid);
                }
            }

            //* megvizsgálom, hogy az @ utáni rész megfelel-e a feltételeknek
            const lastPartOfEmail = emailValue.slice(emailValue.indexOf('@') + 1);
            console.log("Value after @: " + lastPartOfEmail);

            //* megvizsgálom, hogy a lastPartOfEmail tartalmaz-e pontot
            const dotReg = new RegExp("(?=.*[.])");
            if (dotReg.test(lastPartOfEmail) == true) {
                console.log("last part of email include dot");
                // EmailValid = true;
                console.log("Last part of email pass -- " + EmailValid);

                //* megvizsgálom, hogy a lastPartOfEmail a pont előtt tartalmaz-e legalább 2 karaktert
                const beforeDot = lastPartOfEmail.slice(0, lastPartOfEmail.indexOf('.'));
                console.log("Value before dot: " + beforeDot);
                if (beforeDot.length < 2) {
                    console.log("last part of email before dot is not enough");
                    emailError.innerHTML = `<p>Please ensure you have at least 2 characters before the " . " (dot) symbol.</p>`;
                    EmailValid = false;
                    inputEmail.style.background = "rgb(255, 214, 220)";
                    inputEmail.style.borderColor = "rgb(243, 82, 93)";
                    console.log("Last part of email error -- " + EmailValid);
                } else {
                    EmailValid = true;
                    inputEmail.style.background = "rgb(241, 255, 231)";
                    inputEmail.style.borderColor = "rgb(98, 173, 107)";
                    console.log("Last part of email pass -- " + EmailValid);
                }


            } else {
                console.log("last part of email doesn't include dot");
                emailError.innerHTML = `<p>Please include the '.' (dot) symbol in your email address.</p>`;
                EmailValid = false;
                inputEmail.style.background = "rgb(255, 214, 220)";
                inputEmail.style.borderColor = "rgb(243, 82, 93)";
                console.log("Last part of email error -- " + EmailValid);
            }

        } else {
            emailError.innerHTML = `<p>Please include the '@' symbol in your email address.</p>`;
            EmailValid = false;
            inputEmail.style.background = "rgb(255, 214, 220)";
            inputEmail.style.borderColor = "rgb(243, 82, 93)";
            console.log("Email error: doesn't include @ -- " + EmailValid);
        }

    }

}


function validateCompany(companyValue) {
    if (companyValue.length < 2) {
        companyError.innerHTML = `<p>Company name must be at least 2 characters long.</p>`;
        CompanyValid = false;
        inputCompany.style.background = "rgb(255, 214, 220)";
        inputCompany.style.borderColor = "rgb(243, 82, 93)";
        console.log("Company error: lenght -- " + CompanyValid);
    } else {
        CompanyValid = true;
        inputCompany.style.background = "rgb(241, 255, 231)";
        inputCompany.style.borderColor = "rgb(98, 173, 107)";
        console.log("Company name: pass --- " + CompanyValid);
    }
}

function valudateFirstPwd(pwdValue) {
    const upperCaseReg = new RegExp("(?=.*[A-Z])");
    const lowerCaseReg = new RegExp("(?=.*[a-z])");
    const numReg = new RegExp("(?=.*[0-9])");
    const specReg = new RegExp("(?=.*[!@#$%^&=?.,><*])");

    if (pwdValue.length < 8) {
        //* false --> error message
        firstPwdError.innerHTML = `<p>Password must be at least 8 characters long.</p>`;
        PwdValid = false;
        inputPwd.style.background = "rgb(255, 214, 220)";
        inputPwd.style.borderColor = "rgb(243, 82, 93)";
        console.log("Password 1 error: length -- " + PwdValid);

    } else {
        //*true --> check the value

        if (upperCaseReg.test(pwdValue) == true && lowerCaseReg.test(pwdValue) == true && numReg.test(pwdValue) == true && specReg.test(pwdValue) == true) {
            PwdValid = true;
            inputPwd.style.background = "rgb(241, 255, 231)";
            inputPwd.style.borderColor = "rgb(98, 173, 107)";
            console.log("Password 1 pass -- " + PwdValid);

        } else {
            PwdValid = false;
            firstPwdError.innerHTML = `<p>Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character.</p>`;
            inputPwd.style.background = "rgb(255, 214, 220)";
            inputPwd.style.borderColor = "rgb(243, 82, 93)";
            console.log("Password 1 error: characters -- " + PwdValid);
        }
    }
}

function matchPwd(pwdValue, pwdAgainValue) {
    if (pwdValue != pwdAgainValue) {
        console.log("Passwords doesn't match");
        lastPwdError.innerHTML = `<p>The passwords doesn't match.</p>`;
        PwdAgainValid = false;
        inputPwdAgain.style.background = "rgb(255, 214, 220)";
        inputPwdAgain.style.borderColor = "rgb(243, 82, 93)";
    } else {
        PwdAgainValid = true;
        inputPwdAgain.style.background = "rgb(241, 255, 231)";
        inputPwdAgain.style.borderColor = "rgb(98, 173, 107)";
        console.log("Passwords are pass --- " + PwdAgainValid);
    }
}

//? ADD EVENT LISTENERS
//! GENERAL

function GeneralEvents() {
    const Datas = [];    //tömb az adatoknak, hogy össze tudjam hasonlítani a jelszavakat

    // ? FIRST NAME
    inputFirst.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstError.innerHTML = "";
        console.log("First name focusin");
    })

    inputFirst.addEventListener("focusout", (e) => {
        e.preventDefault();
        const FirstValue = inputFirst.value;
        if (FirstValue == "") {
            console.log("Firstname error: empty");
            firstError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            validateFirst(FirstValue);
            if (FirstnameValid == true) {
                Datas.push(FirstValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    // ? LAST NAME 
    inputLast.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastError.innerHTML = "";
    })

    inputLast.addEventListener("focusout", (e) => {
        e.preventDefault();
        const lastValue = inputLast.value;
        if (lastValue == "") {
            console.log("Lastname error: empty");
            lastError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            validateLast(lastValue);
            if (LastnameValid == true) {
                Datas.push(lastValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    // ? USERNAME
    inputUser.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        userError.innerHTML = "";
    })

    inputUser.addEventListener("focusout", (e) => {
        e.preventDefault();
        const userValue = inputUser.value;      // kiszedi a user mező értékét
        if (userValue == "") {
            userError.innerHTML = `<p>User name cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("User error: empty");

        } else {
            validateUserName(userValue);    // függvénybe használja a user mező értékét
            if (UsernameValid == true) {
                Datas.push(userValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";

            }
        }
    })

    //?EMAIL 
    inputEmail.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        emailError.innerHTML = "";
    })

    inputEmail.addEventListener("focusout", (e) => {
        e.preventDefault();
        const emailValue = inputEmail.value;
        if (emailValue == "") {
            emailError.innerHTML = `<p>Email address cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("Email error: empty");
        } else {
            validateEmail(emailValue);
            if (EmailValid == true) {
                Datas.push(emailValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    inputCompany.addEventListener("", (e) => { })


    

    datepicker.addEventListener("focusin", (e) => {
        e.preventDefault();

    })

    datepicker.addEventListener("focusout", (e) => {
        e.preventDefault();
        console.log("Date pass --- " + DateValid);
    })

    //? PASSWORD 1 

    inputPwd.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstPwdError.innerHTML = "";
    })

    inputPwd.addEventListener("focusout", (e) => {
        e.preventDefault();
        const firstPwdValue = inputPwd.value;
        if (firstPwdValue == "") {
            firstPwdError.innerHTML = `<p>Password field cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("1st Password error: empty");
        } else {
            valudateFirstPwd(firstPwdValue);
            console.log(firstPwdValue);
            if (PwdValid == true) {
                Datas.push(firstPwdValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    //? PASSWORD 2
    inputPwdAgain.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastPwdError.innerHTML = "";
    })

    inputPwdAgain.addEventListener("focusout", (e) => {
        e.preventDefault();
        const pwdAgainValue = inputPwdAgain.value;
        const firstpwd = Datas[Datas.length - 1];   //*last index
        console.log(firstpwd);
        if (pwdAgainValue == "") {
            lastPwdError.innerHTML = `<p>Password field cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("2nd pwd error: empty");
        } else {
            matchPwd(firstpwd, pwdAgainValue);

        }

        //! Ezt mindig a legutolso event-be kell rakni
        General_Submit_Activate(submitButton);
        console.log("general vége is lefut");
    })
}

//! PUBLISHER
function PublisherEvents() {
    const Datas = [];    //tömb az adatoknak, hogy össze tudjam hasonlítani a jelszavakat

    // ? FIRST NAME
    inputFirst.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstError.innerHTML = "";
        console.log("First name focusin");
    })

    inputFirst.addEventListener("focusout", (e) => {
        e.preventDefault();
        const FirstValue = inputFirst.value;
        if (FirstValue == "") {
            console.log("Firstname error: empty");
            firstError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            validateFirst(FirstValue);
            if (FirstnameValid == true) {
                Datas.push(FirstValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    // ? LAST NAME 
    inputLast.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastError.innerHTML = "";
    })

    inputLast.addEventListener("focusout", (e) => {
        e.preventDefault();
        const lastValue = inputLast.value;
        if (lastValue == "") {
            console.log("Lastname error: empty");
            lastError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            validateLast(lastValue);
            if (LastnameValid == true) {
                Datas.push(lastValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    // ? USERNAME
    inputUser.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        userError.innerHTML = "";
    })

    inputUser.addEventListener("focusout", (e) => {
        e.preventDefault();
        const userValue = inputUser.value;
        if (userValue == "") {
            userError.innerHTML = `<p>User name cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("User error: empty");
        } else {
            validateUserName(userValue);
            if (UsernameValid == true) {
                Datas.push(userValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";

            }
        }
    })

    //?EMAIL 
    inputEmail.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        emailError.innerHTML = "";
    })

    inputEmail.addEventListener("focusout", (e) => {
        e.preventDefault();
        const emailValue = inputEmail.value;
        if (emailValue == "") {
            emailError.innerHTML = `<p>Email address cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("Email error: empty");
        } else {
            validateEmail(emailValue);
            if (EmailValid == true) {
                Datas.push(emailValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    //? COMPANY
    inputCompany.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        companyError.innerHTML = "";
    })

    inputCompany.addEventListener("focusout", (e) => {
        e.preventDefault();
        const companyValue = inputCompany.value;
        if (companyValue == "") {
            companyError.innerHTML = `<p>Company field cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("Email error: empty");
        } else {
            validateCompany(companyValue);
            if (CompanyValid == true) {
                Datas.push(companyValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    //? PASSWORD 1
    inputPwd.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstPwdError.innerHTML = "";
    })

    inputPwd.addEventListener("focusout", (e) => {
        e.preventDefault();
        const firstPwdValue = inputPwd.value;
        if (firstPwdValue == "") {
            firstPwdError.innerHTML = `<p>Password field cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("1st Password error: empty");
        } else {
            valudateFirstPwd(firstPwdValue);
            console.log(firstPwdValue);
            if (PwdValid == true) {
                Datas.push(firstPwdValue);
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }
        }
    })

    //? PASSWORD 2
    inputPwdAgain.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastPwdError.innerHTML = "";
    })

    inputPwdAgain.addEventListener("focusout", (e) => {
        e.preventDefault();
        const pwdAgainValue = inputPwdAgain.value;
        const firstpassword = Datas[Datas.length - 1];   //*last index
        console.log(firstpassword);
        if (pwdAgainValue == "") {
            lastPwdError.innerHTML = `<p>Password field cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

            console.log("2nd pwd error: empty");
        } else {
            matchPwd(firstpassword, pwdAgainValue);
            e.target.style.background = "rgb(241, 255, 231)";
            e.target.style.border = "rgb(98, 173, 107)";
        }

        //! Ezt mindig a legutolso event-be kell rakni
        Publisher_Submit_Activate(submitButton);
        console.log("general vége is lefut");
    })

    //? array ürítése, hogy a legközelebbi kitöltésnél vizsgálni tudja a mezőket
    while(Datas.length > 0) {
        Datas.pop();
    }
}

//backenddel való összekötés
submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (isPublisher == true) {
        const postData = {
            "username": inputUser.value,
            "firstName": inputFirst.value,
            "lastName": inputLast.value,
            "companyName": inputCompany.value,
            "email": inputEmail.value,
            "password": inputPwd.value
        };

        const response = publisherRegistration(postData);   //itt hívjuk meg az endpointot
        console.log(response); //kiírja azt az adatot amit elküldött a backendnek

        
    } else {
        const postData = {
            "username": inputUser.value,
            "firstName": inputFirst.value,   
            "lastName": inputLast.value,
            "email": inputEmail.value,
            "birthdate": datepicker.value,
            "password": inputPwd.value
        };

        const response = publisherRegistration(postData);
        console.log('Válasz a backendtől:', response); 

       
    }
})

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();
    //? mezők ürítése
    inputUser.value = '';
    inputFirst.value = '';
    inputLast.value = '';
    inputCompany.value = '';
    inputEmail.value = '';
    inputPwd.value = '';
    inputPwdAgain.value = '';
    datepicker.value = '';
})

function General_Submit_Activate(submitButton) {
    if (UsernameValid == true &&
        EmailValid == true &&
        PwdValid == true &&
        PwdAgainValid == true) {

        console.log("Legyen aktív a btn");
        submitButton.disabled = false;
    }
}

function Publisher_Submit_Activate(submitButton) {
    if (FirstnameValid == true &&
        LastnameValid == true &&
        UsernameValid == true &&
        EmailValid == true &&
        CompanyValid == true &&
        PwdValid == true &&
        PwdAgainValid == true) {

        console.log("Legyen aktív a btn");
        submitButton.disabled = false;
    }
}

if (isPublisher == true) {
    PublisherEvents();
} else {

    GeneralEvents();
}