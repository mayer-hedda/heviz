//* For change what profile are you want to register
const General = document.getElementById("General");
const Publisher = document.getElementById("Publisher");
let GenP = document.getElementById("GenP");
let PubP = document.getElementById("PubP");
let birthDate = document.getElementById("birthDate");
let company = document.getElementById("company");

var isPublisher = false;


/** 
 * Documentation
 * --------------
 * This function allows the user to select the type of profile for registration.
 * In this case, the General fields are replaced with the Publisher fields.
 * No parameters for this function.
 * 
 */
function SwitchToPublisher() {
    isPublisher = true;

    // switch to invisible
    birthDate.hidden = true;
    GenP.hidden = true;
    company.hidden = false;
    PubP.hidden = false;

    // modify the classes of the buttons
    Publisher.classList.remove("disabled-btn");
    General.classList.remove("active-btn");
    Publisher.classList.add("active-btn");
    General.classList.add("disabled-btn");

    // call Publisher events
    PublisherEvents();

    // check the submit button
    Publisher_Submit_Activate(submitButton);
    console.log("The value of the isPublisher variable: " + isPublisher);
}


/** 
 * Documentation
 * --------------
 * This function allows the user to select the type of profile for registration.
 * In this case, the Publisher fields are replaced with the General fields.
 * No parameters for this function.
 * 
 */
function SwitchToGeneral() {
    isPublisher = false;

    // switch to invisible
    company.hidden = true;
    PubP.hidden = true;
    birthDate.hidden = false;
    GenP.hidden = false;

    // modify the classes of the buttons
    General.classList.remove("disabled-btn");
    Publisher.classList.remove("active-btn");
    General.classList.add("active-btn");
    Publisher.classList.add("disabled-btn");

    // call the General events
    GeneralEvents();

    // check the submit button
    General_Submit_Activate(submitButton);
    console.log("The value of the isPublisher variable: " + isPublisher);
}

General.addEventListener("click", (e) => {
    e.preventDefault();
    SwitchToGeneral();
})

Publisher.addEventListener("click", (e) => {
    e.preventDefault();
    SwitchToPublisher();
})


//*Input fields
const inputFirst = document.getElementById("inputFirst");
const inputLast = document.getElementById("inputLast");
const inputUser = document.getElementById("inputUser");
const inputEmail = document.getElementById("inputEmail");
const datepicker = document.getElementById("datepicker");
const inputCompany = document.getElementById("inputCompany");
const inputPwd = document.getElementById("inputPwd");
const inputPwdAgain = document.getElementById("inputPwdAgain");
const checkAszf = document.getElementById("checkAszf");

//*Error divs
let firstError = document.getElementById("firstError");
let lastError = document.getElementById("lastError");
let userError = document.getElementById("userError");
let emailError = document.getElementById("emailError");
let birthError = document.getElementById("birthError");
let companyError = document.getElementById("companyError");
let firstPwdError = document.getElementById("firstPwdError");
let lastPwdError = document.getElementById("lastPwdError");
let checkbox = document.getElementById("checkAszf");
let AszfError = document.getElementById("AszfError");

//* Button
const submitButton = document.getElementById("submitButton");

//*Boolean variables 
let FirstnameValid = false;  // call this in the eventListener --> activating the button
let LastnameValid = false;  // call this in the eventListener  --> activating the button

let user_upto3 = false;
let user_chars = false;
let UsernameValid = false;  // call this in the eventListener  --> activating the button

let fp_email = false;       // this is for the validation of the first part of email. (before @)
let lp_email = false;      // this is for the validation of the last part of email    (after @)
let at_symbol = false;      // this is for the validation of the @ symbol.
let chars_email = false;
let EmailValid = false;    // this for activating the button.


let DateValid = false;     // this for activating the button.
let CompanyValid = false;
let PwdValid = false;
let PwdAgainValid = false;


//* INVALID CHARACTERS IN USERNAME
const u_invalidC = new RegExp("(?=.*[-?!%#*,(`^ˇ˘°˛˙´˝¨;/:><@{}\"\\\\\\[\\]()])");   //This characters are not allowed in the username
let u_abcCahrs = /^[a-z1-9]+$/;


//######## VERIFICATION OF VALUES ######## 

/**
 * Documentation
 * -------------
 * This is a generic function that checks the value of the input field against the 
 * input parameters and returns true or false.
 * 
 * If the input value is less than 3 characters: 
 *          - Changes the background and border of the input field to red.
 *          - Returns false
 * 
 * If the input value is more than 3 characters: 
 *          - Changes the background and border of the input field to green.
 *          - Returns true
 * 
 * @param {Variable} value - the variable containing the value of the input field
 * @param {String} inputName - it's for console error messages --> NOT FOR THE USERS 
 * @param {Variable} inputId - this is the variable name of the input field
 * @param {Variable} errorDiv - Insert the error message into this div.
 * @returns {Boolean}
 */

function upTo3(value, inputName, inputId, errorDiv) {
    if (value.length < 3) {
        console.log(inputName + " error: length");
        inputId.style.background = "rgb(255, 214, 220)";
        inputId.style.borderColor = "rgb(243, 82, 93)";
        errorDiv.innerHTML = `<p>It should be at least 3 characters.</p>`;
        return false;
    } else {
        inputId.style.background = "rgb(241, 255, 231)";
        inputId.style.borderColor = "rgb(98, 173, 107)";
        console.log(inputName + " pass. Value: " + value);
        console.log("Profile type: " + isPublisher);
        return true;
    }
}



/**
 * Documentation
 * -------------
 * This function takes the value of the email input field as a parameter 
 * and runs tests on that value. 
 * Three predefined Boolean variables are used in the tests. Returning true is 
 * only possible if all three variables are true when the function ends.
 * We only alowed the english ABC characters (lower or uppercase)
 * 
 * Booleans:
 * ---------
 * - at_symbol
 * - fp_email
 * - lp_email
 * 
 * Tests:
 * -------
 * Does the e-mail contain the @ character?
 *   - Yes, it does: at_symbol = true.
 *   - No, it doesn't: at_symbol = false, and changes the background 
 *     and border of the input field to red.
 * 
 * How many @ characters are included?
 *  - We only alow one @ character in the email address
 * 
 * How many characters are before the @ character?
 *   - Only runs if the value contains the @ character.
 *   - Min characters before the @ character: 4.
 *   - If it's empty: fp_email = false, and changes the background 
 *     and border of the input field to red.
 *   - If it's > 4: fp_email = true.
 * 
 * Does it contain a period after the @ character?
 *   - Only runs if the value contains the @ character.
 *   - If it contains the period:
 *        - How many characters are after the @ character 
 *          and before the period?
 *        - Min characters: 2.
 *        - If it's > 2: lp_email = true.
 *        - If it's empty, or < 2: lp_email = false, and changes the background 
 *          and border of the input field to red.
 *      
 * @param {Variable} emailValue - the variable containing the value of the email input field
 * @returns {Boolean}
 */

function validateEmail(emailValue) {
    let allowedChars = /^[a-z1-9@.]+$/;
    //* to check @ character
    const specReg = new RegExp("(?=.*[@])");
    if (specReg.test(emailValue) == false) {
        emailError.innerHTML = `<p>Email address must be contains the "@" symbol.</p>`;
        console.log("Email addres doesn't include @ character. Input: " + emailValue);
        inputEmail.style.background = "rgb(255, 214, 220)";
        inputEmail.style.borderColor = "rgb(243, 82, 93)";
        at_symbol = false;

    } else if (specReg.test(emailValue) == true) {

        const atCount = (emailValue.match(/@/g) || []).length; // Count @ symbols in emailValue


        at_symbol = true;
        if (atCount !== 1) {
            emailError.innerHTML = `<p>Email address must contain exactly one "@" symbol.</p>`;
            console.log("Email address must contain exactly one @ symbol. Input:" + emailValue);
            inputEmail.style.background = "rgb(255, 214, 220)";
            inputEmail.style.borderColor = "rgb(243, 82, 93)";
            return false;
        } else {
            //It checks what is in front of the @.
            const firsPartOfEmail = emailValue.slice(0, emailValue.indexOf('@'));
            console.log("Include @. The value before @: " + firsPartOfEmail);

            if (firsPartOfEmail == "") {
                emailError.innerHTML = `<p>Email address cannot empty before "@" symbol.</p>`;
                inputEmail.style.background = "rgb(255, 214, 220)";
                inputEmail.style.borderColor = "rgb(243, 82, 93)";
                console.log("The first part of the email is empty. Input: " + emailValue);
                fp_email = false;
            } else {
                if (allowedChars.test(emailValue) == true) {
                    chars_email = true;
                    if (firsPartOfEmail.length < 4) {
                        emailError.innerHTML = `<p>Please ensure you have at least 4 characters before the "@" symbol.</p>`;

                        inputEmail.style.background = "rgb(255, 214, 220)";
                        inputEmail.style.borderColor = "rgb(243, 82, 93)";
                        console.log("First part of email length is not enough. Value: " + firsPartOfEmail);
                        fp_email = false;
                    } else {

                        fp_email = true;

                        // Checks that the part after @ matches.
                        const lastPartOfEmail = emailValue.slice(emailValue.indexOf('@') + 1);
                        console.log("Value after @: " + lastPartOfEmail);

                        // Checks that the part after the @ contains a period.
                        const dotReg = new RegExp("(?=.*[.])");

                        if (dotReg.test(lastPartOfEmail) == true) {
                            console.log("last part of email include period");
                            console.log("Last part of email pass. Value: " + lastPartOfEmail);

                            // Make sure that the part in front of the period is at least 2 characters in length.
                            const beforeDot = lastPartOfEmail.slice(0, lastPartOfEmail.indexOf('.'));
                            console.log("Value before dot: " + beforeDot);

                            if (beforeDot == "" || beforeDot.length < 2) {
                                console.log("Last part of email before dot is not enough. Last part: " + lastPartOfEmail);
                                emailError.innerHTML = `<p>Please ensure you have at least 2 characters before the " . " (dot) symbol.</p>`;
                                lp_email = false;
                                inputEmail.style.background = "rgb(255, 214, 220)";
                                inputEmail.style.borderColor = "rgb(243, 82, 93)";
                            } else {
                                lp_email = true;
                                inputEmail.style.background = "rgb(241, 255, 231)";
                                inputEmail.style.borderColor = "rgb(98, 173, 107)";
                                console.log("Last part of email is complied. Input: " + emailValue);
                            }


                        } else {
                            console.log("Last part of email doesn't include dot. Input: " + emailValue);
                            emailError.innerHTML = `<p>Please include the '.' (dot) symbol in your email address.</p>`;
                            inputEmail.style.background = "rgb(255, 214, 220)";
                            inputEmail.style.borderColor = "rgb(243, 82, 93)";
                            lp_email = false;
                        }
                    }
                } else {
                    emailError.innerHTML = `<p>The email address must contain only the English alphabet, a dot (.) and the at (@) symbol.</p>`;
                    inputEmail.style.background = "rgb(255, 214, 220)";
                    inputEmail.style.borderColor = "rgb(243, 82, 93)";
                    console.error("Email address contains something that not allowed");
                    chars_email = false;
                }

            }
        }

    } else {
        emailError.innerHTML = `<p>Please include the '@' symbol in your email address.</p>`;
        at_symbol = false;
        inputEmail.style.background = "rgb(255, 214, 220)";
        inputEmail.style.borderColor = "rgb(243, 82, 93)";
        console.log("Email error: doesn't include @. Value:" + emailValue);
    }

    if (fp_email == true && lp_email == true && at_symbol == true && chars_email == true) {
        return true;
    } else {
        return false;
    }

}


/**
 * Documentation
 * -------------
 * This function takes and checks the Company field value, 
 * then returns true or false.
 * 
 * If the input value is empty:
 *      - Changes the background and border of the input field to red.
 *      - Returns false.
 * 
 * If the input value is less than 2 characters:
 *      - Changes the background and border of the input field to red.
 *      - Returns false.
 * 
 * If the input value is more than 2 characters:
 *      - Changes the background and border of the input field to green.
 *      - Returns true.
 * 
 * @param {Variable} companyValue - the variable containing the value of the company input field
 * @returns {Boolean}
 */

function validateCompany(companyValue) {
    if (companyValue == "") {
        companyError.innerHTML = `<p>Company field cannot be empty</p>`;
        e.target.style.background = "rgb(255, 214, 220)";
        e.target.style.borderColor = "rgb(243, 82, 93)";
        console.log("Company field is empty.");
        return false;

    } else if (companyValue.length < 2) {
        companyError.innerHTML = `<p>Company name must be at least 2 characters long.</p>`;
        inputCompany.style.background = "rgb(255, 214, 220)";
        inputCompany.style.borderColor = "rgb(243, 82, 93)";
        console.log("Company length is not enough: Input: " + companyValue);
        return false;
    } else {
        inputCompany.style.background = "rgb(241, 255, 231)";
        inputCompany.style.borderColor = "rgb(98, 173, 107)";
        console.log("Company name is complied. Input: " + companyValue);
        return true;
    }
}


/**
 * Documentation
 * -------------
 * This function takes a single parameter. This parameter is a string, because it's 
 * from the input field.
 * 
 * 1. The function first takes the current date and then separates it into days, months and years.
 * 2. It does the same with the date given by the user (this is the parameter).
 * 
 * Testing:
 * --------
 * Testing the year:
 *   - You should get a number of 15 or more by subtracting the year of birth from the current year.
 *      - If it's not >= 15:
 *            - Return false
 *            - Changes the background and border of the input field to red.
 *            - Error message
 *      - If it's >= 15:
 *            - The function is continues to run
 * 
 * Testing the month:
 *   - Only runs if the year is equals or more than 15.
 *   - If the month number is greater than the current month number, the event has not yet occurred.
 *   - If it's not:
 *            - Return false
 *            - Changes the background and border of the input field to red.
 *            - Error message
 *      - If the month passed, or it's the current month:
 *            - The function is continues to run
 * 
 * Testing the day:
 *   - Only runs if the year is equals or more than 15 and the month passed / it's the current month.
 *   - Check that you are 15 years old to the day.
 *   - Returns true only if this test passes.
 * 
 * @param {Variable} date - This is the date given to us by the user.
 * @returns {Boolean}
 */
function validateDate(date) {
    // Current date
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    console.log("Current date: " + currentYear + " / " + currentMonth + " / " + currentDay);

    // User birth date
    const inputDate = new Date(date);
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;
    let day = inputDate.getDate();

    const ageYear = currentYear - year;

    if (ageYear < 15) {
        // Ha a jelenlegi év és a születése éve közt nem telt el 15 év
        birthError.innerHTML = `<p>You must be at least 15 years old to register.</p>`
        datepicker.style.background = "rgb(255, 214, 220)";
        datepicker.style.borderColor = "rgb(243, 82, 93)";
        console.log("User is not 15 years old yet. User birth date is: " + year + " / " + month + " / " + day);
        return false;

    } else if (ageYear == 15) {

        if (month > currentMonth) {
            // Ha az évek közt eltelt 15 év viszont ebben az évben még nem értünk a születési hónapjába
            birthError.innerHTML = `<p>You must be at least 15 years old to register.</p>`
            datepicker.style.background = "rgb(255, 214, 220)";
            datepicker.style.borderColor = "rgb(243, 82, 93)";
            console.log("User is not 15 years old yet. User birth date is: " + year + " / " + month + " / " + day);
            return false;
        } else {
            if (day > currentDay) {
                // Ha az évek közt eltelt 15 év + a születési hónapjában vagyunk / eltelt az
                // Viszont a születésének napja még nem következett be
                birthError.innerHTML = `<p>You must be at least 15 years old to register.</p>`
                datepicker.style.background = "rgb(255, 214, 220)";
                datepicker.style.borderColor = "rgb(243, 82, 93)";
                console.log("User is not 15 years old yet. User birth date is: " + year + " / " + month + " / " + day);
                return false;
            } else {
                // Itt adunk true értéket mert már napra pontosan betöltötte a 15-öt
                datepicker.style.background = "rgb(241, 255, 231)";
                datepicker.style.borderColor = "rgb(98, 173, 107)";
                console.log("User is more than 15 years old. User birth date is: " + year + " / " + month + " / " + day);
                return true;
            }
        }


    } else {
        console.log("The user's age: " + ageYear);
        datepicker.style.background = "rgb(241, 255, 231)";
        datepicker.style.borderColor = "rgb(98, 173, 107)";
        return true;
    }
}



/**
 * Documentation
 * -------------
 * This function takes and checks the password field's value, 
 * then returns true or false.
 * 
 * If the input value is empty:
 *   - Changes the background and border of the input field to red.
 *   - Returns false.
 * 
 * If the input value is less than 8 characters:
 *    - Changes the background and border of the input field to red.
 *    - Returns false.
 * 
 * If the input value is more than 2 characters:
 *    - Does it contains uppercase, lowercase, numbers and special characters?
 *       - Yes, it does:
 *           - Changes the background and border of the input field to green.
 *           - Returns true.
 *       - No, it doesn't:
 *           - Changes the background and border of the input field to red.
 *           - Returns false.
 * 
 * @param {Variable} pwdValue - the variable containing the value of the password field
 * @param {Variable} pwdInput - the variable containing the input field. Its for setting the red or green border and background
 * @param {Variable} errorField - Its for pasting error messages to the user
 * @returns {Boolean}
 */

function validatePwd(pwdValue, pwdInput, errorField) {
    const upperCaseReg = new RegExp("(?=.*[A-Z])");
    const lowerCaseReg = new RegExp("(?=.*[a-z])");
    const numReg = new RegExp("(?=.*[0-9])");
    const specReg = new RegExp("(?=.*[!@#$%^&=?.,><*])");

    if (pwdValue == "") {
        errorField.innerHTML = `<p>Password field cannot be empty</p>`;
        pwdInput.target.style.background = "rgb(255, 214, 220)";
        pwdInput.target.style.borderColor = "rgb(243, 82, 93)";
        console.log("The" + pwdInput + " pwd field is empty.");
        return false;

    } else if (pwdValue.length < 8) {

        errorField.innerHTML = `<p>Password must be at least 8 characters long.</p>`;
        pwdInput.style.background = "rgb(255, 214, 220)";
        pwdInput.style.borderColor = "rgb(243, 82, 93)";
        console.log("The" + pwdInput + " pwd is less than 8 characters. Input: " + pwdValue);
        return false;

    } else {
        // It checks for uppercase, lowercase, numbers and special characters.
        if (upperCaseReg.test(pwdValue) == true && lowerCaseReg.test(pwdValue) == true && numReg.test(pwdValue) == true && specReg.test(pwdValue) == true) {
            pwdInput.style.background = "rgb(241, 255, 231)";
            pwdInput.style.borderColor = "rgb(98, 173, 107)";
            console.log("The" + pwdInput + " is complied. Input: " + pwdValue);
            return true;

        } else {
            errorField.innerHTML = `<p>Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character.</p>`;
            pwdInput.style.background = "rgb(255, 214, 220)";
            pwdInput.style.borderColor = "rgb(243, 82, 93)";
            console.log("Something is missing from the " + pwdInput + ". Input: " + pwdValue);
            return false;
        }
    }
}

/**
 * Documentation
 * -------------
 * This function compares the values of the two passwords.
 * It has two parameters and returns true or false.
 * 
 * If the second password's value is empty:
 *   - Changes the background and border of the input field to red.
 *   - Returns false.
 * 
 * If the two value doen't match:
 *   - Changes the background and border of the input field to red.
 *   - Returns false.
 * 
 * If the two value are matched:
 *   - Changes the background and border of the input field to green.
 *   - Returns true.
 * 
 * @param {Variable} pwdValue - the variable containing the value of the first password field
 * @param {Variable} pwdAgainValue - the variable containing the value of the second password field
 * @returns {Boolean}
 */
function matchPwd(pwdValue, pwdAgainValue) {

    if (pwdValue != pwdAgainValue) {
        console.log("Passwords doesn't match");
        lastPwdError.innerHTML = `<p>The passwords doesn't match.</p>`;
        inputPwdAgain.style.background = "rgb(255, 214, 220)";
        inputPwdAgain.style.borderColor = "rgb(243, 82, 93)";
        const proba = document.getElementById('proba');
        return false;

    } else {
        inputPwdAgain.style.background = "rgb(241, 255, 231)";
        inputPwdAgain.style.borderColor = "rgb(98, 173, 107)";
        lastPwdError.innerHTML = "";
        console.log("Passwords are match. Inputs: " + pwdValue + ", " + pwdAgainValue);
        return true;
    }
}

function validateCheckbox(checkbox) {

    if (checkbox.checked) {
        return true;
    } else {
        return false;
    }

}


//? ADD EVENT LISTENERS
//! GENERAL

let g_firstName, g_lastName, g_userName, g_email, g_date, g_pwd1, g_pwd2;

function GeneralEvents() {

    // First name field events
    inputFirst.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstError.innerHTML = "";
        console.log("First name focusin");
    })

    inputFirst.addEventListener("focusout", (e) => {
        e.preventDefault();
        g_firstName = inputFirst.value;
        if (g_firstName == "") {
            console.log("Firstname error: empty");
            firstError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            FirstnameValid = upTo3(g_firstName, "First name", inputFirst, firstError);
            General_Submit_Activate(submitButton);
        }
    })


    // Last name field events
    inputLast.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastError.innerHTML = "";
    })

    inputLast.addEventListener("focusout", (e) => {
        e.preventDefault();
        g_lastName = inputLast.value;
        if (g_lastName == "") {
            console.log("Lastname error: empty");
            lastError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            LastnameValid = upTo3(g_lastName, "Last name", inputLast, lastError);
            General_Submit_Activate(submitButton);
        }
    })

    // Username field events
    inputUser.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        userError.innerHTML = "";
    })

    inputUser.addEventListener('input', function () {
        if (u_invalidC.test(this.value) == true) {
            userError.innerHTML = `<p>Please avoid using special characters exept: _ (underscore) and . (dot)</p>`;
            inputUser.style.background = "rgb(255, 214, 220)";
            inputUser.style.borderColor = "rgb(243, 82, 93)";
        }
    })

    inputUser.addEventListener("focusout", (e) => {
        e.preventDefault();
        g_userName = inputUser.value;
        if (g_userName == "") {
            userError.innerHTML = `<p>User name cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("Username field is empty.");

        } else {
            user_upto3 = upTo3(g_userName, "Username", inputUser, userError);
            if (u_abcCahrs.test(g_userName) == false) {
                userError.innerHTML = `<p>Please use the lowecase English alphabetical characters.</p>`;
                e.target.style.background = "rgb(255, 214, 220)";
                e.target.style.borderColor = "rgb(243, 82, 93)";
                user_chars = false;
            } else {
                user_chars = true;
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }

            if (user_chars == true && user_upto3 == true) {
                UsernameValid = true;
            } else {
                UsernameValid = false;
            }

            General_Submit_Activate(submitButton);
        }
    })

    // Email field events
    inputEmail.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        emailError.innerHTML = "";

    })

    inputEmail.addEventListener("focusout", (e) => {
        e.preventDefault();
        g_email = inputEmail.value;
        if (g_email == "") {
            emailError.innerHTML = `<p>Email address cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("Email error: empty");

        } else {
            EmailValid = validateEmail(g_email);
            console.log("EmailValid value: " + EmailValid);
            General_Submit_Activate(submitButton);
        }
    })


    // Date input field events
    datepicker.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        birthError.innerHTML = "";
    })

    datepicker.addEventListener("focusout", (e) => {
        e.preventDefault();
        g_date = datepicker.value;
        if (g_date == "") {
            birthError.innerHTML = `<p>This field cannot be empty.</p>`
            datepicker.style.background = "rgb(255, 214, 220)";
            datepicker.style.borderColor = "rgb(243, 82, 93)";
            console.log("date field is empty.");
            DateValid = false;
        } else {
            DateValid = validateDate(g_date);
            General_Submit_Activate(submitButton);
        }

    })

    // First password field events
    inputPwd.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstPwdError.innerHTML = "";
    })

    inputPwd.addEventListener("focusout", (e) => {
        e.preventDefault();
        g_pwd1 = inputPwd.value;
        PwdValid = validatePwd(g_pwd1, inputPwd, firstPwdError);
        General_Submit_Activate(submitButton);
    })

    //? PASSWORD 2
    inputPwdAgain.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastPwdError.innerHTML = "";
    })

    inputPwdAgain.addEventListener('focusout', (e) => {
        e.preventDefault();
        if (inputPwdAgain.value == "") {
            lastPwdError.innerHTML = `<p>Password field cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("Second pwd field is empty.");
            PwdAgainValid = false;
        } else {
            PwdValid2 = validatePwd(inputPwdAgain.value, inputPwdAgain, lastPwdError);
        }
    })

    inputPwdAgain.addEventListener('input', (e) => {
        e.preventDefault();
        g_pwd2 = inputPwdAgain.value;
        PwdAgainValid = matchPwd(g_pwd1, g_pwd2);
        console.log("PwdAgainValid value:" + PwdAgainValid);
        General_Submit_Activate(submitButton);

    })

    checkbox.addEventListener("change", (e) => {
        e.preventDefault();
        console.log("Aszf checkbox: " + checkbox.value);
        if (checkbox.value == true) {
            AszfValid = true;

        } else {
            AszfValid = false;
        }
        General_Submit_Activate(submitButton);
        console.log("General events are completed.");
    })


}

//! Publisher variables
let p_firstName, p_lastName, p_userName, p_email, p_company, p_pwd1, p_pwd2;

function PublisherEvents() {

    // First name field events
    inputFirst.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstError.innerHTML = "";
        console.log("First name focusin");
    })

    inputFirst.addEventListener("focusout", (e) => {
        e.preventDefault();
        p_firstName = inputFirst.value;
        if (p_firstName == "") {
            console.log("Firstname error: empty");
            firstError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            FirstnameValid = upTo3(p_firstName, "First name", inputFirst, firstError);
            Publisher_Submit_Activate(submitButton);
        }
    })

    // Last name field events  
    inputLast.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastError.innerHTML = "";
    })

    inputLast.addEventListener("focusout", (e) => {
        e.preventDefault();
        p_lastName = inputLast.value;
        if (p_lastName == "") {
            console.log("Lastname error: empty");
            lastError.innerHTML = `<p>First name cannot be empty.</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";

        } else {
            LastnameValid = upTo3(p_lastName, "Last name", inputLast, lastError);
            Publisher_Submit_Activate(submitButton);
        }
    })

    // User name field events
    inputUser.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        userError.innerHTML = "";
    })

    inputUser.addEventListener('input', function () {
        if (u_invalidC.test(this.value) == true) {
            userError.innerHTML = `<p>Please avoid using special characters exept: _ (underscore) and . (dot)</p>`;
            inputUser.style.background = "rgb(255, 214, 220)";
            inputUser.style.borderColor = "rgb(243, 82, 93)";
        }
    })

    inputUser.addEventListener("focusout", (e) => {
        e.preventDefault();
        p_userName = inputUser.value;      // kiszedi a user mező értékét
        if (p_userName == "") {
            userError.innerHTML = `<p>User name cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("Username field is empty.");

        } else {
            user_upto3 = upTo3(p_userName, "Username", inputUser, userError);
            if (u_abcCahrs.test(p_userName) == false) {
                userError.innerHTML = `<p>Please use the lowecase English alphabetical characters.</p>`;
                e.target.style.background = "rgb(255, 214, 220)";
                e.target.style.borderColor = "rgb(243, 82, 93)";
                user_chars = false;
            } else {
                user_chars = true;
                e.target.style.background = "rgb(241, 255, 231)";
                e.target.style.borderColor = "rgb(98, 173, 107)";
            }

            if (user_chars == true && user_upto3 == true) {
                UsernameValid = true;
            } else {
                UsernameValid = false;
            }

            Publisher_Submit_Activate(submitButton);
        }
    })

    // Email field events
    inputEmail.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        emailError.innerHTML = "";
    })

    inputEmail.addEventListener("focusout", (e) => {
        e.preventDefault();
        p_email = inputEmail.value;
        if (p_email == "") {
            emailError.innerHTML = `<p>Email address cannot be empty</p>`;
            e.target.style.background = "rgb(255, 214, 220)";
            e.target.style.borderColor = "rgb(243, 82, 93)";
            console.log("Email error: empty");

        } else {
            EmailValid = validateEmail(p_email);
            console.log("EmailValid value: " + EmailValid);
            Publisher_Submit_Activate(submitButton);
        }
    })

    // Company field events
    inputCompany.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        companyError.innerHTML = "";
    })

    inputCompany.addEventListener("focusout", (e) => {
        e.preventDefault();
        p_company = inputCompany.value;
        CompanyValid = validateCompany(p_company);
        Publisher_Submit_Activate(submitButton);
    })

    // Fist pwd field events
    inputPwd.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        firstPwdError.innerHTML = "";
    })

    inputPwd.addEventListener("focusout", (e) => {
        e.preventDefault();
        p_pwd1 = inputPwd.value;
        PwdValid = validateFirstPwd(p_pwd1);
        Publisher_Submit_Activate(submitButton);
    })

    // Second password field events
    inputPwdAgain.addEventListener("focusin", (e) => {
        e.preventDefault();
        e.target.style.background = "";
        e.target.style.border = "";
        lastPwdError.innerHTML = "";
    })

    // Button function called in this event
    inputPwdAgain.addEventListener("input", (e) => {
        e.preventDefault();
        p_pwd2 = inputPwdAgain.value;
        PwdAgainValid = matchPwd(p_pwd1, p_pwd2);
        Publisher_Submit_Activate(submitButton);
    })

    checkbox.addEventListener("change", (e) => {
        Publisher_Submit_Activate(submitButton);
        console.log("Publisher events are completed.");
    })

}

//backenddel való összekötés
submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    var postData;

    var checkValidation = validateCheckbox(checkbox);

    if (checkValidation == true) {

        // submitButton.setAttribute("onclick", "window.location.href='../Log-in/login.html'");
        if (isPublisher == true) {


            inputUser.value = '';
            inputFirst.value = '';
            inputLast.value = '';
            inputCompany.value = '';
            inputEmail.value = '';
            inputPwd.value = '';
            inputPwdAgain.value = '';
            datepicker.value = '';

            inputUser.style.background = "";
            inputFirst.style.background = "";
            inputLast.style.background = "";
            inputCompany.style.background = "";
            inputEmail.style.background = "";
            inputPwd.style.background = "";
            inputPwdAgain.style.background = "";
            datepicker.style.background = "";

            inputFirst.style.border = "";
            inputLast.style.border = "";
            inputUser.style.border = "";
            inputCompany.style.border = "";
            inputEmail.style.border = "";
            inputPwd.style.border = "";
            inputPwdAgain.style.border = "";
            datepicker.style.border = "";

            postData = {
                "username": p_userName,
                "firstName": p_firstName,
                "lastName": p_lastName,
                "companyName": p_company,
                "email": p_email,
                "password": p_pwd1,
                "aszf": true
            };

            console.log("Megnyomtad a gombot és elküldted az adatot");
            const responsePub = await publisherRegistration(postData);   //itt hívjuk meg az endpointot
            console.log(responsePub.status); //kiírja azt az adatot amit elküldött a backendnek

            if (responsePub.status == 200) {

                window.location.href = "../Log-in/login.html";

            } else if (responsePub.status == 409) {
                alert("Error 409: Unsuccessfully registration");
            } else if (responsePub.status == 422) {
                alert("Error 422: Please fill in the fields correctly.")
            } else {
                alert(responsePub.status + ": Unexpected problem.");
            }

        } else {

            inputUser.value = '';
            inputFirst.value = '';
            inputLast.value = '';
            inputCompany.value = '';
            inputEmail.value = '';
            inputPwd.value = '';
            inputPwdAgain.value = '';
            datepicker.value = '';

            inputUser.style.background = "";
            inputFirst.style.background = "";
            inputLast.style.background = "";
            inputCompany.style.background = "";
            inputEmail.style.background = "";
            inputPwd.style.background = "";
            inputPwdAgain.style.background = "";
            datepicker.style.background = "";

            inputFirst.style.border = "";
            inputLast.style.border = "";
            inputUser.style.border = "";
            inputCompany.style.border = "";
            inputEmail.style.border = "";
            inputPwd.style.border = "";
            inputPwdAgain.style.border = "";
            datepicker.style.border = "";

            postData = {
                "username": g_userName,
                "firstName": g_firstName,
                "lastName": g_lastName,
                "email": g_email,
                "birthdate": g_date,
                "password": g_pwd1,
                "aszf": true
            };

            console.log("Megnyomtad a gombot és elküldted az adatot");
            const responseGen = await generalRegistration(postData);
            console.log(responseGen.status == 200);

            if (responseGen.status == 200) {

                window.location.href = "../Log-in/login.html";

            } else if (responseGen.status == 409) {
                alert("Error 409: Unsuccessfully registration");
            } else if (responseGen.status == 422) {
                alert("Error 422: Please fill in the fields correctly.")
            } else {
                alert(responseGen.status + ": Unexpected problem.");
            }


        }
    } else {
        AszfError.innerHTML = `<p>You must agree to the terms and conditions.</p>`;

    }


})



/**
 * Documentation
 * -------------
 * This is for activating the submit button when the general
 * form active.
 * The parameter is the submit button's id

 * 
 * @param {Variable} submitButton - The variable that's contains the submit button's id.
 */
function General_Submit_Activate(submitButton) {
    if (FirstnameValid == true &&
        LastnameValid == true &&
        UsernameValid == true &&
        EmailValid == true &&
        PwdValid == true &&
        PwdAgainValid == true) {

        console.log("Legyen aktív a btn");
        submitButton.disabled = false;
    }
}

/**
 * Documentation
 * -------------
 * This is for activating the submit button when the publisher
 * form active.
 * The parameter is the submit button's id
 * 
 * @param {Variable} submitButton - The variable that's contains the submit button's id.
 */
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