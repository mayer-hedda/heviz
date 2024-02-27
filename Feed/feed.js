

// change the like icon when hovering over or clicked on the like
// minden poszt kártyát itt hozunk létre, nem pedig html-ben
const dataUrl = './db.json';
const pcGroup = document.getElementById("kulsoPostCard");

// CONTROL MODAL INPUT
const modal_textarea = document.getElementById('message-text');
const characterCounterText = document.getElementById('characterCounter');
const charCounterDes = document.getElementById('characterCounter');
const LetsPost_btn = document.getElementById('LetsPost-btn');

// Ellenőrizzük, hogy van-e a felhasználónak tokenje, ha nem akkor átirányítjuk a login felületre
window.addEventListener('beforeunload', async function () {
    const tokenResponse = await token();

    if (tokenResponse.status === 401) {
        window.location.href = "../Log-in/login.html";
    }
});

window.onload = async function () {
    const tokenResponse = await token();
    console.log(tokenResponse);

    switch (tokenResponse.status) {
        case 401:
            window.location.href = "../Log-in/login.html";
            break;
        case 302:
            LoadUserDatas(tokenResponse);

            const RecommandedUsers_response = await getRecommandedUsers();
            console.log(RecommandedUsers_response);
            LoadRecommandedUsers(RecommandedUsers_response);
            break;
    }
}

modal_textarea.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = modal_textarea.value;
    let count = currentText.length;
    characterCounterText.textContent = `${count}/1000`;

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
});

LetsPost_btn.addEventListener('click', async function () {
    const currentData = modal_textarea.value;
    if (currentData == "") {
        alert('You have to write something to post.')
    } else {
        const addPost_result = await addPost({ "description": currentData });

        if (addPost_result.status == 200) {
            alert("You posted successfully. Please reload the page so that we can display your post.")
        } else if (addPost_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (addPost_result.status == 409) {
            alert("Something went wrong. Please try again later.")
        }else if(addPost_result.status == 422){
            alert("You can't post the big nothing. Please give us some text.")
        }else{
            alert("Something went wrong. Status code: " + addPost_result.status);
        }
    }

})

fetch(dataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba a fájl betöltése közben');
        }
        return response.json();
    })

    .then(data => {
        const posts = data.posts;       //* ezzel hivatkozik a json azon tömbjében amiben az adatok vannak
        for (const posts of data.posts) {
            // console.log(`Felhasználónév: ${posts.username}`);
            // console.log('felhaszn');
            console.log(`${posts.id}`);
            console.log(`${posts.username}`);

            pcGroup.innerHTML += `
                <div class="post-card ">
                    <div class="first-row">
                        <!--? profil kép helye  -->
                        <div class="post-profile-icon rounded-circle shadow-sm" style="background-image: url('${posts.profilPicURL}');"></div>
                        <!--? User nevének helye -->
                        <div class="userName">
                            <p class="card-user-name">${posts.username}</p>
                        </div>
                        <div class="cardDate align-content-end">
                            <p class="card-date-text">${posts.postTime}</p>
                        </div>
                    </div>

                    <div class="postText">
                        <p class="post-text">${posts.text}</p>
                    </div>

                    <div class="last-row">
                        
                        <div class="like-and-share">
                            <div class="d-flex flex-column align-items-center emptyLike">
                              
                                <button class="like-button border-0 bg-transparent" id="like" onclick="Liked(this, ${posts.id})"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                              </svg></button>
                             
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <button class="border-0 bg-transparent share"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" class="bi bi-share-fill" viewBox="0 0 16 16">
                                    <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    })


let likeButtons = document.querySelectorAll(".like-button");
var liked = false;

function Liked(button, postID) {
    console.log(postID);
    if (liked == false) {
        button.style.fill = "#c43700";
        liked = true;
    } else {
        liked = false;
        button.style.fill = "#2d1810";
    }

}


const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    localStorage.removeItem("Token");
    window.location.assign('../Landing-Page/landing.html');
})

async function LoadUserDatas(tokenResponse) {
    const writingBTN = document.getElementById('writingBtn');
    const profile_icon = document.getElementById('profile-icon');
    const userName = document.getElementById('userName-p');

    if (tokenResponse.data.rank == "publisher") {
        writingBTN.hidden = true;
    }

    if (tokenResponse.data.image != undefined) {
        profile_icon.innerHTML = `<img class="rounded-circle" src="../${tokenResponse.data.image}" alt="${tokenResponse.data.username} profile picture"></img>`;
    } else {
        profile_icon.innerHTML = `<img class="rounded-circle" src="../pictures/default-profile-pic-man.png" alt="${tokenResponse.data.username} profile picture"></img>`;
    }

    userName.innerText = `@${tokenResponse.data.username}`;

}

async function LoadRecommandedUsers(response) {
    const suggestion_div = document.getElementById('suggestion-div');

    for (let i = 0; i <= response.data.length - 1; i++) {
        suggestion_div.innerHTML += `
            <div class="profile-suggestion">
                
                    <img class="rounded-circle smaller-user-profile-pic" src="../${response.data[i].image}" alt="${response.data[i].username} profile picture"></img>
               
                    <div class="userName">
                        <p class="card-user-name">${response.data[i].username}</p>
                    </div>
                <button type="submit" class="btn-more" href="#">More</button>
            </div> 
        `;
    }
}
