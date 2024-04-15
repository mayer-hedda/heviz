const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');
const SavedBooks = document.getElementById('SavedBooks');

const c_name = document.getElementById('category-name');
const current_page = document.getElementById('current-page');
const books_side = document.getElementById('books-div');

const no_category_result = document.getElementById('noCategoryResult');
const no_self_result = document.getElementById('noSelfInCategory');
const no_publisher_result = document.getElementById('noPublihserInCategory');

//Modal btn-s
const save_btn = document.getElementById('save-btn');
const shopping_btn = document.getElementById('shopping-cart');
const publish_btn = document.getElementById('publish-btn');
const book_price = document.getElementById('book-price');

var categoryId;
var own_username;

// Ellenőrizzük, hogy van-e a felhasználónak tokenje, ha nem akkor átirányítjuk a login felületre
window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
    // minden radio btn kicsekkolása az oldal betöltésekor
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach(checkBox => {
        checkBox.checked = false;
    });

    var tokenResponse = await token();
    // console.log(tokenResponse.data);
    switch (tokenResponse.status) {
        case 401:
            window.location.href = "../Log-in/login.html";
            break;
        case 422:
            alert("422 - Something went wrong");
            console.error("Error: " + responseUser);
            break;
        case 302:
            localStorage.removeItem("username");
            localStorage.removeItem('Error Code:');
            own_username = tokenResponse.data.username;

            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;

            document.getElementById('profile-link').addEventListener('click', (e) => {
                window.location.href = `../Profile/profile.html?username=${tokenResponse.data.username}`;
            });

            const HomePage = document.getElementById('HomePage');

            if (tokenResponse.data.rank == "publisher") {
                document.getElementById('writingBtn').hidden = true;
                shopping_btn.hidden = true;
                publish_btn.hidden = false;
                book_price.hidden = true;

                SavedBooks.textContent = "Saved Books";

                // amelyik filtereket látja a kiadó
                /**
                 * a-z
                 * z-a
                 * dátum - legkorábban feltöltött
                 * dátum - legkésőbb feltöltött
                */
                document.getElementById('most-saved-books').hidden = true;
                document.getElementById('top-rated-books-div').hidden = true;
                document.getElementById('self-published-books-div').hidden = true;
                document.getElementById('published-by-publisher-books-div').hidden = true;
                document.getElementById('byPrice').hidden = true;

                HomePage.addEventListener('click', (e) => {
                    window.location.href = '../Publisher-Home/PubHome.html';
                });

            } else if (tokenResponse.data.rank == "general") {
                shopping_btn.hidden = false;
                publish_btn.hidden = true;
                book_price.hidden = false;
                SavedBooks.textContent = "My Books";

                HomePage.addEventListener('click', (e) => {
                    window.location.href = '../General-HomePage/GenHome.html';
                });
            }

            // vizsgáljuk hogy a keresés eredményeként érkeztünk az oldalra vagy pedig kategória által
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('category')) {

                var getCategoryName = localStorage.getItem('name');
                c_name.innerText = getCategoryName;
                current_page.innerText = getCategoryName;
                categoryId = localStorage.getItem('id');
                getCategoryName = getCategoryName.toLowerCase();

                // console.log(categoryId);
                console.log(getCategoryName);
                const categoryResponse = await getAllBooksByCategory({ "name": getCategoryName, "id": categoryId });

                switch (categoryResponse.status) {
                    case 200:
                        if (categoryResponse.data.length == 0) {
                            document.getElementById('noCategoryResult').hidden = false;
                            const radioButtons = document.querySelectorAll('input[type="radio"]');
                            radioButtons.forEach(radioButton => {
                                radioButton.disabled = true;
                            });

                        } else if (categoryResponse.data.length == 1) {
                            const radioButtons = document.querySelectorAll('input[type="radio"]');
                            radioButtons.forEach(radioButton => {
                                radioButton.disabled = true;
                            });

                            LoadCategoryResult(categoryResponse);



                        } else {
                            document.getElementById('noCategoryResult').hidden = true;
                            LoadCategoryResult(categoryResponse);
                        }

                        break;

                    case 401:
                        window.location.href = '../Log-in/login.html';
                        break;

                    case 404:
                        // window.location.href = '../404/404.html';
                        console.log(categoryResponse.status);
                        break;

                    default:
                        alert('Something went wrong. Please try again later!');
                        console.log('Status: ' + getCategoryAgain.status);
                        console.log('Error: ' + getCategoryAgain.error);
                        break;

                }

            } else if (urlParams.has('search')) {
                var searchFromLink = urlParams.get('search');
                c_name.innerText = searchFromLink;
                current_page.innerText = searchFromLink;
                document.getElementById('left-side').hidden = true;

                LoadSearchResult();
            }

            break;
        default:
            window.location.href = '../404/404.html';
            break;
    }

}

function LoadSearchResult() {

    books_side.style.width = '100%';
    books_side.style.display = 'flex';
    books_side.style.flexDirection = 'column';
    books_side.style.justifyContent = 'center';
    books_side.style.alignItems = 'center';
    books_side.style.marginLeft = '100px';


    const storedSearchResult = JSON.parse(localStorage.getItem('searchResult'));
    console.log(storedSearchResult);
    if (storedSearchResult.length == 0) {
        document.getElementById('noSearchResult').hidden = false;


    } else {

        for (let i = 0; i <= storedSearchResult.length - 1; i++) {

            if (storedSearchResult[i].coverImage == "Ez a kép elérési útja") {


                books_side.innerHTML += `
                    <div class="col-6">
                        <div class="container medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3">
                                    <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                </div>

                                <div class="col-9 medium-right-side">
                                    <h2 class="container medium-h2">${storedSearchResult[i].title}</h2>
                                    <p class="username author" onclick="navigateToProfile('${storedSearchResult[i].username}')">${storedSearchResult[i].firstName} ${storedSearchResult[i].lastName}</p>
                                    <p class="username author" >${storedSearchResult[i].publisher || ''}</p>
                                    <p class="medium-desc" >${storedSearchResult[i].description}</p>
                                    
                                    <div class="bottom-row-medium">
                                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${storedSearchResult[i].coverImage}', '${storedSearchResult[i].title}', '${storedSearchResult[i].firstName}', '${storedSearchResult[i].lastName}', '${storedSearchResult[i].description}', '${storedSearchResult[i].language}', '${storedSearchResult[i].rating}', '${storedSearchResult[i].pagesNumber}', '${storedSearchResult[i].price}', '${storedSearchResult[i].username}', '${storedSearchResult[i].publisher !== undefined ? storedSearchResult[i].publisher : null}', '${storedSearchResult[i].id}', '${storedSearchResult[i].saved}')">Show Details</button>
                                        <p class="category" id="s2-mediumC-category">Comedy</p>
                                    </div>
                                </div>
                             </div>
                         </div>
                     </div>
                 `;

            } else {

                books_side.innerHTML += `
                    <div class="col-6">
                        <div class="container medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3">
                                    <img class="medium-pic" src="../${storedSearchResult[i].coverImage}.jpg">
                                </div>

                                <div class="col-9 medium-right-side">
                                    <h2 class="container medium-h2">${storedSearchResult[i].title}</h2>
                                    <p class="username author" onclick="navigateToProfile('${storedSearchResult[i].username}')">${storedSearchResult[i].firstName} ${storedSearchResult[i].lastName}</p>
                                    <p class="username author" >${storedSearchResult[i].publisher || ''}</p>
                                    <p class="medium-desc" >${storedSearchResult[i].description}</p>
                                    <div class="bottom-row-medium">
                                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${storedSearchResult[i].coverImage}', '${storedSearchResult[i].title}', '${storedSearchResult[i].firstName}', '${storedSearchResult[i].lastName}', '${storedSearchResult[i].description}', '${storedSearchResult[i].language}', '${storedSearchResult[i].rating}', '${storedSearchResult[i].pagesNumber}', '${storedSearchResult[i].price}', '${storedSearchResult[i].username}', '${storedSearchResult[i].publisher !== undefined ? storedSearchResult[i].publisher : null}', '${storedSearchResult[i].id}', '${storedSearchResult[i].saved}')">Show Details</button>
                                        <p class="category" id="s2-mediumC-category">Comedy</p>
                                    </div>
                                </div>
                             </div>
                         </div>
                     </div>
                 `;
            }

        }


    }

}

function LoadCategoryResult(response) {
    for (let i = 0; i <= response.data.length - 1; i++) {
        if (response.data[i].coverImage == "Ez a kép elérési útja") {

            books_side.innerHTML += `
                    <div class="container medium-card" style="background-color: #EAD7BE;">
                        <div class="row">
                            <div class="col-3 my-col3" >
                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                
                            </div>
    
                            <div class="col-9 medium-right-side">
                            
                                <h2 class="container medium-h2">${response.data[i].title}</h2>
                                <p class="username author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <p class="username author" >${response.data[i].publisher || ''}</p>
                                <p class="medium-desc" >${response.data[i].description}</p>
                                
                                <div class="bottom-row-medium">
                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}', '${response.data[i].publisher !== undefined ? response.data[i].publisher : null}', '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                </div>
                            </div>
                        </div>
                    </div>
            
                `;

        } else {

            books_side.innerHTML += `
                    <div class="container medium-card" style="background-color: #EAD7BE;">
                        <div class="row">
                            <div class="col-3 my-col3" >
                                <img class="medium-pic" src="../${response.data[i].coverImage}.jpg">
                                
                            </div>
    
                            <div class="col-9 medium-right-side">
                            
                                <h2 class="container medium-h2">${response.data[i].title}</h2>
                                <p class="username author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <p class="username author" >${response.data[i].publisher || ''}</p>
                                <p class="medium-desc" >${response.data[i].description}</p>
                                <div class="bottom-row-medium">
                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}', '${response.data[i].publisher !== undefined ? response.data[i].publisher : null}', '${response.data[i].id}', '${response.data[i].saved}')">Show Details</button>
                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                </div>
    
                            </div>
                        </div>
                    </div>
            
            `;

        }

    }
}

const searchBTN = document.getElementById('searchBTN');
const search_input = document.getElementById('searchKeyword');

searchBTN.addEventListener('click', async function (event) {
    event.preventDefault();
    const s_value = search_input.value.trim();

    if (s_value != "") {
        const searchResult = await getSearchBooks({ "searchText": `${s_value}` });

        switch (searchResult.status) {
            case 200:
                localStorage.setItem('searchResult', JSON.stringify(searchResult.data.books));
                window.location.href = `./category.html?search=${s_value}`;
                search_input.value = "";
                break;
            case 401:
                window.location.href = "../Log-in/login.html";
                break;
            case 422:
                alert("422 - Something went wrong. Please try again later.");
                console.error("Error: " + responseUser);
                break;

            default:
                alert("Somethings went wrong. Please try again later. Status: " + searchResult.status);
                break;
        }
    } else {
        alert("Please enter a valid search term. Searching with an empty field is not possible.");
    }

});

const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    window.location.assign('../Landing-Page/landing.html');
    localStorage.removeItem("Token");
})

function navigateToProfile(username) {
    localStorage.setItem("username", username);
    window.location.href = `../Profile/profile.html?username=${username}`;
}

const book_modal_body = document.getElementById('modal-body');
const book_modal_img = document.getElementById('book-modal-img');
const book_modal_title = document.getElementById('modal-title');
const book_modal_author = document.getElementById('modal-author');
const book_modal_publisher = document.getElementById('modal-publisher');
const book_modal_pages = document.getElementById('modal-pages');
const book_modal_ranking = document.getElementById('modal-ranking');
const book_modal_language = document.getElementById('modal-language');
const book_modal_desc = document.getElementById('modal-desc');

let saveClick = false;

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username, publisher, bookId, isSaved) {

    console.log("own un.: " + own_username);
    console.log("book un: " + username);
    if (own_username == username) {
        save_btn.hidden = true;
        shopping_btn.hidden = true;
    } else {
        save_btn.hidden = false;
        shopping_btn.hidden = false;
    }

    if (url != "Ez a kép elérési útja") {
        book_modal_img.src = `../${url}.jpg`;
    } else {
        book_modal_img.src = `../pictures/standard-book-cover.jpg`;
    }

    if (publisher != "null") {
        book_modal_publisher.innerText = `${publisher}`;
    } else {
        book_modal_publisher.innerText = "";
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

    save_btn.addEventListener('click', (e) => {
        if (isSaved == "true") {
            UnsavingBook(bookId);
            isSaved = "false";
            saveClick = true;
            console.log(isSaved);
        } else {
            SavingBook(bookId);
            isSaved = "true";
            saveClick = true;
            console.log(isSaved);
        }
    });

}

document.getElementById('bookPopup').addEventListener('hidden.bs.modal', (e) => {
    if (saveClick == true) {
        location.reload();
    }
})


async function SavingBook(bookId) {
    try {
        const savedResult = await saveBook({ "id": bookId });
        switch (savedResult.status) {
            case 200:
                console.log("successfully saved");
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
        saveClick = true; // Itt állítsd be a saveClick-et, miután a művelet befejeződött
    } catch (error) {
        console.error("Error:", error);
        alert('Something went wrong. Please try again later!');
    }
}

async function UnsavingBook(bookId) {
    try {
        const unsavingResult = await deleteSavedBook({ "id": bookId });
        switch (unsavingResult.status) {
            case 200:
                console.log("Successfully unsaved!");
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
        saveClick = true; // Itt állítsd be a saveClick-et, miután a művelet befejeződött
    } catch (error) {
        console.error("Error:", error);
        alert('Something went wrong. Please try again later!');
    }
}

// most saved books
const mostSaved = document.getElementById('most-saved-books-radio');
mostSaved.addEventListener('change', async function () {
    no_publisher_result.hidden = true;
    no_self_result.hidden = true;

    if (this.checked) {
        books_side.innerHTML = '';

        const mostSaved_result = await getFilteredBooks({ "categoryId": categoryId, "filter": 7 });
        if (mostSaved_result.status == 200) {
            for (let i = 0; i <= mostSaved_result.data.length - 1; i++) {
                if (mostSaved_result.data[i].coverImage == "Ez a kép elérési útja") {

                    books_side.innerHTML += `
                            <div class="container medium-card" style="background-color: #EAD7BE;">
                                <div class="row">
                                    <div class="col-3 my-col3" >
                                        <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                        
                                    </div>
            
                                    <div class="col-9 medium-right-side">
                                    
                                        <h2 class="container medium-h2">${mostSaved_result.data[i].title}</h2>
                                        <p class="username author"  onclick="navigateToProfile('${mostSaved_result.data[i].username}')">${mostSaved_result.data[i].firstName} ${mostSaved_result.data[i].lastName}</p>
                                        <p class="username author" >${mostSaved_result.data[i].publisher || ''}</p>
                                        <p class="medium-desc" >${mostSaved_result.data[i].description}</p>
                                        <div class="bottom-row-medium">
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${mostSaved_result.data[i].coverImage}', '${mostSaved_result.data[i].title}', '${mostSaved_result.data[i].firstName}', '${mostSaved_result.data[i].lastName}', '${mostSaved_result.data[i].description}', '${mostSaved_result.data[i].language}', '${mostSaved_result.data[i].rating}', '${mostSaved_result.data[i].pagesNumber}', '${mostSaved_result.data[i].price}', '${mostSaved_result.data[i].username}', '${mostSaved_result.data[i].publisher !== undefined ? mostSaved_result.data[i].publisher : null}', '${mostSaved_result.data[i].id}', '${mostSaved_result.data[i].saved}')">Show Details</button>
                                            <p class="category" id="s2-mediumC-category">Comedy</p>
                                        </div>   
                                    </div>
                                </div>
                            </div>
            
                        `;

                } else {
                    books_side.innerHTML += `
                            <div class="container medium-card" style="background-color: #EAD7BE;">
                                <div class="row">
                                    <div class="col-3 my-col3" >
                                        <img class="medium-pic" src="../${mostSaved_result.data[i].coverImage}.jpg">
                                        
                                    </div>
            
                                    <div class="col-9 medium-right-side">
                                    
                                        <h2 class="container medium-h2">${mostSaved_result.data[i].title}</h2>
                                        <p class="username author"  onclick="navigateToProfile('${mostSaved_result.data[i].username}')">${mostSaved_result.data[i].firstName} ${mostSaved_result.data[i].lastName}</p>
                                        <p class="username author" >${mostSaved_result.data[i].publisher || ''}</p>
                                        <p class="medium-desc" >${mostSaved_result.data[i].description}</p>
                                        <div class="bottom-row-medium">
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${mostSaved_result.data[i].coverImage}', '${mostSaved_result.data[i].title}', '${mostSaved_result.data[i].firstName}', '${mostSaved_result.data[i].lastName}', '${mostSaved_result.data[i].description}', '${mostSaved_result.data[i].language}', '${mostSaved_result.data[i].rating}', '${mostSaved_result.data[i].pagesNumber}', '${mostSaved_result.data[i].price}', '${mostSaved_result.data[i].username}', '${mostSaved_result.data[i].publisher !== undefined ? mostSaved_result.data[i].publisher : null}', '${mostSaved_result.data[i].id}', '${mostSaved_result.data[i].saved}')">Show Details</button>
                                            <p class="category" id="s2-mediumC-category">Comedy</p>
                                        </div>
            
                                    </div>
                                </div>
                            </div>
            
                    `;
                }
            }
        } else if (mostSaved_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else {
            alert('Please try again later. Status: ' + mostSaved_result.status);
        }
    }
})

// top rated books
const topRated = document.getElementById('top-rated-books-radio');
topRated.addEventListener('change', async function () {
    no_publisher_result.hidden = true;
    no_self_result.hidden = true;

    if (this.checked) {
        // console.log(this.id);
        books_side.innerHTML = '';
        const mostRated_result = await getFilteredBooks({ "categoryId": categoryId, "filter": 8 });
        if (mostRated_result.status == 200) {
            for (let i = 0; i <= mostRated_result.data.length - 1; i++) {
                if (mostRated_result.data[i].coverImage == "Ez a kép elérési útja") {

                    books_side.innerHTML += `
                        <div class="container medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3" >
                                    <img class="medium-pic" src="../pictures/standard-book-cover.jpg">               
                                </div>
            
                                <div class="col-9 medium-right-side">
                                    
                                    <h2 class="container medium-h2">${mostRated_result.data[i].title}</h2>
                                    <p class="username author"  onclick="navigateToProfile('${mostRated_result.data[i].username}')">${mostRated_result.data[i].firstName} ${mostRated_result.data[i].lastName}</p>
                                    <p class="username author" >${mostRated_result.data[i].publisher || ''}</p>
                                    <p class="medium-desc" >${mostRated_result.data[i].description}</p>
                                    <div class="bottom-row-medium">
                                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${mostRated_result.data[i].coverImage}', '${mostRated_result.data[i].title}', '${mostRated_result.data[i].firstName}', '${mostRated_result.data[i].lastName}', '${mostRated_result.data[i].description}', '${mostRated_result.data[i].language}', '${mostRated_result.data[i].rating}', '${mostRated_result.data[i].pagesNumber}', '${mostRated_result.data[i].price}', '${mostRated_result.data[i].username}', '${mostRated_result.data[i].publisher !== undefined ? mostRated_result.data[i].publisher : null}', '${mostRated_result.data[i].id}', '${mostRated_result.data[i].saved}')">Show Details</button>
                                        <p class="category" id="s2-mediumC-category">Comedy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                } else {
                    books_side.innerHTML += `
                        <div class="container medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3" >
                                    <img class="medium-pic" src="../${mostRated_result.data[i].coverImage}.jpg">               
                                </div>
            
                                <div class="col-9 medium-right-side">
                                    
                                    <h2 class="container medium-h2">${mostRated_result.data[i].title}</h2>
                                    <p class="username author"  onclick="navigateToProfile('${mostRated_result.data[i].username}')">${mostRated_result.data[i].firstName} ${mostRated_result.data[i].lastName}</p>
                                    <p class="username author" >${mostRated_result.data[i].publisher || ''}</p>
                                    <p class="medium-desc" >${mostRated_result.data[i].description}</p>
                                    <div class="bottom-row-medium">
                                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${mostRated_result.data[i].coverImage}', '${mostRated_result.data[i].title}', '${mostRated_result.data[i].firstName}', '${mostRated_result.data[i].lastName}', '${mostRated_result.data[i].description}', '${mostRated_result.data[i].language}', '${mostRated_result.data[i].rating}', '${mostRated_result.data[i].pagesNumber}', '${mostRated_result.data[i].price}', '${mostRated_result.data[i].username}', '${mostRated_result.data[i].publisher !== undefined ? mostRated_result.data[i].publisher : null}', '${mostRated_result.data[i].id}', '${mostRated_result.data[i].saved}')">Show Details</button>
                                        <p class="category" id="s2-mediumC-category">Comedy</p>
                                    </div>
            
                                </div>
                            </div>
                        </div>
                    `;

                }
            }
        } else if (mostRated_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else if (mostRated_result.status == 500) {
            document.getElementById('500Result').hidden = false;
        } else {
            alert('Please try again later.');
            console.log("Status: " + mostRated_result.status);
            console.error("Error: " + mostRated_result.error);
        }
    }
});

// self published books
const selfBooks = document.getElementById('self-published-books-radio');
selfBooks.addEventListener('change', async function () {
    no_publisher_result.hidden = true;
    no_self_result.hidden = true;
    if (this.checked) {
        books_side.innerHTML = '';
        const self_result = await getFilteredBooks({ "categoryId": categoryId, "filter": 9 });

        if (self_result.status == 200) {
            if (self_result.data.length == 0) {
                no_self_result.hidden = false;
            } else {
                no_self_result.hidden = true;
                for (let i = 0; i <= self_result.data.length - 1; i++) {
                    if (self_result.data[i].coverImage == "Ez a kép elérési útja") {

                        books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" >
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${self_result.data[i].title}</h2>
                                            <p class="username author"  onclick="navigateToProfile('${self_result.data[i].username}')">${self_result.data[i].firstName} ${self_result.data[i].lastName}</p>
                                            <p class="medium-desc" >${self_result.data[i].description}</p>
                                            
                                            <div class="bottom-row-medium">
                                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${self_result.data[i].coverImage}', '${self_result.data[i].title}', '${self_result.data[i].firstName}', '${self_result.data[i].lastName}', '${self_result.data[i].description}', '${self_result.data[i].language}', '${self_result.data[i].rating}', '${self_result.data[i].pagesNumber}', '${self_result.data[i].price}', '${self_result.data[i].username}', 'null', '${self_result.data[i].id}', '${self_result.data[i].saved}')">Show Details</button>
                                                <p class="category" id="s2-mediumC-category">Comedy</p>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                
                            `;

                    } else {
                        books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" >
                                            <img class="medium-pic" src="../${self_result.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${self_result.data[i].title}</h2>
                                            <p class="username author"  onclick="navigateToProfile('${self_result.data[i].username}')">${self_result.data[i].firstName} ${self_result.data[i].lastName}</p>
                                            <p class="medium-desc" >${self_result.data[i].description}</p>
                                            <div class="bottom-row-medium">
                                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${self_result.data[i].coverImage}', '${self_result.data[i].title}', '${self_result.data[i].firstName}', '${self_result.data[i].lastName}', '${self_result.data[i].description}', '${self_result.data[i].language}', '${self_result.data[i].rating}', '${self_result.data[i].pagesNumber}', '${self_result.data[i].price}', '${self_result.data[i].username}', 'null', '${self_result.data[i].id}', '${self_result.data[i].saved}')">Show Details</button>
                                                <p class="category" id="s2-mediumC-category">Comedy</p>
                                            </div> 
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                    }
                }
            }

        } else if (self_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else {
            alert('Please try again later. Status: ' + self_result.status);
        }
    }
});

// published by publisher
const byPublisher = document.getElementById('published-by-publisher-books-radio');
byPublisher.addEventListener('change', async function () {
    no_publisher_result.hidden = true;
    no_self_result.hidden = true;
    if (this.checked) {
        books_side.innerHTML = '';
        const publisher_result = await getFilteredBooks({ "categoryId": categoryId, "filter": 10 });
        if (publisher_result.status == 200) {
            if (publisher_result.data.length == 0) {
                no_publisher_result.hidden = false;
            } else {
                no_publisher_result.hidden = true;
                for (let i = 0; i <= publisher_result.data.length - 1; i++) {
                    if (publisher_result.data[i].coverImage == "Ez a kép elérési útja") {

                        books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" >
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${publisher_result.data[i].title}</h2>
                                            <p class="username author" onclick="navigateToProfile('${publisher_result.data[i].username}')">${publisher_result.data[i].firstName} ${publisher_result.data[i].lastName}</p>
                                            <p class="username author">${publisher_result.data[i].publisher}</p>
                                            <p class="medium-desc">${publisher_result.data[i].description}</p>
                                            
                                            <div class="bottom-row-medium">
                                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${publisher_result.data[i].coverImage}', '${publisher_result.data[i].title}', '${publisher_result.data[i].firstName}', '${publisher_result.data[i].lastName}', '${publisher_result.data[i].description}', '${publisher_result.data[i].language}', '${publisher_result.data[i].rating}', '${publisher_result.data[i].pagesNumber}', '${publisher_result.data[i].price}', '${publisher_result.data[i].username}', '${publisher_result.data[i].publisher}', '${publisher_result.data[i].id}', '${publisher_result.data[i].saved}')">Show Details</button>
                                                <p class="category" id="s2-mediumC-category">Comedy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                
                            `;

                    } else {

                        books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3">
                                            <img class="medium-pic" src="../${publisher_result.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${publisher_result.data[i].title}</h2>
                                            <p class="username author"  onclick="navigateToProfile('${publisher_result.data[i].username}')">${publisher_result.data[i].firstName} ${publisher_result.data[i].lastName}</p>
                                            <p class="username author" >${publisher_result.data[i].publisher}</p>
                                            <p class="medium-desc" >${publisher_result.data[i].description}</p>
                                            <div class="bottom-row-medium">
                                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${publisher_result.data[i].coverImage}', '${publisher_result.data[i].title}', '${publisher_result.data[i].firstName}', '${publisher_result.data[i].lastName}', '${publisher_result.data[i].description}', '${publisher_result.data[i].language}', '${publisher_result.data[i].rating}', '${publisher_result.data[i].pagesNumber}', '${publisher_result.data[i].price}', '${publisher_result.data[i].username}', '${publisher_result.data[i].publisher}', '${publisher_result.data[i].id}', '${publisher_result.data[i].saved}')">Show Details</button>
                                                <p class="category" id="s2-mediumC-category">Comedy</p>
                                            </div>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                    }
                }
            }

        } else if (publisher_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else {
            alert('Please try again later. Status: ' + publisher_result.status);
        }
    }
})

// alphabetical
const abc_check = document.querySelectorAll('.ABC-radio');
abc_check.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        no_publisher_result.hidden = true;
        no_self_result.hidden = true;

        if (this.checked) {
            // console.log(this.id);
            books_side.innerHTML = '';

            if (this.id == 'a-z') {
                const fromA_toZ = await getFilteredBooks({ "categoryId": categoryId, "filter": 1 });

                if (fromA_toZ.status == 200) {
                    for (let i = 0; i <= fromA_toZ.data.length - 1; i++) {
                        if (fromA_toZ.data[i].coverImage == "Ez a kép elérési útja") {

                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${fromA_toZ.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${fromA_toZ.data[i].username}')">${fromA_toZ.data[i].firstName} ${fromA_toZ.data[i].lastName}</p>
                                                <p class="username author" >${fromA_toZ.data[i].publisher || ''}</p>
                                                <p class="medium-desc" >${fromA_toZ.data[i].description}</p>
                                               
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromA_toZ.data[i].coverImage}', '${fromA_toZ.data[i].title}', '${fromA_toZ.data[i].firstName}', '${fromA_toZ.data[i].lastName}', '${fromA_toZ.data[i].description}', '${fromA_toZ.data[i].language}', '${fromA_toZ.data[i].rating}', '${fromA_toZ.data[i].pagesNumber}', '${fromA_toZ.data[i].price}', '${fromA_toZ.data[i].username}', '${fromA_toZ.data[i].publisher !== undefined ? fromA_toZ.data[i].publisher : null}', '${fromA_toZ.data[i].id}', '${fromA_toZ.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>   
                                            </div>
                                        </div>
                                    </div>
                    
                             `;

                        } else {
                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../${fromA_toZ.data[i].coverImage}.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${fromA_toZ.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${fromA_toZ.data[i].username}')">${fromA_toZ.data[i].firstName} ${fromA_toZ.data[i].lastName}</p>
                                                <p class="username author" >${fromA_toZ.data[i].publisher || ''}</p>
                                                <p class="medium-desc" >${fromA_toZ.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromA_toZ.data[i].coverImage}', '${fromA_toZ.data[i].title}', '${fromA_toZ.data[i].firstName}', '${fromA_toZ.data[i].lastName}', '${fromA_toZ.data[i].description}', '${fromA_toZ.data[i].language}', '${fromA_toZ.data[i].rating}', '${fromA_toZ.data[i].pagesNumber}', '${fromA_toZ.data[i].price}', '${fromA_toZ.data[i].username}', '${fromA_toZ.data[i].publisher !== undefined ? fromA_toZ.data[i].publisher : null}', '${fromA_toZ.data[i].id}', '${fromA_toZ.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>  
                    
                                            </div>
                                        </div>
                                    </div>
                    
                             `;

                        }
                    }
                } else if (fromA_toZ.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (fromA_toZ.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                    console.log("Status: " + fromA_toZ.status);
                    console.error("Error: " + fromA_toZ.error);
                }

            } else if (this.id == 'z-a') {
                const fromZ_toA = await getFilteredBooks({ "categoryId": categoryId, "filter": 2 });

                if (fromZ_toA.status == 200) {
                    for (let i = 0; i <= fromZ_toA.data.length - 1; i++) {
                        if (fromZ_toA.data[i].coverImage == "Ez a kép elérési útja") {

                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${fromZ_toA.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${fromZ_toA.data[i].username}')">${fromZ_toA.data[i].firstName} ${fromZ_toA.data[i].lastName}</p>
                                                <p class="username author" >${fromZ_toA.data[i].publisher || ''}</p>
                                                <p class="medium-desc" >${fromZ_toA.data[i].description}</p>
                                               
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromZ_toA.data[i].coverImage}', '${fromZ_toA.data[i].title}', '${fromZ_toA.data[i].firstName}', '${fromZ_toA.data[i].lastName}', '${fromZ_toA.data[i].description}', '${fromZ_toA.data[i].language}', '${fromZ_toA.data[i].rating}', '${fromZ_toA.data[i].pagesNumber}', '${fromZ_toA.data[i].price}', '${fromZ_toA.data[i].username}', '${fromZ_toA.data[i].publisher !== undefined ? fromZ_toA.data[i].publisher : null}', '${fromZ_toA.data[i].id}', '${fromZ_toA.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                                `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3">
                                            <img class="medium-pic" src="../${fromZ_toA.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${fromZ_toA.data[i].title}</h2>
                                            <p class="username author" onclick="navigateToProfile('${fromZ_toA.data[i].username}')">${fromZ_toA.data[i].firstName} ${fromZ_toA.data[i].lastName}</p>
                                            <p class="username author" >${fromZ_toA.data[i].publisher || ''}</p>
                                            <p class="medium-desc" >${fromZ_toA.data[i].description}</p>
                                            <div class="bottom-row-medium">
                                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromZ_toA.data[i].coverImage}', '${fromZ_toA.data[i].title}', '${fromZ_toA.data[i].firstName}', '${fromZ_toA.data[i].lastName}', '${fromZ_toA.data[i].description}', '${fromZ_toA.data[i].language}', '${fromZ_toA.data[i].rating}', '${fromZ_toA.data[i].pagesNumber}', '${fromZ_toA.data[i].price}', '${fromZ_toA.data[i].username}', '${fromZ_toA.data[i].publisher !== undefined ? fromZ_toA.data[i].publisher : null}', '${fromZ_toA.data[i].id}', '${fromZ_toA.data[i].saved}')">Show Details</button>
                                                <p class="category" id="s2-mediumC-category">Comedy</p>
                                            </div>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
                    }
                } else if (fromZ_toA.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (fromZ_toA.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                    console.log("Status: " + fromZ_toA.status);
                    console.error("Error: " + fromZ_toA.error);
                }

            }
        }
    })
});

// by price
const byPrice = document.querySelectorAll('.byPrice');

byPrice.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        no_publisher_result.hidden = true;
        no_self_result.hidden = true;

        if (this.checked) {
            console.log(this.id);
            books_side.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const price_lowToHigh = await getFilteredBooks({ "categoryId": categoryId, "filter": 5 });

                if (price_lowToHigh.status == 200) {
                    for (let i = 0; i <= price_lowToHigh.data.length - 1; i++) {
                        if (price_lowToHigh.data[i].coverImage == "Ez a kép elérési útja") {

                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3" ">
                                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${price_lowToHigh.data[i].title}</h2>
                                                <p class="username author"  onclick="navigateToProfile('${price_lowToHigh.data[i].username}')">${price_lowToHigh.data[i].firstName} ${price_lowToHigh.data[i].lastName}</p>
                                                <p class="username author" >${price_lowToHigh.data[i].publisher || ''}</p>
                                                <p class="medium-desc" >${price_lowToHigh.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_lowToHigh.data[i].coverImage}', '${price_lowToHigh.data[i].title}', '${price_lowToHigh.data[i].firstName}', '${price_lowToHigh.data[i].lastName}', '${price_lowToHigh.data[i].description}', '${price_lowToHigh.data[i].language}', '${price_lowToHigh.data[i].rating}', '${price_lowToHigh.data[i].pagesNumber}', '${price_lowToHigh.data[i].price}', '${price_lowToHigh.data[i].username}', '${price_lowToHigh.data[i].publisher !== undefined ? price_lowToHigh.data[i].publisher : null}', '${price_lowToHigh.data[i].id}', '${price_lowToHigh.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                    
                            `;


                        } else {
                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3" ">
                                                <img class="medium-pic" src="../${price_lowToHigh.data[i].coverImage}.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${price_lowToHigh.data[i].title}</h2>
                                                <p class="username author"  onclick="navigateToProfile('${price_lowToHigh.data[i].username}')">${price_lowToHigh.data[i].firstName} ${price_lowToHigh.data[i].lastName}</p>
                                                <p class="username author" >${price_lowToHigh.data[i].publisher || ''}</p>
                                                <p class="medium-desc" >${price_lowToHigh.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_lowToHigh.data[i].coverImage}', '${price_lowToHigh.data[i].title}', '${price_lowToHigh.data[i].firstName}', '${price_lowToHigh.data[i].lastName}', '${price_lowToHigh.data[i].description}', '${price_lowToHigh.data[i].language}', '${price_lowToHigh.data[i].rating}', '${price_lowToHigh.data[i].pagesNumber}', '${price_lowToHigh.data[i].price}', '${price_lowToHigh.data[i].username}', '${price_lowToHigh.data[i].publisher !== undefined ? price_lowToHigh.data[i].publisher : null}', '${price_lowToHigh.data[i].id}', '${price_lowToHigh.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div> 
                    
                                            </div>
                                        </div>
                                    </div>
                    
                            `;

                        }
                    }
                } else if (price_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (price_lowToHigh.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                    console.log("Status: " + price_lowToHigh.status);
                    console.error("Error: " + price_lowToHigh.error);
                }


            } else if (this.id == 'decreasing-by-price') {
                const price_highToLow = await getFilteredBooks({ "categoryId": categoryId, "filter": 6 });

                if (price_highToLow.status == 200) {
                    for (let i = 0; i <= price_highToLow.data.length - 1; i++) {
                        if (price_highToLow.data[i].coverImage == "Ez a kép elérési útja") {

                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${price_highToLow.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${price_highToLow.data[i].username}')">${price_highToLow.data[i].firstName} ${price_highToLow.data[i].lastName}</p>
                                                <p class="username author" >${price_highToLow.data[i].publisher || ''}</p>
                                                <p class="medium-desc">${price_highToLow.data[i].description}</p>
                                                
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_highToLow.data[i].coverImage}', '${price_highToLow.data[i].title}', '${price_highToLow.data[i].firstName}', '${price_highToLow.data[i].lastName}', '${price_highToLow.data[i].description}', '${price_highToLow.data[i].language}', '${price_highToLow.data[i].rating}', '${price_highToLow.data[i].pagesNumber}', '${price_highToLow.data[i].price}', '${price_highToLow.data[i].username}', '${price_highToLow.data[i].publisher !== undefined ? price_highToLow.data[i].publisher : null}', '${price_highToLow.data[i].id}', '${price_highToLow.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                            `;

                        } else {
                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../${price_highToLow.data[i].coverImage}.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${price_highToLow.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${price_highToLow.data[i].username}')">${price_highToLow.data[i].firstName} ${price_highToLow.data[i].lastName}</p>
                                                <p class="username author" >${price_highToLow.data[i].publisher || ''}</p>
                                                <p class="medium-desc">${price_highToLow.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_highToLow.data[i].coverImage}', '${price_highToLow.data[i].title}', '${price_highToLow.data[i].firstName}', '${price_highToLow.data[i].lastName}', '${price_highToLow.data[i].description}', '${price_highToLow.data[i].language}', '${price_highToLow.data[i].rating}', '${price_highToLow.data[i].pagesNumber}', '${price_highToLow.data[i].price}', '${price_highToLow.data[i].username}', '${price_highToLow.data[i].publisher !== undefined ? price_highToLow.data[i].publisher : null}', '${price_highToLow.data[i].id}', '${price_highToLow.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                    
                                            </div>
                                        </div>
                                    </div>
                    
                            `;

                        }
                    }
                } else if (price_highToLow.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (price_highToLow.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                    console.log("Status: " + price_highToLow.status);
                    console.error("Error: " + price_highToLow.error);
                }

            }
        }
    });
});

// by date
const byDate = document.querySelectorAll('.byDate');

byDate.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        no_publisher_result.hidden = true;
        no_self_result.hidden = true;

        if (this.checked) {
            console.log(this.id);
            books_side.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const date_lowToHigh = await getFilteredBooks({ "categoryId": categoryId, "filter": 3 });

                // console.log(date_lowToHigh.status);
                if (date_lowToHigh.status == 200) {
                    for (let i = 0; i <= date_lowToHigh.data.length - 1; i++) {
                        if (date_lowToHigh.data[i].coverImage == "Ez a kép elérési útja") {

                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${date_lowToHigh.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${date_lowToHigh.data[i].username}')">${date_lowToHigh.data[i].firstName} ${date_lowToHigh.data[i].lastName}</p>
                                                <p class="username author" >${date_lowToHigh.data[i].publisher || ''}</p>
                                                <p class="medium-desc">${date_lowToHigh.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_lowToHigh.data[i].coverImage}', '${date_lowToHigh.data[i].title}', '${date_lowToHigh.data[i].firstName}', '${date_lowToHigh.data[i].lastName}', '${date_lowToHigh.data[i].description}', '${date_lowToHigh.data[i].language}', '${date_lowToHigh.data[i].rating}', '${date_lowToHigh.data[i].pagesNumber}', '${date_lowToHigh.data[i].price}', '${date_lowToHigh.data[i].username}', '${date_lowToHigh.data[i].publisher !== undefined ? date_lowToHigh.data[i].publisher : null}', '${date_lowToHigh.data[i].id}', '${date_lowToHigh.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                            `;

                        } else {
                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../${date_lowToHigh.data[i].coverImage}.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${date_lowToHigh.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${date_lowToHigh.data[i].username}')">${date_lowToHigh.data[i].firstName} ${date_lowToHigh.data[i].lastName}</p>
                                                <p class="username author" >${date_lowToHigh.data[i].publisher || ''}</p>
                                                <p class="medium-desc">${date_lowToHigh.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_lowToHigh.data[i].coverImage}', '${date_lowToHigh.data[i].title}', '${date_lowToHigh.data[i].firstName}', '${date_lowToHigh.data[i].lastName}', '${date_lowToHigh.data[i].description}', '${date_lowToHigh.data[i].language}', '${date_lowToHigh.data[i].rating}', '${date_lowToHigh.data[i].pagesNumber}', '${date_lowToHigh.data[i].price}', '${date_lowToHigh.data[i].username}', '${date_lowToHigh.data[i].publisher !== undefined ? date_lowToHigh.data[i].publisher : null}', '${date_lowToHigh.data[i].id}', '${date_lowToHigh.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                    
                                            </div>
                                        </div>
                                    </div>
                    
                            `;

                        }
                    }
                } else if (date_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (date_lowToHigh.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                    console.log("Status: " + date_lowToHigh.status);
                    console.error("Error: " + date_lowToHigh.error);
                }

            } else if (this.id == 'decreasing-by-price') {
                const date_highToLow = await getFilteredBooks({ "categoryId": categoryId, "filter": 4 });

                if (date_highToLow.status == 200) {
                    for (let i = 0; i <= date_highToLow.data.length - 1; i++) {
                        if (date_highToLow.data[i].coverImage == "Ez a kép elérési útja") {

                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${date_highToLow.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${date_highToLow.data[i].username}')">${date_highToLow.data[i].firstName} ${date_highToLow.data[i].lastName}</p>
                                                <p class="username author" >${date_highToLow.data[i].publisher || ''}</p>
                                                <p class="medium-desc">${date_highToLow.data[i].description}</p>
                                                
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_highToLow.data[i].coverImage}', '${date_highToLow.data[i].title}', '${date_highToLow.data[i].firstName}', '${date_highToLow.data[i].lastName}', '${date_highToLow.data[i].description}', '${date_highToLow.data[i].language}', '${date_highToLow.data[i].rating}', '${date_highToLow.data[i].pagesNumber}', '${date_highToLow.data[i].price}', '${date_highToLow.data[i].username}', '${date_highToLow.data[i].publisher !== undefined ? date_highToLow.data[i].publisher : null}', '${date_highToLow.data[i].id}', '${date_highToLow.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                            `;


                        } else {
                            books_side.innerHTML += `
                                    <div class="container medium-card" style="background-color: #EAD7BE;">
                                        <div class="row">
                                            <div class="col-3 my-col3">
                                                <img class="medium-pic" src="../${date_highToLow.data[i].coverImage}.jpg">
                                                
                                            </div>
                    
                                            <div class="col-9 medium-right-side">
                                            
                                                <h2 class="container medium-h2">${date_highToLow.data[i].title}</h2>
                                                <p class="username author" onclick="navigateToProfile('${date_highToLow.data[i].username}')">${date_highToLow.data[i].firstName} ${date_highToLow.data[i].lastName}</p>
                                                <p class="username author" >${date_highToLow.data[i].publisher || ''}</p>
                                                <p class="medium-desc">${date_highToLow.data[i].description}</p>
                                                <div class="bottom-row-medium">
                                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_highToLow.data[i].coverImage}', '${date_highToLow.data[i].title}', '${date_highToLow.data[i].firstName}', '${date_highToLow.data[i].lastName}', '${date_highToLow.data[i].description}', '${date_highToLow.data[i].language}', '${date_highToLow.data[i].rating}', '${date_highToLow.data[i].pagesNumber}', '${date_highToLow.data[i].price}', '${date_highToLow.data[i].username}', '${date_highToLow.data[i].publisher !== undefined ? date_highToLow.data[i].publisher : null}', '${date_highToLow.data[i].id}', '${date_highToLow.data[i].saved}')">Show Details</button>
                                                    <p class="category" id="s2-mediumC-category">Comedy</p>
                                                </div>
                    
                                            </div>
                                        </div>
                                    </div>
                    
                            `;

                        }
                    }
                } else if (date_highToLow.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (date_highToLow.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                    console.log("Status: " + date_highToLow.status);
                    console.error("Error: " + date_highToLow.error);
                }
            }
        }
    });
});

document.getElementById('clear-filter').addEventListener('click', async function () {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) {

        let categoryId = localStorage.getItem('id');
        let categoryName = localStorage.getItem('name');
        const getCategoryAgain = await getAllBooksByCategory({ "name": categoryName, "id": categoryId });

        switch (getCategoryAgain.status) {
            case 200:
                books_side.innerHTML = '';
                LoadCategoryResult(getCategoryAgain);
                break;

            case 401:
                window.location.href = '../Log-in/login.html';
                break;

            case 404:
                window.location.href = '../404/404.html';
                break;
            default:
                alert('Something went wrong. Please try again later!');
                console.log('Status: ' + getCategoryAgain.status);
                console.log('Error: ' + getCategoryAgain.error);
                break;
        }

    } else if (urlParams.has('search')) {
        books_side.innerHTML = '';
        LoadSearchResult()
    }
});
