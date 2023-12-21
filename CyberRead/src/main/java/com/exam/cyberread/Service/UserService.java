package com.exam.cyberread.Service;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.UserException;
import com.exam.cyberread.Model.User;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.json.JSONArray;
import org.json.JSONObject;


public class UserService {
    
    /**
     * @param email: user email address
     * @param password: user password
     * 
     * @return 
        * data
            * jwt token
            * first
                * true: when the user logs in for the first time
                * false: if the user is not logging in for the first time
        * error (if invalid email or password):
            * loginError
     * 
     * @throws UserException: Something wrong
     */
    public static JSONObject login(String email, String password) throws UserException {
        try {
            User user = User.login(email, password);
            JSONObject result = new JSONObject();
            
            if(user.getId() != null) {
                String token = Token.createJwt(user);
                result.put("jwt", token);
                result.put("first", user.getActive());
            } else {
                result.put("loginError", "Invalid email address or password!");
            }
            
            return result;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in login() method!");
        }
    }
    
    
    /**
     * @param username
     * @param firstName
     * @param lastName
     * @param email
     * @param birthdate
     * @param password
     * @param aszf: Whether the user has accepted the general terms of use
     * 
     * @return 
        * error: Returns possible errors at field level
        * 1: Successfully registration
        * 2: Unsuccessfully registration
     * 
     * @throws UserException 
     */
    public static String generalRegistration(String username, String firstName, String lastName, String email, String birthdate, String password, Boolean aszf) throws UserException {
        try {
            JSONObject error = UserService.registrationDetailsCheck(username, firstName, lastName, email, password, aszf);
            
            // birthdate check
            if(birthdate == null || birthdate.isEmpty()) {
                error.put("birthdateError", "The birthdate field cannot be empty!");
            } else {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date date = dateFormat.parse(birthdate);
                Date now = new Date();
                long diff = now.getTime() - date.getTime();
                long diffDays = diff / (24 * 60 * 60 * 1000);

                if(diffDays < 5478) {
                    error.put("birthdateError", "You are too young!");
                }
            }
            
            
            if(error.isEmpty()) {
                if(User.generalRegistration(username, firstName, lastName, email, birthdate, password)) {
                    return "1";
                } else {
                    return "2";
                }
            } else {
                return error.toString();
            }
            
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in generalRegistration() method!");
        }
    }
    
    
    /**
     * @param username
     * @param firstName
     * @param lastName
     * @param companyName
     * @param email
     * @param password
     * @param aszf: Whether the user has accepted the general terms of use
     * 
     * @return 
        * error: Returns possible errors at field level
        * 1: Successfully registration
        * 2: Unsuccessfully registration
     * 
     * @throws UserException: Something wrong
     */
    public static String publisherRegistration(String username, String firstName, String lastName, String companyName, String email, String password, Boolean aszf) throws UserException {
        try {
            JSONObject error = UserService.registrationDetailsCheck(username, firstName, lastName, email, password, aszf);
            
            // company name check
            if(companyName == null || companyName.isEmpty()) {
                error.put("companyNameError", "The company name field cannot be empty!");
            } else if(companyName.length() > 50) {
                error.put("companyNameError", "The company name cannot be longer than 50 characters!");
            }
            
            
            if(error.isEmpty()) {
                if(User.publisherRegistration(username, firstName, lastName, companyName, email, password)) {
                    return "1";
                } else {
                    return "2";
                }
            } else {
                return error.toString();
            }
            
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in publisherRegistration() method!");
        }
    }
    
    
    /**
     * @param username
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param aszf
     * 
     * @return error
        * If empty then all data is correct
        * Else there is an error in the data
     * 
     * @throws UserException: Something wrong
     */
    public static JSONObject registrationDetailsCheck(String username, String firstName, String lastName, String email, String password, Boolean aszf) throws UserException {
        try {
            JSONObject error = new JSONObject();

            // username check
            if(username == null || username.isEmpty()) {
                error.put("usernameError", "The username field cannot be empty!");
            } else if(username.length() < 3) {
                error.put("usernameError", "Username must be at least 3 characters long!");
            } else if(username.length() > 50) {
                error.put("usernameError", "The username cannot be longer than 50 characters!");
            } else if(!username.matches("^[a-zA-Z0-9._]*$")) {
                error.put("usernameError", "Invalid username! Please avoid using special characters exept: _ (underscore) and . (dot)");
            }

            // first name check
            if(firstName == null || firstName.isEmpty()) {
                error.put("firstNameError", "The first name field cannot be empty!");
            } else if(firstName.length() < 3) {
                error.put("firstNameError", "First name must be at least 3 character long!");
            } else if(firstName.length() > 50) {
                error.put("firstNameError", "The first name cannot be longer than 50 characters!");
            }

            // last name check
            if(lastName == null || lastName.isEmpty()) {
                error.put("lastNameError", "The last name field cannot be empty!");
            } else if(lastName.length() < 3) {
                error.put("lastNameError", "Last name must be at least 3 character long!");
            } else if(lastName.length() > 50) {
                error.put("lastNameError", "The last name cannot be longer than 50 characters!");
            }

            // email check
            Pattern specReg = Pattern.compile("(?=.*[@])");
            Matcher matcher = specReg.matcher(email);

            if (!matcher.find()) {
                error.put("emailError", "Email address must contain the '@' symbol.");
            } else {
                String[] emailParts = email.split("@");

                if (emailParts[0].isEmpty()) {
                    error.put("emailError", "Email address cannot be empty before '@' symbol.");
                } else if (emailParts[0].length() < 4) {
                    error.put("emailError", "Please ensure you have at least 4 characters before the '@' symbol.");
                } else if (!email.contains(".")) {
                    error.put("emailError", "Please include the '.' (dot) symbol in your email address.");
                } else {
                    String lastPart = emailParts[1];

                    if (lastPart.isEmpty() || lastPart.indexOf(".") == -1 || lastPart.lastIndexOf(".") == lastPart.length() - 1) {
                        error.put("emailError", "Last part of email is missing or empty.");
                    } else {
                        String[] domainParts = lastPart.split("\\.");
                        String beforeDot = domainParts[0];

                        if (beforeDot.isEmpty() || beforeDot.length() < 2) {
                            error.put("emailError", "Please ensure you have at least 2 characters before the '.' (dot) symbol.");
                        }
                    }
                }
            }

            // password check
            if(password == null || password.isEmpty()) {
                error.put("passwordError", "The password field cannot be empty!");
            } else {
                String upperRegex = ".*[A-Z].*";
                String lowerRegex = ".*[a-z].*";
                String numberRegex = ".*[0-9].*";
                String specialRegex = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*";

                if(password.length() < 8) {
                    error.put("passwordError", "Password must be at least 8 characters long!");
                } else if(password.length() > 100) {
                    error.put("passwordError", "The password cannot be longer than 50 characters!");
                } else if (!password.matches(upperRegex) || !password.matches(lowerRegex) || !password.matches(numberRegex) || !password.matches(specialRegex)) {
                    error.put("passwordError", "The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character!");
                }
            }

            // aszf check
            if(aszf == null || !aszf) {
                error.put("aszfError", "Required field!");
            }

            return error;
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            throw new UserException("Error in registrationDetailsCheck() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * recommanded users
            * image
            * username
     * 
     * @throws UserException: Something wrong
     */
    public static JSONArray getRecommandedUsers(Integer userId) throws UserException {
        try{
            return User.getRecommandedUsers(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in getRecommamdedUsers() method!");
        }
    }
    
}
