/*
get -> visszakapjuk az adatokat
delete -> törlés
post -> új adatok
put -> adatmódosízás

let: blokkon kívül + belül elérhető, értéke módosítható
const: nem változhat az értéke + blokkhoz kötött
let: blokkhoz kötött, de értéke változhat


*/

//Mezők kiszedése ID alapján
const submitButton = document.getElementById("submitButton");
const inputEmail = document.getElementById("input-Email");
const inputPwd = document.getElementById("input-Pwd");
let emailError = document.getElementById("email_error");
let pwdError = document.getElementById("pwd_Error");

//segédek
let emailValid = false;
let pwdValid = false;

//FUNCTIONS

function EmailCheck(emailValue) {
    if (emailValue.length < 3) {
        emailError.innerHTML = `<p>Email address must be at least 3 characters long.</p>`;
        emailValid = false;
    } else {
        //TODO: ide be kell majd kötni, hogy egyezik-e az eltárolt adattal
        //TODO: ha igen a email_seged = true, ha nem akkor hibaüzenet
        emailValid = true;
    }
    console.log("email seged: " + emailValid);
    BtnActivate();
}

function PwdCheck(pwdValue) {
    if (pwdValue.length < 8) {
        pwdError.innerHTML = `<p>Password address must be at least 8 characters long.</p>`;
        pwdValid = false;
    } else {
        //TODO: adatbázisból megnézni, hogy egyezik-e a fiókhoz tartozó adattal
        //TODO: ha igen akkor pwd_seged = true, ha nem akkor hibaüzenet
        pwdValid = true;
        BtnActivate();
        
    }
    console.log("Megvan a karakterszám " + pwdValid);
}

function BtnActivate(){
    if(pwdValid == true && emailValid == true){
        submitButton.disabled = false;
        console.log("A gomb aktív.");
    }else{
        submitButton.disabled = true;
        console.log("A gomb nem aktív");
    }
}

/*
EVENT LISTENERS - EMAIL
*/
inputEmail.addEventListener("focusout", (e) => {
    e.preventDefault();
    //muszály itt kiszedni az adatot mert sorrendbe fut le
    const emailValue = inputEmail.value;
    // console.log(emailValue);
    if (emailValue == "") {
        emailError.innerHTML = `<p>Email field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        emailValid = false;
    } else {
        EmailCheck(emailValue);
        // console.log(emailValue);
    }
})

inputEmail.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    emailError.innerHTML = "";
})

/*
EVENT LISTENERS - PASSWORD
*/
inputPwd.addEventListener("input", (e) => {
    e.preventDefault();
    const pwdValue = inputPwd.value;
    if(pwdValue == ""){
        pwdError.innerHTML = `<p>Password field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        pwdValid = false;
    }else{
        PwdCheck(pwdValue);
        // console.log(pwdValue);
    }
})



inputPwd.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    pwdError.innerHTML = "";
})