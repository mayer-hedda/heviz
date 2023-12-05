//* LOADING DATAS
const dataURL = './db.json';
const s1_bigCard_div = document.getElementById('bigCard-Pic');
const s1_bigCard_h2 = document.getElementById('s1-bigCard-h2');
const s1_bigCard_user = document.getElementById('s1-bigCard-user');
const s1_bigCard_p = document.getElementById('s1-bigCard-p');

const s2_mediumC_picDiv = document.getElementById('s2-mediumC-pic');
const s2_mediumC_h2 = document.getElementById('s2-mediumC-h2');
const s2_mediumC_user = document.getElementById('s2-mediumC-user');
const s2_mediumC_p = document.getElementById('s2-mediumC-p');

const s2_first_row = document.getElementById('s2-first-row');
const s2_second_row = document.getElementById('s2-second-row');

const s3_mediumCardPic_div = document.getElementById('s3-mediumCardPic-div');
const s3_mediumC_h2 = document.getElementById('s3-mediumC-h2');
const s3_mediumC_user = document.getElementById('s3-mediumC-user');
const s3_mediumC_desc = document.getElementById('s3-mediumC-desc');

const s3_first_row = document.getElementById('s3-first-row');
const s3_second_row = document.getElementById('s3-second-row');

const s4_mediumCardPic_div = document.getElementById('s4-mediumCardPic-div');
const s4_mediumC_h2 = document.getElementById('s4-mediumC-h2');
const s4_mediumC_user = document.getElementById('s4-mediumC-user');
const s4_mediumC_desc = document.getElementById('s4-mediumC-desc');

const s4_first_row = document.getElementById('s4-first-row');
const s4_second_row = document.getElementById('s4-second-row');

const s5_mediumCardPic_div = document.getElementById('s5-mediumCardPic-div');
const s5_mediumC_h2 = document.getElementById('s5-mediumC-h2');
const s5_mediumC_user = document.getElementById('s5-mediumC-user');
const s5_mediumC_desc = document.getElementById('s5-mediumC-desc');

const s5_first_row = document.getElementById('s5-first-row');
const s5_second_row = document.getElementById('s5-second-row');

fetch(dataURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba a fájl betöltése közben');
        }
        return response.json();
    })

    .then(data => {
        //* S1 CARD
        const bigCard = data.bigCard;
        for (const bigCard of data.bigCard) {
            // console.log(`username: ${bigCard.username}`);
            s1_bigCard_div.innerHTML = `
            
                <img src="${bigCard.imgURL}" alt="${bigCard.title} cover">
            
            `;

            s1_bigCard_h2.innerText = `${bigCard.title}`;
            s1_bigCard_p.innerText = `${bigCard.description}`;
            s1_bigCard_user.innerText = `@${bigCard.username}`;
        }

        //* S2 MEDUM CARD 

        const mediumCard_s2 = data.mediumCard[0];
        s2_mediumC_picDiv.innerHTML = `

            <img class="medium-pic" src="${mediumCard_s2.imgURL}" alt="${mediumCard_s2.title} cover">
        
        `;
        s2_mediumC_h2.innerText = `${mediumCard_s2.title}`;
        s2_mediumC_user.innerText = `@${mediumCard_s2.username}`;
        s2_mediumC_p.innerText = `${mediumCard_s2.description}`;


        //* S2 FIRST ROW 
        for (let i = 1; i <= 4; i++) {
            const mediumCard = data.mediumCard[i];

            s2_first_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }

        //* s3 MEDIUM CARD
        const mediumCard_s3 = data.mediumCard[0];
        s3_mediumCardPic_div.innerHTML = `

            <img class="medium-pic" src="${mediumCard_s3.imgURL}" alt="${mediumCard_s2.title} cover">
        
        `;
        s3_mediumC_h2.innerText = `${mediumCard_s3.title}`;
        s3_mediumC_user.innerText = `@${mediumCard_s3.username}`;
        s3_mediumC_desc.innerText = `${mediumCard_s3.description}`;

        //* S3 FIRST ROW
        for (let i = 1; i <= 4; i++) {
            const mediumCard = data.mediumCard[i];

            s3_first_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }

        //* S3 SECOND ROW
        for (let i = 5; i <= 8; i++) {
            const mediumCard = data.mediumCard[i];

            s3_second_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }

        //* s4 MEDIUM CARD
        const mediumCard_s4 = data.mediumCard[0];
        s4_mediumCardPic_div.innerHTML = `

            <img class="medium-pic" src="${mediumCard_s4.imgURL}" alt="${mediumCard_s4.title} cover">
        
        `;
        s4_mediumC_h2.innerText = `${mediumCard_s4.title}`;
        s4_mediumC_user.innerText = `@${mediumCard_s4.username}`;
        s4_mediumC_desc.innerText = `${mediumCard_s4.description}`;

        //* S4 FIRST ROW
        for (let i = 1; i <= 4; i++) {
            const mediumCard = data.mediumCard[i];

            s4_first_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }

        //* S4 SECOND ROW
        for (let i = 5; i <= 8; i++) {
            const mediumCard = data.mediumCard[i];

            s4_second_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }

        //* s5 MEDIUM CARD
        const mediumCard_s5 = data.mediumCard[0];
        s5_mediumCardPic_div.innerHTML = `

            <img class="medium-pic" src="${mediumCard_s5.imgURL}" alt="${mediumCard_s5.title} cover">
        
        `;
        s5_mediumC_h2.innerText = `${mediumCard_s5.title}`;
        s5_mediumC_user.innerText = `@${mediumCard_s5.username}`;
        s5_mediumC_desc.innerText = `${mediumCard_s5.description}`;


        //* S5 FIRST ROW
        for (let i = 1; i <= 4; i++) {
            const mediumCard = data.mediumCard[i];

            s5_first_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }

        //* S5 SECOND ROW
        for (let i = 5; i <= 8; i++) {
            const mediumCard = data.mediumCard[i];

            s5_second_row.innerHTML += `
            
                    <div class="col-3">
                        <div class="cover-photo">

                            <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
                            <div class="overlay">
                                <p class="book-title">${mediumCard.title}</p>
                                <p class="author-p">@${mediumCard.username}</p>
                                <a role="button" class="cover-btn" href="#">Start Reading</a>
                            </div>
                        </div>
                    </div>
            
            `;

        }


    })

// ------------------ hover effekt a borítóknak -----------------------
// const covers = document.getElementsByClassName('cover');

// covers.addEventListener('mouseenter', (e)=>{
//     e.preventDefault();
// })