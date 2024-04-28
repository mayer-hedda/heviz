package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.BookException;
import com.exam.cyberread.Exception.MissingCategoryException;
import com.exam.cyberread.Exception.MissingFilterException;
import com.exam.cyberread.Model.Book;
import com.exam.cyberread.Model.Category;
import com.exam.cyberread.Model.Language;
import com.exam.cyberread.Model.Targetaudience;
import org.json.JSONArray;
import org.json.JSONObject;


public class BookService {
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return books
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
        * publisher username
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getMostSavedBooksOfTheMonth(Integer userId) throws BookException {
        try {
            return Book.getMostSavedBooksOfTheMonth(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getMostSavedBooksOfTheMonth() method!");
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return books
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
        * publisher username
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getPublishedBooks(Integer userId) throws BookException {
        try {
            return Book.getPublishedBooks(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error is getPublishedBooks() method!");
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return books
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
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getSelfPublishedBooks(Integer userId) throws BookException {
        try {
            return Book.getSelfPublishedBooks(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error is getSelfPublishedBooks() method!");
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return books
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
        * publisher username
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getOneRandomBook(Integer userId) throws BookException {
        try {
            return Book.getOneRandomBook(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error is getOneRandomBook() method!");
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return books
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
        * publisher username
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getRecommandedBooks(Integer userId) throws BookException {
        try {
            return Book.getRecommandedBooks(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error is getRecommandedBooks() method!");
        }
    }
    
    
    /**
     * @return
        * all target audiences
        * all categories
        * all languages
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getDropDownValues() throws BookException {
        try {
            JSONObject values = new JSONObject();
            
            values.put("targetAudiences", Targetaudience.getAllTargetAudiences());
            values.put("categories", Category.getAllCategoryForPublication());
            values.put("languages", Language.getAllLanguages());
            
            return values;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getDropDownValues() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param title
     * @param description
     * @param targetAudienceId
     * @param languageId
     * @param adultFiction
     * @param categoryId
     * @param statusId
     * @param price
     * @param coverImage
     * @param file
     * @param bankAccountNumber
     * @param chapterNumber
     * 
     * @return
        * errors: if something value is wrong
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject addBook(Integer userId, String title, String description, Integer targetAudienceId, Integer languageId, Boolean adultFiction, Integer categoryId, Integer statusId, Integer price, String coverImage, String file, String bankAccountNumber, Integer chapterNumber) throws BookException {
        try {
            JSONObject errors = BookService.bookDetailsCheck(title, description, targetAudienceId, languageId, adultFiction, categoryId, price, statusId, bankAccountNumber, coverImage, file);

            if(chapterNumber == null) {
                errors.put("chapterNumberError", "The chapter number field cannot be empty!");
            } else if(chapterNumber < 0) {
                errors.put("chapterNumberError", "The book cannot have less than zero chapters!");
            }
            
            
            if(errors.isEmpty()) {
                Integer result = Book.addBook(userId, title, description, targetAudienceId, languageId, adultFiction, categoryId, statusId, price, coverImage, file, bankAccountNumber, chapterNumber);
                
                switch(result) {
                    case 2:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        break;
                    case 3:
                        errors.put("languageError", "This language does not exist!");
                        break;
                    case 4:
                        errors.put("categoryError", "This category does not exist!");
                        break;
                    case 5:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        errors.put("languageError", "This language does not exist!");
                        break;
                    case 6:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        errors.put("categoryError", "This category does not exist!");
                        break;
                    case 7:
                        errors.put("languageError", "This language does not exist!");
                        errors.put("categoryError", "This category does not exist!");
                        break;
                    case 8:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        errors.put("languageError", "This language does not exist!");
                        errors.put("categoryError", "This category does not exist!");
                        break;
                }
            }
            
            return errors;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in addBook() methode!");
        }
    }
    
    
    /**
     * @param bookId
     * 
     * @return
        * book id
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
        * chapter number
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getBookDetails(Integer bookId) throws BookException {
        try {
            return Book.getBookDetails(bookId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getBookDetails() method!");
        }
    }
    
    
    /**
     * @param bookId
     * @param title
     * @param description
     * @param targetAudienceId
     * @param languageId
     * @param adultFiction
     * @param categoryId
     * @param statusId
        * 1: looking for a publisher
        * 2: self-published
     * @param price
     * @param coverImage
     * @param file
     * @param bankAccountNumber
     * @param chapterNumber
     * 
     * @return
        * errors: if something value is wrong
     *
     * @throws BookException: Something wrong
     */
    public static JSONObject setBook(Integer bookId, String title, String description, Integer targetAudienceId, Integer languageId, Boolean adultFiction, Integer categoryId, Integer statusId, Integer price, String coverImage, String file, String bankAccountNumber, Integer chapterNumber) throws BookException {
        try{
            JSONObject errors = BookService.bookDetailsCheck(title, description, targetAudienceId, languageId, adultFiction, categoryId, price, statusId, bankAccountNumber, coverImage, file);
            
            if(chapterNumber == null) {
                errors.put("chapterNumberError", "The chapter number field cannot be empty!");
            } else if(chapterNumber < 0) {
                errors.put("chapterNumberError", "The book cannot have less than zero chapters!");
            } 
            
            
            if(errors.isEmpty()) {
                Integer result = Book.setBook(bookId, title, description, targetAudienceId, languageId, adultFiction, categoryId, statusId, price, coverImage, file, bankAccountNumber, chapterNumber);
                        
                switch(result) {
                    case 2:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        break;
                    case 3:
                        errors.put("languageError", "This language does not exist!");
                        break;
                    case 4:
                        errors.put("categoryError", "This category does not exist!");
                        break;
                    case 5:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        errors.put("languageError", "This language does not exist!");
                        break;
                    case 6:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        errors.put("categoryError", "This category does not exist!");
                        break;
                    case 7:
                        errors.put("languageError", "This language does not exist!");
                        errors.put("categoryError", "This category does not exist!");
                        break;
                    case 8:
                        errors.put("targetAudeienceError", "This target audience does not exist!");
                        errors.put("languageError", "This language does not exist!");
                        errors.put("categoryError", "This category does not exist!");
                        break;
                }
            }
            
            return errors;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in setBook() method!");
        }
    }
    
    
    /**
     * @param title
     * @param description
     * @param targetAudienceId
     * @param languageId
     * @param adultFiction
     * @param categoryId
     * @param price
     * @param statusId
     * @param bankAccountNumber
     * @param coverImage
     * @param file
     * 
     * @return error
        * If empty then all data is correct
        * Else there is an error in the data
     * 
     * @throws com.exam.cyberread.Exception.BookException 
     */
    public static JSONObject bookDetailsCheck(String title, String description, Integer targetAudienceId, Integer languageId, Boolean adultFiction, Integer categoryId, Integer price, Integer statusId, String bankAccountNumber, String coverImage, String file) throws BookException {
        try {
            JSONObject errors = new JSONObject();

            if(title == null || title.isEmpty()) {
                errors.put("storyTitleError", "Title field cannot be empty!");
            } else if(title.length() < 3) {
                errors.put("storyTitleError", "Title must be 3 caracter long!");
            } else if(title.length() > 50) {
                errors.put("storyTitleError", "The title cannot be longer than 50 characters!");
            } else if(title.matches("[^a-zA-Z0-9]+")) {
                errors.put("storyTitleError", "The title of the book should not consist exclusively of special characters!");
            }

            if(description == null || description.isEmpty()) {
                errors.put("descriptionError", "The description field cannot be empty!");
            } else if(description.length() < 20) {
                errors.put("descriptionError", "The description must be 20 caracter long.");
            } else if(description.length() > 1000) {
                errors.put("descriptionError", "The description cannot be longer than 1000 characters!");
            } else if(description.matches("[^a-zA-Z0-9]+")) {
                errors.put("descriptionError", "The description of the book should not consist exclusively of special characters!");
            }

            if(targetAudienceId == null) {
                errors.put("targetAudienceError", "The target audience field cannot be empty!");
            }

            if(languageId == null) {
                errors.put("languageError", "The language field cannot be empty!");
            }

            if(adultFiction == null) {
                adultFiction = false;
            }

            if(categoryId == null) {
                errors.put("categoryError", "The category field cannot be empty!");
            }

            if(statusId == 2 && price != null) {
                if(price < 1000) {
                    errors.put("priceError", "The price must be a minimum of 1000 Hungarian Forints!");
                } else {
                    price = (int) (price / 0.80);
                }
            }

            if(statusId == null) {
                errors.put("statusError", "You have to choose one option!");
            } else if(statusId < 1 || statusId > 2) {
                errors.put("statusError", "The option does not exist!");
            } else {
                if(statusId == 2 && price == null) {
                    errors.put("priceError", "The price field cannot be empty!");
                } else if(statusId == 1) {
                    price = 0;
                }

                if(statusId == 2 && (bankAccountNumber == null || bankAccountNumber.isEmpty())) {
                    errors.put("bankAccountNumberError", "The bank account number field cannot be empty!");
                } else if(statusId == 2 && bankAccountNumber.length() > 30) {
                    errors.put("bankAccountNumberError", "The length of the bank account number must not exceed 30 characters!");
                } else if(statusId == 1) {
                    bankAccountNumber = "";
                }
            }

            if(coverImage == null || coverImage.isEmpty()) {
                errors.put("coverImageError", "The cover image cannot be empty!");
            }

            if(file == null || file.isEmpty()) {
                errors.put("bookFileError", "The book file cannot be empty!");
            }

            return errors;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in bookDetailsCheck() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
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
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getOneRandomLookingForPublisherBook(Integer userId) throws BookException {
        try {
            return Book.getOneRandomLookingForPublisherBook(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getOneRandomLookingForPublisherBook() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
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
     * 
     * @throws BookException 
     */
    public static JSONArray getRecommandedBooksForPublisher(Integer userId) throws BookException {
        try {
            return Book.getRecommandedBooksForPublisher(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getRecommandedBooksForPublisher() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
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
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getRandomBookByCategory(Integer userId) throws BookException {
        try {
            JSONArray books = Book.getRandomBookByCategory(userId);

            JSONObject result = new JSONObject();

            for (int i = 0; i < books.length(); i++) {
                JSONObject bookData = books.getJSONObject(i);
                String categoryName = bookData.getString("categoryName");
                bookData.remove("categoryName");

                if (!result.has(categoryName)) {
                    JSONArray categoryBooks = new JSONArray();
                    categoryBooks.put(bookData);
                    result.put(categoryName, categoryBooks);
                } else {
                    JSONArray categoryBooks = result.getJSONArray(categoryName);
                    categoryBooks.put(bookData);
                    result.put(categoryName, categoryBooks);
                }
            }
            return result;
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getRandomBookByCategory() method!");
        }
    }
    
    
    /**
     * @param userId: logged in user id
     * @param profileUsername: username associated with the opened profile
     * 
     * @return
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
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getUserBooks(Integer userId, String profileUsername) throws BookException {
        try {
            return Book.getUserBooks(userId, profileUsername);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getUserBooks() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * saveBookError
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject saveBook(Integer userId, Integer bookId) throws BookException {
        try {
            return Book.saveBook(userId, bookId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in saveBook() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * deleteSavedBookError
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject deleteSavedBook(Integer userId, Integer bookId) throws BookException {
        try {
            return Book.deleteSavedBook(userId, bookId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in deleteSavedBook() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * deleteBookError
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject deleteBook(Integer userId, Integer bookId) throws BookException {
        try {
            return Book.deleteBook(userId, bookId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in deleteBook() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param catagoryId
     * @param categoryName
     * 
     * @return
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
            * publisher username
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: The name of the category id is not the same as the category name!
     */
    public static JSONArray getAllBooksByCategory(Integer userId, Integer catagoryId, String categoryName) throws BookException, MissingCategoryException {
        try {
            return Book.getAllBooksByCategory(userId, catagoryId, categoryName);
        } catch(MissingCategoryException ex) {
            throw ex;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getAllBooksByCategory() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param filter
     * @param categoryId
     * 
     * @return
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
            * publisher username
     *
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: This category does not exist!
     * @throws MissingFilterException: This filter number does not exist!
     */
    public static JSONArray getFilteredBooks(Integer userId, Integer filter, Integer categoryId) throws BookException, MissingCategoryException, MissingFilterException {
        try {
            return Book.getFilteredBooks(userId, filter, categoryId);
        } catch(BookException ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getFilteredBooks() method!");
        } catch(MissingCategoryException | MissingFilterException ex) {
            throw ex;
        } 
    }
    
    
    /**
     * @param userId
     * @param searchText
     * 
     * @return
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
            * publisher username
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONObject getSearchBooks(Integer userId, String searchText) throws BookException {
        try {
            if(searchText.length() > 50) {
                JSONObject error = new JSONObject();
                error.put("searchTextError", "The length of the text to be searched must not exceed 50 characters!");
                
                return error;
            } else if(searchText.length() <= 0) {
                JSONObject error = new JSONObject();
                error.put("searchTextError", "The length of the text to be searched must not be less than 1 character!");
                
                return error;
            } else {
                JSONObject books = Book.getSearchBooks(userId, searchText);
                
                return books;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSearchBooks() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
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
            * publisher username
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONArray getSavedBooksByUserId(Integer userId) throws BookException {
        try {
            return Book.getSavedBooksByUserId(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSavedBooksByUserId() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
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
            * publisher username
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONArray getPayedBooksByUserId(Integer userId) throws BookException {
        try {
            return Book.getPayedBooksByUserId(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getPayedBooksByUserId() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
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
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONArray getPublishedBooksByUserId(Integer userId) throws BookException {
        try {
            return Book.getPublishedBooksByUserId(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getPublishedBooksByUserId() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param categoryId
     * 
     * @return
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
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: The categoryId is wrong!
     */
    public static JSONArray getSavedBooksByCategoryId(Integer userId, Integer categoryId) throws BookException, MissingCategoryException {
        try {
            return Book.getSavedBooksByCategoryId(userId, categoryId);
        } catch(BookException ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSavedBooksByCategoryId() method!");
        } catch( MissingCategoryException ex) {
            throw ex;
        } 
    }
    
    
    /**
     * @param userId
     * @param filter
     * 
     * @return
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
            * publisher username
     *
     * @throws BookException: Something wrong!
     * @throws MissingFilterException: This filter number does not exist!
     */
    public static JSONArray getFilteredSavedBooks(Integer userId, Integer filter) throws BookException, MissingFilterException {
        try {
            return Book.getFilteredSavedBooks(userId, filter);
        } catch(BookException ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getFilteredSavedBooks() method!");
        } catch(MissingFilterException ex) {
            throw ex;
        } 
    }
    
    
    /**
     * @param userId
     * @param bookId
     * @param price
     * @param publisherBankAccountNumber
     * 
     * @return
        * error
        * null (Successfully set published book details)
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONObject setPublishedBookDetails(Integer userId, Integer bookId, Integer price, String publisherBankAccountNumber) throws BookException {
        try {   
            JSONObject error = new JSONObject();
            
            // price validate
            if(price < 1000) {
                error.put("priceError", "The price must be a minimum of 1000 Hungarian Forints!");
            } 
            
            // bank account number validate
            if(publisherBankAccountNumber == null || publisherBankAccountNumber.isEmpty()) {
                error.put("publisherBankAccountNumberError", "This field cannot be empty!");
            } else if(publisherBankAccountNumber.length() > 30) {
                error.put("publisherBankAccountNumberError", "The length of the bank account number must not exceed 30 characters!");
            }
            
            if(error.isEmpty()) {
                Integer newPrice = (int) (price / 0.80);

                return Book.setPublishedBookDetails(userId, bookId, newPrice, publisherBankAccountNumber);
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in setPublishedBookDetails() method!");
        }
    }
    
}
