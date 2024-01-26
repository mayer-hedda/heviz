const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');
const defaultP_pic = document.getElementById('default-profile-pic');

//* LOADING DATAS
const dataURL = './db.json';

const s1_bigCard_div = document.getElementById('bigCard-Pic');
const s1_bigCard_h2 = document.getElementById('s1-bigCard-h2');
const s1_bigCard_author = document.getElementById('s1-bigCard-author');
const s1_bigCard_p = document.getElementById('s1-bigCard-p');
const random_book_btn = document.getElementById('randomBook-btn');

const s2_mediumC_picDiv = document.getElementById('s2-mediumC-pic');
const s2_mediumC_h2 = document.getElementById('s2-mediumC-h2');
const s2_mediumC_author = document.getElementById('s2-mediumC-author');
const s2_mediumC_p = document.getElementById('s2-mediumC-p');
const s2_mediumC_btn = document.getElementById('s2-mediumC-btn');

const s2_first_row = document.getElementById('s2-first-row');

const s3_mediumCardPic_div = document.getElementById('s3-mediumCardPic-div');
const s3_mediumC_h2 = document.getElementById('s3-mediumC-h2');
const s3_mediumC_author = document.getElementById('s3-mediumC-author');
const s3_mediumC_desc = document.getElementById('s3-mediumC-desc');
const s3_mediumC_btn = document.getElementById('s3-mediumC-btn');

const s3_first_row = document.getElementById('s3-first-row');
const s3_second_row = document.getElementById('s3-second-row');

const s4_mediumCardPic_div = document.getElementById('s4-mediumCardPic-div');
const s4_mediumC_h2 = document.getElementById('s4-mediumC-h2');
const s4_mediumC_author = document.getElementById('s4-mediumC-author');
const s4_mediumC_desc = document.getElementById('s4-mediumC-desc');
const s4_mediumC_btn = document.getElementById('s4-mediumC-btn');

const s4_first_row = document.getElementById('s4-first-row');
const s4_second_row = document.getElementById('s4-second-row');

const s5_mediumCardPic_div = document.getElementById('s5-mediumCardPic-div');
const s5_mediumC_h2 = document.getElementById('s5-mediumC-h2');
const s5_mediumC_author = document.getElementById('s5-mediumC-author');
const s5_mediumC_desc = document.getElementById('s5-mediumC-desc');
const s5_mediumC_btn = document.getElementById('s5-mediumC-btn');

const s5_first_row = document.getElementById('s5-first-row');
const s5_second_row = document.getElementById('s5-second-row');

//* MODAL
const modal_body = document.getElementById('modal-body');
const modal_img = document.getElementById('modal-img');
const modal_title = document.getElementById('modal-title');
const modal_author = document.getElementById('modal-author');
const modal_pages = document.getElementById('modal-pages');
const modal_ranking = document.getElementById('modal-ranking');
const modal_language = document.getElementById('modal-language');
const modal_desc = document.getElementById('modal-desc');

// Segéd változók
let resp_imgURL, resp_title, resp_firstName, resp_lastName, resp_description, resp_language, resp_rating, resp_pageNumber;

// LOADING PAGE
window.onload = async function () {
    const tokenResponse = await token();
    // username to the navbar
    username.innerText = `@${tokenResponse.data.username}`;
    if (tokenResponse.data.image) {
        defaultP_pic.hidden = true;
        profilePic.innerHTML = `<img src="${response.data.image}" alt="${response.data.username} profile picture"></img>`;
    }

    switch (tokenResponse.status) {
        case 302:
            switch (tokenResponse.data.rank) {
                case 'general':
                    const responseRandomBook = await getOneRandomBook();
                    console.log("Random book response: ", responseRandomBook);
                    LoadRandomBook(responseRandomBook);

                    // const responseBooksOfMonth = await getMostSavedBooksOfTheMonth();
                    // console.log("Most saved books of month response: ", responseBooksOfMonth);
                    // OneRowAndMediumCard("Books of the month", responseBooksOfMonth, s2_mediumC_picDiv, s2_mediumC_h2, s2_mediumC_author, s2_mediumC_p, s2_mediumC_btn, s2_first_row );

                    const responseRecommanded = await getRecommandedBooks();
                    console.log("Recommanded books for you: ", responseRecommanded);
                    // console.log("Első title: ", responseRecommanded.data[0].title);
                    TwoRowAndMediumCard("Recommanded books for you", responseRecommanded, s3_mediumCardPic_div, s3_mediumC_h2, s3_mediumC_author, s3_mediumC_desc, s3_mediumC_btn, s3_first_row, s3_second_row);

                    const responsePublisher = await getPublishedBooks();
                    console.log("Publisher books: ", responsePublisher);
                    TwoRowAndMediumCard("Publisher books", responsePublisher, s4_mediumCardPic_div, s4_mediumC_h2, s4_mediumC_author, s4_mediumC_desc, s4_mediumC_btn, s4_first_row, s4_second_row);

                    const responseSelfPublished = await getSelfPublishedBooks();
                    console.log("Self-published books: ", responseSelfPublished);
                    TwoRowAndMediumCard("Self-published books", responseSelfPublished, s5_mediumCardPic_div, s5_mediumC_h2, s5_mediumC_author, s5_mediumC_desc, s5_mediumC_btn, s5_first_row, s5_second_row)

                    break;

                case 'publisher':
                    console.error("You don't have access to this page!");
                    // Ide kell majd a publisher home linkje
                    break;
            }
            break;

        case 422:
            console.error(responseLogin.data);
            break;
    }
};

// API
async function getOneRandomBook() {
    const getRandomResponse = await fetch('http://localhost:8080/webresources/book/getOneRandomBook', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(getRandomResponse => {
            if (!getRandomResponse.ok) {
                throw new Error('Hálózati hiba: ' + response.statusText);
            }

            return getRandomResponse.json();
        })

        .then(data => {
            console.log("Válasz a backendtől: ", data);
        })

        .catch(error => {
            console.error('Hálózati hiba:', error);
        })
}

async function getMostSavedBooksOfTheMonth() {
    const getBooksOfTheMonthResponse = await fetch('http://localhost:8080/webresources/book/getMostSavedBooksOfTheMonth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(getBooksOfTheMonthResponse => {
            if (!getBooksOfTheMonthResponse.ok) {
                throw new Error('Hálózati hiba: ' + response.statusText);
            }

            return getBooksOfTheMonthResponse.json();
        })

        .then(data => {
            console.log("Válasz a backendtől: ", data);
        })

        .catch(error => {
            console.error('Hálózati hiba:', error);
        })
}

async function getRecommandedBooks() {
    const getRecommandedResponse = await fetch('http://localhost:8080/webresources/book/getMostSavedBooksOfTheMonth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(getRecommandedResponse => {
            if (!getRecommandedResponse.ok) {
                throw new Error('Hálózati hiba: ' + response.statusText);
            }

            return getRecommandedResponse.json();
        })

        .then(data => {
            console.log("Válasz a backendtől: ", data);
        })

        .catch(error => {
            console.error('Hálózati hiba:', error);
        })
}

async function getPublishedBooks() {
    const getPublisherBookResponse = await fetch('http://localhost:8080/webresources/book/getMostSavedBooksOfTheMonth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(getPublisherBookResponse => {
            if (!getPublisherBookResponse.ok) {
                throw new Error('Hálózati hiba: ' + response.statusText);
            }

            return getPublisherBookResponse.json();
        })

        .then(data => {
            console.log("Válasz a backendtől: ", data);
        })

        .catch(error => {
            console.error('Hálózati hiba:', error);
        })
}

async function getSelfPublishedBooks() {
    const getSelfResponse = await fetch('http://localhost:8080/webresources/book/getMostSavedBooksOfTheMonth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(getSelfResponse => {
            if (!getSelfResponse.ok) {
                throw new Error('Hálózati hiba: ' + response.statusText);
            }

            return getSelfResponse.json();
        })

        .then(data => {
            console.log("Válasz a backendtől: ", data);
        })

        .catch(error => {
            console.error('Hálózati hiba:', error);
        })
}

async function token() {
    const tokenResponese = await fetch('http://localhost:8080/webresources/user/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(tokenResponese => {
            if (!tokenResponese.ok) {
                throw new Error('Hálózati hiba: ' + response.statusText);
            }

            return tokenResponese.json();
        })

        .then(data => {
            console.log("Válasz a backendtől: ", data);
        })

        .catch(error => {
            console.error('Hálózati hiba:', error);
        })
}

// Loading datas
function LoadRandomBook(response) {
    const coverImage = response.data[0].coverImage;

    if (coverImage == "Ez a kép elérési útja") {
        s1_bigCard_div.innerHTML = `
            
             <img src="../pictures/standard-book-cover.jpg" alt="${response.data[0].title} cover">
            
        `;
    } else {
        // Ide majd az elési utat kell megadni az scr-be, de mivel a db-ben nincs fent a tényleges kép 
        // ezért a szemléltetés miatt mindenhol a standard-et töltöm be 
        console.log("Cover book path: ", coverImage);
        s1_bigCard_div.innerHTML = `
            
            <img src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
            
        `;
    }

    s1_bigCard_h2.innerText = `${response.data[0].title}`;
    s1_bigCard_p.innerText = `${response.data[0].description}`;
    s1_bigCard_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;

    random_book_btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (response.data[0].coverImage != "Ez a kép elérési útja") {
            
            console.log("Kép elérési útja: " + response.data[0].coverImage);
            modal_img.src = `../${response.data[0].coverImage}.jpg`;
        } else{
            modal_img.src = "../pictures/standard-book-cover.jpg";

        }

        modal_title.innerText = `${response.data[0].title}`;
        // modal_title.innerText = "`${response.data[0].title}`";
        // console.error("Cím: ", response.data[0].title);
        modal_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
        modal_pages.innerText = `${response.data[0].pagesNumber}`;
        
        if(response.data[0].rating){
            modal_ranking.innerText = `${response.data[0].rating}`;
        }else{
            modal_ranking.innerText = "-";
        }

        modal_language.innerText = `${response.data[0].language}`;
        modal_desc.innerText = `${response.data[0].description}`;

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
function OneRowAndMediumCard(sectionName, response, mediumC_PicDiv, mediumC_h2, mediumC_author, mediumC_description, mediumC_btn , firstRow) {
    var dataCount = 0;
    for (let i = 0; i <= response.data.length; i++) {
        dataCount++;
    }
    console.log(sectionName, " Number of data: " + dataCount);



    // Medium cards
    // const mediumCover = response.data[0].coverImage;
    if (mediumCover == "Ez a kép elérési útja") {
        mediumC_PicDiv.innerHTML = `
        <img class="medium-pic" src="../pictures/standard-book-cover.jpg" alt="${response.data[0].title} cover">
        `
    } else {
        // Ide majd az elési utat kell megadni az scr-be, de mivel a db-ben nincs fent a tényleges kép 
        // ezért a szemléltetés miatt mindenhol a standard-et töltöm be 
        console.log(sectionName, " Medium Card Cover book path: ", mediumCover);

        mediumC_PicDiv.innerHTML = `

            <img class="medium-pic" src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
        `
    }

    mediumC_h2.innerText = `${response.data[0].title}`;
    mediumC_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    mediumC_description.innerText = `${response.data[0].description}`;

    mediumC_btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (response.data[0].coverImage != "Ez a kép elérési útja") {
            
            console.log("Kép elérési útja: " + response.data[0].coverImage);
            modal_img.src = `../${response.data[0].coverImage}.jpg`;
        } else{
            modal_img.src = "../pictures/standard-book-cover.jpg";

        }

        modal_title.innerText = `${response.data[0].title}`;
        // modal_title.innerText = "`${response.data[0].title}`";
        // console.error("Cím: ", response.data[0].title);
        modal_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
        modal_pages.innerText = `${response.data[0].pagesNumber}`;
        
        if(response.data[0].rating){
            modal_ranking.innerText = `${response.data[0].rating}`;
        }else{
            modal_ranking.innerText = "-";
        }

        modal_language.innerText = `${response.data[0].language}`;
        modal_desc.innerText = `${response.data[0].description}`;

    })

    // <img src="${response.data[i].coverImage}" alt="${response.data[i].title}" class="cover">
    if (dataCount >= 4) {
        for (let i = 1; i <= 4; i++) {
            // console.log("Cím: ", response.data[i].title );


            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title} cover">
    
                        <div class="overlay">
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                        </div>
                    </div>
                </div>
            
            `
        }
    } else if (dataCount > 0) {
        for (let i = 1; i <= response.data.length - 1; i++) {
            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title} cover">
    
                        <div class="overlay">
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                        </div>
                    </div>
                </div>
            
            `
        }

        console.error("Missing datas. Numbers of datas: " + dataCount);
    } else {
        console.error("I don't get any data.");
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
function TwoRowAndMediumCard(sectionName, response, mediumC_PicDiv, mediumC_h2, mediumC_author, mediumC_description, mediumC_btn, firstRow, secondRow) {
    var dataCount = response.data.length;
    console.log("Number of data: " + dataCount);

    // Medium cards
    const mediumCover = response.data[0].coverImage;
    if (mediumCover == "Ez a kép elérési útja") {
        mediumC_PicDiv.innerHTML = `
        <img class="medium-pic" src="../pictures/standard-book-cover.jpg" alt="${response.data[0].title} cover">
        `
    } else {
       
        console.log(sectionName, " Medium Card Cover book path: ", mediumCover);

        mediumC_PicDiv.innerHTML = `
            <img class="medium-pic" src="../${response.data[0].coverImage}.jpg" alt="${response.data[0].title} cover">
        `
    }

    mediumC_h2.innerText = `${response.data[0].title}`;
    mediumC_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
    mediumC_description.innerText = `${response.data[0].description}`;

    mediumC_btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (response.data[0].coverImage != "Ez a kép elérési útja") {
            console.log("Kép elérési útja: " + response.data[0].coverImage);
            modal_img.src = `../${response.data[0].coverImage}.jpg`;
        } else {
            modal_img.src = "../pictures/standard-book-cover.jpg";
        }

        modal_title.innerText = `${response.data[0].title}`;
        modal_author.innerText = `${response.data[0].firstName} ${response.data[0].lastName}`;
        modal_pages.innerText = `${response.data[0].pagesNumber}`;
        
        if(response.data[0].rating) {
            modal_ranking.innerText = `${response.data[0].rating}`;
        } else {
            modal_ranking.innerText = "-";
        }

        modal_language.innerText = `${response.data[0].language}`;
        modal_desc.innerText = `${response.data[0].description}`;
    })

    if (dataCount >= 4) {
        for (let i = 1; i <= 4; i++) {
            if(response.data[i].coverImage != "Ez a kép elérési útja") {
                firstRow.innerHTML += `
                    <div class="col-3">
                        <div class="cover-photo">
                            <img src="../${response.data[i].coverImage}.jpg" alt="${response.data[i].title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${response.data[i].title}</p>
                                <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                            </div>
                        </div>
                    </div>
                `
            } else {
                firstRow.innerHTML += `
                    <div class="col-3">
                        <div class="cover-photo">
                            <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${response.data[i].title}</p>
                                <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                            </div>
                        </div>
                    </div>
                `
            }
        }

        for (let i = 5; i < dataCount; i++) {
            if(response.data[i].coverImage != "Ez a kép elérési útja") {
                secondRow.innerHTML += `
                    <div class="col-3">
                        <div class="cover-photo">
                            <img src="../${response.data[i].coverImage}.jpg" alt="${response.data[i].title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${response.data[i].title}</p>
                                <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                            </div>
                        </div>
                    </div>
                `
            } else {
                secondRow.innerHTML += `
                    <div class="col-3">
                        <div class="cover-photo">
                            <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${response.data[i].title}</p>
                                <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    } else if (dataCount > 0) {
        for (let i = 1; i <= dataCount; i++) {
            firstRow.innerHTML += `
                <div class="col-3">
                    <div class="cover-photo">
                        <img src="../pictures/standard-book-cover.jpg" alt="${response.data[i].title} cover">
                        <div class="overlay">
                            <p class="book-title">${response.data[i].title}</p>
                            <p class="author-p">${response.data[i].firstName} ${response.data[i].lastName}</p>
                            <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}')">Show Details</button>
                        </div>
                    </div>
                </div>
            `
        }
        console.error("Missing datas. Numbers of datas: " + dataCount);
    } else {
        console.error("I don't get any data.");
    }
}



function loadModalData(url, title, firstName, lastName, description, language, rating, pages) {

    if (url != "Ez a kép elérési útja") {
        modal_img.src = `../${url}.jpg`;
    }else{
        modal_img.src = "../pictures/standard-book-cover.jpg";
    }

    modal_title.innerText = `${title}`;
    modal_author.innerText = `${firstName} ${lastName}`;
    modal_pages.innerText = `${pages}`;
    if(rating){
        modal_ranking.innerText = `${rating}`;
    }else{
        modal_ranking.innerText = "-";
    }

    modal_language.innerText = `${language}`;
    modal_desc.innerText = `${description}`;
    
}


