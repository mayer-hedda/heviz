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
// const selectCopyRight = document.getElementById('selectCopyRight');
const selectCategory = document.getElementById('selectCategory');
const charCounterTitle = document.getElementById('characterCounterTitle');
const charCounterDes = document.getElementById('characterCounterDes');

//* ERROR FIELDS
const titleError = document.getElementById('titleErr');
const descriptionError = document.getElementById('descriptErr');
const audienceError = document.getElementById('audienceErr');
const languageError = document.getElementById('languageErr');
const categoryError = document.getElementById('categoryErr');

//?TITLE 
function MinTitle(titleValue) {
    if (titleValue > 3) {
        title.classList.add('inputError');
        console.log("Title error: too short - " + titleValue);
    }
}

title.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = title.value;
    let count = currentText.length;
    charCounterTitle.textContent = `${count}/100`;

    if (count >= 95) {
        console.log("bemegy az ifbe");
        charCounterTitle.classList.remove('counter');
        charCounterTitle.classList.add('counterErrorLight');

        if (count == 100) {
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
        emailError.innerHTML = `<p>Email address must be at least 3 characters long.</p>`;

    } else {

    }
    MinTitle(titleValue);
})

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

//? example for the dropdown
selectAudience.addEventListener('change', (e) => {
    console.log("You selected: " + e.target.value);
})