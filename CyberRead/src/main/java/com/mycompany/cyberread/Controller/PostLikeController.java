/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Modell.Post;
import com.mycompany.cyberread.Service.PostLikeService;
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

/**
 * REST Web Service
 *
 * @author Hédy
 */
@Path("PostLike")
public class PostLikeController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PostLikeController
     */
    public PostLikeController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.PostLikeController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of PostLikeController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    // --- MY ENDPOINTS ---
    @POST
    @Path("addPostLike")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addPostLike(@HeaderParam("Token") String jwt, Post p) {
        if(jwt == null) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            
            switch(tokenCheckResult) {
                case 1:
                    Integer postId = p.getId();
                    String result = PostLikeService.addPostLike(Token.getUserIdByToken(jwt), postId);
                    return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    @DELETE
    @Path("deletePostLike")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deletePostLike(@HeaderParam("Token") String jwt, Post p) {
        if(jwt == null) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            
            switch(tokenCheckResult) {
                case 1:
                    Integer postId = p.getId();
                    String result = PostLikeService.deletePostLike(Token.getUserIdByToken(jwt), postId);
                    return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
}
