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
const publish_btn = document.getElementById('m-footer-publisher');
const book_price = document.getElementById('book-price');
const read_general_btn = document.getElementById('read-general-btn');

var categoryId;
var own_username;
var isPublisher;

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
    switch (tokenResponse.status) {
        case 401:
            window.location.href = "../Log-in/login.html";
            break;
        case 422:
            alert("422 - Something went wrong");
            break;
        case 302:
            localStorage.removeItem("username");
            localStorage.removeItem('Error Code:');
            own_username = tokenResponse.data.username;

            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture" class="rounded-circle"></img>`;

            document.getElementById('profile-link').addEventListener('click', (e) => {
                navigateToProfile(tokenResponse.data.username);
            });

            const HomePage = document.getElementById('HomePage');

            if (tokenResponse.data.rank == "publisher") {
                isPublisher = true;
                document.getElementById('writingBtn').hidden = true;
                shopping_btn.style.display = 'none';
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
                isPublisher = false;
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
                        break;

                    default:
                        alert('Something went wrong. Please try again later!');
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
    if (storedSearchResult.length == 0) {
        document.getElementById('noSearchResult').hidden = false;


    } else {

        for (let i = 0; i <= storedSearchResult.length - 1; i++) {
            const bookData = storedSearchResult[i];
            console.log(bookData.publisher);

            const div = document.createElement('div');
            div.className = 'col-6';
            div.innerHTML = `
                <div class="container medium-card" style="background-color: #EAD7BE;">
                    <div class="row">
                        <div class="col-3 my-col3">
                            <img class="medium-pic" src="../${bookData.coverImage}.jpg">
                        </div>

                        <div class="col-9 medium-right-side">
                            <h2 class="container medium-h2">${bookData.title}</h2>
                            <p class="username author" onclick="navigateToProfile('${bookData.username}')">${bookData.firstName} ${bookData.lastName}</p>
                            <p class="username author" onclick="navigateToProfile('${bookData.publisherUsername}')">${bookData.publisher || ''}</p>
                            <p class="medium-desc">${bookData.description}</p>
                            <div class="bottom-row-medium">
                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup">Show Details</button>
                                <p class="category" id="s2-mediumC-category">${bookData.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            div.querySelector('.moreBtn-medium').addEventListener('click', function () {
                loadModalData(bookData.coverImage, bookData.title, bookData.firstName, bookData.lastName, bookData.description, bookData.language, bookData.rating, bookData.pagesNumber, bookData.price, bookData.username, bookData.publisher !== undefined ? bookData.publisher : null, bookData.id, bookData.saved, bookData.publisherUsername !== undefined ? bookData.publisherUsername : null, bookData.purchased);
            });

            books_side.appendChild(div);
        }
    }
}

function LoadCategoryResult(response) {
    for (let i = 0; i <= response.data.length - 1; i++) {
        const publisher = response.data[i].publisher || '';
        console.log(response.data[i].publisher);
        const div = document.createElement('div');
        div.className = 'container medium-card';
        div.style.backgroundColor = '#EAD7BE';
        div.innerHTML = `
            <div class="row">
                <div class="col-3 my-col3">
                    <img class="medium-pic" src="../${response.data[i].coverImage}.jpg">
                </div>

                <div class="col-9 medium-right-side">
                    <h2 class="container medium-h2">${response.data[i].title}</h2>
                    <p class="username author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                    <p class="username author" onclick="navigateToProfile('${response.data[i].publisherUsername}')">${publisher}</p>
                    <p class="medium-desc">${response.data[i].description}</p>
                    <div class="bottom-row-medium">
                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup">Show Details</button>
                    </div>
                </div>
            </div>
        `;

        div.querySelector('.moreBtn-medium').addEventListener('click', function () {
            loadModalData(response.data[i].coverImage, response.data[i].title, response.data[i].firstName, response.data[i].lastName, response.data[i].description, response.data[i].language, response.data[i].rating, response.data[i].pagesNumber, response.data[i].price, response.data[i].username, publisher !== undefined ? publisher : null, response.data[i].id, response.data[i].saved, response.data[i].publisherUsername !== undefined ? response.data[i].publisherUsername : null, response.data[i].purchased);
        });

        books_side.appendChild(div);
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
let bookId;
let savedBoolean;

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username, publisher, bookIdString, isSaved, publisherUsername, isPurchased) {

    bookId = parseInt(bookIdString);
    console.log(bookId);
    console.log(isPurchased);
    console.log(isSaved);

    if (own_username == username) {

        save_btn.hidden = true;
        shopping_btn.hidden = true;
    } else {
        if (isPublisher) {
            shopping_btn.hidden = true;
        } else {
            if (isPurchased == true) {
                save_btn.hidden = true;
                shopping_btn.hidden = true;
                read_general_btn.hidden = false;
            } else {
                read_general_btn.hidden = true;
                save_btn.hidden = false;
                shopping_btn.hidden = false;
            }
        }
    }

    book_modal_img.src = `../${url}.jpg`;

    if (publisher != null) {
        book_modal_publisher.innerText = `${publisher}`;
        book_modal_publisher.addEventListener('click', (e) => {
            navigateToProfile(publisherUsername);
        });
    } else {
        book_modal_publisher.innerText = "";
    }

    book_modal_title.innerText = `${title}`;
    book_modal_author.innerText = `${firstName} ${lastName}`;
    book_modal_pages.innerText = `${pages}`;
    if (rating != undefined) {
        book_modal_ranking.innerText = `${rating}`;
    } else {
        book_modal_ranking.innerText = "-";
    }

    book_modal_language.innerText = `${language}`;
    book_modal_desc.innerText = `${description}`;
    if (price != undefined) {
        book_price.innerText = `${price} Ft`;
    } else {
        book_price.innerText = `- Ft`;
    }

    book_modal_author.addEventListener('click', (e) => {
        navigateToProfile(username);
    })

    if (isSaved == "true" || isSaved == true) {

        save_btn.innerHTML = "";
        save_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            </svg>
        `;

        savedBoolean = true;

    } else {

        save_btn.innerHTML = "";
        save_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-bookmark" viewBox="0 0 16 16" id="bookmark">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
            </svg>
        `;

        savedBoolean = false;
    }

}

document.getElementById('shopping-cart').addEventListener('click', (e) => {
    window.location.href = `../BookShopping/bookshopping.php?id=${bookId}`;
});

document.getElementById('read-general-btn').addEventListener('click', (e) => {
    window.location.href = `../FileViewer/fileViewer.html?id=${bookId}`;
});

document.getElementById('read-publish-btn').addEventListener('click', (e)=>{
    window.location.href = `../FileViewer/fileViewer.html?id=${bookId}`;
});

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
                break;
            default:
                alert('Something went wrong. Please try again later!');
                break;
        }
        saveClick = true;
    } catch (error) {
        alert('Something went wrong. Please try again later!');
    }
}

async function UnsavingBook(bookId) {
    try {
        const unsavingResult = await deleteSavedBook({ "id": bookId });
        switch (unsavingResult.status) {
            case 200:
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
        saveClick = true; // Itt állítsd be a saveClick-et, miután a művelet befejeződött
    } catch (error) {
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
            LoadCategoryResult(mostSaved_result);
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
        books_side.innerHTML = '';
        const mostRated_result = await getFilteredBooks({ "categoryId": categoryId, "filter": 8 });
        if (mostRated_result.status == 200) {
            LoadCategoryResult(mostRated_result)
        } else if (mostRated_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else if (mostRated_result.status == 500) {
            document.getElementById('500Result').hidden = false;
        } else {
            alert('Please try again later.');
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
                LoadCategoryResult(self_result);
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
                LoadCategoryResult(publisher_result);
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
            books_side.innerHTML = '';

            if (this.id == 'a-z') {
                const fromA_toZ = await getFilteredBooks({ "categoryId": categoryId, "filter": 1 });

                if (fromA_toZ.status == 200) {
                    LoadCategoryResult(fromA_toZ);
                } else if (fromA_toZ.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (fromA_toZ.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                }

            } else if (this.id == 'z-a') {
                const fromZ_toA = await getFilteredBooks({ "categoryId": categoryId, "filter": 2 });

                if (fromZ_toA.status == 200) {
                    LoadCategoryResult(fromZ_toA);
                } else if (fromZ_toA.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (fromZ_toA.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
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
            books_side.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const price_lowToHigh = await getFilteredBooks({ "categoryId": categoryId, "filter": 5 });

                if (price_lowToHigh.status == 200) {
                    LoadCategoryResult(price_lowToHigh);
                } else if (price_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (price_lowToHigh.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                }


            } else if (this.id == 'decreasing-by-price') {
                const price_highToLow = await getFilteredBooks({ "categoryId": categoryId, "filter": 6 });

                if (price_highToLow.status == 200) {
                    LoadCategoryResult(price_highToLow);
                } else if (price_highToLow.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (price_highToLow.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
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
            books_side.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const date_lowToHigh = await getFilteredBooks({ "categoryId": categoryId, "filter": 3 });

                if (date_lowToHigh.status == 200) {
                    LoadCategoryResult(date_lowToHigh);
                } else if (date_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (date_lowToHigh.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
                }

            } else if (this.id == 'decreasing-by-price') {
                const date_highToLow = await getFilteredBooks({ "categoryId": categoryId, "filter": 4 });

                if (date_highToLow.status == 200) {
                    LoadCategoryResult(date_highToLow);
                } else if (date_highToLow.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else if (date_highToLow.status == 500) {
                    document.getElementById('500Result').hidden = false;
                } else {
                    alert('Please try again later.');
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
                break;
        }

    } else if (urlParams.has('search')) {
        books_side.innerHTML = '';
        LoadSearchResult()
    }
});

// publishing modal
const publisher_price = document.getElementById('publisher-price');
const PriceErr = document.getElementById('PriceErr');
const bankNumber = document.getElementById('bankNumber');
const bankErr = document.getElementById('bankErr');

const cancelPublish = document.getElementById('cancelPublish');
const agreePublish = document.getElementById('agreePublish');

var pricePass = false;
var bankPass = false;

var priceValue;

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
        pricePass = true;
        priceValue = publisher_price.value;
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

agreePublish.addEventListener('click', async function () {

    if (bankPass == true && pricePass == true) {
        console.log(bookId);
        const publish_result = await publishBook({ "id": bookId, "price": priceValue, "publisherBankAccountNumber": bankNumber.value });

        switch (publish_result.status) {
            case 200:
                alert("You have successfully published this book! You can check it on your profile!");
                location.reload();
                break;

            case 401:
                window.location.href = '../Log-in/login.html';
                break;

            case 403:
                Window.location.href = '../General-HomePage/GenHome.html';
                break;

            case 422:
                alert("Something went wrong. Please try again later.");
                break;

            default:
                alert("Something went wrong. Please try again later.");
                console.log(publish_result.status);
                console.log(publish_result.data);
                console.log(publish_result.error);
                break;
        }

    } else {
        alert("Please make sure you fill in every field correctly.");
    }
});
