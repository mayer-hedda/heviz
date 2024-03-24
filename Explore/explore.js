const username = document.getElementById('userName-p');
const profilePic = document.getElementById('profile-icon');

// rows to load categories
const first_row_pics = document.getElementById('first-row-pics');
const second_row_pics = document.getElementById('second-row-pics');
const third_row_pics = document.getElementById('third-row-pics');
const fourth_row_pics = document.getElementById('fourth-row-pics');
const fifth_row_pics = document.getElementById('fifth-row-pics');
const sixth_row_pics = document.getElementById('sixth-row-pics');
const seventh_row_pics = document.getElementById('seventh-row-pics');
const eighth_row_pics = document.getElementById('eighth-row-pics');
const nineth_row_pics = document.getElementById('nineth-row-pics');

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
        case 302:
            username.innerText = `@${tokenResponse.data.username}`;
            profilePic.innerHTML = `<img src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;

            document.getElementById('profile-link').addEventListener('click', (e)=>{
                window.location.href = `../Profile/profile.html?username=${tokenResponse.data.username}`;
            });

            const getCategory_response = await getAllCategory();
            console.log(getCategory_response);
            loadCategories(getCategory_response);

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
}

function loadCategories(response) {
    for (let i = 0; i <= 3; i++) {
        first_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 4; i <= 7; i++) {
        second_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 8; i <= 11; i++) {
        third_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 12; i <= 15; i++) {
        fourth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 16; i <= 19; i++) {
        fifth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 20; i <= 23; i++) {
        sixth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 24; i <= 27; i++) {
        seventh_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 28; i <= 31; i++) {
        eighth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 32; i < response.data.length; i++) {
        nineth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="navigateToCategory('${response.data[i].name}')">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }
}

function navigateToCategory(categoryName) {
    window.location.href = `./category.html?category=${categoryName}`;
}

const searchBTN = document.getElementById('searchBTN');
const search_input = document.getElementById('searchKeyword');

searchBTN.addEventListener('click', async function(event){
    event.preventDefault();
    const searchResult = await getSearchBooks({"searchText": `${search_input.value}`});

    switch (searchResult.status){
        case 200:
            localStorage.setItem('searchResult', JSON.stringify(searchResult.data.books));
            window.location.href = `./category.html?search=${search_input.value}`;
            search_input.value ="";
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
});

const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    window.location.assign('../Landing-Page/landing.html');
    localStorage.removeItem("Token");
})