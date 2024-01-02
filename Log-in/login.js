// variables
const submitButton = document.getElementById("submitButton");
const inputEmail = document.getElementById("input-Email");
const inputPwd = document.getElementById("input-Pwd");
const emailError = document.getElementById("email_error");
const pwdError = document.getElementById("pwd_Error");
let emailValid = false;
let pwdValid = false;

// FUNCTIONS
// active button
function BtnActivate() {
    if (pwdValid == true && emailValid == true) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// EVENT LISTENERS
// email
inputEmail.addEventListener("focusout", (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    if (emailValue == "") {
        emailError.innerHTML = `<p>Email field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        emailValid = false;
    } else {
        emailValid = true;
        BtnActivate();
    }
})
inputEmail.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    emailError.innerHTML = "";
})

// password
inputPwd.addEventListener("focusout", (e) => {
    e.preventDefault();
    const pwdValue = inputPwd.value;
    if (pwdValue == "") {
        pwdError.innerHTML = `<p>Password field cannot be empty.</p>`;
        e.target.style.background = "#FEEFEC";
        pwdValid = false;
    } else {
        pwdValid = true;
        BtnActivate();
    }
})
inputPwd.addEventListener("focusin", (e) => {
    e.preventDefault();
    e.target.style.background = "";
    pwdError.innerHTML = "";
})

/*
EVENT LISTENERS - SUBMIT BUTTON
*/

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const postData = {
        "email": inputEmail.value,
        "password": inputPwd.value
    };

    const responseLogin = await login(postData);
    console.log(responseLogin);

    // var status;
    // var jwt;
   
    // const response = await fetch('http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(postData)
    // })
    // // console.log(response);

    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Hálózati hiba: ' + response.statusText);
    //     }
    //     return response;
    // })
    // response.json().then(data => {
    //     console.log('Válasz a backendtől:', data);
    //     status = response.status;
    //     jwt = data.jwt;
    // })
    // .then(response =>{
    //     switch (status) {
    //         case 200:
                
                
        
    //         default:
    //             break;
    //     }
    // })
    // .catch(error => {
    //     console.error('Hálózati hiba:', error);
    // });
    
    
//    console.log(response.status);
    // console.log(data);
    // switch(response.status){
    //     case 200:
    //         const tokenResponse = await fetch('http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/token', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         console.log(tokenResponse);
    // }


    inputEmail.value = '';
    inputPwd.value = '';
})

// function login(raw) {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var postData = JSON.stringify(raw);

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: postData,
//         redirect: 'follow'
//     };

//     fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/login", requestOptions)
//         .then(response => {
//             return response.json().then(data => {
//                 localStorage.setItem("Token", data.jwt);
//                 return {
//                     status: response.status,
//                     data: data
//                 };
//             })
//         })
//         .catch(error => console.log('error', error));
// }

// ENDPOINT
// async function login() {
//     console.log("bemegy a loginba");

//     // console.log(postData);

//     const response = await fetch('http://localhost:9990/webresources/user/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(postData)

//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Hálózati hiba: ' + response.statusText);
//             }
//             console.log(localStorage.getItem);
//             return response.json();
//         })
//         .then(data => {
//             console.log('Válasz a backendtől:', data);
//         })
//         .catch(error => {
//             console.error('Hálózati hiba:', error);
//         });

//     // token vizsgálata
//     if (response && response.token) {
        
//         const userData = await token();
//         const localToken = localStorage.getItem();
//         console.log(localToken);

//         try{
//             switch (userData.status) {
//                 case 302:
//                     const rank = userData.data.rank;
//                     switch (rank) {
//                         case 'general':
//                             loadHtmlFile('../General-HomePage/GenHome.html');
//                             break;
                    
//                         case 'publisher':
//                             console.log("publisher lesz");
//                             break;
//                     }
//                     break;
            
//                 default:
//                     break;
//             }
//             // if (userData.status === 302) {
//             //     const rank = userData.data.rank;
    
//             //     switch (rank) {
//             //         case 'general':
//             //             loadHtmlFile('../General-HomePage/GenHome.html');
//             //             break;
                   
//             //         case 'publisher':
//             //             // loadHtmlFile('defaultHome.html');
//             //             console.log("Ez egy publisher profil lesz");
//             //             break;
//             //     }
//             // } else if (userData.status === 401) {
//             //     // Ezzel elvileg láthatom majd console-on hogy mit küld vissza a backend
//             //     console.log("Az állapotkód: " + userData.status);
//             //     console.log("A hibaüzenet: " + userData.headers.get("X-Message"));
//             // }
//         }

//         catch(error) {
//             if(!error.status){
//                 console.log("Hiba történt a kéréssel: " + error.message);
//             } else {
//                 console.log("Az állapotkód: " + error.status);
//                 console.log("A hibaüzenet: " + error.headers.get("X-Message"));
//             }
//         }
        
//     }


// }