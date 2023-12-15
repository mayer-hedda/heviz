package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.BookException;
import com.exam.cyberread.Model.Book;
import com.exam.cyberread.Service.BookService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONObject;


@Path("book")
public class BookController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of BookController
     */
    public BookController() {
    }

    /**
     * Retrieves representation of an instance of com.exam.cyberread.Controller.BookController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of BookController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    
    
    // --- MY ENDPOINTS ---
    /**
     * @param jwt
     * 
     * @return 
        * 200: 5 most saved books of the month
        * 401: User hasn't token / Invalid token
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getMostSavedBooksOfTheMonth")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getMostSavedBooksOfTheMonth(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getMostSavedBooksOfTheMonth(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 9 random published books
        * 401: User hasn't token / Invalid token
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getPublishedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getPublishedBooks(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getPublishedBooks(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 9 random self-published books
        * 401: User hasn't token / Invalid token
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getSelfPublishedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getSelfPublishedBooks(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getSelfPublishedBooks(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 1 random book
        * 401: User hasn't token / Invalid token
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getOneRandomBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getOneRandomBook(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getOneRandomBook(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 1 random book
        * 401: User hasn't token / Invalid token
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getRecommandedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getRecommandedBooks(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getRecommandedBooks(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200:
        *   all target audiences
        *   all categories
        *   all languages
        * 401: User hasn't token / Invalid token
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getDropDownValues")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getDropDownValues(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            JSONObject result = BookService.getDropDownValues();
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param bookDetails
        * title
        * description
        * target audience id
        * language id
        * adult fiction
        * category id
        * status id
            * 1: looking for a publisher
            * 2: self-publish
        * price
        * cover image
        * file
        * bank account number
     * 
     * @return
        * errors: if something value is wrong
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("addBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(@HeaderParam("Token") String jwt, Book bookDetails) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONObject result = BookService.addBook(userId, bookDetails.getTitle(), bookDetails.getDescription(), bookDetails.getTargetAudienceId(), bookDetails.getLanguageId(), bookDetails.getAdultFiction(), bookDetails.getCategoryId(), bookDetails.getStatusId(), bookDetails.getPrice(), bookDetails.getCoverImage(), bookDetails.getFile(), bookDetails.getBankAccountNumber());
                            if(result.isEmpty()) {
                                return Response.status(Response.Status.OK).build();
                            } else {
                                return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                            }
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * id
        * title
        * description
        * target audience id
        * language id
        * adult fiction
        * category id
        * status id
        * price
        * cover image
        * file
        * bank account number
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("getBookDetails")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBookDetails(@HeaderParam("Token") String jwt, Book book) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            JSONObject result = BookService.getBookDetails(book.getId());
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param bookDetails
        * id
        * title
        * description
        * target audience id
        * language id
        * adult fiction
        * category id
        * status id
            * 1: looking for a publisher
            * 2: self-publish
        * price
        * cover image
        * file
        * bank account number
     * 
     * @return
        * errors: if something value is wrong
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("setBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setBook(@HeaderParam("Token") String jwt, Book bookDetails) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            JSONObject result = BookService.setBook(bookDetails.getId(), bookDetails.getTitle(), bookDetails.getDescription(), bookDetails.getTargetAudienceId(), bookDetails.getLanguageId(), bookDetails.getAdultFiction(), bookDetails.getCategoryId(), bookDetails.getStatusId(), bookDetails.getPrice(), bookDetails.getCoverImage(), bookDetails.getFile(), bookDetails.getBankAccountNumber());
                            if(result.isEmpty()) {
                                return Response.status(Response.Status.OK).build();
                            } else {
                                return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                            }
                        default:
                            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorised to access this page!").build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").build();
            }
        }
    }
    
}
