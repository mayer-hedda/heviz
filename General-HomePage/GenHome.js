window.onload = function() {
    loadRandomBook();
};

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

//* MODAL
const modal_body = document.getElementById('modal-body');
const modal_title = document.getElementById('modal-title');
const modal_author = document.getElementById('modal-author');
const modal_pages = document.getElementById('modal-pages');
const modal_ranking = document.getElementById('modal-ranking');
const modal_language = document.getElementById('modal-language');
const modal_desc = document.getElementById('modal-desc');

async function loadRandomBook(){
    
    const response = await fetch('http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getOneRandomBook', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        //! itt mit kell kezdenem a redirect-el?
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Hálózati hiba: ' + response.statusText);
        }
        return response.json();
    })

    // token vizsgálata
    if (response && response.token) {
        localStorage.setItem("Token", response.token);
        const userData = await token();

        try{
            if (userData.status === 302) {
                
                const randomBookData = await getOneRandomBook();
                try{
                    if (randomBookData.status === 200) {
                        s1_bigCard_div.innerHTML = `
            
                            <img src="../pictures/standard-book-cover.jpg" alt="${randomBookData.title} cover">
            
                        `;

                        s1_bigCard_h2.innerText = `${randomBookData.title}`;
                        s1_bigCard_p.innerText = `${randomBookData.description}`;
                        s1_bigCard_user.innerText = `${randomBookData.firstName} ${randomBookData.lastName}`;
                    
                    }else if(randomBookData.status === 401){
                        // tokenhiba
                        console.log("tokenhiba");
                        console.log("Az állapotkód: " + userData.status);
                        console.log("A hibaüzenet: " + userData.headers.get("X-Message"));
        
                    }else if(randomBookData.status === 403){
                        // nincs jogosultsága ehhez az oldalhoz
                        // ! ide mit töltsek be?
                        console.log("You don't have permission to load this page");
                    }
                }
                catch(error) {
                    if(!error.status){
                        console.log("Hiba történt a kéréssel: " + error.message);
                    } else {
                        console.log("Az állapotkód: " + error.status);
                        console.log("A hibaüzenet: " + error.headers.get("X-Message"));
                    }
                }
                
            } else if (userData.status === 401) {
                // Ezzel elvileg láthatom majd console-on hogy mit küld vissza a backend
                console.log("Az állapotkód: " + userData.status);
                console.log("A hibaüzenet: " + userData.headers.get("X-Message"));
            }
        }

        catch(error) {
            if(!error.status){
                console.log("Hiba történt a kéréssel: " + error.message);
            } else {
                console.log("Az állapotkód: " + error.status);
                console.log("A hibaüzenet: " + error.headers.get("X-Message"));
            }
        }

    

    }
}

// fetch(dataURL)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Hiba a fájl betöltése közben');
//         }
//         return response.json();
//     })

    // .then(data => {
    //     //* S1 CARD
    //     const bigCard = data.bigCard;
    //     for (const bigCard of data.bigCard) {
    //         // console.log(`username: ${bigCard.username}`);
    //         s1_bigCard_div.innerHTML = `
            
    //             <img src="${bigCard.imgURL}" alt="${bigCard.title} cover">
            
    //         `;

    //         s1_bigCard_h2.innerText = `${bigCard.title}`;
    //         s1_bigCard_p.innerText = `${bigCard.description}`;
    //         s1_bigCard_user.innerText = `@${bigCard.username}`;
    //     }

//         //* S2 MEDUM CARD 

//         const mediumCard_s2 = data.mediumCard[0];
//         s2_mediumC_picDiv.innerHTML = `

//             <img class="medium-pic" src="${mediumCard_s2.imgURL}" alt="${mediumCard_s2.title} cover">
        
//         `;
//         s2_mediumC_h2.innerText = `${mediumCard_s2.title}`;
//         s2_mediumC_user.innerText = `@${mediumCard_s2.username}`;
//         s2_mediumC_p.innerText = `${mediumCard_s2.description}`;


//         //* S2 FIRST ROW 
//         for (let i = 1; i <= 4; i++) {
//             const mediumCard = data.mediumCard[i];

//             s2_first_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;

//         }

//         //* s3 MEDIUM CARD
//         const mediumCard_s3 = data.mediumCard[0];
//         s3_mediumCardPic_div.innerHTML = `

//             <img class="medium-pic" src="${mediumCard_s3.imgURL}" alt="${mediumCard_s2.title} cover">
        
//         `;
//         s3_mediumC_h2.innerText = `${mediumCard_s3.title}`;
//         s3_mediumC_user.innerText = `@${mediumCard_s3.username}`;
//         s3_mediumC_desc.innerText = `${mediumCard_s3.description}`;

//         //* S3 FIRST ROW
//         for (let i = 1; i <= 4; i++) {
//             const mediumCard = data.mediumCard[i];

//             s3_first_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;

//         }

//         //* S3 SECOND ROW
//         for (let i = 5; i <= 8; i++) {
//             const mediumCard = data.mediumCard[i];

//             s3_second_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button  class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;

//         }

//         //* s4 MEDIUM CARD
//         const mediumCard_s4 = data.mediumCard[0];
//         s4_mediumCardPic_div.innerHTML = `

//             <img class="medium-pic" src="${mediumCard_s4.imgURL}" alt="${mediumCard_s4.title} cover">
        
//         `;
//         s4_mediumC_h2.innerText = `${mediumCard_s4.title}`;
//         s4_mediumC_user.innerText = `@${mediumCard_s4.username}`;
//         s4_mediumC_desc.innerText = `${mediumCard_s4.description}`;

//         //* S4 FIRST ROW
//         for (let i = 1; i <= 4; i++) {
//             const mediumCard = data.mediumCard[i];

//             s4_first_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;
            

//         }

//         //* S4 SECOND ROW
//         for (let i = 5; i <= 8; i++) {
//             const mediumCard = data.mediumCard[i];

//             s4_second_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button  class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;

//         }

//         //* s5 MEDIUM CARD
//         const mediumCard_s5 = data.mediumCard[0];
//         s5_mediumCardPic_div.innerHTML = `

//             <img class="medium-pic" src="${mediumCard_s5.imgURL}" alt="${mediumCard_s5.title} cover">
        
//         `;
//         s5_mediumC_h2.innerText = `${mediumCard_s5.title}`;
//         s5_mediumC_user.innerText = `@${mediumCard_s5.username}`;
//         s5_mediumC_desc.innerText = `${mediumCard_s5.description}`;


//         //* S5 FIRST ROW
//         for (let i = 1; i <= 4; i++) {
//             const mediumCard = data.mediumCard[i];

//             s5_first_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button  class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;

//         }

//         //* S5 SECOND ROW
//         for (let i = 5; i <= 8; i++) {
//             const mediumCard = data.mediumCard[i];

//             s5_second_row.innerHTML += `
            
//                     <div class="col-3">
//                         <div class="cover-photo">

//                             <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
//                             <div class="overlay">
//                                 <p class="book-title">${mediumCard.title}</p>
//                                 <p class="author-p">@${mediumCard.username}</p>
//                                 <button  class="cover-btn" data-bs-toggle="modal" data-bs-target="#modalID">Start Reading</button>
//                             </div>
//                         </div>
//                     </div>
            
//             `;

//         }


//     })

