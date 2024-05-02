package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Dto.AddCategoryInterest;
import com.exam.cyberread.Exception.CategoryinterestException;
import com.exam.cyberread.Service.CategoryinterestService;
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
import org.json.JSONObject;


@Path("categoryinterest")
public class CategoryinterestController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CategoryinterestController
     */
    public CategoryinterestController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.CategoryinterestController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CategoryinterestController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * @param categoryInterest
     * 
     * @return
        * 200: Successfully added category interest
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: category interest error
     * 
     * @throws CategoryinterestException: Something wrong
     */
    @POST
    @Path("addCategoryInterest")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCategoryInterest(@HeaderParam("Token") String jwt, AddCategoryInterest categoryInterest) throws CategoryinterestException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = CategoryinterestService.addCategoryInterest(userId, categoryInterest.getCategoryIds());
                    
                    if(result.isEmpty()) {
                        return Response.status(Response.Status.OK).build();
                    } else {
                        return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
