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

window.addEventListener('beforeunload', async function () {
    var tokenResponse = await token();

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
            const getCategory_response = await getAllCategory();
            loadCategories(getCategory_response);
            
            break;
    }
}

next_btn.addEventListener('click', async function () {
    let array = { "categoryIds": choosedCategories };
    var tokenResponse = await token();
    if (categoryPass && choosedCategories.length > 0) {
        let category_result = await addCategoryInterest(array);

        if (category_result.status == undefined) {
            alert(category_result.error);
        } else {
            switch (category_result.status) {
                case 200:
                    if (tokenResponse.data.rank == "publisher") {
                        window.location.href = "../Publisher-Home/PubHome.html";
                    } else if (tokenResponse.data.rank == "general") {
                        window.location.href = "../General-HomePage/GenHome.html";
                    }
                    break;

                case 401:
                    window.location.href = "../Log-in/login.html";
                    break;

                case 422:
                    alert("Status: " + category_result.status + "| Message: " + category_result.data);
                    break;

                default:
                    alert("Status: " + category_result.status + "| Message: " + category_result.data);
                    break;

            }
        }
    }
});

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
            
        } else {
            target.classList.remove('choosed');
            target.classList.add('default');
            choosed = false;
            
            const index = choosedCategories.indexOf(category_id);
            if (index !== -1) {
                choosedCategories.splice(index, 1);
                
            }
        }
    }

    if (choosedCategories.length >= 3) {
       
        next_btn.removeAttribute('data-bs-toggle', 'modal');
        next_btn.removeAttribute('data-bs-target', '#errorModal');
        categoryPass = true;
        
    } else {
        categoryPass = false;
        
        next_btn.setAttribute('data-bs-toggle', 'modal');
        next_btn.setAttribute('data-bs-target', '#errorModal');
    }
}

