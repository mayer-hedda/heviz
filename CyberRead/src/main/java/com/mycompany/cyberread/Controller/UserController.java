package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Helpers.GeneralRegistration;
import com.mycompany.cyberread.Helpers.PublisherRegistration;
import com.mycompany.cyberread.Modell.User;
import com.mycompany.cyberread.Service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

import static com.mycompany.cyberread.Config.Token.decodeJwt;
import com.mycompany.cyberread.Exception.UserException;
import org.json.JSONArray;

/**
 * REST Web Service
 *
 * @author eepseelona
 */
@Path("User")
public class UserController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of UserController
     */
    public UserController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.UserController
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
    
    // ----- MY ENDPOINTS -----
    @POST
    @Path("publisherRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response publisherRegistration(@HeaderParam("Token") String jwt, PublisherRegistration u) {
        if(jwt == null) {
            String result = UserService.publisherRegistration(u.getFirstName(), u.getLastName(), u.getUsername(), u.getEmail(), u.getCompanyName(), u.getPassword(), u.getAszf());
            return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    return Response.status(Response.Status.FOUND).entity(Token.getUserRankByToken(jwt)).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }

    @POST
    @Path("generalRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response generalRegistration(@HeaderParam("Token") String jwt, GeneralRegistration u) {
        if(jwt == null) {
            String result = UserService.generalRegistration(u.getUsername(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getBirthdate(), u.getPassword(), u.getAszf());
            return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    return Response.status(Response.Status.FOUND).entity(Token.getUserRankByToken(jwt)).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(@HeaderParam("Token") String jwt, User u) {
        if(jwt == null) {
            JSONObject result = UserService.login(u.getEmail(), u.getPassword());
            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    return Response.status(Response.Status.FOUND).entity(Token.getUserRankByToken(jwt)).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }

    @GET
    @Path("token")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response token(@HeaderParam("Token") String jwt) {
        int tokenCheckResult = decodeJwt(jwt);

        switch (tokenCheckResult) {
            case 1:
                return Response.status(Response.Status.FOUND).entity(Token.getUserRankByToken(jwt)).build();
            case 2:
                return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
            default:
                return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
        }
    }
    
    @GET
    @Path("getUserRecommendations")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserRecommendations(@HeaderParam("Token") String jwt) throws UserException {
        if(jwt == null) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            String rank = Token.getUserRankByToken(jwt);
            
            switch(tokenCheckResult) {
                case 1:
                    if(rank.equals("general")) {
                        Integer userId = Token.getUserIdByToken(jwt);
                        JSONArray result = UserService.getUserRecommendations(userId);
                        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    } else {
                        return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    @GET
    @Path("getBankAccountNumberByUserId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBankAccountNumberByUserId(@HeaderParam("Token") String jwt) throws UserException {
        if(jwt == null) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            
            switch(tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = UserService.getBankAccountNumberByUserId(userId);
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
}
