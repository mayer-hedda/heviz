/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Exception.ListException;
import com.mycompany.cyberread.Service.ListService;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;

/**
 * REST Web Service
 *
 * @author eepseelona
 */
@Path("List")
public class ListController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ListController
     */
    public ListController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.ListController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of ListController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    // ----- MY ENDPOINTS -----
    @GET
    @Path("getMostListedBooksOfTheMoth")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getMostListedBooksOfTheMoth() throws ListException {
        JSONArray result = ListService.getMostListedBooksOfTheMoth();
        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("getPostsByFollowedUsers")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getPostsByFollowedUsers(@HeaderParam("Authorization") String token) throws ListException {
        JSONArray result = ListService.getPostsByFollowedUsers(token);
        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
    }
}
