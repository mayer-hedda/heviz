/**
 * 
 *  @param {JSON} raw = {
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
 *  @param {JSON} raw = {
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
 *  @param {JSON} raw = {
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
 *  @param {JSON} raw = {
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


function getMostListedBooksOfTheMonth() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
        
    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/List/getMostListedBooksOfTheMonth", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}


/**
 * 
 *  @param {JSON} raw = {
        "postId": 2
 *  }
 */
function addPostlike(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: postData,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/Postlike/addPostlike", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}


/**
 * 
 *  @param {JSON} raw = {
        "postId": 1
 *  }
 */
function deletePostlike(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: postData,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/Postlike/deletePostlike", requestOptions)
    .then(response => response.text())
    .then(result => {
        return result;
    })
    .catch(error => console.log('error', error));
}