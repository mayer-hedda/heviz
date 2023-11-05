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

//* OTHER INPUTS
const title = document.getElementById('inputStoryTitle');
const kapcsolo = document.getElementById('check-apple');

kapcsolo.addEventListener('checked', (e) => {
    e.preventDefault();
    console.log(kapcsolo.value);
})