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

fetch(dataURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba a fájl betöltése közben');
        }
        return response.json();
    })

    .then(data => {
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

        const mediumCard_first = data.mediumCard[0];
        s2_mediumC_picDiv.innerHTML = `

            <img class="medium-pic" src="${mediumCard_first.imgURL}" alt="${mediumCard_first.title} cover">
        
        `;
        s2_mediumC_h2.innerText = `${mediumCard_first.title}`;
        s2_mediumC_user.innerText = `@${mediumCard_first.username}`;
        s2_mediumC_p.innerText = `${mediumCard_first.description}`;

        // ! HA BENT VAN A FOR AKKOR VALAMIÉRT ÖSSZESZARJA MAGÁT A BÖNGÉSZŐ
        // for (let i = 1; i = 4; i++) {
        //     const mediumCard = data.mediumCard[i];
        //     console.log(mediumCard);
            
        //     s2_first_row.innerHTML = `
            
        //             <div class="col-3">
        //                 <div class="cover-photo">

        //                     <img src="${mediumCard.imgURL}" alt="${mediumCard.title}" class="cover">
        //                     <div class="overlay">
        //                         <p class="book-title">${mediumCard.title}</p>
        //                         <p class="author-p">${mediumCard.username}</p>
        //                         <a role="button" class="cover-btn" href="#">Start Reading</a>
        //                     </div>
        //                 </div>
        //             </div>
            
        //     `;
        // }


    })

// ------------------ hover effekt a borítóknak -----------------------
// const covers = document.getElementsByClassName('cover');

// covers.addEventListener('mouseenter', (e)=>{
//     e.preventDefault();
// })