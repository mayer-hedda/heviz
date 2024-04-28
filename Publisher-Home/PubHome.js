const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');
var own_uname;

// Sections
// #1
const first_section = document.getElementById('first-section');
const s1_bigCard_div = document.getElementById('bigCard-Pic');
const s1_bigCard_h2 = document.getElementById('s1-bigCard-h2');
const s1_bigCard_author = document.getElementById('s1-bigCard-author');
const s1_bigCard_p = document.getElementById('s1-bigCard-p');
const random_book_btn = document.getElementById('randomBook-btn');
const s1_bigCard_category = document.getElementById('s1-bigCard-category');

// #2
const second_section = document.getElementById('second-section');
const s2_mediumC_picDiv = document.getElementById('s2-mediumC-pic');
const s2_mediumC_h2 = document.getElementById('s2-mediumC-h2');
const s2_mediumC_author = document.getElementById('s2-mediumC-author');
const s2_mediumC_p = document.getElementById('s2-mediumC-p');
const s2_mediumC_btn = document.getElementById('s2-mediumC-btn');
const s2_mediumC_category = document.getElementById('s2-mediumC-category');

const s2_first_row = document.getElementById('s2-first-row');
const s2_second_row = document.getElementById('s2-second-row');

// #3
const third_section = document.getElementById('third-section');
const s3_subtitle = document.getElementById('s3-subtitle');
const s3_mediumCardPic_div = document.getElementById('s3-mediumC-pic');
const s3_mediumC_h2 = document.getElementById('s3-mediumC-h2');
const s3_mediumC_author = document.getElementById('s3-mediumC-author');
const s3_mediumC_desc = document.getElementById('s3-mediumC-desc');
const s3_mediumC_btn = document.getElementById('s3-mediumC-btn');
const s3_mediumC_category = document.getElementById('s3-mediumC-category');

const s3_first_row = document.getElementById('s3-first-row');
const s3_second_row = document.getElementById('s3-second-row');

// #4
const fourth_section = document.getElementById('fourth-section');
const s4_subtitle = document.getElementById('s4-subtitle');
const s4_mediumCardPic_div = document.getElementById('s4-mediumC-pic');
const s4_mediumC_h2 = document.getElementById('s4-mediumC-h2');
const s4_mediumC_author = document.getElementById('s4-mediumC-author');
const s4_mediumC_desc = document.getElementById('s4-mediumC-desc');
const s4_mediumC_btn = document.getElementById('s4-mediumC-btn');
const s4_mediumC_category = document.getElementById('s4-mediumC-category');

const s4_first_row = document.getElementById('s4-first-row');
const s4_second_row = document.getElementById('s4-second-row');

// #5
const fifth_section = document.getElementById('fifth-section');
const s5_subtitle = document.getElementById('s5-subtitle');
const s5_mediumCardPic_div = document.getElementById('s5-mediumC-pic');
const s5_mediumC_h2 = document.getElementById('s5-mediumC-h2');
const s5_mediumC_author = document.getElementById('s5-mediumC-author');
const s5_mediumC_desc = document.getElementById('s5-mediumC-desc');
const s5_mediumC_btn = document.getElementById('s5-mediumC-btn');
const s5_mediumC_category = document.getElementById('s5-mediumC-category');

const s5_first_row = document.getElementById('s5-first-row');
const s5_second_row = document.getElementById('s5-second-row');

// #6
const sixth_section = document.getElementById('sixth-section');
const s6_subtitle = document.getElementById('s6-subtitle');
const s6_mediumCardPic_div = document.getElementById('s6-mediumC-pic');
const s6_mediumC_h2 = document.getElementById('s6-mediumC-h2');
const s6_mediumC_author = document.getElementById('s6-mediumC-author');
const s6_mediumC_desc = document.getElementById('s6-mediumC-desc');
const s6_mediumC_btn = document.getElementById('s6-mediumC-btn');
const s6_mediumC_category = document.getElementById('s6-mediumC-category');

const s6_first_row = document.getElementById('s6-first-row');
const s6_second_row = document.getElementById('s6-second-row');

const zero_dataContainer = document.getElementById('zero-dataContainer');

// MODAL
const modal_body = document.getElementById('modal-body');
const modal_img = document.getElementById('modal-img');
const modal_title = document.getElementById('modal-title');
const modal_author = document.getElementById('modal-author');
const modal_pages = document.getElementById('modal-pages');
const modal_ranking = document.getElementById('modal-ranking');
const modal_language = document.getElementById('modal-language');
const modal_desc = document.getElementById('modal-desc');
const modal_price = document.getElementById('book-price');
const save_btn = document.getElementById('save-btn');

// segéd változók
let s1 = false;
let s2 = false;
let s3 = false;
let s4 = false;
let s5 = false;
let s6 = false;

window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
    const tokenResponse = await token();

    switch (tokenResponse.status) {
        case 401:
            window.location.href = "../Log-in/login.html";
            break;

        case 422:
            alert("422 - Something went wrong");
            break;

        case 302:
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');
            localStorage.removeItem('id');
            localStorage.removeItem('name');

            own_uname = tokenResponse.data.username;

            document.getElementById('welcome').innerText = `Welcome ${tokenResponse.data.firstName} ${tokenResponse.data.lastName}!`;

            document.getElementById('profile-link').addEventListener('click', (e) => {
                navigateToProfile(own_uname);
            });

            switch (tokenResponse.data.rank) {
                case 'general':
                    window.location.href = "../General-HomePage/GenHome.html";

                case 'publisher':
                    username.innerText = `@${tokenResponse.data.username}`;

                    profilePic.innerHTML = `<img class="rounded-circle" src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;

                    // Egy nagy random kártya
                    const oneRandom_response = await getOneRandomLookingForPublisherBook();
                    if (oneRandom_response.data.length != 0) {
                        LoadRandomBook(oneRandom_response);
                        s1 = true;
                    } else {
                        first_section.hidden = true;
                    }

                    const recommandedBooks_response = await getRecommandedBooksForPublisher();
                    if (recommandedBooks_response.data.length != 0) {
                        TwoRowAndMediumCard("Recommanded books for you", recommandedBooks_response, s2_mediumC_picDiv, s2_mediumC_h2, s2_mediumC_author, s2_mediumC_p, s2_mediumC_btn, s2_first_row, s2_second_row, s2_mediumC_category);
                        s2 = true;
                    } else {
                        second_section.hidden = true;
                    }

                    const booksByCategory_response = await getRandomBookByCategory();

                    if (booksByCategory_response.data.length != 0) {
                        const separetedCategories_obj = separateCategories(booksByCategory_response);

                        if (separetedCategories_obj[0].data.length != 0) {
                            loadRandoms(separetedCategories_obj, 0, s3_subtitle, s3_mediumCardPic_div, s3_mediumC_h2, s3_mediumC_author, s3_mediumC_desc, s3_mediumC_btn, s3_first_row, s3_second_row, s3_mediumC_category);
                            s3 = true;
                        } else {
                            third_section.hidden = true;
                        }

                        if (separetedCategories_obj[1].data.length != 0) {
                            loadRandoms(separetedCategories_obj, 1, s4_subtitle, s4_mediumCardPic_div, s4_mediumC_h2, s4_mediumC_author, s4_mediumC_desc, s4_mediumC_btn, s4_first_row, s4_second_row, s4_mediumC_category);
                            s4 = true;
                        } else {
                            fourth_section.hidden = true;
                        }

                        if (separetedCategories_obj[2].data.length != 0) {
                            loadRandoms(separetedCategories_obj, 2, s5_subtitle, s5_mediumCardPic_div, s5_mediumC_h2, s5_mediumC_author, s5_mediumC_desc, s5_mediumC_btn, s5_first_row, s5_second_row, s5_mediumC_category);
                            s5 = true;
                        } else {
                            fifth_section.hidden = true;
                        }

                        if (separetedCategories_obj[3].data.length != 0) {
                            loadRandoms(separetedCategories_obj, 3, s6_subtitle, s6_mediumCardPic_div, s6_mediumC_h2, s6_mediumC_author, s6_mediumC_desc, s6_mediumC_btn, s6_first_row, s6_second_row, s6_mediumC_category);
                            s6 = true;
                        } else {
                            sixth_section.hidden = true;
                        }

                    } else {
                        third_section.hidden = true;
                        fourth_section.hidden = true;
                        fifth_section.hidden = true;
                        sixth_section.hidden = true;
                    }

                    if (s1 == false && s2 == false && s3 == false && s4 == false && s5 == false && s6 == false) {
                        zero_dataContainer.hidden = false;
                    }

                    break;
            }

            break;

        default:
            localStorage.setItem('Error Code:', `${responseUser.error}`);
            window.location.href = "../404/404.html";
            break;
    }
}

// Loading datas
function LoadRandomBook(response) {
    const coverImage = response.data[0].coverImage;

    s1_bigCard_div.innerHTML = `
        <img src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
    `;

    s1_bigCard_h2.innerText = `${response.data[0].title}`;
    s1_bigCard_p.innerText = `${response.data[0].description}`;
    s1_bigCard_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    s1_bigCard_category.innerText = `${response.data[0].category}`;

    s1_bigCard_author.addEventListener('click', (e) => {
        navigateToProfile(response.data[0].username);
    });

    random_book_btn.addEventListener('click', (e) => {
        loadModalData(response.data[0].coverImage, response.data[0].title, response.data[0].firstName, response.data[0].lastName, response.data[0].description, response.data[0].language, response.data[0].rating, response.data[0].pagesNumber, response.data[0].username, response.data[0].id, response.data[0].saved);
    })
}

/**
 * Documentation
 * -------------
 * IMPORTANT: Every HTML element param is an ID or a variable
 * 
 * @param {String} sectionName - Name of the section where I insert the card and the row
 * @param {JSON} response - The response from the Backend
 * @param {HTMLDivElement} mediumC_PicDiv - The id of div of the card's picture
 * @param {HTMLHeadingElement} mediumC_h2 - The id of H2 tag where I insert the book's title
 * @param {HTMLParagraphElement} mediumC_author - The id of P tag where I insert the book's author name
 * @param {HTMLParagraphElement} mediumC_description - The id of the P tag where I insert the book's description
 * @param {HTMLButtonElement} mediumC_btn - The medium card's button which will load the popup
 * @param {HTMLDivElement} firstRow - The id of the first row's div
 * @param {HTMLDivElement} secondRow - The id of the second row's div
 */
function TwoRowAndMediumCard(sectionName, response, mediumC_PicDiv, mediumC_h2, mediumC_author, mediumC_description, mediumC_btn, firstRow, secondRow, mediumC_category) {
    // Medium card
    mediumC_PicDiv.innerHTML = `
        <img class="medium-pic" src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
    `;

    mediumC_h2.innerText = `${response.data[0].title}`;
    mediumC_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    mediumC_description.innerText = `${response.data[0].description}`;
    mediumC_category.innerText = `${response.data[0].category}`;

    mediumC_author.addEventListener('click', () => {
        navigateToProfile(response.data[0].username);
    });

    mediumC_btn.addEventListener('click', () => {
        loadModalData(response.data[0].coverImage, response.data[0].title, response.data[0].firstName, response.data[0].lastName, response.data[0].description, response.data[0].language, response.data[0].rating, response.data[0].pagesNumber, response.data[0].username, response.data[0].id, response.data[0].saved);
    });

    if (response.data.length <= 4) {
        for (let i = 1; i < response.data.length; i++) {
            const cardDiv = createCard(response.data[i]);
            firstRow.appendChild(cardDiv);
        }
    } else {
        for (let i = 5; i < response.data.length; i++) {
            const cardDiv = createCard(response.data[i]);
            secondRow.appendChild(cardDiv);
        }
    }
}

function createCard(data) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-3");

    const coverPhotoDiv = document.createElement("div");
    coverPhotoDiv.classList.add("cover-photo");

    const img = document.createElement("img");
    img.src = `../${data.coverImage}.jpg`;
    img.alt = data.title;
    img.classList.add("cover");

    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("overlay");

    const categoryP = document.createElement("p");
    categoryP.classList.add("category-overlay");
    categoryP.textContent = data.category;

    const bookTitleP = document.createElement("p");
    bookTitleP.classList.add("book-title");
    bookTitleP.textContent = data.title;

    const authorP = document.createElement("p");
    authorP.classList.add("author-p", "author");
    authorP.textContent = `${data.firstName} ${data.lastName}`;
    authorP.addEventListener("click", () => navigateToProfile(data.username));

    const button = document.createElement("button");
    button.classList.add("cover-btn");
    button.dataset.bsToggle = "modal";
    button.dataset.bsTarget = "#modalID";
    button.textContent = "Show Details";
    button.addEventListener("click", () => {
        loadModalData(data.coverImage, data.title, data.firstName, data.lastName, data.description, data.language, data.rating, data.pagesNumber, data.username, data.id, data.saved);
    });

    overlayDiv.appendChild(categoryP);
    overlayDiv.appendChild(bookTitleP);
    overlayDiv.appendChild(authorP);
    overlayDiv.appendChild(button);

    coverPhotoDiv.appendChild(img);
    coverPhotoDiv.appendChild(overlayDiv);

    cardDiv.appendChild(coverPhotoDiv);

    return cardDiv;
}

function navigateToProfile(username) {
    localStorage.setItem("username", username);
    window.location.href = `../Profile/profile.html?username=${username}`;
}

function separateCategories(response) {
    let separatedCategories = [];

    for (let category in response.data) {
        separatedCategories.push({
            category: category,
            data: response.data[category]
        });
    }

    return separatedCategories;
}

/**
 * Documentation
 * --------------
 * 
 * @param {Object} separetedObj - Is an object containing the name of the category and smaller objects with the data of the books. It has to be 4 categories.
 * @param {Integer} separeted_number - This is a number that specifies which category of object we need from the above variable.
 * @param {HTMLHeadElement} subtitle - this is the h2 element of the section. The function will paste the category name here
 * @param {HTMLDivElement} mediumC_PicDiv - The id of div of the card's picture
 * @param {HTMLHeadingElement} mediumC_h2 - The id of H2 tag where I insert the book's title
 * @param {HTMLParagraphElement} mediumC_author - The id of P tag where I insert the book's author name
 * @param {HTMLParagraphElement} mediumC_description - The id of the P tag where I insert the book's description
 * @param {HTMLButtonElement} mediumC_btn - The medium card's button which will load the popup
 * @param {any} firstRow - The id of the first row's div
 * @param {any} secondRow - The id of the second row's div
 */
function loadRandoms(separetedObj, separeted_number, subtitle, mediumC_PicDiv, mediumC_h2, mediumC_author, mediumC_description, mediumC_btn, firstRow, secondRow, mediumC_category) {
    // Set subtitle
    subtitle.innerText = `Books from the ${separetedObj[separeted_number].category} category:`;

    // Medium card
    mediumC_PicDiv.innerHTML = `
        <img class="medium-pic" src="../${separetedObj[separeted_number].data[0].coverImage}.jpg" alt="${separetedObj[separeted_number].data[0].title} cover">
    `;

    mediumC_h2.innerText = `${separetedObj[separeted_number].data[0].title}`;
    mediumC_author.innerText = `${separetedObj[separeted_number].data[0].firstName} ${separetedObj[separeted_number].data[0].lastName}`;
    mediumC_description.innerText = `${separetedObj[separeted_number].data[0].description}`;
    mediumC_category.innerText = `${separetedObj[separeted_number].category}`;

    // Add event listener to the medium card author
    mediumC_author.addEventListener('click', () => {
        window.location.href = `../Profile/profile.html?username=${separetedObj[separeted_number].data[0].username}`;
    });

    // Add event listener to the medium card button
    mediumC_btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadModalData(separetedObj[separeted_number].data[0].coverImage, separetedObj[separeted_number].data[0].title, separetedObj[separeted_number].data[0].firstName, separetedObj[separeted_number].data[0].lastName, separetedObj[separeted_number].data[0].description, separetedObj[separeted_number].data[0].language, separetedObj[separeted_number].data[0].rating, separetedObj[separeted_number].data[0].pagesNumber, separetedObj[separeted_number].data[0].username, separetedObj[separeted_number].data[0].id, separetedObj[separeted_number].data[0].saved);
    });

    // Add event listeners for dynamically created cards
    const dataLength = separetedObj[separeted_number].data.length;
    const maxCards = dataLength >= 4 ? 4 : dataLength;
    for (let i = 1; i < maxCards; i++) {
        const cardDiv = createCard(separetedObj[separeted_number].data[i], separetedObj[separeted_number].category);
        firstRow.appendChild(cardDiv);
    }

    // Add event listeners for dynamically created cards in the second row
    if (dataLength > 4) {
        for (let i = 4; i < dataLength; i++) {
            const cardDiv = createCard(separetedObj[separeted_number].data[i], separetedObj[separeted_number].category);
            secondRow.appendChild(cardDiv);
        }
    }
}

let saveClick = false;
let savedBookIds = [];
let deletedSavedBooksIds = [];
let savedBoolean;
let bookId;

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, username, bookIdString, isSaved) {
    bookId = parseInt(bookIdString);

    if (own_uname == username) {
        save_btn.hidden = true;
    } else {
        save_btn.hidden = false;
    }

    if (savedBookIds.includes(bookId)) {
        isSaved = true;
        savedBoolean = isSaved;
    } else if (deletedSavedBooksIds.includes(bookId)) {
        isSaved = false;
        savedBoolean = isSaved;
    }

    modal_img.src = `../${url}.jpg`;

    modal_title.innerText = `${title}`;
    modal_author.innerText = `${firstName} ${lastName}`;
    modal_pages.innerText = `${pages}`;
    if (rating != "undefined" && rating != undefined) {
        modal_ranking.innerText = `${rating}`;
    } else {
        modal_ranking.innerText = "-";
    }

    modal_language.innerText = `${language}`;
    modal_desc.innerText = `${description}`;

    modal_author.addEventListener('click', function () {
        navigateToProfile(username);
    });

    if (isSaved == "true" || isSaved == true) {
        savedBoolean = isSaved;
        if (!savedBookIds.includes(bookId)) {
            savedBookIds.push(bookId);
        }
        save_btn.innerHTML = "";
        save_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            </svg>
        `;

    } else {
        savedBoolean = isSaved;
        save_btn.innerHTML = "";
        save_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-bookmark" viewBox="0 0 16 16" id="bookmark">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            </svg>
        `;
    }

}

save_btn.addEventListener('click', (e) => {
    if (savedBoolean != true && savedBoolean != "true") {
        SavingBook(bookId);
        savedBoolean = "true";
        saveClick = true;
    } else {
        UnsavingBook(bookId);
        savedBoolean = "false";
        saveClick = true;
    }

});

async function SavingBook(bookId) {

    const savedResult = await saveBook({ "id": bookId });
    switch (savedResult.status) {
        case 200:
            saveClick = true;
            savedBookIds.push(bookId);
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
            alert('422: Something went wrong. Please try again later!');
            break;
        default:
            alert('Something went wrong. Please try again later!');
            break;
    }

}

async function UnsavingBook(bookId) {

    const unsavingResult = await deleteSavedBook({ "id": bookId });
    switch (unsavingResult.status) {
        case 200:
            saveClick = true;
            savedBookIds = savedBookIds.filter(id => id !== bookId);
            deletedSavedBooksIds.push(bookId);
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
            break;
        default:
            alert('Something went wrong. Please try again later!');
            break;
    }

}

const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    window.location.assign('../Landing-Page/landing.html');
    localStorage.removeItem("Token");
})

// publishing modal
const publisher_price = document.getElementById('publisher-price');
const PriceErr = document.getElementById('PriceErr');
const bankNumber = document.getElementById('bankNumber');
const bankErr = document.getElementById('bankErr');

const cancelPublish = document.getElementById('cancelPublish');
const agreePublish = document.getElementById('agreePublish');

var pricePass = false;
var bankPass = false;

cancelPublish.addEventListener('click', (e) => {
    publisher_price.value = "";
    bankNumber.value = "";
    publisher_price.classList.remove('inputPass');
    publisher_price.classList.remove('inputError');
    PriceErr.innerText = "";

    bankNumber.classList.remove('inputPass');
    bankNumber.classList.remove('inputError');
    bankErr.innerText = "";
});

document.getElementById('closeX').addEventListener('click', (e) => {
    publisher_price.value = "";
    bankNumber.value = "";
    publisher_price.classList.remove('inputPass');
    publisher_price.classList.remove('inputError');
    PriceErr.innerText = "";

    bankNumber.classList.remove('inputPass');
    bankNumber.classList.remove('inputError');
    bankErr.innerText = "";
});

publisher_price.addEventListener('focusin', (e) => {
    publisher_price.classList.remove('inputPass');
    publisher_price.classList.remove('inputError');
    PriceErr.innerText = "";
});

publisher_price.addEventListener('focusout', (e) => {
    e.preventDefault();
    if (publisher_price.value == "") {
        PriceErr.innerText = "This field cannot be empty."
        publisher_price.classList.add('inputError');
        pricePass = false;
    } else if (publisher_price.value < 1000) {
       
        PriceErr.innerText = "The price must not be less than 1000 Ft."
        publisher_price.classList.add('inputError');
        pricePass = false;
    } else {
        publisher_price.classList.add('inputPass');
        bankPass = false;
        PriceErr.innerText = "";
    }
});

function bankValidation(bankValue) {
    const removeSpaces = bankValue.replace(/ /g, "");

    if (bankValue == "") {
        bankNumber.classList.add('inputError');
        bankErr.innerText = "This field cannot be empty.";
        return false;

    } else if (removeSpaces.length < 15) {
        bankNumber.classList.add('inputError');
        bankErr.innerText = "This value is too short. The IBAN number should be between 15 and 34 characters.";
        return false;

    } else if (removeSpaces.length > 34) {
        bankNumber.classList.add('inputError');
        bankErr.innerText = "This value is too long. The IBAN number should be between 15 and 34 characters.";
        return false;

    } else if (removeSpaces.length >= 15 && removeSpaces.length <= 34) {
        bankNumber.classList.add('inputPass');
        const upperCase = removeSpaces.toUpperCase();
        return true;
    }

}

bankNumber.addEventListener('focusin', (e) => {
    bankNumber.classList.remove('inputPass');
    bankNumber.classList.remove('inputError');
    bankErr.innerText = "";
});

bankNumber.addEventListener('focusout', (e) => {
    bankPass = bankValidation(bankNumber.value);
    console.log(bankPass);
});

agreePublish.addEventListener('click', async function(){
    if(bankPass == true && pricePass == true){
        // endpoint meghívása
    }else{
        alert("Please make sure you fill in every field correctly.");
    }
});