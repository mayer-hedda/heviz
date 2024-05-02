package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.UserException;
import java.util.Arrays;
import java.util.List;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.skyscreamer.jsonassert.JSONAssert;


@RunWith(Parameterized.class)
public class IncorrectPublisherRegistration {
    
    private String username;
    private String firstName;
    private String lastName;
    private String companyName;
    private String email;
    private String password;
    private Boolean aszf;
    private JSONObject error; 

    // Teszt adatok
    @Parameterized.Parameters
    public static List<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {
                "", "", "", "", "", "", false,
                new JSONObject()
                    .put("usernameError", "The username field cannot be empty!")
                    .put("firstNameError", "The first name field cannot be empty!")
                    .put("lastNameError", "The last name field cannot be empty!")
                    .put("emailError", "The email field cannot be empty!")
                    .put("passwordError", "The password field cannot be empty!")
                    .put("aszfError", "Required field!")
                    .put("companyNameError", "The company name field cannot be empty!")
            },
            {
                "a", "a", "a", "!!!!aa", "a", "a", true,
                new JSONObject()
                    .put("usernameError", "Username must be at least 3 characters long!")
                    .put("firstNameError", "First name must be at least 3 character long!")
                    .put("lastNameError", "Last name must be at least 3 character long!")
                    .put("emailError", "Email address must contain the '@' symbol!")
                    .put("passwordError", "Password must be at least 8 characters long!")
                    .put("companyNameError", "The company name must not start with a special character!")
            },
            {
                "user123!",
                "John",
                "Smith",
                "Mesék Kiadója",  
                "@asd",
                "hetchar",      // 7 karakter
                true,
                new JSONObject()
                    .put("usernameError", "Please avoid using special characters exept: _ (underscore) and . (dot)!")
                    .put("emailError", "Email address cannot be empty before '@' symbol!")
                    .put("passwordError", "Password must be at least 8 characters long!")
            },
            {
                "user@home",
                "John",
                "Másik",
                "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", 
                "asd@",
                "alhasdft",     // 8 karakter
                true,
                new JSONObject()
                    .put("usernameError", "Please avoid using special characters exept: _ (underscore) and . (dot)!")
                    .put("emailError", "Please ensure you have at least 4 characters before the '@' symbol!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
                    .put("companyNameError", "The company name cannot be longer than 50 characters!")
            },
            {
                "my-name",
                "Sára",
                "Másik",
                "!Mesék Kiadója", 
                "sara@",
                "AlmasPite",
                true,
                new JSONObject()
                    .put("usernameError", "Please avoid using special characters exept: _ (underscore) and . (dot)!")
                    .put("emailError", "Last part of email is missing or empty!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
                    .put("companyNameError", "The company name must not start with a special character!")
            },
            {
                "user space",
                "Sára",
                "Smith",
                null,  
                "sara@",
                "alma1234",
                true,
                new JSONObject()
                    .put("usernameError", "Please avoid using special characters exept: _ (underscore) and . (dot)!")
                    .put("emailError", "Last part of email is missing or empty!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
                    .put("companyNameError", "The company name field cannot be empty!")
            },
            {
                "my*username",
                "John",
                "Smith",
                "", 
                "sara@g",
                "12341234",
                true,
                new JSONObject()
                    .put("usernameError", "Please avoid using special characters exept: _ (underscore) and . (dot)!")
                    .put("emailError", "Please enter '.' (period) after the '@' in your email address!")
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
                    .put("companyNameError", "The company name field cannot be empty!")
            },
            {
                "megfelelo_username",
                "John",
                "Smith",
                "Mesék Kiadója",   
                "sara@.g",
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
                "Mesék Kiadója",  
                "sara@gmail.",
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
                "Mesék Kiadója", 
                "sara@g.",
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
                "Mesék Kiadója",   
                "sara@gmail.c",
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
                "Mesék Kiadója",   
                "sara@gmail.com",
                "a231321!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "Mesék Kiadója",   
                "sara@gmail.com",
                "231321AA",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "Mesék Kiadója",   
                "sara@gmail.com",
                "!!!!!!AA",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "Mesék Kiadója", 
                "sara@gmail.com",
                "Alma1234",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "Mesék Kiadója", 
                "sara@gmail.com",
                "Alma!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "Mesék Kiadója", 
                "sara@gmail.com",
                "alma1233!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
            {
                "megfelelo.username",
                "John",
                "Smith",
                "Mesék Kiadója",
                "sara@gmail.com",
                "ALMA123!!!!",
                true,
                new JSONObject()
                    .put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!")
            },
        });
    }

    // Registration details check construct
    public IncorrectPublisherRegistration(String username, String firstName, String lastName, String companyName, String email, String password, Boolean aszf, JSONObject error) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.email = email;
        this.password = password;
        this.aszf = aszf;
        this.error = error;
    }

    @Test
    public void testPublisherRegistration() throws UserException {
        String result = UserService.publisherRegistration(username, firstName, lastName, companyName, email, password, aszf);

        JSONObject resultObj = new JSONObject(result);
        try {
            JSONAssert.assertEquals(error, resultObj, true);
        } catch (JSONException ex) {
            Assert.fail("JSONException message: " + ex.getMessage());
        }
    }
    
}
