//* DRAG AND DROP IMAGE TO COVER PHOTO + UPLOAD FILE
const dropAreaPicture = document.getElementById('dropAreaPicture');
const inputPicture = document.getElementById('inputPicture');
const imgView = document.getElementById('imgView');

const dropAreaFile = document.getElementById('dropAreaFile');
const inputFile = document.getElementById('inputFile');
const fileView = document.getElementById('fileView');

//? IMAGE
inputPicture.addEventListener("change", uploadImage);

function uploadImage() {
    let imgLink = URL.createObjectURL(inputPicture.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
    imgView.style.border = 0;
}

dropAreaPicture.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropAreaPicture.addEventListener('drop', (e) => {
    e.preventDefault();
    inputPicture.files = e.dataTransfer.files;
    uploadImage();
    console.log(inputPicture.value);
})

//? FILE
inputFile.addEventListener("change", uploadFile);

function uploadFile() {
    let fileLink = URL.createObjectURL(inputFile.files[0]);
    imgView.textContent = "";
    // const perjel = RegExp("\\");
    // const lastIndex = filePath.lastIndexOf(perjel);
    // let fileName = inputFile.value.slice(inputFile.value.indexOf(lastIndex+1));
    //todo: MEGCSINÁLNI, HOGY CSAK A filename.pdf-ET ÍRJA KI 
    fileView.innerHTML = `
        <img class="addPhoto" src="../icons/createBook/upload-file.png" id="addFile">
        <p class="uploadP">You uploaded this:<br> ${inputFile.value}</p>
    `
    // console.log("Lefutott az uploadfile");
}

dropAreaFile.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropAreaFile.addEventListener('drop', (e) => {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadFile();
    console.log(inputFile.value);
})

//* PROCESSING OTHER INPUTS
const title = document.getElementById('inputStoryTitle');
const description = document.getElementById('inputDescription');
const selectAudience = document.getElementById("selectTargetAudience");
const selectLanguage = document.getElementById('selectLanguage');
const selectCategory = document.getElementById('selectCategory');

const charCounterTitle = document.getElementById('characterCounterTitle');
const charCounterDes = document.getElementById('characterCounterDes');

//* ERROR FIELDS
const titleError = document.getElementById('titleErr');
const descriptionError = document.getElementById('descriptErr');
const audienceError = document.getElementById('audienceErr');
const languageError = document.getElementById('languageErr');
const categoryError = document.getElementById('categoryErr');

//* VARIABLES FOR ACTIVATE BUTTON
var titlePass = false; 
var descriptionPass = false; 
var audiencePass = false; 
var languagePass = false; 
var categoryPass = false; 


// #############################################
const storyname = document.getElementById('StoryName');
//? TITLE 
function MinTitle(titleValue) {
    if (titleValue.length < 3) {
        title.classList.add('inputError');
        console.log("Title error: too short - " + titleValue);
        return false;
    }
    return true;
}

title.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = title.value;
    let count = currentText.length;
    charCounterTitle.textContent = `${count}/50`;

    if (count >= 45) {
        // console.log("bemegy az ifbe");
        charCounterTitle.classList.remove('counter');
        charCounterTitle.classList.add('counterErrorLight');

        if (count == 50) {
            charCounterTitle.classList.remove('counterErrorLight');
            charCounterTitle.classList.add('counterErrorBold');
        } else {
            charCounterTitle.classList.remove('counterErrorBold');
            charCounterTitle.classList.add('counterErrorLight');
        }
    } else {
        charCounterTitle.classList.value = '';
        charCounterTitle.classList.add('small', 'counter');
    }
})

title.addEventListener('focusout', (e) => {
    e.preventDefault();
    const titleValue = title.value;
    if (titleValue == "") {
        title.classList.add('inputError');
        titleError.innerText = "Title cannot be empty";
        titlePass = false;
        console.log("TitlePass value: " + titlePass);
    } else {
        const functionValue = MinTitle(titleValue);
       if ( functionValue == false) {
        titlePass = false;
        titleError.innerText = "Title must be 3 caracter long.";
        title.classList.add('inputError');
        console.log("A title függvény értéke: " + functionValue);
        console.log("TitlePass value: " + titlePass);
       }else{
        title.classList.add('inputPass');
        titlePass = true;
        console.log("TitlePass value: " + titlePass);
        storyname.textContent = title.value;
       }
    }
    
})

title.addEventListener('focusin', (e)=>{
    e.preventDefault();
    title.classList.remove('inputError');
    title.classList.remove('inputPass');
    titleError.innerText = "";
    storyname.textContent = "Untitled Story";
})
// #############################################
//? DESCRIPTION
function MinDesc(descriptionValue){
    if (descriptionValue.length < 20) {
        description.classList.add('inputError');
        console.log("Description error: too short - " + descriptionValue);
        return false;
    }
    return true;
}

description.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = description.value;
    const count = currentText.length;
    charCounterDes.textContent = `${count}/1000`;

    if (count >= 950) {
        console.log("bemegy az ifbe");
        charCounterDes.classList.remove('counter');
        charCounterDes.classList.add('counterErrorLight');

        if (count == 1000) {
            charCounterDes.classList.remove('counterErrorLight');
            charCounterDes.classList.add('counterErrorBold');
        } else {
            charCounterDes.classList.remove('counterErrorBold');
            charCounterDes.classList.add('counterErrorLight');
        }
    } else {
        charCounterDes.classList.value = '';
        charCounterDes.classList.add('small', 'counter');
    }
})

description.addEventListener('focusout', (e)=>{
    e.preventDefault();
    const descValue = description.value;
    if (descValue == "") {
        description.classList.add('inputError');
        descriptionError.innerText = "The description field cannot be empty";
        descriptionPass = false;
        console.log("descriptionPass value: " + titlePass);
    } else {
        const functionValue = MinDesc(descValue);
       if ( functionValue == false) {
        descriptionPass = false;
        descriptionError.innerText = "The description must be 20 caracter long.";
        description.classList.add('inputError');
        console.log("A descript. függvény értéke: " + functionValue);
        console.log("descriptionPass value: " + titlePass);
       }else{
        description.classList.add('inputPass');
        descriptionPass = true;
        console.log("descriptionPass value: " + titlePass);
       }
    }
})

description.addEventListener('focusin', (e)=>{
    e.preventDefault();
    description.classList.remove('inputError');
    description.classList.remove('inputPass');
    descriptionError.innerText = "";
})

// #############################################
//? AUDIENCE DROPDOWN
var audienceData;
function VerifyDropdown(select, errorField, selection) {
    if (select.value == 0) {
        const errorMessage = `The ${selection} cannot be the default value.`;
        errorField.innerHTML = `<p>${errorMessage}</p>`;
        select.classList.add('inputError');
        return false;
    }
    return true;
}

selectAudience.addEventListener('focusout', (e) => {
    e.preventDefault();
    audienceValue = e.target.value;
    console.log("You selected: " + audienceValue);

    const functionValue = VerifyDropdown(selectAudience, audienceError, "Audience");
    if (functionValue == true) {
        selectAudience.classList.add('inputPass');
        audiencePass = true;
        console.log("audiencePass value: " + audiencePass);
        audienceData = audienceValue;
        console.log(audienceData);
    }
})

selectAudience.addEventListener('focusin', (e) => {
    e.preventDefault();
    selectAudience.classList.remove('inputError');
    selectAudience.classList.remove('inputPass');
    audienceError.innerHTML = "";
})

// selectAudience.addEventListener('change', (e)=>{
//     e.preventDefault();
//     const functionValue = VerifyDropdown(selectAudience, audienceError, "Audience");
//     if (condition) {
        
//     }
// })