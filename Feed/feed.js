const pcGroup = document.getElementById("kulsoPostCard");

const SavedBooks = document.getElementById('SavedBooks');

// CONTROL MODAL INPUT
const modal_textarea = document.getElementById('message-text');
const characterCounterText = document.getElementById('characterCounter');
const charCounterDes = document.getElementById('characterCounter');
const textError = document.getElementById('textError');
const LetsPost_btn = document.getElementById('LetsPost-btn');

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
            localStorage.removeItem('searchResult');
            localStorage.removeItem('Error Code:');
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            localStorage.removeItem('username');

            document.getElementById('profile-link').addEventListener('click', (e) => {
                navigateToProfile(tokenResponse.data.username);
            });

            const HomePage = document.getElementById('HomePage');
            if (tokenResponse.data.rank == 'publisher') {
                HomePage.addEventListener('click', (e) => {
                    window.location.href = '../Publisher-Home/PubHome.html';
                });

                SavedBooks.textContent = "Saved Books";
            } else {
                HomePage.addEventListener('click', (e) => {
                    window.location.href = '../General-HomePage/GenHome.html';
                });

                SavedBooks.textContent = "My Books";
            }

           
            LoadUserDatas(tokenResponse);

            const RecommandedUsers_response = await getRecommandedUsers();
            LoadRecommandedUsers(RecommandedUsers_response);

            const feedpost_response = await getFeedPosts();
            LoadPosts(feedpost_response);
            break;

        default:
            alert("Something went wrong. Please try again later.");
            console.error(tokenResponse.status);
            console.error(tokenResponse.data);
            console.error(tokenResponse.error);
            break;
    }
}

modal_textarea.addEventListener('focusin', (e) => {
    modal_textarea.classList.remove('inputError');
    textError.innerHTML = "";
});

let count = 0;
const postModal = document.getElementById('postModal');
modal_textarea.addEventListener('input', (e) => {
    e.preventDefault();
    const currentText = modal_textarea.value;
    count = currentText.length;
    characterCounterText.textContent = `${count}/1000`;

    if (count == 0) {

        LetsPost_btn.removeAttribute('data-bs-dismiss', 'modal');
    } else {
        LetsPost_btn.setAttribute('data-bs-dismiss', 'modal');
    }

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
});

LetsPost_btn.addEventListener('click', async function (e) {
    e.preventDefault();

    const currentData = modal_textarea.value;
    if (currentData == "") {
        alert('You have to write something to post.');
    } else {
        const addPost_result = await addPost({ "description": currentData });

        if (addPost_result.status == 200) {
            alert("You posted successfully. You can already seen on your profile.");
            modal_textarea.value = "";
            count = 0;
            characterCounterText.textContent = `${count}/1000`;
        } else if (addPost_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (addPost_result.status == 409) {
            alert("Something went wrong. Please try again later.");
        } else if (addPost_result.status == 422) {
            textError.innerHTML = `<p>${addPost_result.data.postError}</p>`;
            modal_textarea.classList.add('inputError');
        } else {
            alert("Something went wrong. Status code: " + addPost_result.status);
        }
    }
});


let likeButtons = document.querySelectorAll(".like-button");

let postLikes = {};
async function LoadPosts(response) {

    response.data.sort((a, b) => new Date(b.postTime) - new Date(a.postTime));

    if (response.data.length == 0) {
        document.getElementById('no-Post').hidden = false;
    } else {
        document.getElementById('no-Post').hidden = true;
        for (let i = 0; i <= response.data.length - 1; i++) {

            let postID = response.data[i].id;
            let postLiked = response.data[i].liked;
            postLikes[postID] = postLiked;

            if (response.data[i].liked == false) {
                pcGroup.innerHTML += `
                    <div class="post-card ">
                        <div class="first-row">
                            
                            <div class="userName">
                                <img class="post-profile-icon rounded-circle shadow-sm" src="../${response.data[i].image}">
                                <p class="card-user-name user" onclick="navigateToProfile('${response.data[i].username}')">@${response.data[i].username}</p>
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
                                
                                    <button class="like-button border-0 bg-transparent" onclick="Liked(this, ${response.data[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                                </svg></button>
                                
                                </div>
                                
                            </div>
                        </div>
                    </div>
                `;


            } else {

                pcGroup.innerHTML += `
                    <div class="post-card ">
                        <div class="first-row">
                                    
                            <div class="userName">
                                <img class="post-profile-icon rounded-circle shadow-sm" src="../${response.data[i].image}">
                                <p class="card-user-name user" onclick="navigateToProfile('${response.data[i].username}')">@${response.data[i].username}</p>
                            </div>
                            <div class="cardDate align-content-end">
                                <p class="card-date-text">${response.data[i].postTime}</p>
                            </div>
                        </div>
    
                        <div  class="postText">
                            <p lang="hu" class="post-text">${response.data[i].description}</p>
                        </div>
    
                        <div class="last-row">
                                
                            <div class="like-and-share">
                                <div class="d-flex flex-column align-items-center emptyLike">
                                  
                                    <button class="like-button border-0 bg-transparent" ><svg onclick="Liked(this, ${response.data[i].id})" class="liked" xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                                    </svg></button>
                                    
                                </div>
                                    
                                </div>
                            </div>
                    </div>
                 `;
            }

        }
    }


}

function navigateToProfile(username) {
    // console.log(username);
    localStorage.setItem("username", username);
    window.location.href = `../Profile/profile.html?username=${username}`;
}

async function Liked(button, postID) {
    let postLiked = postLikes[postID];

    if (!postLiked) {
        const liked_result = await postLike({ "postId": postID });
        if (liked_result.status == 200) {
            button.style.fill = "#c43700";
            postLikes[postID] = true;

        } else if (liked_result.status == 401) {
            window.location.href = "../Log-in/login.html";
        } else if (liked_result.status == 422) {
            alert("Something went wrong. Please try again later.")
        }
    } else {
     
        const disliked_result = await postDislike({ "postId": postID });
        if (disliked_result.status == 200) {
            button.style.fill = "#2d1810";
            postLikes[postID] = false;
            
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

    console.log(userResponse.data.image);
    if (userResponse.data.image != undefined) {
        profile_icon.innerHTML = `<img class="rounded-circle" src="../${userResponse.data.image}" alt="${userResponse.data.username} profile picture"></img>`;
    } else {
        profile_icon.innerHTML = `<img class="rounded-circle" src="../pictures/default-profile-pic-man.png" alt="${userResponse.data.username} profile picture"></img>`;
    }

    userName.innerText = `@${userResponse.data.username}`;

}

async function LoadRecommandedUsers(response) {
    const suggestion_div = document.getElementById('suggestion-div');

    if (response.data.length == 0) {
        document.getElementById('right-side').hidden = true;
    }

    for (let i = 0; i <= 4; i++) {
        suggestion_div.innerHTML += `
            <div class="profile-suggestion">
                
                    <img class="rounded-circle smaller-user-profile-pic" src="../${response.data[i].image}" alt="${response.data[i].username} profile picture"></img>
               
                    <div class="userName suggested-user">
                        <p class="sug-user-name user" onclick="navigateToProfile('${response.data[i].username}')">@${response.data[i].username}</p>
                    </div>
                <button type="submit" class="btn-more" onclick="navigateToProfile('${response.data[i].username}')">More</button>
            </div> 
        `;
    }
}