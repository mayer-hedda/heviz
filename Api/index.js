// ----- REGISTRATION -----

    /**
     *  @param {JSON} raw = {
     *      "username": "masodik_publisher",
            "firstName": "masodik",
            "lastName": "publisher",
            "companyName": "masodik_company",
            "email": "masodik@publisher.com",
            "password": "Alma123*",
            "aszf": true
     *  }
     *
     * @return 
        * error: Returns possible errors at field level
        * Successfully registration
        * Unsuccessfully registration
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/publisherRegistration", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @param {JSON} raw = {
     *      "username": "harmadik_general",
            "firstName": "harmadik",
            "lastName": "general",
            "email": "harmadik@general.com",
            "birthdate": "2000-11-12",
            "password": "Alma123*",
            "aszf": true
     *  }
     * 
     * @return
        * error: returns possible errors at field level
        * Successfully registration
        * Unsuccessfully registration
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/generalRegistration", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }



// ----- LOGIN -----

    /**
     * @param {JSON} raw = {
     *      "email": "elso@general.com",
            "password": "Alma123*"
     *  }
     *
     * @return
        * error (if something value is wrong):
            * loginError
        * jwt token
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



// ----- TOKEN -----

    /**
     * @return
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 302:
            * User has a token
                * image
                * username
                * rank
     */
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



// ----- GENERAL HOME -----

    /**
     * @return
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * 9 most saved books of the month details
                * book id
                * cover image
                * title
                * author name
                * first name
                * last name
                * book description
                * pages number
                * book rating
                * saved
     */
    function getMostSavedBooksOfTheMonth() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getMostSavedBooksOfTheMonth", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @return
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * 9 published book details
                * book id
                * cover image
                * title
                * author name
                * first name
                * last name
                * book description
                * pages number
                * book rating
                * saved
     */
    function getPublishedBooks() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getPublishedBooks", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @return
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * 9 self published book details
                * book id
                * cover image
                * title
                * author name
                * first name
                * last name
                * book description
                * pages number
                * book rating
                * saved
     */
    function getSelfPublishedBooks() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getSelfPublishedBooks", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @return
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * a random book details:
                * book id
                * cover image
                * title
                * author name
                * first name
                * last name
                * book description
                * pages number
                * book rating
                * saved
     */
    function getOneRandomBook() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getOneRandomBook", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @return
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * 9 recommanded book details:
                * book id
                * cover image
                * title
                * author name
                * first name
                * last name
                * book description
                * pages number
                * book rating
                * saved
     */
    function getRecommandedBooks() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getRecommandedBooks", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }



// ------ PUBLICATION -----

    /**
     * @return
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * all target audiences
                * id
                * name
                * minAge
                * maxAge
            * all languages
                * id
                * code
                * language
            * all category
                * id
                * name
     */
    function getDropDownValues() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getDropDownValues", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @param {JSON} raw = {
     *      "title": "Első könyv",
            "description": "Ez az első könyv leírása.",
            "targetAudienceId": 1,
            "languageId": 1,
            "adultFiction": true,
            "categoryId": 1,
            "statusId": 2,
            "price": 1200,
            "coverImage": "Ez a kép elérési útja",
            "file": "Ez a könyv elérési útja",
            "bankAccountNumber": "HU12345678"
     *  }
     * 
     * @return
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200:
            * errors (if something value is wrong):
                * storyTitleError
                * descriptionError
                * targetAudienceError
                * languageError
                * categoryError
                * priceError
                * statusError
                * bankAccountNumberError
                * coverImageError
                * bookFileError
     */
    function addBook(raw) {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        var storedToken = localStorage.getItem("Token");
        if(storedToken) {
            myHeaders.append("Token", storedToken);
        }

        var postData = JSON.stringify(raw);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/addBook", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }


    /**
     * @param {JSON} raw = {
     *      "id": 1
     *  }
     * 
     * @return
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
            * 
        * 200: 
            * book details:
                * id
                * title
                * description
                * target audience id
                * language id
                * adult fiction
                * category id
                * status id
                * price
                * cover image
                * file
                * bank account number
     */
    function getBookDetails(raw) {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        var storedToken = localStorage.getItem("Token");
        if(storedToken) {
            myHeaders.append("Token", storedToken);
        }

        var postData = JSON.stringify(raw);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
        };

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getBookDetails", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
    }