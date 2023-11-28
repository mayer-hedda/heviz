/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Helpers.AddCategoryInterest;
import com.mycompany.cyberread.Service.CategoryInterestService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
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
 * @author eepseelona
 */
@Path("CategoryInterest")
public class CategoryInterestController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CategoryInterestController
     */
    public CategoryInterestController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.CategoryInterestController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CategoryInterestController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    // ----- MY ENDPOINTS -----
    @POST
    @Path("addCategoryInterest")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response AddCategoryInterest(@HeaderParam("Token") String jwt, AddCategoryInterest u) {
        if(jwt == null) {
            String result = CategoryInterestService.addCategoryInterest(u.getUserId(), u.getCategoryNames());
            return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);
            
            if(tokenCheckResult == 1) {
                return Response.status(Response.Status.FOUND).entity("User has token!").build();
            } else {
                String result = CategoryInterestService.addCategoryInterest(u.getUserId(), u.getCategoryNames());
                return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
}
