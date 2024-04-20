const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');
var own_uname;

// Section tags
const first_section = document.getElementById('first-section');
const second_section = document.getElementById('second-section');
const third_section = document.getElementById('third-section');
const fourth_section = document.getElementById('fourth-section');
const fifth_section = document.getElementById('fifth-section');
const zero_dataContainer = document.getElementById('zero-dataContainer');

const s1_bigCard_div = document.getElementById('bigCard-Pic');
const s1_bigCard_h2 = document.getElementById('s1-bigCard-h2');
const s1_bigCard_author = document.getElementById('s1-bigCard-author');
const s1_bigCard_publisher = document.getElementById('s1-bigCard-publisher');
const s1_bigCard_p = document.getElementById('s1-bigCard-p');
const random_book_btn = document.getElementById('randomBook-btn');

const s2_mediumC_picDiv = document.getElementById('s2-mediumC-pic');
const s2_mediumC_h2 = document.getElementById('s2-mediumC-h2');
const s2_mediumC_author = document.getElementById('s2-mediumC-author');
const s2_mediumC_publisher = document.getElementById('s2-mediumC-publisher');
const s2_mediumC_p = document.getElementById('s2-mediumC-p');
const s2_mediumC_btn = document.getElementById('s2-mediumC-btn');

const s2_first_row = document.getElementById('s2-first-row');

const s3_mediumCardPic_div = document.getElementById('s3-mediumCardPic-div');
const s3_mediumC_h2 = document.getElementById('s3-mediumC-h2');
const s3_mediumC_author = document.getElementById('s3-mediumC-author');
const s3_mediumC_publisher = document.getElementById('s3-mediumC-publisher');
const s3_mediumC_desc = document.getElementById('s3-mediumC-desc');
const s3_mediumC_btn = document.getElementById('s3-mediumC-btn');

const s3_first_row = document.getElementById('s3-first-row');
const s3_second_row = document.getElementById('s3-second-row');

const s4_mediumCardPic_div = document.getElementById('s4-mediumCardPic-div');
const s4_mediumC_h2 = document.getElementById('s4-mediumC-h2');
const s4_mediumC_author = document.getElementById('s4-mediumC-author');
const s4_mediumC_publisher = document.getElementById('s4-mediumC-publisher');
const s4_mediumC_desc = document.getElementById('s4-mediumC-desc');
const s4_mediumC_btn = document.getElementById('s4-mediumC-btn');

const s4_first_row = document.getElementById('s4-first-row');
const s4_second_row = document.getElementById('s4-second-row');

const s5_mediumCardPic_div = document.getElementById('s5-mediumCardPic-div');
const s5_mediumC_h2 = document.getElementById('s5-mediumC-h2');
const s5_mediumC_author = document.getElementById('s5-mediumC-author');
const s5_mediumC_publisher = document.getElementById('s5-mediumC-publisher');
const s5_mediumC_desc = document.getElementById('s5-mediumC-desc');
const s5_mediumC_btn = document.getElementById('s5-mediumC-btn');

const s5_first_row = document.getElementById('s5-first-row');
const s5_second_row = document.getElementById('s5-second-row');

// MODAL
const modal_body = document.getElementById('modal-body');
const modal_img = document.getElementById('modal-img');
const modal_title = document.getElementById('modal-title');
const modal_author = document.getElementById('modal-author');
const modal_publisher = document.getElementById('modal-publisher');
const modal_pages = document.getElementById('modal-pages');
const modal_ranking = document.getElementById('modal-ranking');
const modal_language = document.getElementById('modal-language');
const modal_desc = document.getElementById('modal-desc');
const modal_price = document.getElementById('book-price');
const save_btn = document.getElementById('save-btn');
const shopping_btn = document.getElementById('shopping-cart');

// Segéd változók
let resp_imgURL, resp_title, resp_firstName, resp_lastName, resp_description, resp_language, resp_rating, resp_pageNumber;
let s1 = false;
let s2 = false;
let s3 = false;
let s4 = false;
let s5 = false;

window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();
    console.log(tokenResponse);

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

// LOADING PAGE
window.onload = async function () {
    const tokenResponse = await token();

    switch (tokenResponse.status) {
        case 401:
            window.location.href = "../Log-in/login.html";
            break;
        case 302:
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');
            localStorage.removeItem('id');
            localStorage.removeItem('name');

            document.getElementById('profile-link').addEventListener('click', (e) => {
               navigateToProfile(own_uname);
            });

            own_uname = tokenResponse.data.username;

            const userResponse = await getUserDetails({ "profileUsername": tokenResponse.data.username })

            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img class="rounded-circle" src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;

            switch (tokenResponse.data.rank) {
                case 'general':
                    document.getElementById('welcome').innerText = `Welcome ${userResponse.data.firstName} ${userResponse.data.lastName}!`;

                    const responseRandomBook = await getOneRandomBook();
                    if (responseRandomBook.data.length != 0) {
                        LoadRandomBook(responseRandomBook);
                        s1 = true;
                    } else {
                        first_section.hidden = true;
                    }

                    // A hónap könyve(i)
                    const responseBooksOfMonth = await getMostSavedBooksOfTheMonth();
                    if (responseBooksOfMonth.data.length != 0) {
                        OneRowAndMediumCard("Books of the month", responseBooksOfMonth, s2_mediumC_picDiv, s2_mediumC_h2, s2_mediumC_author, s2_mediumC_publisher, s2_mediumC_p, s2_mediumC_btn, s2_first_row);
                        s2 = true;
                    } else {
                        second_section.hidden = true;
                    }

                    // ajánlások neked
                    const responseRecommanded = await getRecommandedBooks();
                    if (responseRecommanded.data.length != 0) {
                        TwoRowAndMediumCard("Recommanded books for you", responseRecommanded, s3_mediumCardPic_div, s3_mediumC_h2, s3_mediumC_author, s3_mediumC_publisher, s3_mediumC_desc, s3_mediumC_btn, s3_first_row, s3_second_row);
                        s3 = true;
                    } else {
                        third_section.hidden = true;
                    }

                    // csak kiadósok
                    const responsePublisher = await getPublishedBooks();
                    if (responsePublisher.data.length != 0) {
                        TwoRowAndMediumCard("Publisher books", responsePublisher, s4_mediumCardPic_div, s4_mediumC_h2, s4_mediumC_author, s4_mediumC_publisher, s4_mediumC_desc, s4_mediumC_btn, s4_first_row, s4_second_row);
                        s4 = true;
                    } else {
                        fourth_section.hidden = true;
                    }

                    // csak öncélú
                    const responseSelfPublished = await getSelfPublishedBooks();
                    if (responseSelfPublished.data.length != 0) {

                        TwoRowAndMediumCard("Self-published books", responseSelfPublished, s5_mediumCardPic_div, s5_mediumC_h2, s5_mediumC_author, s5_mediumC_publisher, s5_mediumC_desc, s5_mediumC_btn, s5_first_row, s5_second_row)
                        s5 = true;
                    } else {
                        fifth_section.hidden = true;
                    }

                    if (s1 == false &&
                        s2 == false &&
                        s3 == false &&
                        s4 == false &&
                        s5 == false) {

                        zero_dataContainer.hidden = false;
                    }

                    break;

                case 'publisher':
                    window.location.href = "../Publisher-Home/PubHome.html";
                    break;
            }
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
};

function navigateToProfile(username) {
    localStorage.setItem("username", username);
    window.location.href = `../Profile/profile.html?username=${username}`;
}

// Loading datas
function LoadRandomBook(response) {
    const coverImage = response.data[0].coverImage;

    if (coverImage == "Ez a kép elérési útja") {
        s1_bigCard_div.innerHTML = `
             <img src="../pictures/standard-book-cover.jpg" alt="${response.data[0].title} cover">          
        `;
    } else {
        console.log("Cover book path: ", coverImage);
        s1_bigCard_div.innerHTML = `          
            <img src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">           
        `;
    }

    s1_bigCard_h2.innerText = `${response.data[0].title}`;
    s1_bigCard_p.innerText = `${response.data[0].description}`;
    s1_bigCard_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    s1_bigCard_publisher.innerText = `${response.data[0].publisher || ''}`;

    s1_bigCard_author.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem("username", response.data[0].username);
        window.location.href = `../Profile/profile.html?username=${response.data[0].username}`;
    });

    random_book_btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadModalData(response.data[0].coverImage, response.data[0].title, response.data[0].firstName, response.data[0].lastName, response.data[0].description, response.data[0].language, response.data[0].rating, response.data[0].pagesNumber, response.data[0].price, response.data[0].username , response.data[0].publisher, response.data[0].id, response.data[0].saved);
    })
}

/**
 * Documentation
 * --------------
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
 * 
 */
function OneRowAndMediumCard(sectionName, response, mediumC_PicDiv, mediumC_h2, mediumC_author, mediumC_publisher, mediumC_description, mediumC_btn, firstRow) {
    // Medium cards
    if (response.data[0].coverImage == "Ez a kép elérési útja") {
        mediumC_PicDiv.innerHTML = `
            <img class="medium-pic" src="../pictures/standard-book-cover.jpg" alt="${response.data[0].title} cover">
        `;
    } else {
        mediumC_PicDiv.innerHTML = `
            <img class="medium-pic" src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
        `;
    }

    if (response.data[0].publisher != undefined) {
        mediumC_publisher.innerText = `${response.data[0].publisher}`;
    } else {
        mediumC_publisher.innerText = "";
    }

    mediumC_h2.innerText = `${response.data[0].title}`;
    mediumC_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    mediumC_description.innerText = `${response.data[0].description}`;

    mediumC_author.addEventListener('click', (e) => {
       navigateToProfile(response.data[0].username);
    });

    mediumC_btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadModalData(response.data[0].coverImage, response.data[0].title, response.data[0].firstName, response.data[0].lastName, response.data[0].description, response.data[0].language, response.data[0].rating, response.data[0].pagesNumber, response.data[0].price, response.data[0].username , response.data[0].publisher !== undefined ? `'${response.data[0].publisher}'` : null, response.data[0].id, response.data[0].saved);
    })


    for (let i = 1; i <= response.data.length - 1; i++) {
        if (response.data[i].coverImage != "Ez a kép elérési útja") {

            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../${response.data[i].coverImage}.jpg" alt="${response.data[i].title}" class="cover">
                        <div class="overlay">
                            <p class="category-overlay">Category</p>
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <p class="author-p author">${response.data[i].publisher || ''}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}' , ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `;

        } else {

            firstRow.innerHTML += `
                <div class="col-3 ">
                    <div class="cover-photo">
                        <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title}" class="cover">
                        <div class="overlay">
                            <p class="category-overlay">Category</p>
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <p class="author-p author">${response.data[i].publisher || ''}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}' , ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
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
 * 
 */
function TwoRowAndMediumCard(sectionName, response, mediumC_PicDiv, mediumC_h2, mediumC_author, mediumC_publisher, mediumC_description, mediumC_btn, firstRow, secondRow) {

    // Medium cards
    if (response.data[0].coverImage == "Ez a kép elérési útja") {
        mediumC_PicDiv.innerHTML = `
            <img class="medium-pic" src="../pictures/standard-book-cover.jpg" alt="${response.data[0].title} cover">
        `;
    } else {
        mediumC_PicDiv.innerHTML = `
            <img class="medium-pic" src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
        `;
    }

    if (response.data[0].publisher != undefined) {
        mediumC_publisher.innerText = `${response.data[0].publisher}`;
    } else {
        mediumC_publisher.innerText = "";
    }

    mediumC_h2.innerText = `${response.data[0].title}`;
    mediumC_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    mediumC_description.innerText = `${response.data[0].description}`;

    mediumC_author.addEventListener('click', (e) => {
       navigateToProfile(response.data[0].username);
    });

    mediumC_btn.addEventListener('click', (e) => {
        e.preventDefault();
        loadModalData(response.data[0].coverImage, response.data[0].title, response.data[0].firstName, response.data[0].lastName, response.data[0].description, response.data[0].language, response.data[0].rating, response.data[0].pagesNumber, response.data[0].price, response.data[0].username, response.data[0].publisher, response.data[0].id, response.data[0].saved);
    })


    for (let i = 1; i <= 4; i++) {

        if (response.data[i].coverImage != "Ez a kép elérési útja") {
            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../${response.data[i].coverImage}.jpg" alt="${response.data[i].title}" class="cover">
                        <div class="overlay">
                            <p class="category-overlay">Category</p>
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <p class="author-p author">${response.data[i].publisher || ''}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}' , ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `;

        } else {

            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title}" class="cover">
                        <div class="overlay">
                            <p class="category-overlay">Category</p>
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <p class="author-p author">${response.data[i].publisher || ''}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}' , ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `;

        }
    }

    for (let i = 5; i < response.data.length; i++) {
        if (response.data[i].coverImage != "Ez a kép elérési útja") {
            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../${response.data[i].coverImage}.jpg" alt="${response.data[i].title}" class="cover">
                        <div class="overlay">
                            <p class="category-overlay">Category</p>
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <p class="author-p author">${response.data[i].publisher || ''}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}' , ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `;

        } else {

            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title}" class="cover">
                        <div class="overlay">
                            <p class="category-overlay">Category</p>
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <p class="author-p author">${response.data[i].publisher || ''}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}' , ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

}

let saveClick = false;
let savedBookIds = [];
let deletedSavedBooksIds = [];
let savedBoolean;
let bookId;

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username , publisher, bookIdString, isSaved) {
    bookId = parseInt(bookIdString);

    if (own_uname == username) {
        save_btn.hidden = true;
        shopping_btn.hidden = true;
    }else{
        save_btn.hidden = false;
        shopping_btn.hidden = false;
    }

    if (savedBookIds.includes(bookId)) {
        isSaved = true;
        savedBoolean = isSaved;
    } else if (deletedSavedBooksIds.includes(bookId)) {
        isSaved = false;
        savedBoolean = isSaved;
    }

    if (url != "Ez a kép elérési útja") {
        modal_img.src = `../${url}.jpg`;
    } else {
        modal_img.src = "../pictures/standard-book-cover.jpg";
    }

    if (publisher != null) {
        modal_publisher.innerText = `${publisher}`;
    } else {
        modal_publisher.innerText = "";
    }

    modal_title.innerText = `${title}`;
    modal_author.innerText = `${firstName} ${lastName}`;
    modal_pages.innerText = `${pages}`;

    if (rating != undefined && rating != "undefined") {
        modal_ranking.innerText = `${rating}`;
    } else {
        modal_ranking.innerText = "-";
    }

    modal_language.innerText = `${language}`;
    modal_desc.innerText = `${description}`;
    modal_price.innerText = `${price} Ft`;

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
      
    }else{
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

const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    window.location.assign('../Landing-Page/landing.html');
    localStorage.removeItem("Token");
})