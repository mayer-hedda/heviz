package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.UserException;
import java.util.Arrays;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;


@RunWith(Parameterized.class)
public class CorrectGeneralRegistration {
    
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String birthdate;
    private String password;
    private Boolean aszf;
    private String success;
    
    
    // Teszt adatok
    @Parameterized.Parameters
    public static List<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {
                "john.smit",
                "John",
                "Smit",
                "john.smit@gmail.com",
                "2002-02-10",
                "Alma123*",
                true,
                "1"
            },
        });
    }
    
    public CorrectGeneralRegistration(String username, String firstName, String lastName, String email, String birthdate, String password, Boolean aszf, String success) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password;
        this.aszf = aszf;
        this.success = success;
    }
    
    @Test
    public void testGeneralRegistration() throws UserException {
        String result = UserService.generalRegistration(username, firstName, lastName, email, birthdate, password, aszf);

        Assert.assertEquals(result, success);
    }
    
}
