const our_books = document.getElementById('our-books');
const our_posts = document.getElementById('our-posts');


// Upload profile picture
const drop_area_picture = document.getElementById('drop-area-picture');
const inputPicture = document.getElementById('inputPicture');
const imgView = document.getElementById('imgView');

inputPicture.addEventListener('change', uploadImage);

function uploadImage() {
    let imgLink = URL.createObjectURL(inputPicture.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
    imgView.style.border = 0;

    var img = new Image();
    img.src = imgLink;

    img.onload = function () {
        height = img.naturalHeight;
        width = img.naturalWidth;
        console.log("A kép magassága: " + height);
        console.log("A kép szélessége: " + width);

        // ! ide kell egy arány vizsgálat, és meghatározni milyen arányú képeket tölthet fel
    }

}

const followBTN = document.getElementById('follow-btn');
let clicked = false;


followBTN.addEventListener('click', (e) => {
    e.preventDefault();
    if (clicked == false) {
        followBTN.classList.add('followed');
        followBTN.innerText = 'Followed';
        clicked = true;

        console.log("megnyomtad");

    } else {
        followBTN.classList.remove('followed');
        followBTN.innerText = 'Follow';
        clicked = false;
    }
})

const ourBooks_btn = document.getElementById('our-books');
const books_div = document.getElementById('books');
const ourPosts_btn = document.getElementById('our-posts');
const posts_div = document.getElementById('posts');

let books = false;
let posts = false;

// show posts
ourPosts_btn.addEventListener('click', (e) => {
    e.preventDefault();
    posts_div.hidden = false;
    books_div.hidden = true;
    ourPosts_btn.classList.remove("disabled-btn");
    ourPosts_btn.classList.add("active-btn");

    ourBooks_btn.classList.remove("active-btn");
    ourBooks_btn.classList.add("disabled-btn");
})

// show books
ourBooks_btn.addEventListener('click', (e) => {
    e.preventDefault();
    books_div.hidden = false;
    posts_div.hidden = true;
    ourBooks_btn.classList.remove("disabled-btn");
    ourBooks_btn.classList.add("active-btn");

    ourPosts_btn.classList.remove("active-btn");
    ourPosts_btn.classList.add("disabled-btn");
})

// edit introdution
const editIntro = document.getElementById('edit-intro');
const introText = document.getElementById('intro-text');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

editIntro.addEventListener('click', (e) => {
    e.preventDefault();
    introText.readOnly = false;
    introText.classList.add("info-edit-active");
    saveBtn.hidden = false;
    cancelBtn.hidden = false;
})

// switch between settiings
// settings buttons
const profile_settings = document.getElementById('profile-settings');
const privacy_settings = document.getElementById('privacy-settings');
const buisness_settings = document.getElementById('buisness-settings');

// settings divs
const profile_settings_div = document.getElementById('profile-settings-div');
const privacy_ettings_div = document.getElementById('privacy-settings-div');
const buisness_settings_div = document.getElementById('buisness-settings-div');

// settings buttons events
profile_settings.addEventListener('click', (e) => {


    if (privacy_ettings_div.hidden == false) {
        privacy_ettings_div.hidden = true;
        profile_settings_div.hidden = false;
        profile_settings.classList.remove('disabled-set');
        profile_settings.classList.add('active-set');

        privacy_settings.classList.remove('active-set');
        privacy_settings.classList.add('disabled-set');

    } else if (buisness_settings_div.hidden == false) {
        buisness_settings_div.hidden = true;
        profile_settings_div.hidden = false;
        profile_settings.classList.remove('disabled-set');
        profile_settings.classList.add('active-set');

        buisness_settings.classList.remove('active-set');
        buisness_settings.classList.add('disabled-set');
    }

})

privacy_settings.addEventListener('click', (e) => {


    if (profile_settings_div.hidden == false) {
        profile_settings_div.hidden = true;
        privacy_ettings_div.hidden = false;
        privacy_settings.classList.remove('disabled-set');
        privacy_settings.classList.add('active-set');

        profile_settings.classList.remove('active-set');
        profile_settings.classList.add('disabled-set');

    } else if (buisness_settings_div.hidden == false) {
        buisness_settings_div.hidden = true;
        privacy_ettings_div.hidden = false;
        privacy_settings.classList.remove('disabled-set');
        privacy_settings.classList.add('active-set');

        buisness_settings.classList.remove('active-set');
        buisness_settings.classList.add('disabled-set');
    }

})

buisness_settings.addEventListener('click', (e) => {

    if (profile_settings_div.hidden == false) {
        profile_settings_div.hidden = true;
        buisness_settings_div.hidden = false;
        buisness_settings.classList.remove('disabled-set');
        buisness_settings.classList.add('active-set');

        profile_settings.classList.remove('active-set');
        profile_settings.classList.add('disabled-set');

    } else if (privacy_ettings_div.hidden == false) {
        privacy_ettings_div.hidden = true;
        buisness_settings_div.hidden = false;
        buisness_settings.classList.remove('disabled-set');
        buisness_settings.classList.add('active-set');

        privacy_settings.classList.remove('active-set');
        privacy_settings.classList.add('disabled-set');
    }
})

// edit buttons on settings --> profile settings
const edit_username = document.getElementById('edit-username');
const edit_email = document.getElementById('edit-email');
const edit_pwd = document.getElementById('edit-pwd');
const edit_phone = document.getElementById('edit-phone');
const edit_fName = document.getElementById('edit-fName');
const edit_lName = document.getElementById('edit-lName');

// inputs on settings --> profile settings
const input_un = document.getElementById('input-un');
const input_email = document.getElementById('input-email');
const input_pwd = document.getElementById('input-pwd');
const input_phoneNumber = document.getElementById('input-phoneNumber');
const input_fName = document.getElementById('input-fName');
const input_lName = document.getElementById('input-lName');

// save and cancel button rows on settings --> profile settings
const username_saveCancel = document.getElementById('username-saveCancel');
const email_saveCancel = document.getElementById('email-saveCancel');
const pwd_saveCancel = document.getElementById('pwd-saveCancel');
const phone_saveCancel = document.getElementById('phone-saveCancel');
const fName_saveCancel = document.getElementById('fName-saveCancel');
const lName_saveCancel = document.getElementById('lName-saveCancel');

// Cancel buttons
const un_cancel = document.getElementById('un-cancel');
const e_cancel = document.getElementById('e-cancel');
const pwd_cancel = document.getElementById('pwd-cancel');
const p_cancel = document.getElementById('p-cancel');
const fn_cancel = document.getElementById('fn-cancel');
const ln_cancel = document.getElementById('ln-cancel');

// save buttons
const un_save = document.getElementById('un-save');
const e_save = document.getElementById('e-save');
const pwd_save = document.getElementById('pwd-save');
const p_save = document.getElementById('p-save');
const fn_save = document.getElementById('fn-save');
const ln_save = document.getElementById('ln-save');

// errors
const un_error = document.getElementById('un-error');
const e_error = document.getElementById('e-error');
const pwd_error = document.getElementById('pwd-error');
const phone_error = document.getElementById('phone-error');
const fn_error = document.getElementById('fn-error');
const ln_error = document.getElementById('ln-error');

// Functions
/**
 * Documementation
 * ---------------
 * @param {HTMLInputElement} element - Is the input whose readonly property is set to false by the function
 * @param {HTMLDivElement} buttonsRow - The div that contains the cancel and save buttons
 */
function EditIcon(element, buttonsRow) {
    element.removeAttribute('readonly')
    buttonsRow.hidden = false;
    console.log("Most szerkeszthető az input");
}

/**
 * Documementation
 * ---------------
 * @param {HTMLInputElement} element - Is the input whose readonly property is set to true by the function
 * @param {HTMLDivElement} buttonsRow - The div that contains the cancel and save buttons
 */
function Cancel(element, buttonsRow) {
    element.value = "";
    element.setAttribute('readonly', true);
    buttonsRow.hidden = true;
}

/**
 * Documementation
 * ---------------
 * @param {HTMLInputElement} element - The input element for which we set a placeholder
 * @param {String} string - The actual value for the placeholder
 */
function addPlaceholder(element, string) {
    element.setAttribute('placeholder', string);
}

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
        e_error.innerHTML = `<p>Email address must be contains the "@" symbol.</p>`;
        console.log("Email addres doesn't include @ character. Input: " + emailValue);
        input_email.style.background = "rgb(255, 214, 220)";
        input_email.style.borderColor = "rgb(243, 82, 93)";
        at_symbol = false;

    } else if (specReg.test(emailValue) == true) {

        const atCount = (emailValue.match(/@/g) || []).length; // Count @ symbols in emailValue

        at_symbol = true;
        if (atCount !== 1) {
            e_error.innerHTML = `<p>Email address must contain exactly one "@" symbol.</p>`;
            console.log("Email address must contain exactly one @ symbol. Input:" + emailValue);
            input_email.style.background = "rgb(255, 214, 220)";
            input_email.style.borderColor = "rgb(243, 82, 93)";
            return false;
        } else {
            //It checks what is in front of the @.
            const firsPartOfEmail = emailValue.slice(0, emailValue.indexOf('@'));
            console.log("Include @. The value before @: " + firsPartOfEmail);

            if (firsPartOfEmail == "") {
                e_error.innerHTML = `<p>Email address cannot empty before "@" symbol.</p>`;
                input_email.style.background = "rgb(255, 214, 220)";
                input_email.style.borderColor = "rgb(243, 82, 93)";
                console.log("The first part of the email is empty. Input: " + emailValue);
                fp_email = false;
            } else {
                if (allowedChars.test(emailValue) == true) {
                    chars_email = true;
                    if (firsPartOfEmail.length < 4) {
                        e_error.innerHTML = `<p>Please ensure you have at least 4 characters before the "@" symbol.</p>`;

                        input_email.style.background = "rgb(255, 214, 220)";
                        input_email.style.borderColor = "rgb(243, 82, 93)";
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
                                e_error.innerHTML = `<p>Please ensure you have at least 2 characters before the " . " (dot) symbol.</p>`;
                                lp_email = false;
                                input_email.style.background = "rgb(255, 214, 220)";
                                input_email.style.borderColor = "rgb(243, 82, 93)";
                            } else {
                                lp_email = true;
                                input_email.style.background = "rgb(241, 255, 231)";
                                input_email.style.borderColor = "rgb(98, 173, 107)";
                                console.log("Last part of email is complied. Input: " + emailValue);
                            }


                        } else {
                            console.log("Last part of email doesn't include dot. Input: " + emailValue);
                            e_error.innerHTML = `<p>Please include the '.' (dot) symbol in your email address.</p>`;
                            input_email.style.background = "rgb(255, 214, 220)";
                            input_email.style.borderColor = "rgb(243, 82, 93)";
                            lp_email = false;
                        }
                    }
                } else {
                    e_error.innerHTML = `<p>The email address must contain only the English alphabet, a dot (.) and the at (@) symbol.</p>`;
                    input_email.style.background = "rgb(255, 214, 220)";
                    input_email.style.borderColor = "rgb(243, 82, 93)";
                    console.error("Email address contains something that not allowed");
                    chars_email = false;
                }

            }
        }

    } else {
        e_error.innerHTML = `<p>Please include the '@' symbol in your email address.</p>`;
        at_symbol = false;
        input_email.style.background = "rgb(255, 214, 220)";
        input_email.style.borderColor = "rgb(243, 82, 93)";
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
 * @param {HTMLDivElement} companyError - the div for the error message
 * @param {HTMLInputElement} inputCompany - the input element whitch contains the company value
 * @returns {Boolean}
 */

function validateCompany(companyValue, companyError, inputCompany) {
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
 * This function check the characters of the input field. 
 * It has to be only numbers.
 * It returns true or false.
 * 
 * @param {Variable} phoneValue - the value of the phone number input field
 * @param {HTMLInputElement} inputPhone - the input field of the phone number section
 * @param {HTMLDivElement} errorPhone - the div of the error message
 * @returns {Boolean}
 */
function validatePhone(phoneValue, inputPhone, errorPhone) {

    var pattern = /^[0-9]+$/;
    if (pattern.test(phoneValue) == true) {
        inputPhone.style.background = "rgb(241, 255, 231)";
        inputPhone.style.borderColor = "rgb(98, 173, 107)";
        return true;
    } else {
        inputPhone.style.background = "rgb(255, 214, 220)";
        inputPhone.style.borderColor = "rgb(243, 82, 93)";
        errorPhone.innerHTML = `<p>This field should contains only numbers.</p>`
        return false;
    }

}

// Events
// username
edit_username.addEventListener('click', (e) => {
    EditIcon(input_un, username_saveCancel);
})

un_cancel.addEventListener('click', (e) => {
    Cancel(input_un, username_saveCancel)
})

un_save.addEventListener('click', (e) => {
    // console.log("megnyomtad a save gombot");
    let un_boolean = upTo3(input_un.value, "username", input_un, un_error);
    console.log("username save btn: " + un_boolean);

    // !ide kell egy vizsgálat arra, hogy ha true csak akkor küldjön adatot a BE-nek
})

input_un.addEventListener('focusin', (e) => {
    un_error.innerHTML = "";
    e.target.style.background = "";
    e.target.style.border = "";
})

// email 
edit_email.addEventListener('click', (e) => {
    // e.preventDefault();
    EditIcon(input_email, email_saveCancel);
})

e_cancel.addEventListener('click', (e) => {
    Cancel(input_email, email_saveCancel);
})

e_save.addEventListener('click', (e)=>{
    // console.log("Megnyomtad az email save gombot");
    let e_boolean = validateEmail(input_email.value);
    console.log("username save btn: " + e_boolean);
    // !ide kell egy vizsgálat arra, hogy ha true csak akkor küldjön adatot a BE-nek
})

input_email.addEventListener('focusin', (e)=>{
    e.target.style.background = "";
    e.target.style.border = "";
    e_error.innerHTML = "";
})

// password
edit_pwd.addEventListener('click', (e) => {
    EditIcon(input_pwd, pwd_saveCancel);
})

pwd_cancel.addEventListener('click', (e) => {
    Cancel(input_pwd, pwd_saveCancel);
})

pwd_save.addEventListener('click', (e) => {
    // console.log("Megnyomtad a pwd save gombot");
    let pwd_boolean = validatePwd(input_pwd.value, input_pwd, pwd_error);
    console.log("pwd valid boolean: " + pwd_boolean);

    // !ide kell egy vizsgálat arra, hogy ha true csak akkor küldjön adatot a BE-nek
})

input_pwd.addEventListener('focusin', (e) => {
    e.target.style.background = "";
    e.target.style.border = "";
    pwd_error.innerHTML = "";
})

// phone number
edit_phone.addEventListener('click', (e) => {
    EditIcon(input_phoneNumber, phone_saveCancel);
})

p_cancel.addEventListener('click', (e) => {
    Cancel(input_phoneNumber, phone_saveCancel);
})

p_save.addEventListener('click', (e)=>{
    console.log("Megnyomtad a phone save gombot");
    let phone_boolean = validatePhone(input_phoneNumber.value, input_phoneNumber, phone_error);
    console.log("phone boolean: " + phone_boolean);

    // !ide kell egy vizsgálat arra, hogy ha true csak akkor küldjön adatot a BE-nek
})

input_phoneNumber.addEventListener('focusin', (e)=>{
    e.target.style.background = "";
    e.target.style.border = "";
    phone_error.innerHTML = "";
})

// first name
edit_fName.addEventListener('click', (e) => {
    EditIcon(input_fName, fName_saveCancel);
})

fn_cancel.addEventListener('click', (e) => {
    Cancel(input_fName, fName_saveCancel);
})

fn_save.addEventListener('click', (e) => {
    // console.log("megnyomtad a save gombot");
    let fn_boolean = upTo3(input_fName.value, "first name", input_fName, fn_error);
    console.log("username save btn: " + fn_boolean);

    // !ide kell egy vizsgálat arra, hogy ha true csak akkor küldjön adatot a BE-nek
})

input_fName.addEventListener('focusin', (e) => {
    fn_error.innerHTML = "";
    e.target.style.background = "";
    e.target.style.border = "";
})

// last name
edit_lName.addEventListener('click', (e) => {
    EditIcon(input_lName, lName_saveCancel);
})

ln_cancel.addEventListener('click', (e) => {
    Cancel(input_lName, lName_saveCancel);
})

ln_save.addEventListener('click', (e) => {
    // console.log("megnyomtad a save gombot");
    let ln_boolean = upTo3(input_lName.value, "last name", input_lName, ln_error);
    console.log("username save btn: " + ln_boolean);

    // !ide kell egy vizsgálat arra, hogy ha true csak akkor küldjön adatot a BE-nek
})

input_lName.addEventListener('focusin', (e) => {
    ln_error.innerHTML = "";
    e.target.style.background = "";
    e.target.style.border = "";
})