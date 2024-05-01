const title = document.getElementById('inputStoryTitle');
const description = document.getElementById('inputDescription');
const selectAudience = document.getElementById("selectTargetAudience");
const language_dropdown = document.getElementById('selectLanguage');
const category_dropdown = document.getElementById('selectCategory');
const chapter_number = document.getElementById('chapter-number');
const bankAccNumber = document.getElementById('inputBankNum');
const bookPrice = document.getElementById('inputBookPrice');
const adultCheckbox = document.getElementById('adultCheck');

// DRAG AND DROP IMAGE TO COVER PHOTO + UPLOAD FILE
const dropAreaPicture = document.getElementById('dropAreaPicture');
const inputPicture = document.getElementById('inputPicture');
const imgView = document.getElementById('imgView');

const dropAreaFile = document.getElementById('dropAreaFile');
const inputFile = document.getElementById('inputFile');
const fileView = document.getElementById('fileView');

// VARIABLES FOR ACTIVATE BUTTON
var filePass = false;
var picPass = false;
var titlePass = false;
var descriptionPass = false;
var audiencePass = false;
var languagePass = false;
var categoryPass = false;
var chapterPass = false;
var bankPass = false;
var pricePass = false;
var publishingStatus = 0;

let isAdultLiterature = false;

var imgDataToSend;
var fileDataToSend;

window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
    const tokenResponese = await token();

    switch (tokenResponese.status) {
        case 302:
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');
            localStorage.removeItem('id');
            localStorage.removeItem('name');

            const dropdown_response = await getDropDownValues();
            getLanguages(dropdown_response);
            getCategories(dropdown_response);

            var bookId = localStorage.getItem("bookId");
            if (bookId !== null) {
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

document.getElementById('Cancel').addEventListener('click', (e) => {
    localStorage.removeItem("bookId");
})


//? IMAGE
const img_trash = document.getElementById('del-pic');
const addPhoto_icon = document.getElementById('addPhoto');
const img_p = document.getElementById('img-p');
const img_span = document.getElementById('img-span');
const PicError = document.getElementById('PicError');

inputPicture.addEventListener("change", uploadImage);

var height, width;
let imgLink;
let imgSrc;
var pictureName;

function uploadImage() {
    let imgFile = inputPicture.files[0];
    imgLink = URL.createObjectURL(imgFile);



    var img = new Image();
    img.src = imgLink;
    let size = imgFile.size;

    const maxSize = 2 * 1024 * 1024;
    if (size > maxSize) {
        alert('A kép mérete túl nagy. Kérjük, válassz egy kisebb méretű képet (legfeljebb 2MB).');
        return;
    } else {

        imgView.style.backgroundImage = `url(${imgLink})`;

        addPhoto_icon.hidden = true;
        img_p.hidden = true;
        img_span.hidden = true;



        if (imgLink == "") {
            picPass = false;

        } else {
            picPass = true;

            const imgName = imgFile.name;
            console.log('Feltöltött fájl neve:', imgName);

            const fileNameWithoutExtension = imgName.split('.').slice(0, -1).join('.');
            console.log('Fájlnév kiterjesztés nélkül:', fileNameWithoutExtension);

            imgDataToSend = fileNameWithoutExtension;
        }
    }

}

dropAreaPicture.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropAreaPicture.addEventListener('drop', (e) => {
    e.preventDefault();
    inputPicture.files = e.dataTransfer.files;
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const fileType = inputPicture.files[0].type;
    if (!allowedImageTypes.includes(fileType)) {
        alert('Csak JPEG, PNG vagy GIF képeket tölthetsz fel!');
        inputPicture.value = '';
        picPass = false;
        return;
    }

    uploadImage();
});

img_trash.addEventListener('click', (e) => {
    inputPicture.value = '';
    imgLink = '';
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

var fileName;

inputFile.addEventListener("change", (e) => {
    e.preventDefault();
    uploadFile();
});

function uploadFile() {


    const fileSize = inputFile.files[0].size;
    const maxSize = 5 * 1024 * 1024;

    if (fileSize > maxSize) {
        alert('A fájl mérete túl nagy. Kérjük, válassz egy kisebb méretű fájlt (legfeljebb 5MB).');
        inputFile.value = '';
        return;
    } else {
        if (inputFile.value == "") {
            filePass = false;
        } else {
            filePass = true;
            const fileName = inputFile.files[0].name;

            const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');

            fileDataToSend = fileNameWithoutExtension;

            file_p.hidden = true;
            file_span.hidden = true;

            file_result_p.hidden = false;
            file_result_uploaded.hidden = false;
            file_result_uploaded.innerText = `${fileName}`;
        }
    }


}

dropAreaFile.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropAreaFile.addEventListener('drop', (e) => {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    const allowedFileExtensions = ['.pdf', '.doc'];

    const fileName = inputFile.value.split('.').pop();
    const fileExtension = '.' + fileName.split('.').pop().toLowerCase();
    if (!allowedFileExtensions.includes(fileExtension)) {
        alert('Csak .pdf vagy .doc fájlokat tölthetsz fel!');
        inputFile.value = '';
        filePass = false;
        return;
    }

    uploadFile();
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

    description.value = response.data.description;
    descriptionPass = true;
    selectAudience.value = response.data.targetAudienceId;
    audiencePass = true;
    language_dropdown.value = response.data.languageId;
    languagePass = true;
    category_dropdown.value = response.data.categoryId;
    categoryPass = true;
    chapter_number.value = response.data.chapterNumber;
    chapterPass = true;

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

    addPhoto_icon.hidden = true;
    img_p.hidden = true;
    img_span.hidden = true;
    imgView.style.backgroundImage = `url(../${response.data.coverImage}.jpg)`;
    picPass = true;

    const url = `../${response.data.coverImage}.jpg`;
    const parts = url.split("/");
    pictureName = parts[parts.length - 1];

    fileName = response.data.file;
    file_p.hidden = true;
    file_span.hidden = true;
    file_result_p.hidden = false;
    file_result_uploaded.hidden = false;
    file_result_uploaded.innerText = `${fileName}`;
    filePass = true;

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
    } else {
        if (kisbetuRegex.test(titleValue) == true || nagybetuRegex.test(titleValue) == true || ekezetesRegex.test(titleValue) == true) {
            const functionValue = MinTitle(titleValue);
            if (functionValue == false) {
                titlePass = false;
                titleError.innerText = "Title must be 3 character long.";
                title.classList.add('inputError');
            } else {
                title.classList.add('inputPass');
                titlePass = true;
                storyname.textContent = title.value;
            }
        } else {
            title.classList.add('inputError');
            titleError.innerText = "The title must contains at least one letter.";
            titlePass = false;
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
    } else {
        if (kisbetuRegex.test(descValue) == true || nagybetuRegex.test(descValue) == true || ekezetesRegex.test(descValue) == true) {
            const functionValue = MinDesc(descValue);
            if (functionValue == false) {
                descriptionPass = false;
                descriptionError.innerText = "The description must be 20 character long.";
                description.classList.add('inputError');
            } else {
                description.classList.add('inputPass');
                descriptionPass = true;
            }
        } else {
            description.classList.add('inputError');
            descriptionError.innerText = "The description must contains at least one letter.";
            descriptionPass = false;
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

    const functionValue = VerifyDropdown(selectAudience, audienceError, "Audience");
    if (functionValue == true) {
        selectAudience.classList.add('inputPass');
        audiencePass = true;
    }
})

selectAudience.addEventListener('change', function () {
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

    const functionValue = VerifyDropdown(language_dropdown, languageError, "Langugage");
    if (functionValue == true) {
        language_dropdown.classList.add('inputPass');
        languagePass = true;
    }
})

language_dropdown.addEventListener('change', function () {
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

    const functionValue = VerifyDropdown(category_dropdown, categoryError, "Category");
    if (functionValue == true) {
        category_dropdown.classList.add('inputPass');
        categoryPass = true;
    }
})

category_dropdown.addEventListener('change', function () {
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
        if (this.checked) {
            publishingForm = this.id;
            if (publishingForm == "SelfPublish") {
                self_inputs.hidden = false;
                publishingStatus = 2;
                console.warn('Selfpublish boolean: ', publishingStatus);
            }

            if (publishingForm == "PublisherPublish") {
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
    const removeSpaces = bankValue.replace(/ /g, "");

    if (bankValue == "") {
        bankAccNumber.classList.add('inputError');
        bankError.innerHTML = `<p>This field cannot be empty.</p>`;
        return false;

    } else if (removeSpaces.length < 15) {
        bankAccNumber.classList.add('inputError');
        bankError.innerHTML = `<p>This value is too short. The IBAN number should be between 15 and 34 characters.</p>`;
        return false;

    } else if (removeSpaces.length > 34) {
        bankAccNumber.classList.add('inputError');
        bankError.innerHTML = `<p>This value is too long. The IBAN number should be between 15 and 34 characters.</p>`;
        return false;

    } else if (removeSpaces.length >= 15 && removeSpaces.length <= 34) {
        bankAccNumber.classList.add('inputPass');
        const upperCase = removeSpaces.toUpperCase();
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
        priceValue = "";
    } else {
        const minFunctionValue = minPrice(bookPrice.value);
        if (minFunctionValue == false) {
            priceValue = "";
            pricePass = false;
            priceError.innerHTML = `<p class="priceErrorP">The price must be a minimum of 1000 Hungarian Forints!</p>`;
            bookPrice.classList.add('inputError');
        } else {
            bookPrice.classList.add('inputPass');
            pricePass = true;
            priceValue = bookPrice.value;
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

    if (adultCheckbox.checked == true) {
        isAdultLiterature = true;
    } else {
        isAdultLiterature = false;
    }

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
                    const fileUploadResponse = await uploadFilePhp();

                    if (fileUploadResponse.status === 200) {

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
                            "coverImage": `pictures/book/${imgDataToSend}`,
                            "file": `book/${fileDataToSend}`,
                            "bankAccountNumber": "null",
                            "chapterNumber": chapternumber
                        });


                        switch (setBook_response_publisher.status) {
                            case 200:
                                localStorage.removeItem("bookId");
                                window.location.href = "../General-HomePage/GenHome.html";
                                break;
                            case 403:
                                window.location.href = "../404/404.html";
                                break;
                            case 401:
                                window.location.href = "../Log-in/login.html";
                                break;
                            case 422:
                                alert("Please make sure you fill in all fields correctly!");
                                break;
                            default:
                                alert("Something went worng. Please try it later!");
                                break;
                        }
                    } else {
                        alert(fileUploadResponse.message);
                    }

                } else {
                    const fileUploadResponse = await uploadFilePhp();

                    if (fileUploadResponse.status === 200) {

                        const addBook_response_publisher = await addBook({
                            "title": titleValue,
                            "description": descValue,
                            "targetAudienceId": audienceData,
                            "languageId": selectedLanguage,
                            "adultFiction": isAdultLiterature,
                            "categoryId": selectedCategory,
                            "statusId": 1,
                            "price": "null",
                            "coverImage": `pictures/book/${imgDataToSend}`,
                            "file": `book/${fileDataToSend}`,
                            "bankAccountNumber": "null",
                            "chapterNumber": chapternumber
                        });

                        switch (addBook_response_publisher.status) {
                            case 200:
                                localStorage.removeItem("bookId");
                                window.location.href = "../General-HomePage/GenHome.html";
                                break;
                            case 403:
                                window.location.href = "../404/404.html";
                                break;
                            case 401:
                                window.location.href = "../Log-in/login.html";
                                break;
                            case 422:
                                alert("Please make sure you fill in all fields correctly!");
                                break;
                            default:
                                alert("Something went worng. Please try it later!");
                                break;
                        }
                    } else {
                        alert(fileUploadResponse.message);
                    }

                }
            } else {
                alert("Please make sure you fill in all fields correctly!");

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

                    const fileUploadResponse = await uploadFilePhp();

                    if (fileUploadResponse.status === 200) {

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
                            "coverImage": `pictures/book/${imgDataToSend}`,
                            "file": `book/${fileDataToSend}`,
                            "bankAccountNumber": bankAccNumber.value,
                            "chapterNumber": chapter_number.value
                        });

                        switch (setBook_self.status) {
                            case 200:
                                localStorage.removeItem("bookId");
                                window.location.href = "../General-HomePage/GenHome.html";
                                break;
                            case 403:
                                window.location.href = "../404/404.html";
                                break;
                            case 401:
                                window.location.href = "../Log-in/login.html";
                                break;
                            case 422:
                                alert("Please make sure you fill in all fields correctly!");
                                break;
                            default:
                                alert("Something went worng. Please try it later!");
                                break;
                        }
                    } else {
                        alert(fileUploadResponse.message);
                    }

                } else {
                    const fileUploadResponse = await uploadFilePhp();

                    if (fileUploadResponse.status === 200) {

                        const addBook_response_self = await addBook({
                            "title": titleValue,
                            "description": descValue,
                            "targetAudienceId": audienceData,
                            "languageId": selectedLanguage,
                            "adultFiction": isAdultLiterature,
                            "categoryId": selectedCategory,
                            "statusId": 2,
                            "price": 0,
                            "coverImage": `pictures/book/${imgDataToSend}`,
                            "file": `book/${fileDataToSend}`,
                            "bankAccountNumber": bankValue,
                            "chapterNumber": chapternumber
                        });

                        switch (addBook_response_self.status) {
                            case 200:
                                localStorage.removeItem("bookId");
                                window.location.href = "../General-HomePage/GenHome.html";
                                break;
                            case 403:
                                window.location.href = "../404/404.html";
                                break;
                            case 401:
                                window.location.href = "../Log-in/login.html";
                                break;
                            case 422:
                                alert("Please make sure you fill in all fields correctly!");
                                break;
                            default:
                                alert("Something went worng. Please try it later!");
                                break;
                        }
                    } else {
                        alert(fileUploadResponse.message);
                    }
                }


            } else {
                alert("Please make sure you fill in all fields correctly!");

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

async function uploadFilePhp() {
    const formData = new FormData();
    formData.append('file', inputFile.files[0]);
    formData.append('image', inputPicture.files[0]);

    const file = inputFile.files[0];
    if (file.type !== 'application/pdf') {
        return { status: 400, message: 'The file type can only be PDF!' };
    }
    const filePages = await countPdfPages(file);
    if (filePages < 5) {
        return { status: 400, message: 'The file must be at least 5 pages long!' };
    }

    const image = inputPicture.files[0];
    if (image.type !== 'image/jpeg') {
        return { status: 400, message: 'Image type must be JPG only!' };
    }

    try {
        const response = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });

        if (response.status === 200) {
            return { status: 200 };
        } else {
            return { status: response.status };
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        return { status: 500 };
    }
}

function countPdfPages(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const pdf = new Uint8Array(event.target.result);
            let pages = 0;
            for (let i = 0; i < pdf.length; i++) {
                if (pdf[i] === 0x0c && pdf[i + 1] === 0x0a) {
                    pages++;
                }
            }
            resolve(pages);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
}