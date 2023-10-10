package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Modell.Helpcenter;
import com.mycompany.cyberread.Modell.User;
import com.mycompany.cyberread.Helpers.PublisherRegistration;
import com.mycompany.cyberread.Helpers.GeneralRegistration;
import org.json.JSONObject;

public class UserService {

    public static String publisherRegistration(String firstName, String lastName, String username, String email, String companyName, String password) {
        try {
            if(!User.firstNameCheck(firstName)) {
                return "";
            } else if(!User.lastNameCheck(lastName)) {
                return "";
            } else if(!User.usernameCheck(username)) {
                return "";
            } else if(!User.emailCheck(email)) {
                return "";
            } else if(!User.companyNameCheck(companyName)) {
                return "";
            } else if(!User.passwordCheck(password)) {
                return "";
            }else if(PublisherRegistration.publisherRegistration(username, firstName, lastName, companyName, email, password)) {
                return "Successful registration!";
            } else {
                return "Unsuccessful registration!";
            }
        } catch(Exception ex) {
            return ex.getMessage();
        }
    }

    public static String generalRegistration(String username, String firstName, String lastName, String email, String birthdate, String password) {
        try {
            if(!User.usernameCheck(username)) {
                return "";
            } else if(!User.emailCheck(email)) {
                return "";
            } else if(!User.birthdateCheck(birthdate)) {
                return "";
            } else if(!User.passwordCheck(password)) {
                return "";
            } else if(GeneralRegistration.generalRegistration(username, firstName, lastName, email, birthdate, password)) {
                return "Successful registration!";
            } else {
                return "Unsuccessful registration!";
            }
        } catch(Exception ex) {
            return ex.getMessage();
        }
    }

    public static JSONObject login(String email, String password) {
        User u = User.login(email, password);
        String token = Token.createJwt(u);

        JSONObject obj = new JSONObject();
        obj.put("user", u.toString());
        obj.put("jwt", token);

        return obj;
    }

}