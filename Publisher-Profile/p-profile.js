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

    img.onload = function(){
        height = img.naturalHeight;
        width = img.naturalWidth;
        console.log("A kép magassága: " + height);
        console.log("A kép szélessége: " + width);

        // ! ide kell egy arány vizsgálat, és meghatározni milyen arányú képeket tölthet fel
    }
    
}