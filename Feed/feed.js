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
                        <div class="d-flex flex-column align-items-center">
                            <img src="../icons/GenFeed/heart-solid.svg" class="like" alt="Like">
                            <span class="text-center like">Like</span>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <img src="../icons/GenFeed/share-solid.svg" class="share" alt="Share">
                            <span class="text-center share">Share</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    })
