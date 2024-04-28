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
const publish_btn = document.getElementById('m-footer-publisher');
const book_price = document.getElementById('book-price');
const read_btn = document.getElementById('read-general-btn');
const save_btn = document.getElementById('save-btn');

let isPurchased = false;

window.addEventListener('beforeunload', async function () {
    const tokenResponseBefore = await token();
    if (tokenResponseBefore.status === 401) {
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
            break;
        case 302:
            
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');

            const radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radioButton => {
                radioButton.checked = false;
            });

            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture" class="rounded-circle"></img>`;

            document.getElementById('profile-link').addEventListener('click', (e) => {
                navigateToProfile(tokenResponse.data.username);
            });

            const HomePage = document.getElementById('HomePage');

            if (tokenResponse.data.rank == "publisher") {
                shopping_btn.style.display = "none";
                publish_btn.hidden = false;
                book_price.style.display = "none";
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

                        LoadBooks(savedBookResponse, false);

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


purchased_books.addEventListener('click', async function (event) {
    event.preventDefault();
    isPurchased = true;
    document.getElementById('left-side-content').hidden = true;
    document.getElementById('left-side').style.backgroundColor = "rgb(247, 245, 236)";
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    purchased_books.classList.remove("disabled-btn");
    purchased_books.classList.add("active-btn");

    saved_books.classList.remove("active-btn");
    saved_books.classList.add("disabled-btn");

    book_list.innerHTML = "";


    const purchasedResult = await getPayedBooksByUserId();

    switch (purchasedResult.status) {
        case 200:
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
            break;

        case 401:
            window.location.href = '../Log-in/login.html';
            break;

        case 403:
            alert('403: Purchased books are only available for general users. You cannot buy books.');
            break;

        default:
            alert('Something went wrong. Please try it again later.');
            break;

    }
});

saved_books.addEventListener('click', async function (event) {
    event.preventDefault();
    isPurchased = false;
    document.getElementById('left-side-content').hidden = false;
    document.getElementById('left-side').style.backgroundColor = "#F5EADC";
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
                book_list.innerHTML = `
                    <div id="zero-saved" class="text-center" >
                        <p id="missing-saved" class="missing-data-text text-center">You haven't saved any books yet.</p>
                        <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                    </div>
                `;

            } else if (savedResult.data.length == 1) {
                const radioButtons = document.querySelectorAll('input[type="radio"]');
                radioButtons.forEach(radioButton => {
                    radioButton.disabled = true;
                });
                LoadBooks(savedResult, false);
            } else {
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
        const bookData = response.data[i];

        const div = document.createElement('div');
        div.className = 'medium-card';
        div.style.backgroundColor = '#EAD7BE';
        div.innerHTML = `
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
                        <p class="category">${bookData.category}</p>
                    </div>
                </div>
            </div>
        `;

        div.querySelector('.moreBtn-medium').addEventListener('click', function() {
            loadModalData(bookData.coverImage, bookData.title, bookData.firstName, bookData.lastName, bookData.description, bookData.language, bookData.rating, bookData.pagesNumber, bookData.price, bookData.username, bookData.publisher !== undefined ? bookData.publisher : null, isPurchased, bookData.id, isPurchased ? false : true, bookData.publisherUsername !== undefined ? bookData.publisherUsername : null);
        });

        book_list.appendChild(div);
    }
}

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

let savedBoolean;
let bookId;
let saveClick = false;

function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username, publisher, isPurchased, bookIdString, isSaved, publisherUsername) {
    bookId = parseInt(bookIdString);
    console.log(bookId);

    book_modal_img.src = `../${url}.jpg`;

    if (publisher === null || publisher === "null") {
        book_modal_publisher.hidden = true;
    } else {
        book_modal_publisher.innerText = `${publisher}`;
        book_modal_publisher.addEventListener('click', (e)=>{
            navigateToProfile(publisherUsername);
        })
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
    }

    book_modal_author.addEventListener('click', (e) => {
        navigateToProfile(username);
    })

    if (isPurchased == true || isPurchased == "true") {
        read_btn.hidden = false;
        shopping_btn.hidden = true;
        book_price.style.display = "none";
        save_btn.hidden = true;
    } else {
        read_btn.hidden = true;
        shopping_btn.hidden = false;
        book_price.hidden = false;
        save_btn.hidden = false;
    }

}

save_btn.addEventListener('click', (e) => {

    UnsavingBook(bookId);
    savedBoolean = "false";
    saveClick = true;

});

async function UnsavingBook(bookId) {

    const unsavingResult = await deleteSavedBook({ "id": bookId });
    switch (unsavingResult.status) {
        case 200:
            saveClick = true;
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

document.getElementById('bookPopup').addEventListener('hidden.bs.modal', (e) => {
    if (saveClick == true) {
        location.reload();
    }
});

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

    } 
});

// top rated
const topRated = document.getElementById('top-rated-books-radio');
topRated.addEventListener('change', async function () {
    if (this.checked && !isPurchased) {
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
        }
    } 
});

const selfBooks = document.getElementById('self-published-books-radio');
selfBooks.addEventListener('change', async function () {
    if (this.checked && !isPurchased) {
        book_list.innerHTML = '';
        const self_result = await getFilteredSavedBooks({ "filter": 9 });

        if (self_result.status == 200) {
            if (self_result.data.length == 0) {
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
    } 
})

const abc_check = document.querySelectorAll('.ABC-radio');

abc_check.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked && isPurchased == false) {
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
        } 
    })
});

const byPrice = document.querySelectorAll('.byPrice');

byPrice.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked && isPurchased == false) {
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
        } 
    });
});

const byDate = document.querySelectorAll('.byDate');

byDate.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked && isPurchased == false) {
            book_list.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const date_lowToHigh = await getFilteredSavedBooks({ "filter": 3 });

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
        } 
    });
});

document.getElementById('clear-filter').addEventListener('click', async function () {


    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });

    if (isPurchased == true) {


        const getPaidAgain = await getPayedBooksByUserId();
        switch (getPaidAgain.status) {
            case 200:
                if (getPaidAgain.data.length == 0) {
                    book_list.innerHTML = `
                        <div id="zero-purchased" class="text-center">
                            <p id="missing-purchased" class="missing-data-text text-center">You haven't bought any books yet.</p>
                            <button class="btn clear-filter rounded-5" id="go-to-explore" onclick="window.location.href='../Explore/explore.html'">Let's Explore</button>
                        </div>
                    `;

                } else if (getPaidAgain.data.length == 1) {
                    const radioButtons = document.querySelectorAll('input[type="radio"]');
                    radioButtons.forEach(radioButton => {
                        radioButton.disabled = true;
                    });

                    LoadBooks(getPaidAgain, true);

                } else {
                    const radioButtons = document.querySelectorAll('input[type="radio"]');
                    radioButtons.forEach(radioButton => {
                        radioButton.disabled = false;
                    });
                    LoadBooks(getPaidAgain, true);
                }
                break;

            case 401:
                window.location.href = '../Log-in/login.html';
                break;

            case 403:
                alert('403: Purchased books are only available for general users. You cannot buy books.');
                break;

            default:
                alert('Something went wrong. Please try it again later.');
                break;
        }

    } else {

        const getSavedAgain = await getSavedBooksByUserId();
        switch (getSavedAgain.status) {
            case 200:
                if (getSavedAgain.data.length == 0) {
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
                } else if (getSavedAgain.data.length == 1) {

                    const radioButtons = document.querySelectorAll('input[type="radio"]');
                    radioButtons.forEach(radioButton => {
                        radioButton.disabled = true;
                    });

                    LoadBooks(getSavedAgain, false);

                } else {
                    missing_saved.hidden = true;
                    LoadBooks(getSavedAgain, false);
                }
                break;

            case 401:
                window.location.href = '../Log-in/login.html';
                break;
            default:
                alert("Something went wrong, please try it later. Status: " + getSavedAgain.status);
                break;
        }

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