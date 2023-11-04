//* DRAG AND DROP IMAGE TO COVER PHOTO 

const dropArea = document.getElementById('dropArea');
const inputPicture = document.getElementById('inputPicture');
const imgView = document.getElementById('imgView');

inputPicture.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink = URL.createObjectURL(inputPicture.files[0]);
    imgView.style.backgroundImage = `url(${imgLink})`;
    imgView.textContent = "";
    imgView.style.border = 0;
}

dropArea.addEventListener('dragover', (e)=>{
    e.preventDefault();
})

dropArea.addEventListener('drop', (e)=>{
    e.preventDefault();
    inputPicture.files = e.dataTransfer.files;
    uploadImage();
    console.log(inputPicture.value);
})