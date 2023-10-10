/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Helpers.GeneralRegistration;
import com.mycompany.cyberread.Helpers.PublisherRegistration;
import com.mycompany.cyberread.Modell.User;
import com.mycompany.cyberread.Service.UserService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author eepseelona
 */
@Path("User")
public class UserController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of UserController
     */
    public UserController() {
    }

    /**
     * Retrieves representation of an instance of com.mycompany.cyberread.Controller.UserController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of UserController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    // ----- MY ENDPOINTS -----
    @POST
    @Path("publisherRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response publisherRegistration(PublisherRegistration u) {
        String result = UserService.publisherRegistration(u.getFirstName(), u.getLastName(), u.getUsername(), u.getEmail(), u.getCompanyName(), u.getPassword());
        return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Path("generalRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response generalRegistration(GeneralRegistration u) {
        String result = UserService.generalRegistration(u.getUsername(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getBirthdate(), u.getPassword());
        return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(User u) {
        JSONObject result = UserService.login(u.getEmail(), u.getPassword());
        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
    }
}
