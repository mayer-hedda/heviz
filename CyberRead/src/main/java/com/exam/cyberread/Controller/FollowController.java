package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.FollowException;
import com.exam.cyberread.Model.Follow;
import com.exam.cyberread.Service.BookService;
import com.exam.cyberread.Service.FollowService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;


@Path("follow")
public class FollowController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of FollowController
     */
    public FollowController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.FollowController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of FollowController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param follow
     * 
     * @return
        * 200: Successfully follow the user
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: followUserError
     * 
     * @throws FollowException: Something wrong
     */
    @POST
    @Path("followUser")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response followUser(@HeaderParam("Token") String jwt, Follow follow) throws FollowException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = FollowService.followUser(userId, follow.getFollowedId());
                    if(result.isEmpty()) {
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
     * @param follow
     * 
     * @return
        * 200: Successfully follow the user
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: unfollowedUserError
     * 
     * @throws FollowException: Something wrong
     */
    @DELETE
    @Path("unfollowedUser")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response unfollowedUser(@HeaderParam("Token") String jwt, Follow follow) throws FollowException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = FollowService.unfollowedUser(userId, follow.getFollowedId());
                    if(result.isEmpty()) {
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
    
}
