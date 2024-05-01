<?php
    require_once 'StripePayment.php';

    $stripeSecretKey = 'sk_test_51OjiQZIdwPkbilsb0ofrlvhAZ3yUbjhjatPKeDLGKbXQ4Apy0normfribRApfTfRwP1Ekld3FwgWofbx8JtUSHkh00nElDiiu1'; // Cseréld le a saját titkos kulcsodra
    $stripePayment = new StripePayment($stripeSecretKey);

    $message = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            $token = $_POST['stripeToken'];
            $name = $_POST['customerName']; // Név input mező
            $email = $_POST['customerEmail']; // Email input mező
            $message = $stripePayment->processPayment($token, $name, $email);
        } catch (Exception $e) {
            $message = 'Hiba történt a fizetés során: ' . $e->getMessage();
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>BookShopping</title>
    <script src="https://js.stripe.com/v3/"></script>

    <style>
        body {
            background-color: #F6E3CD;
        }

        #payment-form {
            margin: auto;
            width: 60%;
            background-color: #F7F5EC;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        form {
            text-align: center;
            padding: 50px 20px;
        }

        #customerName, #customerEmail {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 20px;
            width: 60%;
            font-size: 15px;
        }

        #customerEmail {
            margin-bottom: 40px;
        }

        #customerName:focus, #customerEmail:focus {
            outline: none;
        }

        #customerName::placeholder, #customerEmail::placeholder {
            color: rgb(117, 117, 117);
            font-size: 15px;
        }


        #card-element {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin: auto;
            margin-top: 50px;
            margin-bottom: 20px;
            width: 60%;
        }

        button {
            width: 25%;
            background-color: #915677;
            border: 1px solid #825671;
            color: white;
            padding: 7px;
        }
        button:hover {
            background-color: #445753;
            border: 1px solid #313731;

            cursor: pointer;
        }
    </style>
</head>
<body>
    <form action="" method="post" id="payment-form">
        <img src="../pictures/simple.png" alt="Simple logo"><br>

        <div id="card-element">

        </div>
        <input type="text" id="customerName" name="customerName" placeholder="Cardholder name" required><br>
        <input type="email" id="customerEmail" name="customerEmail" placeholder="Email address" required><br>
        
        <button type="submit">NEXT</button>
    </form>

    <script src="../Api/index.js"></script>
    <script>
        window.onload = function() {
            token().then(response => {
                if(response.status == 401) {
                    window.location.href = `../Log-in/login.html`;
                } 

                if(response.data.rank == "publisher") {
                    window.location.href = `../MyBooks/mybooks.html`;
                }
            }).catch(error => {
                console.error('Hiba történt:', error);
            });
        };

        var stripe = Stripe('pk_test_51OjiQZIdwPkbilsbMugIVanK6fW2uIrqc6OzwynBXuJrzTV17zNeFEiy3qqm5YBTrrQ4SgbzYrWKmhxNykyqkzuP00AU7DN6e5'); // Cseréld le a saját publikus kulcsodra
        var elements = stripe.elements();

        var card = elements.create('card');
        card.mount('#card-element');

        var form = document.getElementById('payment-form');
        var paymentResult = document.getElementById('payment-result');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    paymentResult.textContent = result.error.message;
                } else {
                    var tokenInput = document.createElement('input');
                    tokenInput.type = 'hidden';
                    tokenInput.name = 'stripeToken';
                    tokenInput.value = result.token.id;
                    form.appendChild(tokenInput);

                    form.submit();

                    var url = window.location.href;
                    var queryString = url.split('?')[1];
                    var params = queryString.split('&');
                    var id;

                    for (var i = 0; i < params.length; i++) {
                        var param = params[i].split('=');
                        if (param[0] === 'id') {
                            id = param[1];
                            break;
                        }
                    }

                    addBookShopping({"bookId": id}).then(response => {
                        if(response.status == 401) {
                            window.location.href = `../Log-in/login.html`;
                        } else if(response.status == 422) {
                            window.history.back();
                        } else if(response.status == 403) {
                            window.location.href = `../404/404.html`;
                        } else if(response.status == 200) {
                            window.location.href = `../MyBooks/mybooks.html`;
                        } else if(response.status == 302) {
                            window.location.href = `../FileViewer/fileViewer.html?id=${id}`;
                        } else {
                            console.log(response.status);
                        }
                    }).catch(error => {
                        console.error('Hiba történt:', error);
                    });
                }
            });
        });
    </script>
</body>
</html>