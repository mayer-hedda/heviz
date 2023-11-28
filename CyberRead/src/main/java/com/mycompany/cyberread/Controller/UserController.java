/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.cyberread.Controller;

import com.mycompany.cyberread.Helpers.GeneralRegistration;
import com.mycompany.cyberread.Helpers.PublisherRegistration;
import com.mycompany.cyberread.Modell.User;
import com.mycompany.cyberread.Service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONObject;

import static com.mycompany.cyberread.Config.Token.decodeJwt;

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
        String result = UserService.publisherRegistration(u.getFirstName(), u.getLastName(), u.getUsername(), u.getEmail(), u.getCompanyName(), u.getPassword(), u.getAszf());
        return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Path("generalRegistration")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response generalRegistration(GeneralRegistration u) {
        String result = UserService.generalRegistration(u.getUsername(), u.getFirstName(), u.getLastName(), u.getEmail(), u.getBirthdate(), u.getPassword(), u.getAszf());
        return Response.status(Response.Status.OK).entity(result).type(MediaType.APPLICATION_JSON).build();
    }

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(User u) {
        JSONObject result = UserService.login(u.getEmail(), u.getPassword());
        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("token")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response token(@HeaderParam("Token") String jwt) {
        int tokenCheckResult = decodeJwt(jwt);

        if(tokenCheckResult == 1) {
            return Response.status(Response.Status.OK).entity("Verify").build();
        } else if(tokenCheckResult == 2) {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("2").build();
        } else {
            return  Response.status(Response.Status.UNAUTHORIZED).entity("3").build();
        }
    }
}
