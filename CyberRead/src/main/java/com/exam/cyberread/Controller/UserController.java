package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Dto.GeneralRegistrationDto;
import com.exam.cyberread.Dto.PublisherRegistrationDto;
import com.exam.cyberread.Exception.UserException;
import com.exam.cyberread.Model.Color;
import com.exam.cyberread.Model.User;
import com.exam.cyberread.Service.UserService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONObject;


@Path("user")
public class UserController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of UserController
     */
    public UserController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.UserController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of UserController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param user: user's login parameters
        * email: user email address
        * password: user password
     * 
     * @return 
        * 200: 
            * token
            * first
                * true: when the user logs in for the first time
                * false: if the user is not logging in for the first time
        * 422: login error
     * 
     * @throws UserException: Something wrong!
     */
    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(User user) throws UserException {
        JSONObject result = UserService.login(user.getEmail(), user.getPassword());
        if(result.has("loginError")) {
            return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
        } else {
            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
        }
    }
    
    
    /**
     * @param userDetails
        * username
        * first name
        * last name
        * email
        * birthdate
        * password
        * aszf
     * 
     * @return 
        * 200: Successfully registration
        * 409: Unsuccessfully registration
        * 422: 
            * error: Returns possible errors at field level
     * 
     * @throws UserException: Something wrong
     */
    @POST
    @Path("generalRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response generalRegistration(GeneralRegistrationDto userDetails) throws UserException {
        String result = UserService.generalRegistration(userDetails.getUsername(), userDetails.getFirstName(), userDetails.getLastName(), userDetails.getEmail(), userDetails.getBirthdate(), userDetails.getPassword(), userDetails.getAszf());
        if(result.equals("1")) {
            return Response.status(Response.Status.OK).build();
        } else if(result.equals("2")) {
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.status(422).entity(result).type(MediaType.APPLICATION_JSON).build();
    }
    
    
    /**
     * @param userDetails
        * username
        * first name
        * last name
        * company name
        * email
        * password
        * aszf
     * 
     * @return 
        * 200: Successfully registration
        * 409: Unsuccessfully registration
        * 422: 
            * error: Returns possible errors at field level
     * 
     * @throws UserException: Something wrong
     */
    @POST
    @Path("publisherRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response publisherRegistration(PublisherRegistrationDto userDetails) throws UserException {
        String result = UserService.publisherRegistration(userDetails.getUsername(), userDetails.getFirstName(), userDetails.getLastName(), userDetails.getCompanyName(), userDetails.getEmail(), userDetails.getPassword(), userDetails.getAszf());
        if(result.equals("1")) {
            return Response.status(Response.Status.OK).build();
        } else if(result.equals("2")) {
            return Response.status(Response.Status.CONFLICT).build();
        }
        return Response.status(422).entity(result).type(MediaType.APPLICATION_JSON).build();
    }
    
    
    /**
     * @param jwt: user's jwt token
     * 
     * @return 
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 302:
            * image: profile picture displayed in navbar
            * username: username displayed in navbar
            * rank: check authorization
     */
    @GET
    @Path("token")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response token(@HeaderParam("Token") String jwt) {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    JSONObject data = Token.getDataByToken(jwt);
                    return Response.status(Response.Status.FOUND).entity(data.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * recommanded users
                * image
                * username
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws UserException: Something wrong
     */
    @GET
    @Path("getRecommandedUsers")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getRecommandedUsers(@HeaderParam("Token") String jwt) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONArray result = UserService.getRecommandedUsers(userId);
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
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
     * 
     * @throws UserException: Something wrong
     */
    @POST
    @Path("getUserDetails")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserDetails(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    String usrname = Token.getUsernameByToken(jwt);
                    JSONObject result = UserService.getUserDetails(userId, usrname, user.getProfileUsername());
                    if(result.length() == 1) {
                        return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set username
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * usernameError: incorrect new username
            * setUsernameError: Unsuccessfully set username
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setUsername")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setUsername(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setUsername(userId, user.getUsername());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set email
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * emailError: incorrect new email
            * setEmailError: Unsuccessfully set email
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setEmail")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setEmail(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setEmail(userId, user.getEmail());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set password
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * passwordError: incorrect new password
            * setPasswordError: Unsuccessfully set password
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setPassword")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setPassword(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setPassword(userId, user.getPassword());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set phone number
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * phoneNumberError: incorrect new phone number
            * setPhoneNumberError: Unsuccessfully set phone number
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setPhoneNumber")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setPhoneNumber(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setPhoneNumber(userId, user.getPhoneNumber());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set first name
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * firstNameError: incorrect new first name
            * setFirstNameError: Unsuccessfully set first name
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setFirstName")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setFirstName(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setFirstName(userId, user.getFirstName());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set last name
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * lastNameError: incorrect new last name
            * setLastNameError: Unsuccessfully set last name
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setLastName")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setLastName(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setLastName(userId, user.getLastName());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200: Successfully set public email
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * setPublicEmailError: Unsuccessfully set public email
     * 
     * @throws UserException: Something wrong!
     */
    @GET
    @Path("setPublicEmail")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setPublicEmail(@HeaderParam("Token") String jwt) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setPublicEmail(userId);
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200: Successfully set public phone number
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * setPublicPhoneNumberError: Unsuccessfully set public phone number
     * 
     * @throws UserException: Something wrong!
     */
    @GET
    @Path("setPublicPhoneNumber")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setPublicPhoneNumber(@HeaderParam("Token") String jwt) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setPublicPhoneNumber(userId);
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set website
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * websiteError: incorrect new website
            * setWebsiteError: Unsuccessfully set website
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setWebsite")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setWebsite(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setWebsite(userId, user.getWebsite());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set intro description
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * introDescriptionError: incorrect new intro description
            * setIntroDescriptionError: Unsuccessfully set intro description
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setIntroDescription")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setIntroDescription(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setIntroDescription(userId, user.getIntroDescription());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200: Successfully set profile image
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * profileImageError: incorrect new profile image
            * setProfileImageError: Unsuccessfully set profile image
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setProfileImage")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setProfileImage(@HeaderParam("Token") String jwt, User user) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setProfileImage(userId, user.getImage());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param color
     * 
     * @return
        * 200: Successfully set cover color
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * coverColorError: incorrect new cover color
            * setCoverColorError: Unsuccessfully set cover color
     * 
     * @throws UserException: Something wrong!
     */
    @PUT
    @Path("setCoverColor")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setCoverColor(@HeaderParam("Token") String jwt, Color color) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.setCoverColor(userId, color.getCode());
                    if(result.length() == 0) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * General details:
                * username
                * email
                * phone number
                * first name
                * last name
                * public email
                * public phone number
                * color
                * image
                * intro description
                * website
            * Publisher details:
                * username
                * email
                * phone number
                * first name
                * last name
                * public email
                * public phone number
                * color
                * image
                * intro description
                * website
                * company name
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws UserException: Something wrong!
     */
    @GET
    @Path("getDetails")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getDetails(@HeaderParam("Token") String jwt) throws UserException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.getDetails(userId);
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
