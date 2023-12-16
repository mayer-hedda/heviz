package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Dto.GeneralRegistrationDto;
import com.exam.cyberread.Dto.PublisherRegistrationDto;
import com.exam.cyberread.Exception.UserException;
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
        * 200: token
        * 422: login error
     * 
     * @throws UserException: Something wrong!
     */
    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(User user) throws UserException {
        JSONObject result = UserService.login(user.getEmail(), user.getPassword());
        if(result.isEmpty()) {
            return Response.status(Response.Status.OK).build();
        } else{
            return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
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
    
}
