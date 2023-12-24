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
        .then(response => {
            if(response.status == 200 || response.status == 422) {
                return { status: response.status };
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
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
        .then(response => {
            if(response.status == 200 || response.status == 422) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
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
        * 200: 
            * token
            * first
                * true: when the user logs in for the first time
                * false: if the user is not logging in for the first time
        * 422: loginError
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
        .then(response => {
            return response.json().then(data => {
                localStorage.setItem("Token", data.jwt);
                return { 
                    status: response.status, 
                    data: data 
                };
            })
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return {
                        status: response.status,
                        data: data
                    }
                })
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403 || response.status == 200) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function setBook(raw) {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/setBook", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403 || response.status == 200) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function addPost(raw) {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/addPost", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 409 || response.status == 200) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function postLike(raw) {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/postlike/postLike", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 200) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function postDislike(raw) {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/postlike/postDislike", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 200) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getFeedPosts() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/post/getFeedPosts", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getRecommandedUsers() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/getRecommandedUsers", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function addCategoryInterest(raw) {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/categoryinterest/addCategoryInterest", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 200) {
                return { status: response.status }
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getAllCategory() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/category/getAllCategory", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getOneRandomLookingForPublisherBook() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getOneRandomLookingForPublisherBook", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status };
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getRecommandedBooksForPublisher() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getRecommandedBooksForPublisher", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status };
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getRandomBookByCategory() {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/book/getRandomBookByCategory", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status };
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
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
    function getUserDetails(raw) {
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

        fetch("http://127.0.0.1:8080/CyberRead-1.0-SNAPSHOT/webresources/user/getUserDetails", requestOptions)
        .then(response => {
            if(response.status == 401) {
                return response.text().then(data => {
                    return { 
                        status: response.status, 
                        data: data 
                    };
                });
            } else if(response.status == 403) {
                return { status: response.status };
            }
            return response.json().then(data => {
                return { 
                    status: response.status, 
                    data: data 
                };
            });
        })
        .catch(error => console.log('error', error));
    }