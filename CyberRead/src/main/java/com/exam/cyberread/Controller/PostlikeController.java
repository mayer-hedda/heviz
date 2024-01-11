package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.PostlikeException;
import com.exam.cyberread.Model.Postlike;
import com.exam.cyberread.Service.PostlikeService;
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
import org.json.JSONObject;


@Path("postlike")
public class PostlikeController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PostlikeController
     */
    public PostlikeController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.PostlikeController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of PostlikeController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param postlike
     * 
     * @return
        * 200: Successfully liked the post
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * error: This post doesn't exist
     * 
     * @throws PostlikeException: Something wrong
     */
    @POST
    @Path("postLike")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postLike(@HeaderParam("Token") String jwt, Postlike postlike) throws PostlikeException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    Integer result = PostlikeService.postLike(userId, postlike.getPostId());
                    if(result == 1) {
                        return Response.status(Response.Status.OK).build();
                    } else if(result == 2) {
                        JSONObject error = new JSONObject();
                        error.put("postlikeError", "This post doesn't exist!");
                        return Response.status(422).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param postlike
     * 
     * @return
        * 200: Successfully disliked the post
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * error: This post doesn't exist
     * 
     * @throws PostlikeException: Something wrong
     */
    @POST
    @Path("postDislike")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postDislike(@HeaderParam("Token") String jwt, Postlike postlike) throws PostlikeException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    Integer result = PostlikeService.postDislike(userId, postlike.getPostId());
                    if(result == 1) {
                        return Response.status(Response.Status.OK).build();
                    } else if(result == 2) {
                        JSONObject error = new JSONObject();
                        error.put("postlikeError", "This post doesn't exist!");
                        return Response.status(422).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
