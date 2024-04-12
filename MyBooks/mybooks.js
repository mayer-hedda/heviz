const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');

const SavedBooks = document.getElementById('SavedBooks');

const c_name = document.getElementById('category-name');
const current_page = document.getElementById('current-page');
const books_side = document.getElementById('loaded-books');

const book_list = document.getElementById('loaded-books');

const missing_saved = document.getElementById('zero-saved');
const missing_publisher_saved = document.getElementById('missing-publisher-saved');
const missing_self_saved = document.getElementById('missing-self-saved');

const missing_purchased = document.getElementById('zero-purchased');
const missing_self_purchased = document.getElementById('missing-self-purchased');
const missing_publisher_purchased = document.getElementById('missing-publisher-purchased');

//Modal btn-s
const shopping_btn = document.getElementById('shopping-cart');
const publish_btn = document.getElementById('publish-btn');
const book_price = document.getElementById('book-price');
const read_btn = document.getElementById('read-btn');

// Ellenőrizzük, hogy van-e a felhasználónak tokenje, ha nem akkor átirányítjuk a login felületre
window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
    var tokenResponse = await token();
    switch (tokenResponse.status) {
        case 401:
            window.location.href = "../Log-in/login.html";
            break;
        case 422:
            alert("422 - Something went wrong");
            console.error("Error: " + responseUser);
            break;
        case 302:
            // delete errors and search results from local storage
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');
            // localStorage.removeItem('categoryResult');

            // minden radio btn kicsekkolása az oldal betöltésekor
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radioButton => {
                radioButton.checked = false;
            });

            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;

            document.getElementById('profile-link').addEventListener('click', (e) => {
                window.location.href = `../Profile/profile.html?username=${tokenResponse.data.username}`;
            });

            const HomePage = document.getElementById('HomePage');

            if (tokenResponse.data.rank == "publisher") {
                shopping_btn.hidden = true;
                publish_btn.hidden = false;
                book_price.hidden = true;
                read_btn.hidden = true;
                document.getElementById('writingBtn').hidden = true;
                SavedBooks.textContent = "Saved Books"

                HomePage.addEventListener('click', (e) => {
                    window.location.href = '../Publisher-Home/PubHome.html';
                });

                document.getElementById('pb-header').hidden = true;

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

            } else if (tokenResponse.data.rank == "general") {
                shopping_btn.hidden = false;
                publish_btn.hidden = true;
                book_price.hidden = false;
                read_btn.hidden = true;

                SavedBooks.textContent = "My Books";

                HomePage.addEventListener('click', (e) => {
                    window.location.href = '../General-HomePage/GenHome.html';
                });
            }

            const savedBookResponse = await getSavedBooksByUserId();
            console.log(savedBookResponse.data);
            switch (savedBookResponse.status) {
                case 200:
                    if (savedBookResponse.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-saved" class="text-center" >
                                <p id="missing-saved" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;

                        const radioButtons = document.querySelectorAll('input[type="radio"]');
                        radioButtons.forEach(radioButton => {
                            radioButton.disabled = true;
                        });
                    } else if (savedBookResponse.data.length == 1) {

                        const radioButtons = document.querySelectorAll('input[type="radio"]');
                        radioButtons.forEach(radioButton => {
                            radioButton.disabled = true;
                        });

                    } else {
                        missing_saved.hidden = true;
                        LoadBooks(savedBookResponse, false);
                    }
                    break;
                case 401:
                    window.location.href = '../Log-in/login.html';
                    break;
                default:
                    alert("Something went wrong, please try it later. Status: " + savedBookResponse.status);
                    break;
            }


            break;

        default:
            window.location.href = '../404/404.html';
            break;
    }
}

const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    window.location.assign('../Landing-Page/landing.html');
    localStorage.removeItem("Token");
})

const purchased_books = document.getElementById('purchased-books');
const saved_books = document.getElementById('saved-books');
let isPurchased = false;

purchased_books.addEventListener('click', async function (event) {
    event.preventDefault();
    isPurchased = true;
    // minden radio btn kicsekkolása az oldal betöltésekor
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    purchased_books.classList.remove("disabled-btn");
    purchased_books.classList.add("active-btn");

    saved_books.classList.remove("active-btn");
    saved_books.classList.add("disabled-btn");

    book_list.innerHTML = "";

    // ITT KELL MAJD MEGHÍVNI A MEGVETT KÖNYVEK ENDPOINTOT --> írd át const-ra
    const purchasedResult = await getPayedBooksByUserId();
    console.log(purchasedResult.data);
    // Hiba kezelés

    if (purchasedResult.data.length == 0) {
        book_list.innerHTML = `
            <div id="zero-purchased" class="text-center">
                <p id="missing-purchased" class="missing-data-text text-center">You haven't bought any books yet.</p>
                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
            </div>
        `;

    } else if (purchasedResult.data.length == 1) {
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radioButton => {
            radioButton.disabled = true;
        });

        LoadBooks(purchasedResult, true);

    } else {
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radioButton => {
            radioButton.disabled = false;
        });
        LoadBooks(purchasedResult, true);
    }

});

saved_books.addEventListener('click', async function (event) {
    event.preventDefault();
    isPurchased = false;
    // minden radio btn kicsekkolása az oldal betöltésekor
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    saved_books.classList.remove("disabled-btn");
    saved_books.classList.add("active-btn");

    purchased_books.classList.remove("active-btn");
    purchased_books.classList.add("disabled-btn");

    book_list.innerHTML = "";

    const savedResult = await getSavedBooksByUserId();
    switch (savedResult.status) {
        case 200:
            if (savedResult.data.length == 0) {
                console.log(savedResult.data.length);
                book_list.innerHTML = `
                    <div id="zero-saved" class="text-center" >
                        <p id="missing-saved" class="missing-data-text text-center">You haven't saved any books yet.</p>
                        <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                    </div>
                `;

            } else if(savedResult.data.length == 1){
                const radioButtons = document.querySelectorAll('input[type="radio"]');
                radioButtons.forEach(radioButton => {
                    radioButton.disabled = true;
                });
                LoadBooks(savedResult, false);
            }else {
                const radioButtons = document.querySelectorAll('input[type="radio"]');
                radioButtons.forEach(radioButton => {
                    radioButton.disabled = false;
                });
                LoadBooks(savedResult, false);
            }
            break;
        case 401:
            window.location.href = '../Log-in/login.html';
            break;
        default:
            alert("Something went wrong. Please try again later. Status: " + savedResult.status);
            break;
    }


});

function LoadBooks(response, isPurchased) {
    book_list.innerHTML = "";

    for (let i = 0; i <= response.data.length - 1; i++) {
        if (response.data[i].coverImage == "Ez a kép elérési útja") {

            book_list.innerHTML += `
                        <div class="medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                    <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                </div>
                
                                <div class="col-9 medium-right-side">
                                    <h2 class="container medium-h2">${response.data[i].title}</h2>
                                    <p class="username author">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                    <p class="username author" >${response.data[i].publisher || ''}</p>
                                    <p class="medium-desc">${response.data[i].description}</p>
                                    <div class="bottom-row-medium">
                                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}', ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${isPurchased}')">Show Details</button>
                                        <p class="category" id="s2-mediumC-category">Comedy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;

        } else {
            console.log(response.data[i].username);
            book_list.innerHTML += `
                        <div class="medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                    <img class="medium-pic" src="../${response.data[i].coverImage}.jpg">
                                </div>
                
                                <div class="col-9 medium-right-side">
                                    <h2 class="container medium-h2">${response.data[i].title}</h2>
                                    <p class="username author" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                    <p class="username author" >${response.data[i].publisher || ''}</p>
                                    <p class="medium-desc">${response.data[i].description}</p>
                                    <div class="bottom-row-medium">
                                        <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}', ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${isPurchased}')">Show Details</button>
                                        <p class="category" id="s2-mediumC-category">Comedy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
        }
    }


}

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

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username, publisher, isPurchased) {

    if (url != "Ez a kép elérési útja") {
        book_modal_img.src = `../${url}.jpg`;
    } else {
        book_modal_img.src = `../pictures/standard-book-cover.jpg`;
    }

    if (publisher === null || publisher === "null") {
        book_modal_publisher.hidden = true;
    } else {
        book_modal_publisher.innerText = `${publisher}`;
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

    if (isPurchased == true) {
        read_btn.hidden = false;
        shopping_btn.hidden = true;
        book_price.hidden = false;
    } else {
        read_btn.hidden = true;
        shopping_btn.hidden = false;
        book_price.hidden = false;
    }

}


// Filterek
// Most saved books
const mostSaved = document.getElementById('most-saved-books-radio');
mostSaved.addEventListener('change', async function () {
    if (this.checked && !isPurchased) {
        books_side.innerHTML = '';
        const mostSaved_result = await getFilteredSavedBooks({ "filter": 7 });
        if (mostSaved_result.status == 200) {

            if (mostSaved_result.data.length == 0) {
                book_list.innerHTML = `
                    <div id="zero-purchased" class="text-center">
                        <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                        <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                    </div>
                `;
            } else {
                LoadBooks(mostSaved_result, false);
            }
        } else if (mostSaved_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else {
            alert('Please try again later. Status: ' + mostSaved_result.status);
        }

    } else if (this.checked && isPurchased == true) {
        console.log("Itt fogjuk sorba rendezni a megvett könyveket");
    }
});

// top rated
const topRated = document.getElementById('top-rated-books-radio');
topRated.addEventListener('change', async function () {
    if (this.checked && !isPurchased) {
        // console.log(this.id);
        books_side.innerHTML = '';
        const mostRated_result = await getFilteredSavedBooks({ "filter": 8 });
        if (mostRated_result.status == 200) {
            if (mostRated_result.data.length == 0) {
                book_list.innerHTML = `
                    <div id="zero-purchased" class="text-center">
                        <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                        <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                    </div>
                `;
            } else {
                LoadBooks(mostRated_result, false)
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
    } else if (this.checked && isPurchased == true) {
        console.log("Itt fogjuk sorba rendezni a megvett könyveket");
    }
});

const selfBooks = document.getElementById('self-published-books-radio');
selfBooks.addEventListener('change', async function () {
    if (this.checked && !isPurchased) {
        book_list.innerHTML = '';
        const self_result = await getFilteredSavedBooks({ "filter": 9 });

        if (self_result.status == 200) {
            if (self_result.data.length == 0) {
                // console.log(self_result.data.length);
                book_list.innerHTML = `
                    <div id="zero-purchased" class="text-center">
                        <p class="missing-data-text text-center">You haven't saved any self published books yet.</p>
                        <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                    </div>
                
                `;
            } else {
                LoadBooks(self_result, false)
            }

        } else if (self_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else {
            alert('Please try again later. Status: ' + self_result.status);
        }
    } else if (this.checked && isPurchased == true) {
        console.log("Itt fogjuk sorba rendezni a megvett könyveket");
    }
});


// published by publisher
const byPublisher = document.getElementById('published-by-publisher-books-radio');
byPublisher.addEventListener('change', async function () {
    book_list.innerHTML = "";
    if (this.checked && !isPurchased) {
        const publisher_result = await getFilteredSavedBooks({ "filter": 10 });

        if (publisher_result.status == 200) {
            if (publisher_result.data.length == 0) {
                book_list.innerHTML = `
                    <div id="zero-purchased" class="text-center">
                        <p id="missing-publisher-saved" class="missing-data-text text-center">You haven't yet saved any books published by a publisher.</p>
                        <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                    </div>
                `;

            } else {
                LoadBooks(publisher_result, false)
            }


        } else if (publisher_result.status == 401) {
            window.location.href = '../Log-in/login.html';
        } else {
            alert('Please try again later. Status: ' + publisher_result.status);
        }
    } else if (this.checked && isPurchased == true) {
        console.log("Itt fogjuk sorba rendezni a megvett könyveket");
    }
})

const abc_check = document.querySelectorAll('.ABC-radio');

abc_check.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked && isPurchased == false) {
            console.log(this.id);
            book_list.innerHTML = '';

            if (this.id == 'a-z') {
                const fromA_toZ = await getFilteredSavedBooks({ "filter": 1 });

                if (fromA_toZ.status == 200) {
                    if (fromA_toZ.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-purchased" class="text-center">
                                <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;
                    } else {
                        LoadBooks(fromA_toZ, false);
                    }

                } else if (fromA_toZ.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + fromA_toZ.status);
                }

            } else if (this.id == 'z-a') {
                const fromZ_toA = await getFilteredSavedBooks({ "filter": 2 });

                if (fromZ_toA.status == 200) {
                    if (fromZ_toA.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-purchased" class="text-center">
                                <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;
                    } else {
                        LoadBooks(fromZ_toA, false);
                    }


                } else if (fromZ_toA.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + fromZ_toA.status);
                }

            }
        } else if (this.checked && isPurchased == true) {
            console.log("Itt fogjuk sorba rendezni a megvett könyveket");
        }
    })
});

const byPrice = document.querySelectorAll('.byPrice');

byPrice.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked && isPurchased == false) {
            console.log(this.id);
            book_list.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const price_lowToHigh = await getFilteredSavedBooks({ "filter": 5 });

                if (price_lowToHigh.status == 200) {
                    if (price_lowToHigh.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-purchased" class="text-center">
                                <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;
                    } else {
                        LoadBooks(price_lowToHigh, false);
                    }

                } else if (price_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + price_lowToHigh.status);
                }


            } else if (this.id == 'decreasing-by-price') {
                const price_highToLow = await getFilteredSavedBooks({ "filter": 6 });

                if (price_highToLow.status == 200) {
                    if (price_highToLow.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-purchased" class="text-center">
                                <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;
                    } else {
                        LoadBooks(price_highToLow, false);
                    }

                } else if (price_highToLow.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + price_highToLow.status);
                }

            }
        } else if (this.checked && isPurchased == true) {
            console.log("Itt fogjuk sorba rendezni a megvett könyveket");
        }
    });
});

const byDate = document.querySelectorAll('.byDate');

byDate.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked && isPurchased == false) {
            console.log(this.id);
            book_list.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const date_lowToHigh = await getFilteredSavedBooks({ "filter": 3 });

                // console.log(date_lowToHigh.status);
                if (date_lowToHigh.status == 200) {
                    if (date_lowToHigh.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-purchased" class="text-center">
                                <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;
                    } else {
                        LoadBooks(date_lowToHigh, false);
                    }
                } else if (date_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + date_lowToHigh.status);
                }

            } else if (this.id == 'decreasing-by-price') {
                const date_highToLow = await getFilteredSavedBooks({ "filter": 4 });

                if (date_highToLow.status == 200) {
                    if (date_highToLow.data.length == 0) {
                        book_list.innerHTML = `
                            <div id="zero-purchased" class="text-center">
                                <p id="missing-purchased" class="missing-data-text text-center">You haven't saved any books yet.</p>
                                <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                            </div>
                        `;
                    } else {
                        LoadBooks(date_highToLow, false);
                    }
                } else if (date_highToLow.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + date_highToLow.status);
                }
            }
        } else if (this.checked && isPurchased == true) {
            console.log("Itt fogjuk sorba rendezni a megvett könyveket");
        }
    });
});

document.getElementById('clear-filter').addEventListener('click', async function () {
    //    window.location.reload();

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach(checkBox => {
        checkBox.checked = false;
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) {

        var categoryId = urlParams.get('id');
        const getCategoryAgain = await getAllBooksByCategory({ "id": categoryId });

        books_side.innerHTML = '';
        LoadCategoryResult(getCategoryAgain);
    } else if (urlParams.has('search')) {
        books_side.innerHTML = '';
        LoadSearchResult()
    }
});