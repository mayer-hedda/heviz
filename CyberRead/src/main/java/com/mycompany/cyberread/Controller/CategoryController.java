/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Exception.AgesException;
import com.mycompany.cyberread.Exception.CategoryException;
import com.mycompany.cyberread.Service.AgesService;
import com.mycompany.cyberread.Service.CategoryService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author Hédy
 */
@Path("Category")
public class CategoryController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CategoryController
     */
    public CategoryController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.CategoryController
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
    @GET
    @Path("getAllCategory")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllCategory(@HeaderParam("Token") String jwt) throws CategoryException {
        if(jwt == null) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            
            switch(tokenCheckResult) {
                case 1:
                    JSONObject result = CategoryService.getAllCategory();
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return  Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
}
