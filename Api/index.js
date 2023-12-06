/**
 * 
 *  @param {JSON} raw = {
 *      "username": "masodik_publisher",
        "firstName": "masodik",
        "lastName": "publisher",
        "companyName": "masodik_company",
        "email": "masodik@publisher.com",
        "password": "Alma123*",
        "aszf": true
 *  }
 */
function publisherRegistration(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/publisherRegistration", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


/**
 * 
 * @param {JSON} raw = {
 *      "username": "harmadik_general",
        "firstName": "harmadik",
        "lastName": "general",
        "email": "harmadik@general.com",
        "birthdate": "2000-11-12",
        "password": "Alma123*",
        "aszf": true
 * }
 */
function generalRegistration(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/generalRegistration", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


/**
 * 
 * @param {JSON} raw = {
 *      "email": "elso@general.com",
        "password": "Alma123*"
 * }
 */
function login(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        localStorage.setItem("Token", result.jwt)
    })
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


function token() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if(storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/token", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}