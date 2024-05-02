package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.PostException;
import com.exam.cyberread.Model.Post;
import com.exam.cyberread.Model.User;
import com.exam.cyberread.Service.PostService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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


@Path("post")
public class PostController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PostController
     */
    public PostController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.PostController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of PostController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param post
     * 
     * @return
        * 200: Successfully added the post
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 409: Unsuccessfully added the post
        * 422: error: if the post description is empty
     * 
     * @throws PostException: Something wrong
     */
    @POST
    @Path("addPost")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addPost(@HeaderParam("Token") String jwt, Post post) throws PostException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    String result = PostService.addPost(userId, post.getDescription());
                    if(result.equals("1")) {
                        return Response.status(Response.Status.OK).build();
                    } else if(result.equals("2")) {
                        return Response.status(Response.Status.CONFLICT).build();
                    }
                    return Response.status(422).entity(result).type(MediaType.APPLICATION_JSON).build();
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
            * posts by followed user
                * id
                * username
                * image
                * post time
                * post description
                * liked
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws PostException: Something wrong
     */
    @GET
    @Path("getFeedPosts")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getFeedPosts(@HeaderParam("Token") String jwt) throws PostException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    JSONArray result = PostService.getFeedPosts(userId);
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
            * posts:
                * post id
                * username
                * image
                * post time
                * description
                * liked
            * own posts
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: profileUsernameError
     * 
     * @throws PostException: Something wrong
     */
    @POST
    @Path("getUserPosts")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserPosts(@HeaderParam("Token") String jwt, User user) throws PostException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    JSONObject result = PostService.getUserPosts(userId, user.getProfileUsername());
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
     * @param post
     * 
     * @return
        * 200: Successfully delete post
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: deletePostError
     * 
     * @throws PostException: Something wrong
     */
    @DELETE
    @Path("deletePost")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deletePost(@HeaderParam("Token") String jwt, Post post) throws PostException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    JSONObject result = PostService.deletePost(userId, post.getId());
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
     * @param post
     * 
     * @return
        * 200: Successfully update post
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: updatePostError
     * 
     * @throws PostException: Something wrong
     */
    @PUT
    @Path("updatePost")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePost(@HeaderParam("Token") String jwt, Post post) throws PostException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    int userId = Token.getUserIdByToken(jwt);
                    JSONObject result = PostService.updatePost(userId, post.getId(), post.getDescription());
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
