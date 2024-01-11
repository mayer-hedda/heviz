package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.UserException;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import java.util.Arrays;
import java.util.List;
import org.skyscreamer.jsonassert.JSONAssert;


@RunWith(Parameterized.class)
public class IncorrectGeneralRegistration {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String birthdate;
    private String password;
    private Boolean aszf;
    private JSONObject error; 

    // Teszt adatok
    @Parameterized.Parameters
    public static List<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {
                null, null, null, null, null, null, null,
                new JSONObject()
                    .put("usernameError", "The username field cannot be empty!")
                    .put("firstNameError", "The first name field cannot be empty!")
                    .put("lastNameError", "The last name field cannot be empty!")
                    .put("emailError", "The email field cannot be empty!")
                    .put("passwordError", "The password field cannot be empty!")
                    .put("aszfError", "Required field!")
                    .put("birthdateError", "The birthdate field cannot be empty!")
            },
            {
                "", "", "", "", "", "", false,
                new JSONObject()
                    .put("usernameError", "The username field cannot be empty!")
                    .put("firstNameError", "The first name field cannot be empty!")
                    .put("lastNameError", "The last name field cannot be empty!")
                    .put("emailError", "The email field cannot be empty!")
                    .put("passwordError", "The password field cannot be empty!")
                    .put("aszfError", "Required field!")
                    .put("birthdateError", "The birthdate field cannot be empty!")
            },
            {
                "a", "a", "a", "a", "2020-11-12", "a", true,
                new JSONObject()
                    .put("usernameError", "Username must be at least 3 characters long!")
                    .put("firstNameError", "First name must be at least 3 character long!")
                    .put("lastNameError", "Last name must be at least 3 character long!")
                    .put("emailError", "Email address must contain the '@' symbol!")
                    .put("passwordError", "Password must be at least 8 characters long!")
                    .put("birthdateError", "You are too young!")
            },
//            {
//                "ezazafelhasznalonevamiotvenegykarakterhosszuislehetnedenemaz",
//                "ezazakeresztnevamiotvenegykarakterhosszuislehetnedenemaz",
//                "ezazavezeteknevamiotvenegykarakterhosszuislehetnedenemaz",
//                "@",
//                "2008-12-23",   // Holnap lenne 15 éves -- 2023.12.22
//                "ezazajelszoamiotvenegykarakterhosszuislehetnedenemazsotmegszazkarakternelistobbnekkelllenniehogyhibatkapjak",
//                true,
//                new JSONObject()
//                    .put("usernameError", "The username cannot be longer than 50 characters!")
//                    .put("firstNameError", "The first name cannot be longer than 50 characters!")
//                    .put("lastNameError", "The last name cannot be longer than 50 characters!")
//                    .put("emailError", "Email address must contain more than just the '@' symbol!")
//                    .put("passwordError", "The password cannot be longer than 100 characters!")
//                    .put("birthdateError", "You are too young!")
//            },
            {
                "user123!",
                "John",
                "Smith",
                "@asd",
                "2008-12-22",    // Ma tölti a 15-öt -- 2023.12.22
                "hetchar",      // 7 karakter
                true,
                new JSONObject()
                    .put("usernameError", "Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)")
                    .put("emailError", "Email address cannot be empty before '@' symbol!")
                    .put("passwordError", "Password must be at least 8 characters long!")
            },
//            {
//                "user@home",
//                "John",
//                "Másik",
//                "asd@",
//                "2023-12-22",   // Mai nap -- 2023.12.22
//                "alhasdft",     // 8 karakter
//                true,
//                new JSONObject()
//                    .put("usernameError", "Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)")
//                    .put("emailError", "Please ensure you have at least 4 characters before the '@' symbol!")
//                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
//                    .put("birthdateError", "Invalid birthdate format!")
//            },
//            {
//                "my-name",
//                "Sára",
//                "Másik",
//                "sara@",
//                "2023-12-23",   // Holnapi nap -- 2023.12.22
//                "AlmasPite",
//                true,
//                new JSONObject()
//                    .put("usernameError", "Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)")
//                    .put("emailError", "Last part of email is missing or empty!")
//                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
//                    .put("birthdateError", "Invalid birthdate format!")
//            },
            {
                "user space",
                "Sára",
                "Smith",
                "sara@",
                "2023-02-29",   // Nem létező dátum
                "alma1234",
                true,
                new JSONObject()
                    .put("usernameError", "Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)")
                    .put("emailError", "Last part of email is missing or empty!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
                    .put("birthdateError", "Invalid birthdate format!")
            },
            {
                "my*username",
                "John",
                "Smith",
                "sara@g",
                "2023-02-00",   // Nem létező dátum
                "12341234",
                true,
                new JSONObject()
                    .put("usernameError", "Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)")
                    .put("emailError", "Please enter '.' (period) after the '@' in your email address!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
                    .put("birthdateError", "Invalid birthdate format!")
            },
            {
                "megfeleloUsername",
                "John",
                "Smith",
                "sara@.g",
                "2002-02-10",   
                "AASDFSADFSD",
                true,
                new JSONObject()
                    .put("emailError", "Please ensure you have at least 2 characters before the '.' (dot) symbol!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo_username",
                "John",
                "Smith",
                "sara@gmail.",
                "2002-02-10",  
                "!!!!!!!!!!!!",
                true,
                new JSONObject()
                    .put("emailError", "Please ensure you have at least 2 characters after the '.' (dot) symbol!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@g.",
                "2002-02-10", 
                "alma!!!!!",
                true,
                new JSONObject()
                    .put("emailError", "Please ensure you have at least 2 characters before the '.' (dot) symbol!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.c",
                "2002-02-10",   
                "1231321!!!!",
                true,
                new JSONObject()
                    .put("emailError", "Please ensure you have at least 2 characters after the '.' (dot) symbol!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",   
                "a231321!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",   
                "231321AA",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",   
                "!!!!!!AA",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",   // Nem létező dátum
                "Alma1234",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",   // Nem létező dátum
                "Alma!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",   // Nem létező dátum
                "alma1233!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "sara@gmail.com",
                "2002-02-10",
                "ALMA123!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
        });
    }

    // Registration details check construct
    public IncorrectGeneralRegistration(String username, String firstName, String lastName, String email, String birthdate, String password, Boolean aszf, JSONObject error) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password;
        this.aszf = aszf;
        this.error = error;
    }

    @Test
    public void testGeneralRegistration() throws UserException {
        String result = UserService.generalRegistration(username, firstName, lastName, email, birthdate, password, aszf);

        JSONObject resultObj = new JSONObject(result);
        try {
            JSONAssert.assertEquals(error, resultObj, true);
        } catch (JSONException ex) {
            Assert.fail("JSONException message: " + ex.getMessage());
        }
    }
}
