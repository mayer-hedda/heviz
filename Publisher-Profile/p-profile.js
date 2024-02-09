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

const followBTN = document.getElementById('follow-btn');
let clicked = false;


followBTN.addEventListener('click', (e)=>{
    e.preventDefault();
    if (clicked == false) {
        followBTN.classList.add('followed');
        followBTN.innerText = 'Followed';
        clicked = true;

        console.log("megnyomtad");

    }else{
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
ourPosts_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    posts_div.hidden = false;
    books_div.hidden = true;
    ourPosts_btn.classList.remove("disabled-btn");
    ourPosts_btn.classList.add("active-btn");

    ourBooks_btn.classList.remove("active-btn");
    ourBooks_btn.classList.add("disabled-btn");
})

// show books
ourBooks_btn.addEventListener('click', (e)=>{
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

editIntro.addEventListener('click', (e)=> {
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
profile_settings.addEventListener('click', (e)=>{
   

    if(privacy_ettings_div.hidden == false){
        privacy_ettings_div.hidden = true;
        profile_settings_div.hidden = false;
        profile_settings.classList.remove('disabled-set');
        profile_settings.classList.add('active-set');

        privacy_settings.classList.remove('active-set');
        privacy_settings.classList.add('disabled-set');

    }else if(buisness_settings_div.hidden == false){
        buisness_settings_div.hidden = true;
        profile_settings_div.hidden = false;
        profile_settings.classList.remove('disabled-set');
        profile_settings.classList.add('active-set');

        buisness_settings.classList.remove('active-set');
        buisness_settings.classList.add('disabled-set');
    }

})

privacy_settings.addEventListener('click', (e)=>{


    if (profile_settings_div.hidden == false) {
        profile_settings_div.hidden = true;
        privacy_ettings_div.hidden = false;
        privacy_settings.classList.remove('disabled-set');
        privacy_settings.classList.add('active-set');

        profile_settings.classList.remove('active-set');
        profile_settings.classList.add('disabled-set');

    }else if(buisness_settings_div.hidden == false){
        buisness_settings_div.hidden = true;
        privacy_ettings_div.hidden = false;
        privacy_settings.classList.remove('disabled-set');
        privacy_settings.classList.add('active-set');

        buisness_settings.classList.remove('active-set');
        buisness_settings.classList.add('disabled-set');
    }

})

buisness_settings.addEventListener('click', (e)=>{
    
    if (profile_settings_div.hidden == false) {
        profile_settings_div.hidden = true;
        buisness_settings_div.hidden = false;
        buisness_settings.classList.remove('disabled-set');
        buisness_settings.classList.add('active-set');

        profile_settings.classList.remove('active-set');
        profile_settings.classList.add('disabled-set');

    }else if(privacy_ettings_div.hidden == false){
        privacy_ettings_div.hidden = true;
        buisness_settings_div.hidden = false;
        buisness_settings.classList.remove('disabled-set');
        buisness_settings.classList.add('active-set');

        privacy_settings.classList.remove('active-set');
        privacy_settings.classList.add('disabled-set');
    }
})

// edit buttons on settings --> profile settings
const set_username = document.getElementById('edit-username');
const edit_email = document.getElementById('edit-email');
const edit_pwd = document.getElementById('edit-pwd');
const edit_phone = document.getElementById('edit-phone');
const edit_fName = document.getElementById('edit-fName');
const edit_lName = document.getElementById('edit-lName');

// inputs on settings --> profile settings
const set_un = document.getElementById('set-un');
const set_email = document.getElementById('set-email');
const set_pwd = document.getElementById('set-pwd');
const set_phoneNumber = document.getElementById('set-phoneNumber');
const set_fName = document.getElementById('set-fName');
const set_lName = document.getElementById('set-lName');

// save and cancel buttons on settings --> profile settings
const username_saveCancel = document.getElementById('username-saveCancel');
const email_saveCancel = document.getElementById('email-saveCancel');
const pwd_saveCancel = document.getElementById('pwd-saveCancel');
const phone_saveCancel = document.getElementById('phone-saveCancel');
const fName_saveCance = document.getElementById('fName-saveCance');
const lName_saveCancel = document.getElementById('lName-saveCancel');



function removeReadonly(element, buttonsRow) {
    element.readOnly = false;
    buttonsRow.hidden = false;
}

function addReadonly(element, buttonsRow){
    element.readOnly = true;
    buttonsRow.hidden = true;
}

function addPlaceholder(element, string){
    element.placeholder = string;
}

// events
set_username.addEventListener('click', (e)=>{
    
    removeReadonly(set_un, username_saveCancel);
})