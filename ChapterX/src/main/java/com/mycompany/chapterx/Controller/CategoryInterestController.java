/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.chapterx.Controller;

import com.mycompany.chapterx.Helpers.AddCategoryInterest;
import com.mycompany.chapterx.Service.CategoryInterestService;
import com.mycompany.chapterx.Service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.MediaType;


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
     * Retrieves representation of an instance of com.mycompany.chapterx.Controller.CategoryInterestController
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
    public Response AddCategoryInterest(AddCategoryInterest u) {
        String result = CategoryInterestService.addCategoryInterest(u.getUserId(), u.getCategoryNames());
        return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
    }

}
