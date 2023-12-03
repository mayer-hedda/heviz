package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Exception.UserException;
import com.mycompany.cyberread.Modell.User;
import com.mycompany.cyberread.Helpers.PublisherRegistration;
import com.mycompany.cyberread.Helpers.GeneralRegistration;
import com.mycompany.cyberread.Helpers.GetUserRecommendations;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class UserService {

    public static String publisherRegistration(String firstName, String lastName, String username, String email, String companyName, String password, Boolean aszf) {
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
            } else if(!aszf) {
                return "Kötelező mező!";
            } else if(PublisherRegistration.publisherRegistration(username, firstName, lastName, companyName, email, password)) {
                return "Successful registration!";
            } else {
                return "Unsuccessful registration!";
            }
        } catch(Exception ex) {
            return ex.getMessage();
        }
    }

    public static String generalRegistration(String username, String firstName, String lastName, String email, String birthdate, String password, Boolean aszf) {
        try {
            if(!User.usernameCheck(username)) {
                return "";
            } else if(!User.emailCheck(email)) {
                return "";
            } else if(!User.birthdateCheck(birthdate)) {
                return "";
            } else if(!User.passwordCheck(password)) {
                return "";
            } else if(!aszf) {
                return "Kötelező mező!";
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
        obj.put("jwt", token);

        return obj;
    }
    
    public static JSONArray getUserRecommendations(Integer userId) throws UserException {
        try {
            ArrayList<GetUserRecommendations> users = User.getUserRecommendations(userId);
            JSONArray result = new JSONArray();
            
            for(GetUserRecommendations user : users) {
                JSONObject json = new JSONObject();
                json.put("username", user.getUsername());
                json.put("image", user.getImage());
                
                result.put(json);
            }

            return result;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in getUserRecommendations() methode in UserService!");
        }
    }
    
    public static JSONObject getBankAccountNumberByUserId(Integer userId) throws UserException {
        try {
            String bankAccountNumber = User.getBankAccountNumberByUserId(userId);
            
            JSONObject result = new JSONObject();
            result.put("bankAccountNumber", bankAccountNumber);
            
            return result;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in getBankAccountNumberByUserId() method in UserService!");
        }
    }

}