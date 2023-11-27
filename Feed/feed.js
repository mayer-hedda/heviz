

// change the like icon when hovering over or clicked on the like
// minden poszt kártyát itt hozunk létre, nem pedig html-ben
const dataUrl = './db.json';
const pcGroup = document.getElementById("kulsoPostCard");

fetch(dataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba a fájl betöltése közben');
        }
        return response.json();
    })

    .then(data => {
        const posts = data.posts;
        for (const posts of data.posts) {
            // console.log(`Felhasználónév: ${posts.username}`);
            // console.log('felhaszn');
            console.log(`${posts.id}`);
            console.log(`${posts.username}`);

            pcGroup.innerHTML += `
                <div class="post-card ">
                    <div class="first-row">
                        <!--? profil kép helye  -->
                        <div class="post-profile-icon" style="background-image: url('${posts.profilPicURL}');"></div>
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
                        <div class="tags">
                            <a href="#" class="tag-design">#Book Title</a>
                        </div>
                        <div class="like-and-share">
                            <div class="d-flex flex-column align-items-center emptiLike">
                                <div class="like" id="heart"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                             
                                </div>

                              
                                
                                <span class="text-center like">Like</span>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <div class="share"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                              </svg></div>
                                <span class="text-center share">Share</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
)

const emptyLike = document.getElementById('heart');
const filledLike = document.getElementById('active-heart');

emptyLike.addEventListener('click', (e)=>{
    e.preventDefault();
    console.warn("like");
})

