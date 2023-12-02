//* LOADING DATAS
const dataURL = './db.json';
const s1_bigCard_div = document.getElementById('bigCard-Pic');
const s1_bigCard_h2 = document.getElementById('s1-bigCard-h2');
const s1_bigCard_p = document.getElementById('s1-bigCard-p');

fetch(dataURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Hiba a fájl betöltése közben');
        }
        return response.json();
    })

    .then(data => {
        const bigCard = data.bigCard;
        for(const bigCard of data.bigCard){
            // console.log(`username: ${bigCard.username}`);
            s1_bigCard_div.innerHTML = `
            
                <img src="${bigCard.imgURL}">
            
            `
        }
    })

// ------------------ hover effekt a borítóknak -----------------------
// const covers = document.getElementsByClassName('cover');

// covers.addEventListener('mouseenter', (e)=>{
//     e.preventDefault();
// })