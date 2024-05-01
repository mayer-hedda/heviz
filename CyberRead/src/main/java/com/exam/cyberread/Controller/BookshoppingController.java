package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.BookshoppingException;
import com.exam.cyberread.Exception.UserException;
import com.exam.cyberread.Model.Bookshopping;
import com.exam.cyberread.Service.BookshoppingService;
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


@Path("bookshopping")
public class BookshoppingController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of BookshoppingController
     */
    public BookshoppingController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.BookshoppingController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of BookshoppingController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param bookshopping
     * 
     * @return
        * 200: Successfully add book shopping
        * 302: You have already bought this book!
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: this user not a general user
        * 422: error
     * 
     */
    @POST
    @Path("addBookShopping")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBookShopping(@HeaderParam("Token") String jwt, Bookshopping bookshopping) throws BookshoppingException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    
                    switch(rank) {
                        case "general":
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONObject result = BookshoppingService.addBookShopping(userId, bookshopping.getBookId());
                            
                            if(result == null) {
                                return Response.status(Response.Status.OK).build();
                            }
                            if(result.has("exist")) {
                                 return Response.status(Response.Status.FOUND).build();
                            }
                            return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
