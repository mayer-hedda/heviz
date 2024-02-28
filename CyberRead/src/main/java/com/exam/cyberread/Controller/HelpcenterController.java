package com.exam.cyberread.Controller;

import com.exam.cyberread.Exception.HelpCenterException;
import com.exam.cyberread.Service.HelpcenterService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;


@Path("helpcenter")
public class HelpcenterController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of HelpcenterController
     */
    public HelpcenterController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.HelpcenterController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of HelpcenterController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @return
        * 200: 
            * id
            * question
            * answer
     * 
     * @throws HelpCenterException: Something wrong
     */
    @GET
    @Path("getActiveHelpCenter")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getActiveHelpCenter() throws HelpCenterException {
        JSONArray result = HelpcenterService.getActiveHelpCenter();
        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
    }
    
}
