const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');

const SavedBooks = document.getElementById('SavedBooks');

const c_name = document.getElementById('category-name');
const current_page = document.getElementById('current-page');
const books_side = document.getElementById('right-side');

const no_category_result = document.getElementById('noCategoryResult');

const book_list = document.getElementById('book-list');
const missing_saved = document.getElementById('zero-saved');
const missing_purchased = document.getElementById('zero-purchased');


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
                        missing_saved.hidden = false;
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
        missing_purchased.hidden = false;
    } else {
        missing_purchased.hidden = true;
        LoadBooks(purchasedResult, true);
    }

});

saved_books.addEventListener('click', async function (event) {
    event.preventDefault();

    saved_books.classList.remove("disabled-btn");
    saved_books.classList.add("active-btn");

    purchased_books.classList.remove("active-btn");
    purchased_books.classList.add("disabled-btn");

    book_list.innerHTML = "";

    const savedResult = await getSavedBooksByUserId();
    switch (savedResult.status) {
        case 200:
            if (savedResult.data.length == 0) {
                missing_saved.hidden = false;
            } else {
                missing_saved.hidden = true;
                LoadBooks(savedResult, false);
            }
            break;
        case 401:
            window.location.href = '../Log-in/login.html';
            break;
        default:
            alert("Something went wrong. Please try again later. Status: " + savedResult.status);
    }


});

function LoadBooks(response, isPurchased) {
    if (response.data.length == 0) {
        if (isPurchased == true) {
            missing_saved.hidden = true;
            missing_purchased.hidden = false;
        } else if (isPurchased == false) {
            missing_saved.hidden = false;
            missing_purchased.hidden = true;
        }
    } else {
        missing_saved.hidden = true;
        missing_purchased.hidden = true;

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
                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}', ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${isPurchased}')">Show Details</button>
                                </div>
                            </div>
                        </div>
                `;

            } else {
                book_list.innerHTML += `
                        <div class="medium-card" style="background-color: #EAD7BE;">
                            <div class="row">
                                <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                    <img class="medium-pic" src="../${response.data[i].coverImage}.jpg">
                                </div>
                
                                <div class="col-9 medium-right-side">
                                    <h2 class="container medium-h2">${response.data[i].title}</h2>
                                    <p class="username author">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                    <p class="username author" >${response.data[i].publisher || ''}</p>
                                    <p class="medium-desc">${response.data[i].description}</p>
                                    <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}', ${response.data[i].publisher !== undefined ? `'${response.data[i].publisher}'` : null}, '${isPurchased}')">Show Details</button>
                                </div>
                            </div>
                        </div>
                `;
            }
        }
    }

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

    if (publisher != null) {
        book_modal_publisher.innerText = `${publisher}`;
    }else{
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

    if (isPurchased == true) {
        read_btn.hidden = false;
        shopping_btn.hidden = true;
        book_price.hidden = false;
    }else{
        read_btn.hidden = true;
        shopping_btn.hidden = false;
        book_price.hidden = false;
    }

}

// Filterek

const abc_check = document.querySelectorAll('.ABC-radio');

abc_check.forEach(function (radioButton) {
    radioButton.addEventListener('change', async function () {
        if (this.checked) {
            console.log(this.id);
            books_side.innerHTML = '';

            if (this.id == 'a-z') {
                const fromA_toZ = await getFilteredBooks({ "filter": 1 });

                if (fromA_toZ.status == 200) {
                    for (let i = 0; i <= fromA_toZ.data.length - 1; i++) {
                        if (fromA_toZ.data[i].coverImage == "Ez a kép elérési útja") {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${fromA_toZ.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${fromA_toZ.data[i].username}')">${fromA_toZ.data[i].firstName} ${fromA_toZ.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${fromA_toZ.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromA_toZ.data[i].coverImage}', '${fromA_toZ.data[i].title}', '${fromA_toZ.data[i].firstName}', '${fromA_toZ.data[i].lastName}', '${fromA_toZ.data[i].description}', '${fromA_toZ.data[i].language}', '${fromA_toZ.data[i].rating}', '${fromA_toZ.data[i].pagesNumber}', '${fromA_toZ.data[i].price}', '${fromA_toZ.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../${fromA_toZ.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${fromA_toZ.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${fromA_toZ.data[i].username}')">${fromA_toZ.data[i].firstName} ${fromA_toZ.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${fromA_toZ.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromA_toZ.data[i].coverImage}', '${fromA_toZ.data[i].title}', '${fromA_toZ.data[i].firstName}', '${fromA_toZ.data[i].lastName}', '${fromA_toZ.data[i].description}', '${fromA_toZ.data[i].language}', '${fromA_toZ.data[i].rating}', '${fromA_toZ.data[i].pagesNumber}', '${fromA_toZ.data[i].price}', '${fromA_toZ.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
                    }
                } else if (fromA_toZ.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + fromA_toZ.status);
                }

            } else if (this.id == 'z-a') {
                const fromZ_toA = await getFilteredBooks({ "filter": 2 });

                if (fromZ_toA.status == 200) {
                    for (let i = 0; i <= fromZ_toA.data.length - 1; i++) {
                        if (fromZ_toA.data[i].coverImage == "Ez a kép elérési útja") {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${fromZ_toA.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${fromZ_toA.data[i].username}')">${fromZ_toA.data[i].firstName} ${fromZ_toA.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${fromZ_toA.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromZ_toA.data[i].coverImage}', '${fromZ_toA.data[i].title}', '${fromZ_toA.data[i].firstName}', '${fromZ_toA.data[i].lastName}', '${fromZ_toA.data[i].description}', '${fromZ_toA.data[i].language}', '${fromZ_toA.data[i].rating}', '${fromZ_toA.data[i].pagesNumber}', '${fromZ_toA.data[i].price}', '${fromZ_toA.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../${fromZ_toA.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${fromZ_toA.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${fromZ_toA.data[i].username}')">${fromZ_toA.data[i].firstName} ${fromZ_toA.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${fromZ_toA.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${fromZ_toA.data[i].coverImage}', '${fromZ_toA.data[i].title}', '${fromZ_toA.data[i].firstName}', '${fromZ_toA.data[i].lastName}', '${fromZ_toA.data[i].description}', '${fromZ_toA.data[i].language}', '${fromZ_toA.data[i].rating}', '${fromZ_toA.data[i].pagesNumber}', '${fromZ_toA.data[i].price}', '${fromZ_toA.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
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
        if (this.checked) {
            console.log(this.id);
            books_side.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const price_lowToHigh = await getFilteredBooks({ "filter": 5 });

                if (price_lowToHigh.status == 200) {
                    for (let i = 0; i <= price_lowToHigh.data.length - 1; i++) {
                        if (price_lowToHigh.data[i].coverImage == "Ez a kép elérési útja") {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${price_lowToHigh.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${price_lowToHigh.data[i].username}')">${price_lowToHigh.data[i].firstName} ${price_lowToHigh.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${price_lowToHigh.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_lowToHigh.data[i].coverImage}', '${price_lowToHigh.data[i].title}', '${price_lowToHigh.data[i].firstName}', '${price_lowToHigh.data[i].lastName}', '${price_lowToHigh.data[i].description}', '${price_lowToHigh.data[i].language}', '${price_lowToHigh.data[i].rating}', '${price_lowToHigh.data[i].pagesNumber}', '${price_lowToHigh.data[i].price}', '${price_lowToHigh.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../${price_lowToHigh.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${price_lowToHigh.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${price_lowToHigh.data[i].username}')">${price_lowToHigh.data[i].firstName} ${price_lowToHigh.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${price_lowToHigh.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_lowToHigh.data[i].coverImage}', '${price_lowToHigh.data[i].title}', '${price_lowToHigh.data[i].firstName}', '${price_lowToHigh.data[i].lastName}', '${price_lowToHigh.data[i].description}', '${price_lowToHigh.data[i].language}', '${price_lowToHigh.data[i].rating}', '${price_lowToHigh.data[i].pagesNumber}', '${price_lowToHigh.data[i].price}', '${price_lowToHigh.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
                    }
                } else if (price_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + price_lowToHigh.status);
                }


            } else if (this.id == 'decreasing-by-price') {
                const price_highToLow = await getFilteredBooks({ "filter": 6 });

                if (price_highToLow.status == 200) {
                    for (let i = 0; i <= price_highToLow.data.length - 1; i++) {
                        if (price_highToLow.data[i].coverImage == "Ez a kép elérési útja") {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${price_highToLow.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${price_highToLow.data[i].username}')">${price_highToLow.data[i].firstName} ${price_highToLow.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${price_highToLow.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_highToLow.data[i].coverImage}', '${price_highToLow.data[i].title}', '${price_highToLow.data[i].firstName}', '${price_highToLow.data[i].lastName}', '${price_highToLow.data[i].description}', '${price_highToLow.data[i].language}', '${price_highToLow.data[i].rating}', '${price_highToLow.data[i].pagesNumber}', '${price_highToLow.data[i].price}', '${price_highToLow.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../${price_highToLow.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${price_highToLow.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${price_highToLow.data[i].username}')">${price_highToLow.data[i].firstName} ${price_highToLow.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${price_highToLow.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${price_highToLow.data[i].coverImage}', '${price_highToLow.data[i].title}', '${price_highToLow.data[i].firstName}', '${price_highToLow.data[i].lastName}', '${price_highToLow.data[i].description}', '${price_highToLow.data[i].language}', '${price_highToLow.data[i].rating}', '${price_highToLow.data[i].pagesNumber}', '${price_highToLow.data[i].price}', '${price_highToLow.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
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
        if (this.checked) {
            console.log(this.id);
            books_side.innerHTML = '';

            if (this.id == 'increasing-by-price') {
                const date_lowToHigh = await getFilteredBooks({ "filter": 3 });

                // console.log(date_lowToHigh.status);
                if (date_lowToHigh.status == 200) {
                    for (let i = 0; i <= date_lowToHigh.data.length - 1; i++) {
                        if (date_lowToHigh.data[i].coverImage == "Ez a kép elérési útja") {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${date_lowToHigh.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${date_lowToHigh.data[i].username}')">${date_lowToHigh.data[i].firstName} ${date_lowToHigh.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${date_lowToHigh.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_lowToHigh.data[i].coverImage}', '${date_lowToHigh.data[i].title}', '${date_lowToHigh.data[i].firstName}', '${date_lowToHigh.data[i].lastName}', '${date_lowToHigh.data[i].description}', '${date_lowToHigh.data[i].language}', '${date_lowToHigh.data[i].rating}', '${date_lowToHigh.data[i].pagesNumber}', '${date_lowToHigh.data[i].price}', '${date_lowToHigh.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../${date_lowToHigh.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${date_lowToHigh.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${date_lowToHigh.data[i].username}')">${date_lowToHigh.data[i].firstName} ${date_lowToHigh.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${date_lowToHigh.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_lowToHigh.data[i].coverImage}', '${date_lowToHigh.data[i].title}', '${date_lowToHigh.data[i].firstName}', '${date_lowToHigh.data[i].lastName}', '${date_lowToHigh.data[i].description}', '${date_lowToHigh.data[i].language}', '${date_lowToHigh.data[i].rating}', '${date_lowToHigh.data[i].pagesNumber}', '${date_lowToHigh.data[i].price}', '${date_lowToHigh.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
                    }
                } else if (date_lowToHigh.status == 401) {
                    window.location.href = '../Log-in/login.html';
                } else {
                    alert('Please try again later. Status: ' + date_lowToHigh.status);
                }

            } else if (this.id == 'decreasing-by-price') {
                const date_highToLow = await getFilteredBooks({ "filter": 4 });

                if (date_highToLow.status == 200) {
                    for (let i = 0; i <= date_highToLow.data.length - 1; i++) {
                        if (date_highToLow.data[i].coverImage == "Ez a kép elérési útja") {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${date_highToLow.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${date_highToLow.data[i].username}')">${date_highToLow.data[i].firstName} ${date_highToLow.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${date_highToLow.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_highToLow.data[i].coverImage}', '${date_highToLow.data[i].title}', '${date_highToLow.data[i].firstName}', '${date_highToLow.data[i].lastName}', '${date_highToLow.data[i].description}', '${date_highToLow.data[i].language}', '${date_highToLow.data[i].rating}', '${date_highToLow.data[i].pagesNumber}', '${date_highToLow.data[i].price}', '${date_highToLow.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;

                        } else {
                            books_side.innerHTML += `
                                <div class="container medium-card" style="background-color: #EAD7BE;">
                                    <div class="row">
                                        <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                            <img class="medium-pic" src="../${date_highToLow.data[i].coverImage}.jpg">
                                            
                                        </div>
                
                                        <div class="col-9 medium-right-side">
                                        
                                            <h2 class="container medium-h2">${date_highToLow.data[i].title}</h2>
                                            <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${date_highToLow.data[i].username}')">${date_highToLow.data[i].firstName} ${date_highToLow.data[i].lastName}</p>
                                            <p class="medium-desc" id="s5-mediumC-desc">${date_highToLow.data[i].description}</p>
                                            <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${date_highToLow.data[i].coverImage}', '${date_highToLow.data[i].title}', '${date_highToLow.data[i].firstName}', '${date_highToLow.data[i].lastName}', '${date_highToLow.data[i].description}', '${date_highToLow.data[i].language}', '${date_highToLow.data[i].rating}', '${date_highToLow.data[i].pagesNumber}', '${date_highToLow.data[i].price}', '${date_highToLow.data[i].username}')">Show Details</button>
                
                                        </div>
                                    </div>
                                </div>
                
                            `;
                        }
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