package com.mycompany.chapterx.Service;

import com.mycompany.chapterx.Modell.User;

public class UserService {
    
    // login + token
    
    public static String companyRegistration(String username, String firstName, String lastName, String companyName, String email, String password) {
        try {
            if(!User.emailCheck(email)) {
                return "";
            } else if(!User.nameCheck(firstName, "first")) {
                return "";
            } else if(User.companyRegistration(username, firstName, lastName, companyName, email, password)) {
                return "Sikeres regisztráció!";
            } else {
                return "Sikertelen regisztráció!";
            }
        } catch(Exception ex) {
            return ex.getMessage();
        }
    }
    
}
