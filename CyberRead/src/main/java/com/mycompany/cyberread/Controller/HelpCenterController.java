/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Exception.HelpCenterException;
import com.mycompany.cyberread.Service.HelpCenterService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;

/**
 * REST Web Service
 *
 * @author eepseelona
 */
@Path("HelpCenter")
public class HelpCenterController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of HelpCenterController
     */
    public HelpCenterController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.HelpCenterController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of HelpCenterController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    // ----- MY ENDPOINTS -----
    @GET
    @Path("getAllHelpCenter")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllHelpCenter() throws HelpCenterException {
        JSONArray result = HelpCenterService.getAllHelpCenter();
        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
    }
}
