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

const next_btn = document.getElementById('next-btn');

// Ellenőrizzük, hogy van-e a felhasználónak tokenje, ha nem akkor átirányítjuk a login felületre
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
        case 302:
            const getCategory_response = await getAllCategory();
            console.log(getCategory_response);
            loadCategories(getCategory_response);
            break;
    }
}

function loadCategories(response) {
    for (let i = 0; i <= 3; i++) {
        first_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 4; i <= 7; i++) {
        second_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 8; i <= 11; i++) {
        third_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 12; i <= 15; i++) {
        fourth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 16; i <= 19; i++) {
        fifth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 20; i <= 23; i++) {
        sixth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 24; i <= 27; i++) {
        seventh_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 28; i <= 31; i++) {
        eighth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }

    for (let i = 32; i < response.data.length; i++) {
        nineth_row_pics.innerHTML += `
            <div class="image-container" id="${response.data[i].id}" onclick="addCategory(event, ${response.data[i].id})">
                <img class="rowPics default" src="../${response.data[i].image}" alt="${response.data[i].name}" >
            </div>
        `;
    }
}

let choosedCategories = [];
let categoryPass = false;
let choosed = false;

function addCategory(event, category_id) {
    const target = event.target;

    if (target.classList.contains('rowPics')) {
        if (!target.classList.contains('choosed')) {
            target.classList.remove('default');
            target.classList.add('choosed');
            choosedCategories.push(category_id);
            choosed = true;
            console.log(choosedCategories);
        } else {
            target.classList.remove('choosed');
            target.classList.add('default');
            choosed = false;
            // elem törlése a tömbből
            const index = choosedCategories.indexOf(category_id);
            if (index !== -1) {
                choosedCategories.splice(index, 1);
                console.log(choosedCategories);
            }
        }
    }

    if (choosedCategories.length >= 3) {
        console.log("Több van benne mint három");
        next_btn.removeAttribute('data-bs-toggle', 'modal');
        next_btn.removeAttribute('data-bs-target', '#errorModal');
        categoryPass = true;
        console.log(categoryPass);
    }else{
        categoryPass = false;
        console.log(categoryPass);
        next_btn.setAttribute('data-bs-toggle', 'modal');
        next_btn.setAttribute('data-bs-target', '#errorModal');
    }
}

next_btn.addEventListener('click', async function () {
    let array = {"categoryIds": choosedCategories};
    if (categoryPass && choosedCategories.length > 0) {
        console.log(array);
        console.log(typeof array);
        const category_result = await addCategoryInterest(array.json(   ));
        console.log(category_result.status);
        console.log(category_result.error);
    }
});