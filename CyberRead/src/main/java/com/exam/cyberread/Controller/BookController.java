package com.exam.cyberread.Controller;

import com.exam.cyberread.Config.Token;
import com.exam.cyberread.Exception.BookException;
import com.exam.cyberread.Exception.MissingCategoryException;
import com.exam.cyberread.Exception.MissingFilterException;
import com.exam.cyberread.Model.Book;
import com.exam.cyberread.Model.Category;
import com.exam.cyberread.Model.User;
import com.exam.cyberread.Service.BookService;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price
            * category
            * purchased
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getMostSavedBooksOfTheMonth")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getMostSavedBooksOfTheMonth(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 9 random published books
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price 
            * category
            * purchased
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getPublishedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getPublishedBooks(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 9 random self-published books
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price 
            * category
            * purchased
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getSelfPublishedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getSelfPublishedBooks(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 1 random book
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price 
            * category
            * purchased
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getOneRandomBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getOneRandomBook(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return 
        * 200: 1 random book
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * publisher company name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price 
            * category
            * purchased
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getRecommandedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getRecommandedBooks(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
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
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a general user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getDropDownValues")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getDropDownValues(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
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
        * chapter number
     * 
     * @return
        * 200: Successfully added the book
        * 401: 
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a general user
        * 422:
            * errors: if something value is wrong
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("addBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(@HeaderParam("Token") String jwt, Book bookDetails) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONObject result = BookService.addBook(userId, bookDetails.getTitle(), bookDetails.getDescription(), bookDetails.getTargetAudienceId(), bookDetails.getLanguageId(), bookDetails.getAdultFiction(), bookDetails.getCategoryId(), bookDetails.getStatusId(), bookDetails.getPrice(), bookDetails.getCoverImage(), bookDetails.getFile(), bookDetails.getBankAccountNumber(), bookDetails.getChapterNumber());
                            if(result.isEmpty()) {
                                return Response.status(Response.Status.OK).build();
                            } else {
                                return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                            }
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
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200:
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
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a general user
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("getBookDetails")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getBookDetails(@HeaderParam("Token") String jwt, Book book) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
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
                            return Response.status(Response.Status.FORBIDDEN).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
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
        * chapter number
     * 
     * @return
        * 200: Successfully set the book
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a general user
        * 422: 
            * errors: if something value is wrong
     * 
     * @throws BookException: Something wrong
     */
    @PUT
    @Path("setBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response setBook(@HeaderParam("Token") String jwt, Book bookDetails) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "general": 
                            JSONObject result = BookService.setBook(bookDetails.getId(), bookDetails.getTitle(), bookDetails.getDescription(), bookDetails.getTargetAudienceId(), bookDetails.getLanguageId(), bookDetails.getAdultFiction(), bookDetails.getCategoryId(), bookDetails.getStatusId(), bookDetails.getPrice(), bookDetails.getCoverImage(), bookDetails.getFile(), bookDetails.getBankAccountNumber(), bookDetails.getChapterNumber());
                            if(result.isEmpty()) {
                                return Response.status(Response.Status.OK).build();
                            } else {
                                return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                            }
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
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price
            * category
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a publisher user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getOneRandomLookingForPublisherBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getOneRandomLookingForPublisherBook(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "publisher": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getOneRandomLookingForPublisherBook(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
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
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price
            * category
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a publisher user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getRecommandedBooksForPublisher")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getRecommandedBooksForPublisher(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "publisher": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getRecommandedBooksForPublisher(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
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
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * book id
            * cover image
            * title
            * username
            * first name
            * last name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 403: User is not a publisher user
     * 
     * @throws BookException: Something wrong
     */
    @GET
    @Path("getRandomBookByCategory")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getRandomBookByCategory(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1:
                    String rank = Token.getUserRankByToken(jwt);
                    switch(rank) {
                        case "publisher": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONObject result = BookService.getRandomBookByCategory(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
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
    
    
    /**
     * @param jwt
     * @param user
     * 
     * @return
        * 200:
            * books:
                * book id
                * category name
                * cover image
                * title
                * username
                * first name
                * last name
                * company name
                * book description
                * pages number
                * book rating
                * language
                * saved
                * price
                * category
                * purchased (if the user is general user)
            * own books
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: 
            * profilUsernameError
            * eligibilityError
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("getUserBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserBooks(@HeaderParam("Token") String jwt, User user) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = BookService.getUserBooks(userId, user.getProfileUsername());
                    if(result.length() == 1) {
                        return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200: Successfully saved the book
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: saveBookError
     * 
     * @throws BookException: Something wrong
     */
    @POST
    @Path("saveBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveBook(@HeaderParam("Token") String jwt, Book book) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = BookService.saveBook(userId, book.getId());
                    if(result.isEmpty()) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200: Successfully delete the book saved
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: deleteSavedBookError
     * 
     * @throws BookException: Something wrong
     */
    @DELETE
    @Path("deleteSavedBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteSavedBook(@HeaderParam("Token") String jwt, Book book) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = BookService.deleteSavedBook(userId, book.getId());
                    if(result.isEmpty()) {
                        return Response.status(Response.Status.OK).build();
                    }
                    return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200: Successfully delete the book
        * 403: User is not a general user
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: deleteBookError
     * 
     * @throws BookException: Something wrong
     */
    @DELETE
    @Path("deleteBook")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteBook(@HeaderParam("Token") String jwt, Book book) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    String rank = Token.getUserRankByToken(jwt);
                    
                    switch(rank) {
                        case "general":
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONObject result = BookService.deleteBook(userId, book.getId());
                            if(result.isEmpty()) {
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
    
    
    /**
     * @param jwt
     * @param category
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * saved
                * price
                * username
                * category
                * purchased
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: The name of the category id is not the same as the category name!
     */
    @POST
    @Path("getAllBooksByCategory")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getAllBooksByCategory(@HeaderParam("Token") String jwt, Category category) throws BookException, MissingCategoryException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    try {
                        JSONArray result = BookService.getAllBooksByCategory(userId, category.getId(), category.getName());
                        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    } catch(MissingCategoryException ex) {
                        return Response.status(404).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * saved
                * price
                * username
                * category
                * purchased
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: This category does not exist!
     * @throws MissingFilterException: This filter number does not exist!
     */
    @POST
    @Path("getFilteredBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getFilteredBooks(@HeaderParam("Token") String jwt, Book book) throws BookException, MissingCategoryException, MissingFilterException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    try {
                        Integer userId = Token.getUserIdByToken(jwt);
                        JSONArray result = BookService.getFilteredBooks(userId, book.getFilter(), book.getCategoryId());
                        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    } catch(MissingCategoryException ex) {
                        JSONObject error = new JSONObject();
                        error.put("categoryError", ex.getMessage());
                        
                        return Response.status(422).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
                    } catch(MissingFilterException ex) {
                        JSONObject error = new JSONObject();
                        error.put("filterError", ex.getMessage());
                        
                        return Response.status(422).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * saved
                * price
                * username
                * category
                * purchased
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: searchTextError
     * 
     * @throws BookException: Something wrong!
     */
    @POST
    @Path("getSearchBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getSearchBooks(@HeaderParam("Token") String jwt, Book book) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONObject result = BookService.getSearchBooks(userId, book.getSearchText());
                    
                    if(result.has("searchTextError")) {
                        return Response.status(422).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * price
                * username
                * category
                * purchased
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws BookException: Something wrong!
     */
    @GET
    @Path("getSavedBooksByUserId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getSavedBooksByUserId(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    Integer userId = Token.getUserIdByToken(jwt);
                    JSONArray result = BookService.getSavedBooksByUserId(userId);

                    return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * username
                * category
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws BookException: Something wrong!
     */
    @GET
    @Path("getPayedBooksByUserId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getPayedBooksByUserId(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    String rank = Token.getUserRankByToken(jwt);
                    
                    switch(rank) {
                        case "general": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getPayedBooksByUserId(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
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
    
    
    /**
     * @param jwt
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * price
                * username
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
     * 
     * @throws BookException: Something wrong!
     */
    @GET
    @Path("getPublishedBooksByUserId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getPublishedBooksByUserId(@HeaderParam("Token") String jwt) throws BookException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    String rank = Token.getUserRankByToken(jwt);
                    
                    switch(rank) {
                        case "publisher": 
                            Integer userId = Token.getUserIdByToken(jwt);
                            JSONArray result = BookService.getPublishedBooksByUserId(userId);
                            return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
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
    
    
    /**
     * @param jwt
     * @param category
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * price
                * username
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: categoryError
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: The categoryId is wrong!
     */
    @POST
    @Path("getSavedBooksByCategoryId")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getSavedBooksByCategoryId(@HeaderParam("Token") String jwt, Category category) throws BookException, MissingCategoryException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    try {
                        Integer userId = Token.getUserIdByToken(jwt);
                        JSONArray result = BookService.getSavedBooksByCategoryId(userId, category.getId());

                        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    } catch(MissingCategoryException ex) {
                        JSONObject error = new JSONObject();
                        error.put("categoryError", ex.getMessage());
                        
                        return Response.status(422).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
    
    /**
     * @param jwt
     * @param book
     * 
     * @return
        * 200:
            * books:
                * book id
                * cover image
                * title
                * first name
                * last name
                * publisher company name
                * description
                * pages number
                * book rating
                * language
                * saved
                * price
                * username
                * category
                * purchased
        * 401:
            * User hasn't token
            * Invalid token
            * The token has expired
        * 422: filterError
     * 
     * @throws BookException: Something wrong!
     * @throws MissingFilterException: This filter number does not exist!
     */
    @POST
    @Path("getFilteredSavedBooks")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getFilteredSavedBooks(@HeaderParam("Token") String jwt, Book book) throws BookException, MissingFilterException {
        if(jwt == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User hasn't token!").type(MediaType.APPLICATION_JSON).build();
        } else {
            int tokenCheckResult = Token.decodeJwt(jwt);

            switch(tokenCheckResult) {
                case 1: 
                    try {
                        Integer userId = Token.getUserIdByToken(jwt);
                        JSONArray result = BookService.getFilteredSavedBooks(userId, book.getFilter());
                        return Response.status(Response.Status.OK).entity(result.toString()).type(MediaType.APPLICATION_JSON).build();
                    } catch(MissingFilterException ex) {
                        JSONObject error = new JSONObject();
                        error.put("filterError", ex.getMessage());
                        
                        return Response.status(422).entity(error.toString()).type(MediaType.APPLICATION_JSON).build();
                    }
                case 2:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token!").type(MediaType.APPLICATION_JSON).build();
                default:
                    return Response.status(Response.Status.UNAUTHORIZED).entity("The token has expired!").type(MediaType.APPLICATION_JSON).build();
            }
        }
    }
    
}
