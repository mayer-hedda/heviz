const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');

const c_name = document.getElementById('category-name');
const current_page = document.getElementById('current-page');
const books_side = document.getElementById('right-side');

const no_category_result = document.getElementById('noCategoryResult');

//Modal btn-s
const shopping_btn = document.getElementById('shopping-cart');
const publish_btn = document.getElementById('publish-btn');
const book_price = document.getElementById('book-price');

// Ellenőrizzük, hogy van-e a felhasználónak tokenje, ha nem akkor átirányítjuk a login felületre
window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
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
            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;

            document.getElementById('profile-link').addEventListener('click', (e) => {
                window.location.href = `../Profile/profile.html?username=${tokenResponse.data.username}`;
            });

            if (tokenResponse.data.rank == "publisher") {
                shopping_btn.hidden = true;
                publish_btn.hidden = false;
                book_price.hidden = true;
            } else if (tokenResponse.data.rank == "general") {
                shopping_btn.hidden = false;
                publish_btn.hidden = true;
                book_price.hidden = false;
            }

            // vizsgáljuk hogy a keresés eredményeként érkeztünk az oldalra vagy pedig kategória által
            const urlParams = new URLSearchParams(window.location.search);
            // const searchString = urlParams;

            if (urlParams.has('category')) {
                var categoryFromLink = urlParams.get('category');
                c_name.innerText = categoryFromLink;
                current_page.innerText = categoryFromLink;
                var categoryId = urlParams.get('id');
                console.log(categoryId);
                const categoryResponse = await getAllBooksByCategory({ "id": categoryId })
                LoadCategoryResult(categoryResponse);

            } else if (urlParams.has('search')) {
                var searchFromLink = urlParams.get('search');
                c_name.innerText = searchFromLink;
                current_page.innerText = searchFromLink;
                LoadSearchResult();
            }
    }
}

function LoadSearchResult() {
    // Keresés eredménye
    const storedSearchResult = JSON.parse(localStorage.getItem('searchResult'));
    console.log(storedSearchResult);
    if (storedSearchResult.length == 0) {
        document.getElementById('noSearchResult').hidden = false;
    } else {
        document.getElementById('noSearchResult').hidden = true;

        for (let i = 0; i <= storedSearchResult.length - 1; i++) {
            //    console.log(storedSearchResult[i].title);
            if (storedSearchResult[i].coverImage == "Ez a kép elérési útja") {
                books_side.innerHTML += `
                    <div class="container medium-card" style="background-color: #EAD7BE;">
                        <div class="row">
                            <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                
                            </div>
    
                            <div class="col-9 medium-right-side">
                            
                                <h2 class="container medium-h2">${storedSearchResult[i].title}</h2>
                                <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${storedSearchResult[i].username}')">${storedSearchResult[i].firstName} ${storedSearchResult[i].lastName}</p>
                                <p class="medium-desc" id="s5-mediumC-desc">${storedSearchResult[i].description}</p>
                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${storedSearchResult[i].coverImage}', '${storedSearchResult[i].title}', '${storedSearchResult[i].firstName}', '${storedSearchResult[i].lastName}', '${storedSearchResult[i].description}', '${storedSearchResult[i].language}', '${storedSearchResult[i].rating}', '${storedSearchResult[i].pagesNumber}', '${storedSearchResult[i].price}', '${storedSearchResult[i].username}')">Show Details</button>
    
                            </div>
                        </div>
                    </div>
            
                `;
            } else {
                books_side.innerHTML += `
                    <div class="container medium-card" style="background-color: #EAD7BE;">
                        <div class="row">
                            <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                <img class="medium-pic" src="../${storedSearchResult[i].coverImage}.jpg">
                                
                            </div>
    
                            <div class="col-9 medium-right-side">
                            
                                <h2 class="container medium-h2">${storedSearchResult[i].title}</h2>
                                <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${storedSearchResult[i].username}')">${storedSearchResult[i].firstName} ${storedSearchResult[i].lastName}</p>
                                <p class="medium-desc" id="s5-mediumC-desc">${storedSearchResult[i].description}</p>
                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${storedSearchResult[i].coverImage}', '${storedSearchResult[i].title}', '${storedSearchResult[i].firstName}', '${storedSearchResult[i].lastName}', '${storedSearchResult[i].description}', '${storedSearchResult[i].language}', '${storedSearchResult[i].rating}', '${storedSearchResult[i].pagesNumber}', '${storedSearchResult[i].price}', '${storedSearchResult[i].username}')">Show Details</button>
    
                            </div>
                        </div>
                    </div>
            
                `;
            }

        }
    }

}

function LoadCategoryResult(response) {
    if (response.data.length == 0) {
        document.getElementById('noCategoryResult').hidden = false;
    } else {
        document.getElementById('noCategoryResult').hidden = true;

        for (let i = 0; i <= response.data.length - 1; i++) {
            if (response.data[i].coverImage == "Ez a kép elérési útja") {
                books_side.innerHTML += `
                    <div class="container medium-card" style="background-color: #EAD7BE;">
                        <div class="row">
                            <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                <img class="medium-pic" src="../pictures/standard-book-cover.jpg">
                                
                            </div>
    
                            <div class="col-9 medium-right-side">
                            
                                <h2 class="container medium-h2">${response.data[i].title}</h2>
                                <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <p class="medium-desc" id="s5-mediumC-desc">${response.data[i].description}</p>
                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}')">Show Details</button>
    
                            </div>
                        </div>
                    </div>
            
                `;
            } else {
                books_side.innerHTML += `
                    <div class="container medium-card" style="background-color: #EAD7BE;">
                        <div class="row">
                            <div class="col-3 my-col3" id="s5-mediumCardPic-div">
                                <img class="medium-pic" src="../${response.data[i].coverImage}.jpg">
                                
                            </div>
    
                            <div class="col-9 medium-right-side">
                            
                                <h2 class="container medium-h2">${response.data[i].title}</h2>
                                <p class="username author" id="s5-mediumC-user" onclick="navigateToProfile('${response.data[i].username}')">${response.data[i].firstName} ${response.data[i].lastName}</p>
                                <p class="medium-desc" id="s5-mediumC-desc">${response.data[i].description}</p>
                                <button type="button" class="moreBtn-medium align-bottom" data-bs-toggle="modal" data-bs-target="#bookPopup" onclick="loadModalData('${response.data[i].coverImage}', '${response.data[i].title}', '${response.data[i].firstName}', '${response.data[i].lastName}', '${response.data[i].description}', '${response.data[i].language}', '${response.data[i].rating}', '${response.data[i].pagesNumber}', '${response.data[i].price}', '${response.data[i].username}')">Show Details</button>
    
                            </div>
                        </div>
                    </div>
            
                `;
            }

        }
    }


}

const searchBTN = document.getElementById('search-btn');
const search_input = document.getElementById('search-input');

searchBTN.addEventListener('click', async function (event) {
    event.preventDefault();
    const s_value = search_input.value;

    if (s_value.trim() != "") {
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
    window.location.href = `../Profile/profile.html?username=${username}`;
}

const book_modal_body = document.getElementById('modal-body');
const book_modal_img = document.getElementById('book-modal-img');
const book_modal_title = document.getElementById('modal-title');
const book_modal_author = document.getElementById('modal-author');
const book_modal_pages = document.getElementById('modal-pages');
const book_modal_ranking = document.getElementById('modal-ranking');
const book_modal_language = document.getElementById('modal-language');
const book_modal_desc = document.getElementById('modal-desc');


function loadModalData(url, title, firstName, lastName, description, language, rating, pages, price, username) {

    if (url != "Ez a kép elérési útja") {
        book_modal_img.src = `../${url}.jpg`;
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

}

// filters
async function Filter(event){
    const selectedRadio = event.target.id;

    books_side.innerHTML = '';

    for (let i = 0; i <= response.data.length-1; i++) {
        
        
    }
}

function loadFilteredBooks(filteredResponse) {
    
}

// alphabetical
const a_z = document.getElementById('a-z');
const z_a = document.getElementById('z-a');

