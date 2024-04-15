// inputs on settings --> profile settings
const input_un = document.getElementById('input-un');
const input_email = document.getElementById('input-email');
const input_website = document.getElementById('input-website');
const input_pwd = document.getElementById('input-pwd');
const input_phoneNumber = document.getElementById('input-phoneNumber');
const input_fName = document.getElementById('input-fName');
const input_lName = document.getElementById('input-lName');
const input_company = document.getElementById('input-company');

let isIntroExist = false;
const missing_intro_text = document.getElementById('missing-intro-text');
const our_books = document.getElementById('our-books');
const our_posts = document.getElementById('our-posts');

// settings buttons
const profile_settings = document.getElementById('profile-settings');
const privacy_settings = document.getElementById('privacy-settings');
const buisness_settings = document.getElementById('buisness-settings');

const isEmail_public = document.getElementById('email-isPublic');
const isPhone_public = document.getElementById('phone-isPublic');


const carousel = document.getElementById('recom-profs');
const just_two_writer = document.getElementById('just-two-writer');

const followBTN = document.getElementById('follow-btn');

const books_div = document.getElementById('books');

// Modal btn-s
const save_btn = document.getElementById('save-btn');
const shopping_btn = document.getElementById('shopping-cart');
const publish_btn = document.getElementById('publish-btn');
const modal_footer_div = document.getElementById('general-m-footer-shop');
const book_price = document.getElementById('book-price');

window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();
    console.log(tokenResponse);
    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {

    var username = localStorage.getItem('username');

    var tokenResponese = await token();
    switch (tokenResponese.status) {
        case 302:

            localStorage.removeItem('Error Code:');

            var responseUser = await getUserDetails({ "profileUsername": username });


            switch (responseUser.status) {
                case 200:
                    /**
                     * Ha general akkor elrejtem a következő adatokat
                     *  - író ajánlások
                     *  - settings-ben a company-ra vonatkozó beállítások
                     * Átírja a következőket:
                     *  - Our Books menü helyett --> My Books
                     *  - Our Posts menü helyett --> My Posts
                     */
                    if (responseUser.data.rank == "general") {
                        // ourWriters_div.hidden = true;
                        our_books.textContent = "My Books";
                        our_posts.textContent = "My Posts";
                        buisness_settings.hidden = true;
                    } else {
                        our_books.textContent = "Our Books";
                        our_posts.textContent = "Our Posts";
                    }

                    const isOwnProf = checkOwnProfile(responseUser);

                    if (isOwnProf == true) {
                        if (responseUser.data.introDescription === undefined || responseUser.data.introDescription == "") {
                            introText.hidden = true;
                            missing_intro_text.hidden = false;
                            isIntroExist = false;
                        } else {
                            introText.innerHTML = `${responseUser.data.introDescription}`;
                            isIntroExist = true;
                        }



                        modal_footer_div.hidden = true;

                        // load books
                        const responseBooks = await getUserBooks({ "profileUsername": username });

                        switch (responseBooks.status) {
                            case 200:
                                getBooks(responseBooks, responseUser);

                                if (responseUser.data.rank == "publisher") {
                                    const editBooks = document.querySelectorAll('.edit-book');
                                    editBooks.forEach(button => {
                                        button.setAttribute('data-bs-toggle', 'modal');
                                        button.setAttribute('data-bs-target', '#setPriceModal');
                                    });

                                } else {
                                    const editBooks = document.querySelectorAll('.edit-book');
                                    editBooks.forEach(button => {
                                        button.removeAttribute('data-bs-toggle', 'modal');
                                        button.removeAttribute('data-bs-target', '#setPriceModal');
                                    });
                                }

                                break;
                            case 401:

                                break;

                            case 422:

                                break;
                        }

                    } else if (isOwnProf == false) {
                        if (responseUser.data.introDescription != undefined && responseUser.data.introDescription != "") {
                            introText.innerHTML = `${responseUser.data.introDescription}`;
                            isIntroExist = true;
                        } else {
                            document.getElementById('introdution').hidden = true;
                        }

                        var followed = false;
                        if (responseUser.data.following == true) {
                            followBTN.classList.remove('default-follow');
                            followBTN.classList.add('followed');
                            followBTN.textContent = "Followed";
                            followed = true;

                        } else if (responseUser.data.following == false) {
                            followBTN.classList.remove('followed');
                            followBTN.classList.add('default-follow');
                            followBTN.textContent = "Follow";
                            followed = false;
                        }


                        Follow(followBTN, responseUser, 9);

                        if (responseUser.data.rank == "publisher" && tokenResponese.data.rank == "publisher") {
                            document.getElementById('access-denied-notification').hidden = false;

                        } else if (responseUser.data.rank == "general" && tokenResponese.data.rank == "publisher") {
                            publish_btn.hidden = false;
                            book_price.hidden = true;
                            shopping_btn.hidden = true;

                            // load books
                            const responseBooks = await getUserBooks({ "profileUsername": username });

                            switch (responseBooks.status) {
                                case 200:
                                    getBooks(responseBooks, responseUser);
                                    break;
                                case 401:
                                    // Hibakezelés hiányzik
                                    break;

                                case 422:
                                    // hibakezelés hiányzik
                                    break;
                            }
                        } else if (responseUser.data.rank == "general" && tokenResponese.data.rank == "general" || responseUser.data.rank == "publisher" && tokenResponese.data.rank == "general") {
                            publish_btn.hidden = true;
                            book_price.hidden = false;
                            shopping_btn.hidden = false;

                            // load books
                            const responseBooks = await getUserBooks({ "profileUsername": username });

                            switch (responseBooks.status) {
                                case 200:
                                    getBooks(responseBooks, responseUser);
                                    break;
                                case 401:

                                    break;

                                case 422:

                                    break;
                            }
                        }
                    }



                    loadProfilePicture(responseUser);
                    loadCoverColor(responseUser);
                    loadUserTextDatas(responseUser);
                    contactInfos(responseUser);

                    if (responseUser.data.ownProfile == true) {

                        var settingsDetails = await getDetails();


                        addPlaceholder(settingsDetails, "username", input_un);
                        addPlaceholder(settingsDetails, "website", input_website);
                        addPlaceholder(settingsDetails, "email", input_email);
                        addPlaceholder(settingsDetails, "phoneNumber", input_phoneNumber);
                        addPlaceholder(settingsDetails, "firstName", input_fName);
                        addPlaceholder(settingsDetails, "lastName", input_lName);


                        if (settingsDetails.data.publicEmail == true) {
                            isEmail_public.checked = true;
                        } else {
                            isEmail_public.checked = false;
                        }

                        if (settingsDetails.data.publicPhoneNumber == true) {
                            isPhone_public.checked = true;
                        } else {
                            isPhone_public.checked = false;
                        }

                        if (settingsDetails.data.companyName != undefined) {
                            addPlaceholder(settingsDetails, "companyName", input_company);
                        }
                    }

                    // load posts
                    const responsePosts = await getUserPosts({ "profileUsername": username });


                    switch (responsePosts.status) {
                        case 200:
                            getPosts(responsePosts, responseUser);
                            break;

                        case 401:

                            break;

                        case 422:

                            break;
                    }



                    break;
                case 401:

                    window.location.href = "../Log-in/login.html";
                    break;

                case 422:
                    alert("422 - Something went wrong");
                    console.error("Error: " + responseUser);
                    break;

                default:
                    localStorage.setItem('Error Code:', `${responseUser.error}`);
                    window.location.href = "../404/404.html";
                    break;
            }

            break;

        case 422:
            console.error(tokenResponese.data);
            break;

        case 401:
            window.location.href = "../Log-in/login.html";
            break;
    }
}



// edit introdution
const editIntro = document.getElementById('edit-intro');
const introText = document.getElementById('intro-text');
const intro_saveBtn = document.getElementById('intro-save-btn');
const intro_cancelBtn = document.getElementById('intro-cancel-btn');
const error_and_counter = document.getElementById('error-and-counter');
const introErr = document.getElementById('introErr');
const characterCounter = document.getElementById('characterCounter');

editIntro.addEventListener('click', (e) => {
    e.preventDefault();

    if (isIntroExist == false) {
        introText.hidden = false;
        missing_intro_text.hidden = true;

        introText.readOnly = false;
        introText.classList.add("info-edit-active");
        intro_saveBtn.hidden = false;
        intro_cancelBtn.hidden = false;
        error_and_counter.hidden = false;
    } else {

        introText.readOnly = false;
        introText.classList.add("info-edit-active");
        intro_saveBtn.hidden = false;
        intro_cancelBtn.hidden = false;
        error_and_counter.hidden = false;
    }


})


intro_cancelBtn.addEventListener('click', (e) => {

    if (isIntroExist == false) {
        introText.hidden = true;
        missing_intro_text.hidden = false;

        intro_saveBtn.hidden = true;
        intro_cancelBtn.hidden = true;
        error_and_counter.hidden = true;

    } else {

        introText.readOnly = true;
        introText.classList.remove("info-edit-active");
        intro_saveBtn.hidden = true;
        intro_cancelBtn.hidden = true;
        error_and_counter.hidden = true;
    }
})

introText.addEventListener('input', (e) => {
    e.preventDefault();
    const currentValue = introText.value;
    let count = currentValue.length;
    characterCounter.textContent = `${count}/1000`;

    if (count >= 950) {
        characterCounter.classList.remove('counter');
        characterCounter.classList.add('counterErrorLight');

        if (count == 1000) {
            characterCounter.classList.remove('counterErrorLight');
            characterCounter.classList.add('counterErrorBold');
        } else {
            characterCounter.classList.remove('counterErrorBold');
            characterCounter.classList.add('counterErrorLight');
        }
    } else {
        characterCounter.classList.value = '';
        characterCounter.classList.add('small', 'counter');
    }

})


intro_saveBtn.addEventListener('click', async function () {
    const introValue = introText.value;


    const introResult = await setIntroDescription({ "introDescription": `${introValue}` });
    if (introResult.status == 200) {

        var username = localStorage.getItem('username');
        const userDetailsIntro = await getUserDetails({ "profileUsername": `${username}` });
        if (userDetailsIntro.status == 200) {
            console.log("Success");
            introText.readOnly = true;
            introText.classList.remove("info-edit-active");
            intro_saveBtn.hidden = true;
            intro_cancelBtn.hidden = true;
            error_and_counter.hidden = true;

        } else {
            alert(userDetailsIntro.status + ": Something went wrong, please try it later.");
        }

    } else if (introResult.status == 401) {
        alert("Statuscode: " + introResult.status + ". Error message: " + introResult.data)
        console.error("Error message in edit intro: " + introResult.data);


    } else if (introResult.status == 422) {
        alert("Statuscode: " + introResult.status + " - " + introResult.data);
    } else {
        console.log("Unknown error ");
    }
});


// edit post modal caracter count
const post_textarea = document.getElementById('message-text');
const characterCounterPost = document.getElementById('characterCounterPost');

post_textarea.addEventListener('input', (e) => {
    const currentValuePost = post_textarea.value;
    let count = currentValuePost.length;
    characterCounterPost.textContent = `${count}/1000`;

    if (count >= 950) {

        characterCounterPost.classList.remove('counter');
        characterCounterPost.classList.add('counterErrorLight');

        if (count == 1000) {
            characterCounterPost.classList.remove('counterErrorLight');
            characterCounterPost.classList.add('counterErrorBold');
        } else {
            characterCounterPost.classList.remove('counterErrorBold');
            characterCounterPost.classList.add('counterErrorLight');
        }
    } else {
        characterCounterPost.classList.value = '';
        characterCounterPost.classList.add('small', 'counter');
    }
})

// functions for loading datas
function loadProfilePicture(response) {
    const profile_picture = document.getElementById('profile-picture');

    if (response.data.image) {
        profile_picture.src = `../${response.data.image}`;
    } else {
        profile_picture.src = `../pictures/default-profile-pic.png`;
    }
}

function loadCoverColor(response) {
    const coverSection = document.getElementById('s1');
    if (response.data.coverColorCode != undefined) {
        coverSection.style.backgroundColor = response.data.coverColorCode;
    } else {
        coverSection.style.backgroundColor = rgb(232, 181, 160);
    }
}

var userBookNumber;

/**
 * Documentation
 * --------------
 * @param {JSON object} response
 * 
 * Ha a company name nem undefined akkor azt illeszti be a user neve helyére ha undefined
 * akkor a first és a lastname kerül  beillesztésre.
 * 
 * Ez azért van hogy elég legyen egyszer létrehozni az oldalt, ne kelljen külön
 * publisher és general profilt létrehozni.
 */
function loadUserTextDatas(responseUser) {
    const name = document.getElementById('name');
    const u_name = document.getElementById('username');
    const partners_books = document.getElementById('partner-number');
    const own_books = document.getElementById('own-books-number');
    const followers = document.getElementById('followers-number');
    const membership = document.getElementById('membership-p');
    const partners_p = document.getElementById('partners-p');
    const savedBookCount_p = document.getElementById('savedBookCount-p');


    if (responseUser.data.companyName != undefined) {
        name.innerHTML = `${responseUser.data.companyName}`;
    } else {
        name.innerHTML = `${responseUser.data.firstName} ${responseUser.data.lastName}`;
    }


    if (responseUser.data.rank == "publisher") {
        if (responseUser.data.writerCount !== undefined) {
            partners_books.textContent = `${responseUser.data.writerCount}`;
        }

    } else {
        partners_p.hidden = true;
        savedBookCount_p.hidden = false;

        if (responseUser.data.bookCount !== undefined) {
            partners_books.textContent = `${responseUser.data.savedBookCount}`;
            userBookNumber = responseUser.data.bookCount;
        }
    }


    u_name.innerHTML = `@${responseUser.data.username}`;
    membership.textContent = `${responseUser.data.registrationYear}`;
    own_books.innerHTML = `${responseUser.data.bookCount}`;
    followers.innerHTML = `${responseUser.data.followersCount}`;
}

function checkOwnProfile(response) {
    const editPicture = document.getElementById('edit-pic-div');
    const editCover = document.getElementById('edit-coverCol-div');
    const edit_intro = document.getElementById('edit-intro');
    const settings = document.getElementById('settings');
    const follow_btn_div = document.getElementById('follow-btn-div');


    if (response.data.ownProfile == true) {
        editPicture.hidden = false;
        editCover.hidden = false;
        settings.hidden = false;
        edit_intro.hidden = false;

        follow_btn_div.hidden = true;

        return true;
    } else {
        editPicture.hidden = true;
        editCover.hidden = true;
        settings.hidden = true;
        edit_intro.hidden = true;

        follow_btn_div.hidden = false;
        return false;
    }
}

function contactInfos(response) {
    // segéd változók
    var BooleanW = false;
    var BooleanP = false;
    var BooleanE = false;

    const website = document.getElementById('website-link');
    const website_div = document.getElementById('website-div');

    const phoneNumber = document.getElementById('phoneNumber');
    const phone_div = document.getElementById('phone-div');

    const email_div = document.getElementById('email-div');
    const email = document.getElementById('public-email');

    const contact_div = document.getElementById('contact');

    if (response.data.website != undefined && response.data.website != "") {
        website.innerHTML = `<a href="${response.data.website}" class="website-link">${response.data.website}</a>`
        BooleanW = true;
    } else {
        website_div.hidden = true;
    }

    if (response.data.phoneNumber != undefined && response.data.phoneNumber != "") {
        phoneNumber.innerText = response.data.phoneNumber;
        BooleanP = true;
    } else {
        phone_div.hidden = true;
    }

    if (response.data.email != undefined && response.data.email != "") {
        email.innerText = response.data.email;
        BooleanE = true;
    } else {
        email_div.hidden = true;
    }

    if (BooleanE == false && BooleanP == false && BooleanW == false) {
        contact_div.hidden = true;
    }
}

/**
 * Documementation
 * ---------------
 * @param {Response} response - The response object
 * @param {element} responseElement - the specific element from the response object
 * @param {HTMLInputElement} input - The input element for which we set a placeholder
 */
function addPlaceholder(response, responseElement, input) {
    input.placeholder = `${response.data[responseElement]}`;
}

const book_modal_body = document.getElementById('book-popup-modal-body');
const book_modal_img = document.getElementById('book-modal-img');
const book_modal_title = document.getElementById('modal-title');
const book_modal_author = document.getElementById('modal-author');
const book_modal_publisher = document.getElementById('modal-publisher');
const book_modal_pages = document.getElementById('modal-pages');
const book_modal_ranking = document.getElementById('modal-ranking');
const book_modal_language = document.getElementById('modal-language');
const book_modal_desc = document.getElementById('modal-desc');

// const bookmark = document.getElementById('bookmark');
let saveClick = false;

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username, publisher, bookId, isSaved) {

    if (url != "Ez a kép elérési útja") {
        book_modal_img.src = `../${url}.jpg`;
    } else {
        book_modal_img.src = '../pictures/standard-book-cover.jpg';
    }

    if (publisher != null) {
        book_modal_publisher.innerText = `${publisher}`;
    } else {
        book_modal_publisher.hidden = true;
    }

    book_modal_title.innerText = `${title}`;
    book_modal_author.innerText = `${firstName} ${lastName}`;
    book_modal_pages.innerText = `${pages}`;
    if (rating != 'undefined') {
        book_modal_ranking.innerText = `${rating}`;
    } else {
        book_modal_ranking.innerText = "-";
    }

    book_modal_language.innerText = `${language}`;
    book_modal_desc.innerText = `${description}`;
    if (price != 'undefined') {
        book_price.innerText = `${price} Ft`;
    } else {
        book_price.innerText = `- Ft`;
    }

    book_modal_author.addEventListener('click', (e) => {
        navigateToProfile(username);
    })

    if (isSaved == "true") {

        save_btn.innerHTML = "";
        save_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            </svg>
        `;
        
    } else {
       
        save_btn.innerHTML = "";
        save_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-bookmark" viewBox="0 0 16 16" id="bookmark">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            </svg>
        `;
    }

    save_btn.addEventListener('click', (e)=>{
        if(isSaved == "true"){
            UnsavingBook(bookId);
            isSaved = "false";
            saveClick = true;
            console.log(isSaved);
        }else{
            SavingBook(bookId);
            isSaved = "true";
            saveClick = true;
            console.log(isSaved);
        }
    });
}

document.getElementById('bookPopup').addEventListener('hidden.bs.modal', (e)=>{
    if (saveClick == true) {
        location.reload();
    }
})


async function SavingBook(bookId) {
    const savedResult = await saveBook({ "id": bookId });
    switch (savedResult.status) {
        case 200:
            save_btn.innerHTML = "";
            save_btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                </svg>
            `;
            break;
        case 401:
            window.location.href = '../Log-in/login.html';
            break;
        case 422:
            alert('Something went wrong. Please try again later!');
            console.log("Error status: " + savedResult.status);
            break;
        default:
            alert('Something went wrong. Please try again later!');
            console.error("Error status: " + savedResult.status);
            console.error("Error msg: " + savedResult.error);
            console.error("Error data: " + savedResult.data);
            break;

    }
}

async function UnsavingBook(bookId) {
    const unsavingResult = await deleteSavedBook({ "id": bookId });
    switch (unsavingResult.status) {
        case 200:
            // console.log("Successfully unsaved!");
            save_btn.innerHTML = "";
            save_btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-bookmark" viewBox="0 0 16 16" id="bookmark">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
            `;
            break;
        case 401:
            window.location.href = '../Log-in/login.html';
            break;
        case 422:
            alert('Something went wrong. Please try again later!');
            console.log("Error status: " + unsavingResult.status);
            break;
        default:
            alert('Something went wrong. Please try again later!');
            console.error("Error status: " + unsavingResult.status);
            console.error("Error msg: " + unsavingResult.error);
            console.error("Error data: " + unsavingResult.data);
            break;

    }
}

let Published_Books = {};
async function PublishBtn(button, bookId) {
    let isPublished_book = Published_Books[bookId];

    if (!isPublished_book) {
        // ha nincs kiadva akkor meghívjuk a kiadás endpointot

        // beállítani a style-okat ha 200as a kiadás státusz
        button.textContent = "Publihsed";
        button.style.backgroundColor = "#649984";
        button.style.color = "#ffffff";


        button.addEventListener('mouseenter', (e) => {
            button.style.backgroundColor = "#f1b9a0";
        });

        button.addEventListener('mouseleave', (e) => {
            button.style.backgroundColor = "#649984";
        });

    } else {
        // kiadás visszavonása

        button.textContent = "Let's Publish";
        button.style.backgroundColor = "#f1b9a0";
        button.style.color = "rgb(51, 47, 49)";


        button.addEventListener('mouseenter', (e) => {
            button.style.backgroundColor = "#649984";
            button.style.color = "#ffffff";
        });

        button.addEventListener('mouseleave', (e) => {
            button.style.backgroundColor = "#f1b9a0";
            button.style.color = "rgb(51, 47, 49)";
        });
    }
}

// Upload profile picture
const dropAreaPicture = document.getElementById('drop-area-picture');
const inputPicture = document.getElementById('inputPicture');
const imgView = document.getElementById('imgView');

const add_photo_icon = document.getElementById('add-photo-icon');
const upload_p = document.getElementById('upload-p');
const upload_span = document.getElementById('upload-span');

// Dragover eseménykezelő
dropAreaPicture.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Drop eseménykezelő
dropAreaPicture.addEventListener('drop', (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const allowedImageTypes = ['image/jpeg'];
        const fileType = files[0].type;

        if (!allowedImageTypes.includes(fileType)) {
            alert('Csak JPG, PNG és GIF képeket tölthetsz fel!');
            return;
        }

        inputPicture.files = files;
        uploadImage();
    }
});

// Képfeltöltés eseménykezelője
inputPicture.addEventListener('change', uploadImage);

function uploadImage() {
    let imgFile = inputPicture.files[0];
    let imgLink = URL.createObjectURL(imgFile);
    imgView.style.backgroundImage = `url(${imgLink})`;
    add_photo_icon.hidden = true;
    upload_p.hidden = true;
    upload_span.hidden = true;

    var img = new Image();
    img.src = imgLink;

    img.onload = function () {
        let height = img.naturalHeight;
        let width = img.naturalWidth;

        let size = imgFile.size;
        console.log("A fájl mérete byte-ban: " + size);
        let name = imgFile.name;
        console.log("Fájl neve: " + name);
        //    !itt kell még meghatározni a min max képarányt és a méretet byte-ban


        document.getElementById('save-pPic').addEventListener('click', async function () {
            const imgResponse = await setProfileImage({ "image": `../pictures/user/${name}` });


            if (imgResponse.status == 200) {
                location.reload();
            } else if (setPublicPhone_result.status == 401) {
                window.location.href = "../Log-in/login.html";
            } else if (setPublicPhone_result.status == 422) {
                alert("422: " + setPublicPhone_result.data.setPublicPhoneError);
            } else {
                alert(setPublicPhone_result.status);
            }

        });

    }
}

document.getElementById('close').addEventListener('click', (e) => {
    inputPicture.value = "";
    imgView.style.backgroundImage = "";
    add_photo_icon.hidden = false;
    upload_p.hidden = false;
    upload_span.hidden = false;
})

// set new cover color
const colorInput = document.getElementById('colorInput');
const saveButton = document.getElementById('color-save');

saveButton.addEventListener('click', async function () {
    let colorValue = colorInput.value;

    const colorResponse = await setCoverColor({ "code": colorValue })

    if (colorResponse.status == 200) {
        location.reload();
    } else if (setPublicPhone_result.status == 401) {
        window.location.href = "../Log-in/login.html";
    } else if (setPublicPhone_result.status == 422) {
        alert("422: " + setPublicPhone_result.data.setPublicPhoneError);
    } else {
        alert(setPublicPhone_result.status);
    }

});

// Follow btn events and functions
async function Follow(btn, responseUser, id) {


    if (responseUser.data.following == false) {

        btn.addEventListener('click', async function () {
            const followResult = await followUser({ "followedId": id });

            switch (followResult.status) {
                case 200:
                    // btn.classList.remove('default-follow');
                    // btn.classList.add('followed');
                    // btn.textContent = "Followed";
                    window.location.reload();
                    break;
                case 401:
                    window.location.href = "../Log-in/login.html";
                    break;
                case 422:
                    alert("Something went wrong. Status: " + followResult.status);
                    break;
                default:
                    alert("Something went wrong. Status: " + followResult.status);
                    break;
            }
        });

    } else if (responseUser.data.following == true) {

        btn.addEventListener('click', async function () {
            const unfollowResult = await unfollowedUser({ "followedId": id });

            switch (unfollowResult.status) {
                case 200:
                    window.location.reload();
                    break;
                case 401:
                    window.location.href = "../Log-in/login.html";
                    break;
                case 422:
                    alert("Something went wrong. Status: " + unfollowResult.status);
                    break;
                default:
                    alert("Something went wrong. Status: " + unfollowResult.status);
                    break;
            }
        });

    }
}

const ourBooks_btn = document.getElementById('our-books');

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

let postLikes = {};
function getPosts(responsePost, responseUser) {

    const missingPosts_own = document.getElementById('missing-posts-text-own');
    const missingPosts_text = document.getElementById('missing-posts-text');

    if (responsePost.data.myPosts.length == 0 && responseUser.data.ownProfile == true) {
        missingPosts_own.hidden = false;

    } else if (responsePost.data.myPosts.length == 0 && responseUser.data.ownProfile == false) {
        missingPosts_text.hidden = false;

    } else {
        for (let i = 0; i <= responsePost.data.myPosts.length - 1; i++) {
            // elmentem az adott poszt id-t
            const postId = responsePost.data.myPosts[i].id;
            let postLiked = responsePost.data.myPosts[i].liked;
            postLikes[postId] = postLiked;

            if (responsePost.data.myPosts[i].liked == false) {
                posts_div.innerHTML += `
                    <div class="post-card ">
                        <div class="first-row">
                            
                            <img class="post-profile-icon rounded-circle shadow-sm" src="../${responsePost.data.myPosts[i].image}">
                            
                            <div class="userName">
                                <p class="card-user-name user" onclick="navigateToProfile('${responsePost.data.myPosts[i].username}')">@${responsePost.data.myPosts[i].username}</p>
                            </div>
                            <div class="cardDate align-content-end">
                                <p class="card-date-text">${responsePost.data.myPosts[i].postTime}</p>
                            </div>
                        </div>
    
                        <div class="postText">
                            <p class="post-text">${responsePost.data.myPosts[i].description}</p>
                        </div>
    
                        <div class="last-row">

                            <div class="edit-delete-div" hidden>
                                <button type="button" class="bg-transparent border-0 edit-post" data-bs-toggle="modal" data-bs-target="#postModal" onclick="editPost(${responsePost.data.myPosts[i].id}, '${responsePost.data.myPosts[i].description}')">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </button>
            
                                <button type="button" class="bg-transparent border-0 delete-post" onclick="DeletePostBTN(this, ${responsePost.data.myPosts[i].id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                    </svg>
                                </button>
                            </div>
                            
                            <div class="like-and-share">
                                <div class="d-flex flex-column align-items-center emptyLike">
                                
                                    <button class="like-button border-0 bg-transparent" id="like" onclick="Liked(this, ${responsePost.data.myPosts[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                                </svg></button>
                                
                                </div>
                                
                            </div>
                        </div>
                    </div>
                `;


            } else {

                posts_div.innerHTML += `
                    <div class="post-card ">
                        <div class="first-row">
                                
                            <img class="post-profile-icon rounded-circle shadow-sm" src="../${responsePost.data.myPosts[i].image}">
                                
                            <div class="userName">
                                <p class="card-user-name user" onclick="navigateToProfile('${responsePost.data.myPosts[i].username}')">@${responsePost.data.myPosts[i].username}</p>
                            </div>
                            <div class="cardDate align-content-end">
                                <p class="card-date-text">${responsePost.data.myPosts[i].postTime}</p>
                            </div>
                        </div>
    
                        <div class="postText">
                            <p class="post-text">${responsePost.data.myPosts[i].description}</p>
                        </div>
    
                        <div class="last-row">

                            <div class="edit-delete-div" hidden>
                                <button type="button" class="bg-transparent border-0 edit-post" data-bs-toggle="modal" data-bs-target="#postModal" onclick="editPost(${responsePost.data.myPosts[i].id}, '${responsePost.data.myPosts[i].description}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                        class="bi bi-pen" viewBox="0 0 16 16">
                                        <path
                                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </button>
        
                                <button type="button" class="bg-transparent border-0 delete-post" onclick="DeletePostBTN(this, ${responsePost.data.myPosts[i].id})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                    </svg>
                                </button>
                            </div>
                                
                            <div class="like-and-share">
                                <div class="d-flex flex-column align-items-center emptyLike">
                                  
                                    <button class="like-button border-0 bg-transparent" id="like" ><svg onclick="Liked(this, ${responsePost.data.myPosts[i].id})" class="liked" xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                                    </svg></button>
                                    
                                </div>
                                    
                                </div>
                            </div>
                    </div>
                 `;
            }
        }
    }



    // console.log(postId);
    if (responsePost.data.ownPosts === true) {
        const post_editDelete_div = document.querySelectorAll('.edit-delete-div');
        const like_and_share_div = document.querySelectorAll('.like-and-share');
        post_editDelete_div.forEach(div => {
            div.hidden = false;
        });

        like_and_share_div.forEach(div => {
            div.hidden = true;
        });
    } else {
        const post_editDelete_div_books = document.querySelectorAll('.edit-delete-div-books');
        const like_and_share_div = document.querySelectorAll('.like-and-share');
        post_editDelete_div_books.forEach(div => {
            div.hidden = true;
        });

        like_and_share_div.forEach(div => {
            div.hidden = false;
        });
    }
}

function editPost(postID, currentText) {
    var editedText;
    editedText = currentText;
    console.log(postID);

    post_textarea.value = editedText;  //paste current text
    let editPostResult;

    document.getElementById('LetsPost-btn').addEventListener('click', async function () {
        editedText = post_textarea.value; // Frissítem a editedText változót a post_textarea-nél
        editPostResult = await updatePost({ "id": `${postID}`, "description": `${editedText}` });
        if (editPostResult.status == 200) {
            location.reload();  //reload the page
        } else {
            console.error("somethins went wrong: " + editPostResult.status);
        }
    });
}


async function DeletePostBTN(button, postID) {

    const deleteResult = await deletePost({ "id": postID });
    if (deleteResult.status == 200) {
        const postCard = button.closest('.post-card');
        postCard.remove();
    }

}

async function Liked(button, postID) {
    let postLiked = postLikes[postID];

    if (!postLiked) {
        // Ha a poszt nincs like-olva, akkor like-oljuk
        const liked_result = await postLike({ "postId": postID });
        if (liked_result.status == 200) {
            button.style.fill = "#c43700";
            postLikes[postID] = true; // Frissítjük a like állapotot

        } else if (liked_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (liked_result.status == 422) {
            alert("Something went wrong. Please try again later.")
        }
    } else {
        // Ha a poszt like-olva van, akkor dislike-oljuk
        const disliked_result = await postDislike({ "postId": postID });
        if (disliked_result.status == 200) {
            button.style.fill = "#2d1810";
            postLikes[postID] = false; // Frissítjük a like állapotot

        } else if (disliked_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (disliked_result.status == 422) {
            alert("Something went wrong. Please try again later.")
        }
    }

}

function navigateToProfile(username) {
    localStorage.setItem("username", username);
    window.location.href = `../Profile/profile.html?username=${username}`;
}

async function DeleteBookBTN(button, bookID) {
    userBookNumber--;
    document.getElementById('own-books-number').textContent = `${userBookNumber}`;

    const deleteResult = await deleteBook({ "id": bookID });
    if (deleteResult.status == 200) {
        const bookCard = button.closest('.book-card');
        bookCard.remove();
    } else {
        console.error("A kapott eredmény: " + JSON.stringify(deleteResult));
    }
}

function setBookFunction(bookId, userRank) {

    if (userRank == 'general') {
        localStorage.setItem("bookId", bookId);
        window.location.href = "../Create Book/createBook.html";
    }
}

const save_modal_price = document.getElementById('save-modal-price');
const newPriceInput = document.getElementById('newPrice');
newPriceInput.addEventListener('focusin', (e) => {
    document.getElementById('newPriceErr').textContent = "";
})

save_modal_price.addEventListener('click', async function () {
    const priceValue = newPriceInput.value;
    if (priceValue >= 1000) {

        // ide jön az hogy elküldöm a helyes új adatot a backendnek
    } else {
        document.getElementById('newPriceErr').textContent = "The given price cannot be lower than 1 000 Ft!";
    }
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


function getBooks(responseBook, userResponse) {
    const missing_book_text = document.getElementById('missing-book-text');
    const missing_book_text_own = document.getElementById('missing-book-text-own');

    if (responseBook.data.myBooks.length == 0 && userResponse.data.ownProfile == true) {
        missing_book_text_own.hidden = false;
    } else if (responseBook.data.myBooks.length == 0 && userResponse.data.ownProfile == false) {
        missing_book_text.hidden = false;
    } else {
        for (let i = 0; i <= responseBook.data.myBooks.length - 1; i++) {
            const bookData = JSON.stringify(responseBook.data.myBooks[i]);

            if (responseBook.data.myBooks[i].coverImage != "Ez a kép elérési útja") {

                books_div.innerHTML += `
                        <div class="container medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3">
                                    <img class="medium-pic" src="../${responseBook.data.myBooks[i].coverImage}.jpg" alt="${responseBook.data.myBooks[i].title}">
                                </div>
        
                                <div class="col-9 medium-right-side">
                                    
                                    <h2 class="container medium-h2" >${responseBook.data.myBooks[i].title}</h2>
                                    <p class="username author" onclick="navigateToProfile('${responseBook.data.myBooks[i].username}')">${responseBook.data.myBooks[i].firstName} ${responseBook.data.myBooks[i].lastName}</p>
                                    <p class="username author">${responseBook.data.myBooks[i].companyName || ''}</p>
                                    <p class="medium-desc" >${responseBook.data.myBooks[i].description}</p>
        
                                    <div class="card-footer">
                                    <button class="moreBtn-medium" data-bs-toggle="modal" data-bs-target="#bookPopup" 
                                    onclick="loadModalData('${responseBook.data.myBooks[i].coverImage}', '${responseBook.data.myBooks[i].title}', '${responseBook.data.myBooks[i].firstName}', '${responseBook.data.myBooks[i].lastName}', '${responseBook.data.myBooks[i].description}', '${responseBook.data.myBooks[i].language}', '${responseBook.data.myBooks[i].rating}', '${responseBook.data.myBooks[i].pagesNumber}', '${responseBook.data.myBooks[i].price}', '${responseBook.data.myBooks[i].username}', ${responseBook.data.myBooks[i].companyName !== undefined ? `'${responseBook.data.myBooks[i].companyName}'` : null}, '${responseBook.data.myBooks[i].id}' ,'${responseBook.data.myBooks[i].saved}')">Show
                                    Details</button>
        
                                        <div class="edit-delete-div-books">
                                        <button type="button" class="bg-transparent border-0 edit-book" onclick="setBookFunction('${responseBook.data.myBooks[i].id}', '${userResponse.data.rank}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                                    class="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                                </svg>
                                            </button>
        
                                            <button type="button" class="bg-transparent border-0 delete-book" onclick="DeleteBookBTN(this, ${responseBook.data.myBooks[i].id})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;

            } else {

                books_div.innerHTML += `
                        <div class="container medium-card book-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                    <!--? Picture => Alt-nak mehet majd a könyv címe -->
                                
                                    <img class="medium-pic" src="../pictures/standard-book-cover.jpg" alt="${responseBook.data.myBooks[i].title}">
                                    
                                </div>
        
                                <div class="col-9 medium-right-side">
                                    <!--? Author + Book Title  -->
                                    <h2 class="container medium-h2" >${responseBook.data.myBooks[i].title}</h2>
                                    <p class="username author" onclick="navigateToProfile('${responseBook.data.myBooks[i].username}')">${responseBook.data.myBooks[i].firstName} ${responseBook.data.myBooks[i].lastName}</p>
                                    <p class="username author">${responseBook.data.myBooks[i].companyName || ''}</p>
                                    <p class="medium-desc" >${responseBook.data.myBooks[i].description}</p>
        
                                    <div class="card-footer">
                                        <button class="moreBtn-medium" data-bs-toggle="modal" data-bs-target="#bookPopup" 
                                        onclick="loadModalData('${responseBook.data.myBooks[i].coverImage}', '${responseBook.data.myBooks[i].title}', '${responseBook.data.myBooks[i].firstName}', '${responseBook.data.myBooks[i].lastName}', '${responseBook.data.myBooks[i].description}', '${responseBook.data.myBooks[i].language}', '${responseBook.data.myBooks[i].rating}', '${responseBook.data.myBooks[i].pagesNumber}', '${responseBook.data.myBooks[i].price}', '${responseBook.data.myBooks[i].username}', ${responseBook.data.myBooks[i].companyName !== undefined ? `'${responseBook.data.myBooks[i].companyName}'` : null}, '${responseBook.data.myBooks[i].id}' ,'${responseBook.data.myBooks[i].saved}')">Show
                                        Details</button>
        
                                        <div class="edit-delete-div-books">
                                        <button type="button" class="bg-transparent border-0 edit-book" onclick="setBookFunction('${responseBook.data.myBooks[i].id}', '${userResponse.data.rank}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                                    class="bi bi-pen" viewBox="0 0 16 16">
                                                    <path
                                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                                </svg>
                                            </button>
        
                                            <button type="button" class="bg-transparent border-0 delete-book" onclick="DeleteBookBTN(this, ${responseBook.data.myBooks[i].id})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
            }
        }
    }

    if (responseBook.data.ownBooks === true) {
        const post_editDelete_div_books = document.querySelectorAll('.edit-delete-div-books');
        post_editDelete_div_books.forEach(div => {
            div.hidden = false;
        });
    } else {
        const post_editDelete_div_books = document.querySelectorAll('.edit-delete-div-books');
        post_editDelete_div_books.forEach(div => {
            div.hidden = true;
        });
    }

    if (userResponse.data.rank = "publisher") {
        const trashCan = document.querySelectorAll('.delete-book');
        trashCan.forEach(button => {
            button.hidden = true;
        });
    }


}

// switch between settiings
const logOut = document.getElementById('logOut');

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

logOut.addEventListener('click', (e) => {
    window.location.href = "../Landing-Page/landing.html";
    localStorage.removeItem("Token");
})

// edit buttons on settings --> profile settings
const edit_username = document.getElementById('edit-username');
const edit_email = document.getElementById('edit-email');
const edit_website = document.getElementById('edit-website');
const edit_pwd = document.getElementById('edit-pwd');
const edit_phone = document.getElementById('edit-phone');
const edit_fName = document.getElementById('edit-fName');
const edit_lName = document.getElementById('edit-lName');
const edit_company = document.getElementById('edit-company');

// save and cancel button rows on settings --> profile settings
const username_saveCancel = document.getElementById('username-saveCancel');
const email_saveCancel = document.getElementById('email-saveCancel');
const web_saveCancel = document.getElementById('web-saveCancel');
const pwd_saveCancel = document.getElementById('pwd-saveCancel');
const phone_saveCancel = document.getElementById('phone-saveCancel');
const fName_saveCancel = document.getElementById('fName-saveCancel');
const lName_saveCancel = document.getElementById('lName-saveCancel');
const company_saveCancel = document.getElementById('company-saveCancel');

// Cancel buttons
const un_cancel = document.getElementById('un-cancel');
const e_cancel = document.getElementById('e-cancel');
const w_cancel = document.getElementById('w-cancel');
const pwd_cancel = document.getElementById('pwd-cancel');
const p_cancel = document.getElementById('p-cancel');
const fn_cancel = document.getElementById('fn-cancel');
const ln_cancel = document.getElementById('ln-cancel');
const c_cancel = document.getElementById('c-cancel');

// save buttons
const un_save = document.getElementById('un-save');
const e_save = document.getElementById('e-save');
const w_save = document.getElementById('w-save');
const pwd_save = document.getElementById('pwd-save');
const p_save = document.getElementById('p-save');
const fn_save = document.getElementById('fn-save');
const ln_save = document.getElementById('ln-save');
const c_save = document.getElementById('c-save');

// errors
const un_error = document.getElementById('un-error');
const e_error = document.getElementById('e-error');
const w_error = document.getElementById('w-error');
const pwd_error = document.getElementById('pwd-error');
const phone_error = document.getElementById('phone-error');
const fn_error = document.getElementById('fn-error');
const ln_error = document.getElementById('ln-error');
const c_error = document.getElementById('c-error');

// Functions for settings
/**
 * Documementation
 * ---------------
 * @param {HTMLInputElement} element - Is the input whose readonly property is set to false by the function
 * @param {HTMLDivElement} buttonsRow - The div that contains the cancel and save buttons
 */
function EditIcon(element, buttonsRow) {
    element.removeAttribute('disabled')
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
    element.setAttribute('disabled', true);
    buttonsRow.hidden = true;
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

        inputId.style.background = "rgb(255, 214, 220)";
        inputId.style.borderColor = "rgb(243, 82, 93)";
        errorDiv.innerHTML = `<p>It should be at least 3 characters.</p>`;
        return false;
    } else {
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

    const specReg = new RegExp("(?=.*[@])");
    if (specReg.test(emailValue) == false) {
        e_error.innerHTML = `<p>Email address must be contains the "@" symbol.</p>`;

        input_email.style.background = "rgb(255, 214, 220)";
        input_email.style.borderColor = "rgb(243, 82, 93)";
        at_symbol = false;

    } else if (specReg.test(emailValue) == true) {

        const atCount = (emailValue.match(/@/g) || []).length; // Count @ symbols in emailValue

        at_symbol = true;
        if (atCount !== 1) {
            e_error.innerHTML = `<p>Email address must contain exactly one "@" symbol.</p>`;

            input_email.style.background = "rgb(255, 214, 220)";
            input_email.style.borderColor = "rgb(243, 82, 93)";
            return false;
        } else {
            //It checks what is in front of the @.
            const firsPartOfEmail = emailValue.slice(0, emailValue.indexOf('@'));


            if (firsPartOfEmail == "") {
                e_error.innerHTML = `<p>Email address cannot empty before "@" symbol.</p>`;
                input_email.style.background = "rgb(255, 214, 220)";
                input_email.style.borderColor = "rgb(243, 82, 93)";

                fp_email = false;
            } else {
                if (allowedChars.test(emailValue) == true) {
                    chars_email = true;
                    if (firsPartOfEmail.length < 4) {
                        e_error.innerHTML = `<p>Please ensure you have at least 4 characters before the "@" symbol.</p>`;

                        input_email.style.background = "rgb(255, 214, 220)";
                        input_email.style.borderColor = "rgb(243, 82, 93)";

                        fp_email = false;
                    } else {

                        fp_email = true;

                        const lastPartOfEmail = emailValue.slice(emailValue.indexOf('@') + 1);
                        console.log("Value after @: " + lastPartOfEmail);

                        const dotReg = new RegExp("(?=.*[.])");

                        if (dotReg.test(lastPartOfEmail) == true) {

                            const beforeDot = lastPartOfEmail.slice(0, lastPartOfEmail.indexOf('.'));


                            if (beforeDot == "" || beforeDot.length < 2) {

                                e_error.innerHTML = `<p>Please ensure you have at least 2 characters before the " . " (dot) symbol.</p>`;
                                lp_email = false;
                                input_email.style.background = "rgb(255, 214, 220)";
                                input_email.style.borderColor = "rgb(243, 82, 93)";
                            } else {
                                lp_email = true;

                            }


                        } else {

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

                    chars_email = false;
                }

            }
        }

    } else {
        e_error.innerHTML = `<p>Please include the '@' symbol in your email address.</p>`;
        at_symbol = false;
        input_email.style.background = "rgb(255, 214, 220)";
        input_email.style.borderColor = "rgb(243, 82, 93)";

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
        inputCompany.style.background = "rgb(255, 214, 220)";
        inputCompany.style.borderColor = "rgb(243, 82, 93)";

        return false;

    } else if (companyValue.length < 2) {
        companyError.innerHTML = `<p>Company name must be at least 2 characters long.</p>`;
        inputCompany.style.background = "rgb(255, 214, 220)";
        inputCompany.style.borderColor = "rgb(243, 82, 93)";

        return false;
    } else {

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

        return false;

    } else if (pwdValue.length < 8) {

        errorField.innerHTML = `<p>Password must be at least 8 characters long.</p>`;
        pwdInput.style.background = "rgb(255, 214, 220)";
        pwdInput.style.borderColor = "rgb(243, 82, 93)";

        return false;

    } else {
        // It checks for uppercase, lowercase, numbers and special characters.
        if (upperCaseReg.test(pwdValue) == true && lowerCaseReg.test(pwdValue) == true && numReg.test(pwdValue) == true && specReg.test(pwdValue) == true) {

            return true;

        } else {
            errorField.innerHTML = `<p>Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character.</p>`;
            pwdInput.style.background = "rgb(255, 214, 220)";
            pwdInput.style.borderColor = "rgb(243, 82, 93)";

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


    if (phoneValue.length != 0) {
        if (pattern.test(phoneValue) == true) {
            inputPhone.style.background = "";
            inputPhone.style.borderColor = "";
            errorPhone.innerHTML = "";
            return true;
        } else {
            inputPhone.style.background = "rgb(255, 214, 220)";
            inputPhone.style.borderColor = "rgb(243, 82, 93)";
            errorPhone.innerHTML = `<p>This field should contains only numbers.</p>`;
            return false;
        }
    } else {
        errorPhone.innerHTML = `<p>This field cannot be empty.</p>`;
    }


}

function checkPhoneLenght(value, input, errorDiv) {
    if (value.length >= 7 && value.length <= 15) {
        input.style.background = "rgb(241, 255, 231)";
        input.style.borderColor = "rgb(98, 173, 107)";
        return true;
    } else {
        input.style.background = "rgb(255, 214, 220)";
        input.style.borderColor = "rgb(243, 82, 93)";
        errorDiv.innerHTML = `<p>The value should be between 7 and 15 characters.</p>`
        return false;
    }
}

function checkUserCharacters(value, input, errorDiv) {

    const disallowedCharacters = /[^a-z0-9._]/;
    let abc_boolean = false;

    if (disallowedCharacters.test(value) == true) {
        errorDiv.innerHTML = `<p>Please avoid using special characters exept: _ (underscore) and . (dot)</p>`;
        input.style.background = "rgb(255, 214, 220)";
        input.style.borderColor = "rgb(243, 82, 93)";
        chars_boolean = false;
        return false;
    } else {
        errorDiv.innerHTML = "";
        input.style.background = "";
        input.style.borderColor = "";
        chars_boolean = true;
        return true;
    }
}

// Events
// username
edit_username.addEventListener('click', (e) => {
    EditIcon(input_un, username_saveCancel);
})

un_cancel.addEventListener('click', (e) => {
    Cancel(input_un, username_saveCancel);
    input_un.style.background = "";
    input_un.style.borderColor = "";
    un_error.innerHTML = "";
})

un_save.addEventListener('click', async function () {

    let un_boolean = upTo3(input_un.value, "username", input_un, un_error);


    if (un_boolean == true) {
        let inputUn_value = input_un.value;

        const setUnResponse = await setUsername({ "username": inputUn_value });
        if (setUnResponse.status == 200) {


            window.location.href = `../Profile/profile.html?username=${inputUn_value}`;

        } else if (setUnResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setUnResponse.status == 422) {
            alert("422-es státsukód");
        } else {
            alert("Something went wrong.");
        }
    }
})

input_un.addEventListener('input', (e) => {
    const checkResult = checkUserCharacters(input_un.value, input_un, un_error);

    if (checkResult == false) {
        un_save.disabled = true;
    } else {
        un_save.disabled = false;
    }
})

input_un.addEventListener('focusin', (e) => {
    un_error.innerHTML = "";
    e.target.style.background = "";
    e.target.style.border = "";
})

// email 
edit_email.addEventListener('click', (e) => {

    EditIcon(input_email, email_saveCancel);
})

e_cancel.addEventListener('click', (e) => {
    Cancel(input_email, email_saveCancel);
    input_email.style.background = "";
    input_email.style.borderColor = "";
    e_error.innerHTML = "";
})

e_save.addEventListener('click', async function () {
    let e_boolean = validateEmail(input_email.value);

    if (e_boolean == true) {
        let inputEmail_value = input_email.value;
        const setEmailResponse = await setEmail({ "email": `${inputEmail_value}` });
        if (setEmailResponse.status == 200) {

            const settingCall = await getDetails();
            addPlaceholder(settingCall, "email", input_email);
            Cancel(input_email, email_saveCancel);

        } else if (setEmailResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setEmailResponse.status == 422) {
            alert("422-es státsukód");
        } else {
            alert("Something went wrong.");
        }
    }
})

input_email.addEventListener('focusin', (e) => {
    e.target.style.background = "";
    e.target.style.border = "";
    e_error.innerHTML = "";
})

input_website.addEventListener('focusin', (e) => {
    e.target.style.background = "";
    e.target.style.border = "";
    w_error.innerHTML = "";
})

edit_website.addEventListener('click', (e) => {
    EditIcon(input_website, web_saveCancel);
})

w_cancel.addEventListener('click', (e) => {
    Cancel(input_website, web_saveCancel);
    input_website.style.background = "";
    input_website.style.borderColor = "";
    w_error.innerHTML = "";
})

w_save.addEventListener('click', async function () {
    if (input_website.value != "") {
        if (input_website.value.length >= 4 && input_website.value.length <= 100) {
            const setWebsiteResponse = await setWebsite({ "website": input_website.value });
            if (setWebsiteResponse.status == 200) {

                input_website.style.background = "";
                input_website.style.borderColor = "";
                w_error.innerHTML = "";
                const settingCall = await getDetails();
                addPlaceholder(settingCall, "website", input_website);
                Cancel(input_website, web_saveCancel);
            } else if (setEmailResponse.status == 401) {
                window.location.href = "../Log-in/login.html";
            } else if (setEmailResponse.status == 422) {
                alert("422-es státsukód");
            } else {
                alert("Something went wrong.");
            }
        } else {
            input_website.style.background = "rgb(255, 214, 220)";
            input_website.style.borderColor = "rgb(243, 82, 93)";
            w_error.innerHTML = "This value has to be between 4 and 100 characters.";
        }
    }
})

// password
edit_pwd.addEventListener('click', (e) => {
    EditIcon(input_pwd, pwd_saveCancel);
})

pwd_cancel.addEventListener('click', (e) => {
    Cancel(input_pwd, pwd_saveCancel);
    input_pwd.style.background = "";
    input_pwd.style.borderColor = "";
    pwd_error.innerHTML = "";
})

pwd_save.addEventListener('click', async function () {

    let pwd_boolean = validatePwd(input_pwd.value, input_pwd, pwd_error);

    if (pwd_boolean == true) {
        let pwd_value = input_pwd.value;
        const setPwdResponse = await setPassword({ "password": `${pwd_value}` });
        if (setPwdResponse.status == 200) {

            window.location.href = "../Log-in/login.html";
            localStorage.removeItem("Token");

        } else if (setEmailResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setEmailResponse.status == 422) {
            alert("422-es státsukód");
        } else {
            alert("Something went wrong.");
        }
    }
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
    input_phoneNumber.style.background = "";
    input_phoneNumber.style.borderColor = "";
    phone_error.innerHTML = "";
})

let phone_boolean;

input_phoneNumber.addEventListener('input', (e) => {
    phone_boolean = validatePhone(input_phoneNumber.value, input_phoneNumber, phone_error);
})

p_save.addEventListener('click', async function () {

    let phone_lenght = checkPhoneLenght(input_phoneNumber.value, input_phoneNumber, phone_error);


    if (phone_boolean == true && phone_lenght == true) {

        let phone_value = input_phoneNumber.value;
        const setPhoneResponse = await setPhoneNumber({ "phoneNumber": `${phone_value}` });
        if (setPhoneResponse.status == 200) {

            location.reload();

        } else if (setEmailResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setEmailResponse.status == 422) {
            alert("422-es státsukód");
        } else {
            alert("Something went wrong.");
        }

    }
})

input_phoneNumber.addEventListener('focusin', (e) => {
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
    input_fName.style.background = "";
    input_fName.style.borderColor = "";
    fn_error.innerHTML = "";
})

fn_save.addEventListener('click', async function () {

    let fn_boolean = upTo3(input_fName.value, "first name", input_fName, fn_error);


    if (fn_boolean == true) {
        let firstname_value = input_fName.value;
        const setFirstResponse = await setFirstName({ "firstName": `${firstname_value}` });
        if (setFirstResponse.status == 200) {

            const settingCall = await getDetails();
            addPlaceholder(settingCall, "firstName", input_fName);
            Cancel(input_fName, fName_saveCancel);

        } else if (setFirstResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setFirstResponse.status == 422) {
            alert("422-es státsukód");
        } else {
            alert("Something went wrong.");
        }
    }
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
    input_lName.style.background = "";
    input_lName.style.borderColor = "";
    ln_error.innerHTML = "";
})

ln_save.addEventListener('click', async function () {

    let ln_boolean = upTo3(input_lName.value, "last name", input_lName, ln_error);


    if (ln_boolean == true) {
        let lastname_value = input_lName.value;
        const setLastResponse = await setLastName({ "lastName": `${lastname_value}` });
        if (setLastResponse.status == 200) {

            const settingCall = await getDetails();
            addPlaceholder(settingCall, "lastName", input_lName);
            Cancel(input_lName, lName_saveCancel);

        } else if (setLastResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setLastResponse.status == 422) {
            alert("422-es státsukód");
        } else {
            alert("Something went wrong.");
        }
    }
})

input_lName.addEventListener('focusin', (e) => {
    ln_error.innerHTML = "";
    e.target.style.background = "";
    e.target.style.border = "";
})

// company
edit_company.addEventListener('click', (e) => {
    EditIcon(input_company, company_saveCancel);
})

c_cancel.addEventListener('click', (e) => {
    Cancel(input_company, company_saveCancel);
    input_company.style.background = "";
    input_company.style.borderColor = "";
    c_error.innerHTML = "";
})


c_save.addEventListener('click', async function () {

    let c_boolean = validateCompany(input_company.value, c_error, input_company);


    if (c_boolean == true) {
        let company_value = input_company.value;
        const setCompanyResponse = await setCompanyName({ "companyName": `${company_value}` });
        if (setCompanyResponse.status == 200) {

            const settingCall = await getDetails();
            addPlaceholder(settingCall, "companyName", input_company);
            Cancel(input_company, company_saveCancel);

        } else if (setCompanyResponse.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (setCompanyResponse.status == 422) {
            alert("422: " + setCompanyResponse.data.setCompanyNameError);
        } else if (setCompanyResponse.status == 403) {
            alert("You are not a publisher. Please get out from the inspect panel! :)")
        } else {
            alert("Something went wrong.");
        }
    }
})

input_company.addEventListener('focusin', (e) => {
    c_error.innerHTML = "";
    e.target.style.background = "";
    e.target.style.border = "";
})

// set public datas
function isChecked(elementID) {
    if (elementID.checked == true) {
        return true;
    } else if (elementID.checked == false) {
        return false;
    } else {
        console.log("Lehetetlen küldetés");
    }
}

isEmail_public.addEventListener('change', async function () {
    let ischecked = isChecked(isEmail_public);

    const setPublicEmail_result = await setPublicEmail();


    if (setPublicEmail_result.status == 200) {
        if (ischecked == true) {
            console.log("A következőre változott az érték: true");
        } else {
            console.log("A következőre változott az érték: false");
        }
    } else if (setPublicEmail_result.status == 401) {
        window.location.href = "../Log-in/login.html";
    } else if (setPublicEmail_result.status == 422) {
        alert("422: " + setPublicEmail_result.data.setPublicEmailError);
    } else {
        alert(setPublicEmail_result.status);
    }
})

isPhone_public.addEventListener('change', async function () {
    let ischecked = isChecked(isPhone_public);
    const setPublicPhone_result = await setPublicPhoneNumber();


    if (setPublicPhone_result.status == 200) {
        if (ischecked == true) {

            console.log("A következőre változott az érték: true");
        } else {

            console.log("A következőre változott az érték: false");
        }
    } else if (setPublicPhone_result.status == 401) {
        window.location.href = "../Log-in/login.html";
    } else if (setPublicPhone_result.status == 422) {
        alert("422: " + setPublicPhone_result.data.setPublicPhoneError);
    } else {
        alert(setPublicPhone_result.status);
    }
})

const settings_modal = document.getElementById('settings-modal');
settings_modal.addEventListener('hidden.bs.modal', function () {
    location.reload();
});