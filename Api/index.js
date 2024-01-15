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
    * 200: Successfully registration
    * 
    * 409: Unsuccessfully registration
    * 
    * 422:
        * error: Returns possible errors at field level
            * companyNameError
            * usernameError
            * firstNameError
            * lastNameError
            * emailError
            * passwordError
            * aszfError
 */
async function publisherRegistration(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/publisherRegistration", requestOptions);
        const data = await response.json();

        if (response.status == 200 || response.status == 409) {
            return { status: response.status }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error };
    }
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
    * 200: Successfully registration
    * 
    * 409: Unsuccessfully registration
    * 
    * 422:
        * error: Returns possible errors at field level
            * birthdateError
            * usernameError
            * firstNameError
            * lastNameError
            * emailError
            * passwordError
            * aszfError
 */
async function generalRegistration(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/generalRegistration", requestOptions);
        const data = await response.json();

        if (response.status == 200 || response.status == 409) {
            return { status: response.status }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error }
    }
}



// ----- LOGIN -----

/**
 * @param {JSON} raw = {
 *      "email": "elso@general.com",
        "password": "Alma123*"
 *  }
 *
 * @return
    * 200: 
        * token
        * first
            * true: when the user logs in for the first time
            * false: if the user is not logging in for the first time
    * 422: loginError
 */
async function login(raw) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/login", requestOptions);
        const data = await response.json();

        localStorage.setItem("Token", data.jwt);

        return {
            status: response.status,
            data: data
        };
    } catch (error) {
        return { error: error };
    }
}



// ----- TOKEN -----

/**
 * @return
    * 302:
        * User has a token
            * image
            * username
            * rank
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
 */
async function token() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/token", requestOptions);
        const data = await response.json();

        if (response.status == 302) {
            return {
                status: response.status,
                data: data
            }
        }

        return {
            status: response.status,
            data: await response.text()
        }
    } catch (error) {
        return { error: error }
    }
}



// ----- GENERAL HOME -----

/**
 * @return
    * 200:
        * 9 most saved books of the month details
            * book id
            * cover image
            * title
            * author name
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
    * 
    * 401: 
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getMostSavedBooksOfTheMonth() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getMostSavedBooksOfTheMonth", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status = 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * 9 published book details
            * book id
            * cover image
            * title
            * author name
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
    * 
    * 401: 
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getPublishedBooks() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getPublishedBooks", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status = 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * 9 self published book details
            * book id
            * cover image
            * title
            * author name
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
    * 
    * 401: 
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getSelfPublishedBooks() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getSelfPublishedBooks", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status = 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * a random book details:
            * book id
            * cover image
            * title
            * author name
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getOneRandomBook() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getOneRandomBook", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status = 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * 9 recommanded book details:
            * book id
            * cover image
            * title
            * author name
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getRecommandedBooks() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getRecommandedBooks", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status = 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}



// ------ PUBLICATION -----

/**
 * @return
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
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getDropDownValues() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getDropDownValues", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status = 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "title": "Első könyv",
        "description": "Ez az első könyv leírása.",
        "targetAudienceId": 1,
        "languageId": 1,
        "adultFiction": true,
        "categoryId": 1,
        "statusId": 2,      // 1: looking for a publisher       2: self-publish
        "price": 1200,
        "coverImage": "Ez a kép elérési útja",
        "file": "Ez a könyv elérési útja",
        "bankAccountNumber": "HU12345678",
        "chapterNumber": 20
 *  }
 * 
 * @return
    * 200: Successful
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
    * 
    * 422:
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
            * chapterNumberError
 */
async function addBook(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/addBook", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1
 *  }
 * 
 * @return
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
    * 
    * 401: 
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
 */
async function getBookDetails(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getBookDetails", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1,
        "title": "Negyedik könyv",
        "description": "Ez a negyedik könyv leírása.",
        "targetAudienceId": 1,
        "languageId": 1,
        "adultFiction": true,
        "categoryId": 1,
        "statusId": 2,      // 1: looking for a publisher       2: self-publish
        "price": 1200,
        "coverImage": "Ez a kép elérési útja",
        "file": "Ez a könyv elérési útja",
        "bankAccountNumber": "12345678",
        "chapterNumber": 20
 *  }
 *
 * @return
    * 200: Successful set a book
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: You are not authorised to access this page
    * 
    * 422:
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
            * chapterNumberError
 */
async function setBook(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/setBook", requestOptions);
        const data = await response.json();

        if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}



// ----- FEED -----

/**
 * @param {JSON} raw = {
 *      "description": "Ez a poszt leírása."
 *  }
 * 
 * @return
    * 200: Successfully added the post
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 409: Unsuccessfully added the post
    * 
    * 422: 
        * error: if the post description is empty
            * postError
 */
async function addPost(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/addPost", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "postId": 1
 *  }
 * 
 * @return
    * 200: Successfully liked the post
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 422:
        * error: if this post doesn't exist
            * postlikeError   
 */
async function postLike(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/postlike/postLike", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "postId": 1
 *  }
 * 
 * @return
    * 200: Successfully disliked the post
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 422:
        * error: if this post doesn't exist
            * postlikeError   
 */
async function postDislike(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/postlike/postDislike", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * posts by followed user
            * id
            * username
            * image
            * post time
            * post description
            * liked
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
 */
async function getFeedPosts() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/getFeedPosts", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        }

        return {
            status: response.status,
            data: await response.text()
        }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * recommanded users
            * username
            * image
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
 */
async function getRecommandedUsers() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/getRecommandedUsers", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        }

        return {
            status: response.status,
            data: await response.text()
        }
    } catch (error) {
        return { error: error }
    }
}



// ----- CATEGORY INTEREST -----

/**
 * @param {JSON} raw = {
 *      "categoryIds": [
 *          1,
 *          2,
 *          3,
 *          4
 *      ]
 *  }
 * 
 * @return
    * 200:
        * recommanded users
            * username
            * image
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 422:
        * error:
            * categoryInterestError
 */
async function addCategoryInterest(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/categoryinterest/addCategoryInterest", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * category id
        * category name
        * category image
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
 */
async function getAllCategory() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/category/getAllCategory", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error }
    }
}



// ----- PUBLISHER HOME -----

/**
 * @return
    * 200:
        * book id
        * cover image
        * title
        * author name
        * first name
        * last name
        * book description
        * pages number
        * book rating
        * language
        * saved
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: User is not a publisher user
 */
async function getOneRandomLookingForPublisherBook() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getOneRandomLookingForPublisherBook", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * book id
        * cover image
        * title
        * author name
        * first name
        * last name
        * book description
        * pages number
        * book rating
        * language
        * saved
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: User is not a publisher user
 */
async function getRecommandedBooksForPublisher() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getRecommandedBooksForPublisher", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @return
    * 200:
        * 4 random category's books
            * book id
            * cover image
            * title
            * author name
            * first name
            * last name
            * book description
            * pages number
            * book rating
            * language
            * saved
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 403: User is not a publisher user
 */
async function getRandomBookByCategory() {
    var myHeaders = new Headers();

    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getRandomBookByCategory", requestOptions);
        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                data: data
            }
        } else if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}



// ----- PROFILES -----

/**
 * @param {JSON} raw = {
 *      "profileUsername" = "lilapapucs"
 *  }
 * 
 * @returns
    * 200:
        * general user profile:
            * rank
            * username
            * image
            * following
            * first name
            * last name
            * book count
            * saved book count
            * followers count
            * intro description
            * website
            * cover color code
            * ownProfile
        * publisher user profile:
            * rank
            * username
            * image
            * following
            * company name
            * book count
            * saved book count
            * followers count
            * intro description
            * website
            * cover color code
            * ownProfile
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: profileUsernameError
 */
async function getUserDetails(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/getUserDetails", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "profileUsername": "lilapapucs"
 *  }
 * 
 * @return
    * 200:
        * books:
            * book id
            * category name
            * cover image
            * title
            * author name
            * first name
            * last name
            * company name
            * book description
            * pages number
            * book rating
            * language
            * saved
        * own books
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 422: prifileUsernameError
 */
async function getUserBooks(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getUserBooks", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error }
    }
}


/** 
 * @param {JSON} raw = {
 *      "profileUsername": "lilapapucs"
 *  }
 * 
 * @return
    * 200:
        * posts:
            * post id
            * username
            * image
            * post time
            * description
            * liked
        * own posts
    * 
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 
    * 422: prifileUsernameError
 */
async function getUserPosts(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/getUserPosts", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        }

        return {
            status: response.status,
            data: data
        }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1
 *  }
 * 
 * @return:
    * 200: Successfully saved the book
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: saveBookError 
 */
async function saveBook(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/saveBook", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1
 *  }
 * 
 * @return
    * 200: Successfully delete the book saved
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: deleteSavedBookError
 */
async function deleteSavedBook(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/deleteSavedBook", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "followedId": 2
 *  }
 * 
 * @return
    * 200: Successfully follow the user
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: followUserError
 */
async function followUser(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/follow/followUser", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "followedId": 1
 *  }
 * 
 * @return
    * 200: Successfully follow the user
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: unfollowedUserError 
 */
async function unfollowedUser(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/follow/unfollowedUser", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1
 *  }
 * 
 * @return
    * 200: Successfully delete post
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: deletePostError 
 */
async function deletePost(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/deletePost", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1,
 *      "description": "Ez egy módosított leírás!"
 *  }
 * 
 * @return
    * 200: Successfully update post
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: updatePostError 
 */
async function updatePost(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/updatePost", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @param {JSON} raw = {
 *      "id": 1
 *  }
 * 
 * @return
    * 200: Successfully delete the book
    * 403: User is not a general user
    * 401:
        * User hasn't token
        * Invalid token
        * The token has expired
    * 422: deleteBookError 
 */
async function deleteBook(raw) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    var storedToken = localStorage.getItem("Token");
    if (storedToken) {
        myHeaders.append("Token", storedToken);
    }

    var postData = JSON.stringify(raw);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: postData,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/deleteBook", requestOptions);
        const data = await response.json();

        if (response.status == 401) {
            return {
                status: response.status,
                data: await response.text()
            }
        } else if (response.status == 422) {
            return {
                status: response.status,
                data: data
            }
        }

        return { status: response.status }
    } catch (error) {
        return { error: error }
    }
}


/**
 * @returns 
    * 200:
        * id
        * question
        * answer
 */
async function getActiveHelpCenter() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/helpcenter/getActiveHelpCenter", requestOptions);
        const data = await response.json();

        return {
            status: response.status,
            data: data
        }
    } catch(error) {
        return { error: error }
    }
}