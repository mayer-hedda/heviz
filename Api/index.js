/**
 * 
 *  @param {String} raw = {
 *      "username": "elso_publisher",
        "firstName": "elso",
        "lastName": "publisher",
        "companyName": "elso_company",
        "email": "elso@publisher.com",
        "password": "Alma123*"
 *  }
 */
function publisherRegistration(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: postData,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/User/publisherRegistration", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


/**
 * 
 *  @param {String} raw = {
        "username": "harmadik_general",
        "firstName": "harmadik",
        "lastName": "general",
        "email": "harmadik@general.com",
        "birthdate": "2008-08-29",
        "password": "Alma123*"
    *  }
    */
function generalRegistration(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: postData,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/User/generalRegistration", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


/**
 * 
 *  @param {String} raw = {
        "userId": 1,
        "categoryNames": [
            "regény",
            "szépirodalom",
            "utazás"
        ]
    }
    */
function addCategoryInterest(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: postData,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/CategoryInterest/addCategoryInterest", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


/**
 * 
 *  @param {String} raw = {
        "email": "elso@publisher.com",
        "password": "Alma123*"
    }
    */
function login(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: postData,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/User/login", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


function getAllHelpCenter() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
        
    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/HelpCenter/getAllHelpCenter", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}


function getMostListedBooksOfTheMoth() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
        
    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/List/getMostListedBooksOfTheMoth", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}