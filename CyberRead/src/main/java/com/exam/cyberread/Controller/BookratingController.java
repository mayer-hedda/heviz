package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Model.Bookrating;
import com.exam.cyberread.Service.BookratingService;
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


@Path("bookrating")
public class BookratingController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of BookratingController
     */
    public BookratingController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.BookratingController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of BookratingController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param bookrating
     * 
     * @return
        * 200: Successfully add book rating
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: error
     */
    @POST
    @Path("addBookRating")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBookRating(@HeaderParam("Token") String jwt, Bookrating bookrating) {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    Boolean result = BookratingService.addBookRating(userId, bookrating.getBookId(), bookrating.getRating());
                    if(result == null) {
                        JSONObject resultJSON = new JSONObject().put("error", "You have no right to rate this book!");
                        
                        return Response.status(422).entity(resultJSON.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                    if(result) {
                        return Response.status(Response.Status.OK).build();
                    }
                    JSONObject resultJSON = new JSONObject().put("error", "Something wrong!");
                    
                    return Response.status(422).entity(resultJSON.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
}
