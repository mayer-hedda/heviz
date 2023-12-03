/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Exception.BookException;
import com.mycompany.cyberread.Helpers.AddBook;
import com.mycompany.cyberread.Service.BookService;
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

/**
 * REST Web Service
 *
 * @author Hédy
 */
@Path("Book")
public class BookController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of BookController
     */
    public BookController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.BookController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of BookController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    @POST
    @Path("addBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(@HeaderParam("Token") String jwt, AddBook b) throws BookException {
        if(jwt == null) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            
            switch(tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = BookService.addBook(userId, b.getTitle(), b.getDescription(), b.getTargetAudienceId(), b.getLanguage(), b.getAdultFiction(), b.getCategory(), b.getStatusId(), b.getPrice(), b.getCoverImage(), b.getText(), b.getBankAccountNumber());
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
}
