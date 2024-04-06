const title = document.getElementById('inputStoryTitle');
const description = document.getElementById('inputDescription');
const selectAudience = document.getElementById("selectTargetAudience");
const language_dropdown = document.getElementById('selectLanguage');
const category_dropdown = document.getElementById('selectCategory');
const chapter_number = document.getElementById('chapter-number');
const bankAccNumber = document.getElementById('inputBankNum');
const bookPrice = document.getElementById('inputBookPrice');
const adultCheckbox = document.getElementById('adultCheck');

//* DRAG AND DROP IMAGE TO COVER PHOTO + UPLOAD FILE
const dropAreaPicture = document.getElementById('dropAreaPicture');
const inputPicture = document.getElementById('inputPicture');
const imgView = document.getElementById('imgView');

const dropAreaFile = document.getElementById('dropAreaFile');
const inputFile = document.getElementById('inputFile');
const fileView = document.getElementById('fileView');

//* VARIABLES FOR ACTIVATE BUTTON
var filePass = false;
var picPass = false;
var titlePass = false;
var descriptionPass = false;
var audiencePass = false;
var languagePass = false;
var categoryPass = false;
var chapterPass = false;
var bankPass = false; //! csak akkor kell ha selfpublish
var pricePass = false; //! csak akkor kell ha selfpublish
var publishingStatus = 0;

let isAdultLiterature = false;

// Ellenőrizzük, hogy van-e a felhasználónak tokenje, ha nem akkor átirányítjuk a login felületre
window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
    const tokenResponese = await token();
    // console.log(tokenResponese);

    switch (tokenResponese.status) {
        case 302:
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');

            const dropdown_response = await getDropDownValues();
            console.log(dropdown_response);
            getLanguages(dropdown_response);
            getCategories(dropdown_response);

            var bookId = localStorage.getItem("bookId");
            if (bookId !== null) {
                // console.log("A 'bookId' kulcs értéke:", bookId);
                const detailResponse = await getBookDetails({ "id": bookId });
                LoadBookDetails(detailResponse);
            }


            break;
        case 422:
            console.error(tokenResponese.data);
            break;
        case 401:
            window.location.href = "../Log-in/login.html";
            break;
    }
}


//? IMAGE
const img_trash = document.getElementById('del-pic');
const addPhoto_icon = document.getElementById('addPhoto');
const img_p = document.getElementById('img-p');
const img_span = document.getElementById('img-span');
const PicError = document.getElementById('PicError');

inputPicture.addEventListener("change", uploadImage);

var height, width;
let imgLink; //ez lesz a blob
let imgSrc; //ebből fogom kiszedni a kép elérési útját
var pictureName; // ez lesz a végleges fájlnév amit a backend megkap

function uploadImage() {
    imgLink = URL.createObjectURL(inputPicture.files[0]);
    console.log(imgLink);
    /**
     * ez egy blob lesz, ami nem tartalmazza a fájl nevét viszont
     * ha a sima value-t használom nem fog a kép betöltődni mert nincs a böngészőnek
     * hozzáférése a helyi fájlokhoz, így a blob linket kell használni a kép betöltésére.
     * Amikor adatot küldök a backendnek akkor a value értéket kell küldeni
    */
    imgView.style.backgroundImage = `url(${imgLink})`;
    addPhoto_icon.hidden = true;
    img_p.hidden = true;
    img_span.hidden = true;

    var img = new Image();

    img.onload = function () {
        height = img.naturalHeight;
        width = img.naturalWidth;
        console.log("A kép szélessége: " + width);
        console.log("A kép magassága: " + height);
    }

    if (imgLink == "") {
        picPass = false;
        console.log("pic pass value:" + picPass);

    } else {
        picPass = true;
        imgSrc = inputPicture.value;
        console.log("pic pass value:" + picPass);
        console.log("img src: " + imgSrc);

        // Szétvágom a szöveget a "\" karakter alapján
        var parts = imgSrc.split('\\');
        pictureName = parts[parts.length - 1];

        console.log(pictureName);
    }

}

dropAreaPicture.addEventListener('dragover', (e) => {
    e.preventDefault();
})

// Képfeltöltés eseménykezelője
dropAreaPicture.addEventListener('drop', (e) => {
    e.preventDefault();
    inputPicture.files = e.dataTransfer.files;
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Elfogadott képformátumok MIME típusokban

    // Ellenőrizze a kép fájltípusát
    const fileType = inputPicture.files[0].type;
    if (!allowedImageTypes.includes(fileType)) {
        alert('Csak JPEG, PNG vagy GIF képeket tölthetsz fel!');
        inputPicture.value = ''; // Töröljük a fájlmező tartalmát
        picPass = false;
        console.log("pic pass value:" + picPass);
        return;
    }

    uploadImage();
    console.log(inputPicture.value);
    console.log("lefut a drop a képnél");
});

img_trash.addEventListener('click', (e) => {
    inputPicture.value = '';
    imgLink = '';
    console.log(imgLink);
    imgView.style.backgroundImage = '';
    addPhoto_icon.hidden = false;
    img_p.hidden = false;
    img_span.hidden = false;
    picPass = false;

    PicError.innerHTML = `<p>Please be sure to enter a picture in this field.</p>`;
})

inputPicture.addEventListener('input', (e) => {
    PicError.innerHTML = "";
})


//? FILE
const file_trash = document.getElementById('del-file');
const file_p = document.getElementById('file-p');
const file_span = document.getElementById('file-span');
const file_result_p = document.getElementById('f-result-p-1');
const file_result_uploaded = document.getElementById('f-result-p-2');
const FileError = document.getElementById('FileError');

var fileName; // ez lesz az az érték amelyet megkap a backend

inputFile.addEventListener("change", (e) => {
    e.preventDefault();
    console.log("lefut a change");
    uploadFile();
});

function uploadFile() {
    console.log(inputFile.value);

    // console.log("Lefutott az uploadfile");
    if (inputFile.value == "") {
        filePass = false;
        console.log("pic pass value:" + filePass);
    } else {
        filePass = true;
        fileName = inputFile.value.split('\\').pop();

        file_p.hidden = true;
        file_span.hidden = true;

        file_result_p.hidden = false;
        file_result_uploaded.hidden = false;
        file_result_uploaded.innerText = `${fileName}`;
        console.log("perjel után: " + fileName);
        console.log("pic pass value:" + filePass);
    }
}

dropAreaFile.addEventListener('dragover', (e) => {
    e.preventDefault();
})

// Fájlfeltöltés eseménykezelője
dropAreaFile.addEventListener('drop', (e) => {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    const allowedFileExtensions = ['.pdf', '.doc']; // Elfogadott fájlkiterjesztések

    // Ellenőrizze a fájl kiterjesztését
    const fileName = inputFile.value.split('.').pop(); // Fájlnév utolsó része, a kiterjesztés
    const fileExtension = '.' + fileName.split('.').pop().toLowerCase(); // Kiterjesztés kisbetűsen
    if (!allowedFileExtensions.includes(fileExtension)) {
        alert('Csak .pdf vagy .doc fájlokat tölthetsz fel!');
        inputFile.value = ''; // Töröljük a fájlmező tartalmát
        filePass = false;
        console.log("pic pass value:" + filePass);
        return;
    }

    uploadFile();
    console.log(inputFile.value);
    console.log("lefut a drop a fájlnál");
});

file_trash.addEventListener('click', (e) => {
    inputFile.value = '';
    file_p.hidden = false;
    file_span.hidden = false;
    file_result_p.hidden = true;
    file_result_uploaded.hidden = true;
    file_result_uploaded.innerText = '';
    filePass = false;

    FileError.innerHTML = `<p>Please be sure to enter a file in this field.</p>`;
})

inputFile.addEventListener('input', (e) => {
    FileError.innerHTML = "";
})


function LoadBookDetails(response) {
    title.value = response.data.title;
    titlePass = true;
    description.value = response.data.description;
    descriptionPass = true;
    selectAudience.value = response.data.targetAudienceId;
    audiencePass = true;
    language_dropdown.value = response.data.languageId;
    languagePass = true;
    category_dropdown.value = response.data.categoryId;
    categoryPass = true;

    if (response.data.adultFiction == true) {
        adultCheckbox.checked = true;
        isAdultLiterature = true;
    } else {
        adultCheckbox.checked = false;
        isAdultLiterature = false;
    }

    if (response.data.statusId == 1) {
        document.getElementById('PublisherPublish').checked = true;
        publishingStatus = 1;
    } else if (response.data.statusId == 2) {
        publishingStatus = 2;
        document.getElementById('SelfPublish').checked = true;
        self_inputs.hidden = false;
        bookPrice.value = response.data.price;
        pricePass = true;
        bankAccNumber.value = response.data.bankAccountNumber;
        bankPass = true;
    }

    if (response.data.coverImage == "Ez a kép elérési útja") {
        imgView.style.backgroundImage = 'url(../pictures/standard-book-cover.jpg)';
        addPhoto_icon.hidden = true;
        img_p.hidden = true;
        img_span.hidden = true;
        picPass = true;
        const url = "../pictures/standard-book-cover.jpg";
        const parts = url.split("/");
        pictureName = parts[parts.length - 1];
        console.log("pictureName: " + pictureName);
    } else {
        addPhoto_icon.hidden = true;
        img_p.hidden = true;
        img_span.hidden = true;
        imgView.style.backgroundImage = `url(../${response.data.coverImage}.jpg)`;
        picPass = true;

        const url = `../${response.data.coverImage}.jpg`;
        const parts = url.split("/");
        pictureName = parts[parts.length - 1];
        console.log("pictureName: " + pictureName);
    }

    if (response.data.file != "Ez a könyv elérési útja") {
        fileName = response.data.file;
        console.log(fileName);
        file_p.hidden = true;
        file_span.hidden = true;
        file_result_p.hidden = false;
        file_result_uploaded.hidden = false;
        file_result_uploaded.innerText = `${fileName}`;
        // inputFile.value = fileName;
        filePass = true;
    } else {
        file_p.hidden = true;
        file_span.hidden = true;
        file_result_p.hidden = false;
        file_result_uploaded.hidden = false;
        file_result_uploaded.innerText = "Ez lesz a könyv elérési útja";
        filePass = true;
        fileName = response.data.file;
    }

}


//* PROCESSING OTHER INPUTS
const charCounterTitle = document.getElementById('characterCounterTitle');
const charCounterDes = document.getElementById('characterCounterDes');

const nextBtn = document.getElementById('Next');


//* ERROR FIELDS
const titleError = document.getElementById('titleErr');
const descriptionError = document.getElementById('descriptErr');
const audienceError = document.getElementById('audienceErr');
const languageError = document.getElementById('languageErr');
const categoryError = document.getElementById('categoryErr');
const chapterError = document.getElementById('chapterError');
const bankError = document.getElementById('BankNumError');
const priceError = document.getElementById('PriceError');

const storyname = document.getElementById('StoryName');
//? TITLE 
function MinTitle(titleValue) {
    if (titleValue.length < 3) {
        title.classList.add('inputError');
        console.log("Title error: too short - " + titleValue);
        return false;
    }
    return true;
}

title.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = title.value;
    let count = currentText.length;
    charCounterTitle.textContent = `${count}/50`;

    if (count >= 45) {
        // console.log("bemegy az ifbe");
        charCounterTitle.classList.remove('counter');
        charCounterTitle.classList.add('counterErrorLight');

        if (count == 50) {
            charCounterTitle.classList.remove('counterErrorLight');
            charCounterTitle.classList.add('counterErrorBold');
        } else {
            charCounterTitle.classList.remove('counterErrorBold');
            charCounterTitle.classList.add('counterErrorLight');
        }
    } else {
        charCounterTitle.classList.value = '';
        charCounterTitle.classList.add('small', 'counter');
    }

    if (count == 0) {
        title.classList.add('inputError');
        titleError.innerText = "The title field cannot be empty";
    } else {
        title.classList.remove('inputError');
        titleError.innerText = "";
    }
})

let titleValue;
const kisbetuRegex = /[a-z]/;
const nagybetuRegex = /[A-Z]/;
const ekezetesRegex = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;
title.addEventListener('focusout', (e) => {
    e.preventDefault();
    titleValue = title.value;
    if (titleValue == "") {
        title.classList.add('inputError');
        titleError.innerText = "Title cannot be empty";
        titlePass = false;
        console.log("TitlePass value: " + titlePass);
    } else {
        if (kisbetuRegex.test(titleValue) == true || nagybetuRegex.test(titleValue) == true || ekezetesRegex.test(titleValue) == true) {
            const functionValue = MinTitle(titleValue);
            if (functionValue == false) {
                titlePass = false;
                titleError.innerText = "Title must be 3 caracter long.";
                title.classList.add('inputError');
                console.log("A title függvény értéke: " + functionValue);
                console.log("TitlePass value: " + titlePass);
            } else {
                title.classList.add('inputPass');
                titlePass = true;
                console.log("TitlePass value: " + titlePass);
                storyname.textContent = title.value;
            }
        } else {
            title.classList.add('inputError');
            titleError.innerText = "The title must contains at least one letter.";
            titlePass = false;
            console.log("TitlePass value: " + titlePass);
        }

    }

})

title.addEventListener('focusin', (e) => {
    e.preventDefault();
    title.classList.remove('inputError');
    title.classList.remove('inputPass');
    titleError.innerText = "";
    storyname.textContent = "Untitled Story";
})
// #############################################
//? DESCRIPTION
let descValue;
function MinDesc(descriptionValue) {
    if (descriptionValue.length < 20) {
        description.classList.add('inputError');
        console.log("Description error: too short - " + descriptionValue);
        return false;
    }
    return true;
}

description.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = description.value;
    const count = currentText.length;
    charCounterDes.textContent = `${count}/1000`;

    if (count >= 950) {
        console.log("bemegy az ifbe");
        charCounterDes.classList.remove('counter');
        charCounterDes.classList.add('counterErrorLight');

        if (count == 1000) {
            charCounterDes.classList.remove('counterErrorLight');
            charCounterDes.classList.add('counterErrorBold');
        } else {
            charCounterDes.classList.remove('counterErrorBold');
            charCounterDes.classList.add('counterErrorLight');
        }
    } else {
        charCounterDes.classList.value = '';
        charCounterDes.classList.add('small', 'counter');
    }

    if (count == 0) {
        description.classList.add('inputError');
        descriptionError.innerText = "The description field cannot be empty";
    } else {
        description.classList.remove('inputError');
        descriptionError.innerText = "";
    }
})

description.addEventListener('focusout', (e) => {
    e.preventDefault();
    descValue = description.value;
    if (descValue == "") {
        description.classList.add('inputError');
        descriptionError.innerText = "The description field cannot be empty";
        descriptionPass = false;
        console.log("descriptionPass value: " + descriptionPass);
    } else {
        if (kisbetuRegex.test(descValue) == true || nagybetuRegex.test(descValue) == true || ekezetesRegex.test(descValue) == true) {
            const functionValue = MinDesc(descValue);
            if (functionValue == false) {
                descriptionPass = false;
                descriptionError.innerText = "The description must be 20 character long.";
                description.classList.add('inputError');
                console.log("A descript. függvény értéke: " + functionValue);
                console.log("descriptionPass value: " + descriptionPass);
            } else {
                description.classList.add('inputPass');
                descriptionPass = true;
                console.log("descriptionPass value: " + descriptionPass);
            }
        } else {
            description.classList.add('inputError');
            descriptionError.innerText = "The description must contains at least one letter.";
            descriptionPass = false;
            console.log("descriptionPass value: " + descriptionPass);
        }

    }
})

description.addEventListener('focusin', (e) => {
    e.preventDefault();
    description.classList.remove('inputError');
    description.classList.remove('inputPass');
    descriptionError.innerText = "";
})

// #############################################
function disableDefaultOption(select) {
    const defaultOption = select.querySelector('option[value="0"]');
    if (defaultOption) {
        defaultOption.disabled = true;
    }
}

function VerifyDropdown(select, errorField, selection) {

    if (select.value == 0) {
        const errorMessage = `The ${selection} cannot be the default value.`;
        errorField.innerHTML = `<p>${errorMessage}</p>`;
        console.log(selection + ": wrong choice");
        select.classList.add('inputError');
        return false;
    }
    return true;
}

//? AUDIENCE DROPDOWN
var audienceData;
selectAudience.addEventListener('focusout', (e) => {
    e.preventDefault();
    audienceData = e.target.value;
    console.log("You selected: " + audienceData);

    const functionValue = VerifyDropdown(selectAudience, audienceError, "Audience");
    if (functionValue == true) {
        selectAudience.classList.add('inputPass');
        audiencePass = true;
        console.log("audiencePass value: " + audiencePass);
        console.log(audienceData);
    }
})

selectAudience.addEventListener('change', function () {
    // Az alapértelmezett érték letiltása, ha már választottak
    if (this.value !== "0") {
        disableDefaultOption(this);
    }
});

selectAudience.addEventListener('focusin', (e) => {
    e.preventDefault();
    selectAudience.classList.remove('inputError');
    selectAudience.classList.remove('inputPass');
    audienceError.innerHTML = "";
})
// #############################################
//? LANGUAGE DROPDOWN
var selectedLanguage;

function getLanguages(response) {
    for (i = 0; i <= response.data.languages.length - 1; i++) {
        language_dropdown.innerHTML += `
            <option value="${response.data.languages[i].id}">${response.data.languages[i].language}</option>  
        `;
    }

    language_dropdown.addEventListener('change', function (event) {
        selectedLanguage = event.target.value;
        console.log('Selected language ID:', selectedLanguage);
    });
}

language_dropdown.addEventListener('focusin', (e) => {
    e.preventDefault();
    language_dropdown.classList.remove('inputError');
    language_dropdown.classList.remove('inputPass');
    languageError.innerHTML = "";
})

language_dropdown.addEventListener('focusout', (e) => {
    e.preventDefault();

    console.log("You selected: " + selectedLanguage);

    const functionValue = VerifyDropdown(language_dropdown, languageError, "Langugage");
    if (functionValue == true) {
        language_dropdown.classList.add('inputPass');
        languagePass = true;
        console.log("language value: " + languagePass);
    }
})

language_dropdown.addEventListener('change', function () {
    // Az alapértelmezett érték letiltása, ha már választottak
    if (this.value !== "0") {
        disableDefaultOption(this);
    }
});

// #############################################
//? CATEGORY DROPDOWN
var selectedCategory;

function getCategories(response) {
    for (i = 0; i <= response.data.categories.length - 1; i++) {
        category_dropdown.innerHTML += `
            <option value="${response.data.categories[i].id}">${response.data.categories[i].name}</option>  
        `;
    }

    category_dropdown.addEventListener('change', function (event) {
        selectedCategory = event.target.value;
        console.log('Selected category ID:', selectedCategory);
    });
}

category_dropdown.addEventListener('focusin', (e) => {
    e.preventDefault();
    category_dropdown.classList.remove('inputError');
    category_dropdown.classList.remove('inputPass');
    categoryError.innerHTML = "";
})

category_dropdown.addEventListener('focusout', (e) => {
    e.preventDefault();
    console.log("You selected: " + selectedCategory);

    const functionValue = VerifyDropdown(category_dropdown, categoryError, "Category");
    if (functionValue == true) {
        category_dropdown.classList.add('inputPass');
        categoryPass = true;
        console.log("audiencePass value: " + categoryPass);
    }
})

category_dropdown.addEventListener('change', function () {
    // Az alapértelmezett érték letiltása, ha már választottak
    if (this.value !== "0") {
        disableDefaultOption(this);
    }
});

//? Radio Buttons
const checkboxes = document.querySelectorAll('.checkinput');
const self_inputs = document.getElementById('activate-self');

var publishingForm;
checkboxes.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
        checkError.innerHTML = "";
        // Ellenőrizze, hogy melyik rádiógomb van bejelölve
        if (this.checked) {
            publishingForm = this.id;
            // console.log("Bejelölt rádiógomb: " + publishingForm);
            if (publishingForm == "SelfPublish") {
                console.log("Aktívak a mezők");
                self_inputs.hidden = false;
                publishingStatus = 2;
                console.warn('Selfpublish boolean: ', publishingStatus);
            }

            if (publishingForm == "PublisherPublish") {
                console.log("Mezők deaktiválása");
                self_inputs.hidden = true;
                publishingStatus = 1;
                console.warn('Selfpublish boolean: ', publishingStatus);

            }
        }
    });
});

//?CHAPTER NUMBER INPUT PASS TRUE
let chapternumber;
chapter_number.addEventListener('focusout', (e) => {
    e.preventDefault();
    if (chapter_number.value != "") {
        chapternumber = chapter_number.value;
        chapterPass = true;
        chapterError.innerHTML = "";
        chapter_number.classList.add('inputPass');
    } else {
        chapter_number.classList.remove('inputPass');
        chapter_number.classList.add('inputError');
        chapterError.innerHTML = `<p>This field cannot be empty.</p>`;
    }
})

chapter_number.addEventListener("focusin", (e) => {
    chapterError.innerHTML = "";
    chapter_number.classList.remove('inputPass');
    chapter_number.classList.remove('inputError');
})

//? BANK ACC NUMBER
function bankValidation(bankValue) {
    console.log("Input IBAN: " + bankValue);
    const removeSpaces = bankValue.replace(/ /g, "");

    if (bankValue == "") {
        bankAccNumber.classList.add('inputError');
        bankError.innerHTML = `<p>This field cannot be empty.</p>`;
        console.log("The bank field is empty.");
        return false;

    } else if (removeSpaces.length < 15) {
        bankAccNumber.classList.add('inputError');
        bankError.innerHTML = `<p>This value is too short. The IBAN number should be between 15 and 34 characters.</p>`;
        console.log("The bank value is too short.");
        return false;

    } else if (removeSpaces.length > 34) {
        bankAccNumber.classList.add('inputError');
        bankError.innerHTML = `<p>This value is too long. The IBAN number should be between 15 and 34 characters.</p>`;
        console.log("The bank value is too long.");
        return false;

    } else if (removeSpaces.length >= 15 && removeSpaces.length <= 34) {
        bankAccNumber.classList.add('inputPass');
        const upperCase = removeSpaces.toUpperCase();
        console.log("IBAN number converted to upper case: " + upperCase);
        return true;
    }

}

let bankValue;
bankAccNumber.addEventListener('focusout', (e) => {
    e.preventDefault();
    validateBank = bankValidation(bankAccNumber.value);
    if (validateBank == true) {
        bankPass = true;
        bankValue = bankAccNumber.value;
    } else {
        bankPass = false;
        bankValue = "";
    }
})

bankAccNumber.addEventListener('focusin', (e) => {
    e.preventDefault();
    bankAccNumber.classList.remove('inputError');
    bankAccNumber.classList.remove('inputPass');
    bankError.innerHTML = "";
})

// MIN PRICE
function minPrice(priceValue) {
    if (priceValue < 1000) {
        bookPrice.classList.add('inputError');
        console.log("price error: too low");
        return false;
    }
    return true;
}

let priceValue;
bookPrice.addEventListener('focusout', (e) => {
    e.preventDefault();

    if (bookPrice.value == "") {
        bookPrice.classList.add('inputError');
        priceError.innerHTML = `<p class="priceErrorP">The price field cannot be empty</p>`;
        pricePass = false;
        console.log("pricePass value: " + pricePass);
        priceValue = "";
    } else {
        // Átadjuk a bookPrice.value-t a minPrice függvénynek
        const minFunctionValue = minPrice(bookPrice.value);
        if (minFunctionValue == false) {
            priceValue = "";
            pricePass = false;
            priceError.innerHTML = `<p class="priceErrorP">The price must be a minimum of 1000 Hungarian Forints!</p>`; // Hibás sor
            bookPrice.classList.add('inputError');
            console.log("A minPrice függvény értéke: " + minFunctionValue);
            console.log("pricePass value: " + pricePass);
        } else {
            bookPrice.classList.add('inputPass');
            pricePass = true;
            priceValue = bookPrice.value;
            console.log("pricePass value: " + pricePass);
        }
    }
})

bookPrice.addEventListener('focusin', (e) => {
    e.preventDefault();
    bookPrice.classList.remove('inputError');
    bookPrice.classList.remove('inputPass');
    priceError.innerText = "";
})
// #############################################
//? NEXT BUTTON
// self or search publisher error
const checkError = document.getElementById('checkboxError');


nextBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    nextBtn.removeAttribute('data-bs-toggle', 'modal');
    nextBtn.removeAttribute('data-bs-target', '#errorModal');


    if (adultCheckbox.checked == true) {
        isAdultLiterature = true;
    } else {
        isAdultLiterature = false;
    }

    // console.log(inputPicture.value);
    // console.log(isAdultLiterature);
    if (publishingStatus == 0) {
        checkError.innerHTML = `<p>You have to choose how to publish!</p>`;
    } else {
        checkError.innerHTML = "";
        if (publishingStatus == 1) {
            // looking for publisher case
            if (picPass == true &&
                filePass == true &&
                titlePass == true &&
                descriptionPass == true &&
                audiencePass == true &&
                languagePass == true &&
                categoryPass == true &&
                chapterPass == true) {

                var bookId = localStorage.getItem("bookId");
                if (bookId !== null) {
                    const setBook_response_publisher = await setBook({
                        "id": bookId,
                        "title": title.value,
                        "description": description.value,
                        "targetAudienceId": selectAudience.value,
                        "languageId": language_dropdown.value,
                        "adultFiction": isAdultLiterature,
                        "categoryId": category_dropdown.value,
                        "statusId": 1,
                        "price": "null",
                        "coverImage": pictureName,
                        "file": fileName,
                        "bankAccountNumber": "null",
                        "chapterNumber": chapternumber
                    });



                    console.log(setBook_response_publisher.status);
                    switch (setBook_response_publisher.status) {
                        case 200:
                            window.location.href = "../General-HomePage/GenHome.html";
                            break;
                        case 403:
                            window.location.href = "../404/404.html";
                            break;
                        case 401:
                            window.location.href = "../Log-in/login.html";
                            break;
                        case 422:
                            // ezt az esetet nem tudtam előidézni frontendről
                            nextBtn.setAttribute('data-bs-toggle', 'modal');
                            nextBtn.setAttribute('data-bs-target', '#staticBackdrop');
                            document.getElementById('errorModal-p').textContent = `${setBook_response_publisher.data}`;
                            break;
                    }

                } else {
                    const addBook_response_publisher = await addBook({
                        "title": titleValue,
                        "description": descValue,
                        "targetAudienceId": audienceData,
                        "languageId": selectedLanguage,
                        "adultFiction": isAdultLiterature,
                        "categoryId": selectedCategory,
                        "statusId": 1,
                        "price": "null",
                        "coverImage": pictureName,
                        "file": fileName,
                        "bankAccountNumber": "null",
                        "chapterNumber": chapternumber
                    });

                    console.log(addBook_response_publisher.status);
                    switch (addBook_response_publisher.status) {
                        case 200:
                            window.location.href = "../General-HomePage/GenHome.html";
                            break;
                        case 403:
                            window.location.href = "../404/404.html";
                            break;
                        case 401:
                            window.location.href = "../Log-in/login.html";
                            break;
                        case 422:
                            // ezt az esetet nem tudtam előidézni frontendről
                            nextBtn.setAttribute('data-bs-toggle', 'modal');
                            nextBtn.setAttribute('data-bs-target', '#staticBackdrop');
                            document.getElementById('errorModal-p').textContent = `${addBook_response_publisher.data}`;
                            break;
                    }


                }
            } else {
                nextBtn.setAttribute('data-bs-toggle', 'modal');
                nextBtn.setAttribute('data-bs-target', '#staticBackdrop');

                if (picPass == false) {
                    PicError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (filePass == false) {
                    FileError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (titlePass == false) {
                    title.classList.add('inputError');
                    titleError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (descriptionPass == false) {
                    description.classList.add('inputError');
                    descriptionError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (audiencePass == false) {
                    selectAudience.classList.add('inputError');
                    audienceError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (languagePass == false) {
                    language_dropdown.classList.add('inputError');
                    languageError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (categoryPass == false) {
                    category_dropdown.classList.add('inputError');
                    categoryError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (chapterPass == false) {
                    chapter_number.classList.add('inputError');
                    chapterError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

            }

        } else if (publishingStatus == 2) {

            console.log("pic: " + picPass);
            console.log("file: " + filePass);
            console.log("title: " + titlePass);
            console.log("desc: " + descriptionPass);
            console.log("audience: " + audiencePass);
            console.log("lang: " + languagePass);
            console.log("category: " + categoryPass);
            console.log("chapter: " + chapterPass);
            console.log("bank: " + bankPass);
            console.log("price: " + pricePass);
            // self publish case
            if (picPass == true &&
                filePass == true &&
                titlePass == true &&
                descriptionPass == true &&
                audiencePass == true &&
                languagePass == true &&
                categoryPass == true &&
                chapterPass == true &&
                bankPass == true &&
                pricePass == true) {

                var bookId = localStorage.getItem("bookId");
                if (bookId !== null) {
                    const setBook_self = await setBook({
                        "id": bookId,
                        "title": title.value,
                        "description": description.value,
                        "targetAudienceId": selectAudience.value,
                        "languageId": language_dropdown.value,
                        "adultFiction": isAdultLiterature,
                        "categoryId": category_dropdown.value,
                        "statusId": 2,
                        "price": bookPrice.value,
                        "coverImage": pictureName,
                        "file": fileName,
                        "bankAccountNumber": bankAccNumber.value,
                        "chapterNumber": chapter_number.value
                    });

                    console.log(setBook_self.status);
                    switch (setBook_self.status) {
                        case 200:
                            window.location.href = "../General-HomePage/GenHome.html";
                            break;
                        case 403:
                            window.location.href = "../404/404.html";
                            break;
                        case 401:
                            window.location.href = "../Log-in/login.html";
                            break;
                        case 422:
                            // ezt az esetet nem tudtam előidézni frontendről
                            nextBtn.setAttribute('data-bs-toggle', 'modal');
                            nextBtn.setAttribute('data-bs-target', '#staticBackdrop');
                            document.getElementById('errorModal-p').textContent = `${setBook_self.data}`;
                            break;
                    }

                } else {
                    const addBook_response_self = await addBook({
                        "title": titleValue,
                        "description": descValue,
                        "targetAudienceId": audienceData,
                        "languageId": selectedLanguage,
                        "adultFiction": isAdultLiterature,
                        "categoryId": selectedCategory,
                        "statusId": 1,
                        "price": 0,
                        "coverImage": pictureName,
                        "file": fileName,
                        "bankAccountNumber": bankValue,
                        "chapterNumber": chapternumber
                    });

                    console.log(addBook_response_self.status);
                    switch (addBook_response_self.status) {
                        case 200:
                            window.location.href = "../General-HomePage/GenHome.html";
                            break;
                        case 403:
                            window.location.href = "../404/404.html";
                            break;
                        case 401:
                            window.location.href = "../Log-in/login.html";
                            break;
                        case 422:
                            // ezt az esetet nem tudtam előidézni frontendről
                            nextBtn.setAttribute('data-bs-toggle', 'modal');
                            nextBtn.setAttribute('data-bs-target', '#staticBackdrop');
                            document.getElementById('errorModal-p').textContent = `${addBook_response_publisher.data}`;
                            break;
                    }
                }


            } else {
                nextBtn.setAttribute('data-bs-toggle', 'modal');
                nextBtn.setAttribute('data-bs-target', '#staticBackdrop');

                if (picPass == false) {
                    PicError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (filePass == false) {
                    FileError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (titlePass == false) {
                    title.classList.add('inputError');
                    titleError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (descriptionPass == false) {
                    description.classList.add('inputError');
                    descriptionError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (audiencePass == false) {
                    selectAudience.classList.add('inputError');
                    audienceError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (languagePass == false) {
                    language_dropdown.classList.add('inputError');
                    languageError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (categoryPass == false) {
                    category_dropdown.classList.add('inputError');
                    categoryError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (chapterPass == false) {
                    chapter_number.classList.add('inputError');
                    chapterError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (bankPass == false) {
                    bankAccNumber.classList.add('inputError');
                    bankError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }

                if (pricePass == false) {
                    bookPrice.classList.add('inputError');
                    priceError.innerHTML = `<p>Please make sure you fill in this field correctly!</p>`;
                }
            }

        } else {
            alert("You've done the impossible. Publishing status: " + publishingStatus);
        }
    }
})
