

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
            const userDatas = await getUserDetails({ "profileUsername": tokenResponse.data.username });
            LoadUserDatas(userDatas);

            const RecommandedUsers_response = await getRecommandedUsers();
            console.log(RecommandedUsers_response);
            LoadRecommandedUsers(RecommandedUsers_response);

            const feedpost_response = await getFeedPosts();
            console.log(feedpost_response);
            LoadPosts(feedpost_response);


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
            // alert("You posted successfully. Please reload the page so that we can display your post.")
            location.reload();
        } else if (addPost_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (addPost_result.status == 409) {
            alert("Something went wrong. Please try again later.")
        } else if (addPost_result.status == 422) {
            alert("You can't post the big nothing. Please give us some text.")
        } else {
            alert("Something went wrong. Status code: " + addPost_result.status);
        }
    }

})

let likeButtons = document.querySelectorAll(".like-button");

let postLikes = {};
async function LoadPosts(response) {
    
    // dátum szerin rendezzük a response-t így később a rendezett sorrendben tölti majd be az adatokat a kártyába
    response.data.sort((a, b) => new Date(b.postTime) - new Date(a.postTime));
   

    for (let i = 0; i <= response.data.length - 1; i++) {

        let postID = response.data[i].id;
        let postLiked = response.data[i].liked;
        postLikes[postID] = postLiked;

        if (response.data[i].liked == false) {
            pcGroup.innerHTML += `
                <div class="post-card ">
                    <div class="first-row">
                        
                        <img class="post-profile-icon rounded-circle shadow-sm" src="../${response.data[i].image}">
                        
                        <div class="userName">
                            <p class="card-user-name">@${response.data[i].username}</p>
                        </div>
                        <div class="cardDate align-content-end">
                            <p class="card-date-text">${response.data[i].postTime}</p>
                        </div>
                    </div>

                    <div class="postText">
                        <p class="post-text">${response.data[i].description}</p>
                    </div>

                    <div class="last-row">
                        
                        <div class="like-and-share">
                            <div class="d-flex flex-column align-items-center emptyLike">
                            
                                <button class="like-button border-0 bg-transparent" id="like" onclick="Liked(this, ${response.data[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
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


        } else {

            pcGroup.innerHTML += `
                    <div class="post-card ">
                        <div class="first-row">
                            
                            <img class="post-profile-icon rounded-circle shadow-sm" src="../${response.data[i].image}">
                            
                            <div class="userName">
                                <p class="card-user-name">@${response.data[i].username}</p>
                            </div>
                            <div class="cardDate align-content-end">
                                <p class="card-date-text">${response.data[i].postTime}</p>
                            </div>
                        </div>

                        <div class="postText">
                            <p class="post-text">${response.data[i].description}</p>
                        </div>

                        <div class="last-row">
                            
                            <div class="like-and-share">
                                <div class="d-flex flex-column align-items-center emptyLike">
                                
                                    <button class="like-button border-0 bg-transparent" id="like" ><svg onclick="Liked(this, ${response.data[i].id})" class="liked" xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
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

    }

}


async function Liked(button, postID) {
    let postLiked = postLikes[postID];


    if (!postLiked) {
        // Ha a poszt nincs like-olva, akkor like-oljuk
        const liked_result = await postLike({ "postId": postID });
        if (liked_result.status == 200) {
            button.style.fill = "#c43700";
            postLikes[postID] = true; // Frissítjük a like állapotot
            console.log("Sikeres kedvelés. Post id: " + postID);
        } else if (liked_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (liked_result.status == 422) {
            alert("Something went wrong. Please try again later.")
        }
    } else {
        // Ha a poszt like-olva van, akkor dislike-oljuk
        const disliked_result = await postDislike({ "postId": postID });
        if (disliked_result.status == 200) {
            button.style.fill = "#2d1810";
            postLikes[postID] = false; // Frissítjük a like állapotot
            console.log("Sikeres dislike. Post id: " + postID);
        } else if (disliked_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (disliked_result.status == 422) {
            alert("Something went wrong. Please try again later.")
        }
    }

}

const logout_btn = document.getElementById('Logout');
logout_btn.addEventListener('click', (e) => {
    localStorage.removeItem("Token");
    window.location.assign('../Landing-Page/landing.html');
})

async function LoadUserDatas(userResponse) {
    const writingBTN = document.getElementById('writingBtn');
    const profile_icon = document.getElementById('profile-icon');
    const userName = document.getElementById('userName-p');

    if (userResponse.data.rank == "publisher") {
        writingBTN.hidden = true;
    }

    if (userResponse.data.image != undefined) {
        profile_icon.innerHTML = `<img class="rounded-circle" src="../${userResponse.data.image}" alt="${userResponse.data.username} profile picture"></img>`;
    } else {
        profile_icon.innerHTML = `<img class="rounded-circle" src="../pictures/default-profile-pic-man.png" alt="${userResponse.data.username} profile picture"></img>`;
    }

    userName.innerText = `@${userResponse.data.username}`;

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
