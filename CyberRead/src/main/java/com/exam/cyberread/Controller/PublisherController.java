package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.PublisherException;
import com.exam.cyberread.Model.Publisher;
import com.exam.cyberread.Service.PublisherService;
import com.exam.cyberread.Service.UserService;
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
import org.json.JSONObject;


@Path("publisher")
public class PublisherController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PublisherController
     */
    public PublisherController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.PublisherController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of PublisherController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param publisher
     * 
     * @return
        * 200: Successfully set company name
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403:
            * User is not a publisher user!
        * 422: 
            * companyNameError: incorrect new company name
            * setCompanyNameError: Unsuccessfully set company name
     * 
     * @throws PublisherException: Something wrong!
     */
    @PUT
    @Path("setCompanyName")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setCompanyName(@HeaderParam("Token") String jwt, Publisher publisher) throws PublisherException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch (tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    String userRank = Token.getUserRankByToken(jwt);
                    
                    switch(userRank) {
                        case "publisher":
                            JSONObject result = PublisherService.setCompanyName(userId, publisher.getCompanyName());
                            if(result.length() == 0) {
                                return Response.status(Response.Status.OK).build();
                            }
                            return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                    
                    
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
