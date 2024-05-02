package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.CategoryinterestException;
import com.exam.cyberread.Service.CategoryService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;


@Path("category")
public class CategoryController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CategoryController
     */
    public CategoryController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.CategoryController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CategoryController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * 
     * @return
        * category id
        * category name
        * category image
     * 
     * @throws CategoryinterestException: Something wrong
     */
    @GET
    @Path("getAllCategory")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllCategory(@HeaderParam("Token") String jwt) throws CategoryinterestException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    JSONArray result = CategoryService.getAllCategory();
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
