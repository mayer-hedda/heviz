    
package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.BookException;
import com.mycompany.cyberread.Helpers.AddBook;
import com.mycompany.cyberread.Helpers.SetBook;
import com.mycompany.cyberread.Modell.Ages;
import com.mycompany.cyberread.Modell.Book;
import com.mycompany.cyberread.Modell.Category;
import com.mycompany.cyberread.Modell.Language;
import org.json.JSONObject;


public class BookService {
    
    public static JSONObject addBook(Integer userId, String title, String description, Integer targetAudience, String language, Boolean adultFiction, String category, Integer statusId, Integer price, String coverImage, String text, String bankAccountNumber) throws BookException {
        
        try {
            JSONObject result = new JSONObject();

            if(title == null || title.isEmpty()) {
                result.put("storyTitleError", "Title field cannot be empty!");
            } else if(title.length() < 3) {
                result.put("storyTitleError", "Title must be 3 caracter long!");
            } else if(title.length() > 50) {
                result.put("storyTitleError", "The title cannot be longer than 50 characters!");
            }

            if(description == null || description.isEmpty()) {
                result.put("descriptionError", "The description field cannot be empty!");
            } else if(description.length() < 20) {
                result.put("descriptionError", "The description must be 20 caracter long.");
            } else if(description.length() > 1000) {
                result.put("descriptionError", "The description cannot be longer than 1000 characters!");
            }

            if(targetAudience == null) {
                result.put("targetAudienceError", "The target audience field cannot be empty!");
            } else if(!Ages.getAgesById(targetAudience)) {
                result.put("targetAudienceError", "This target audience does not exist!");
            }
            
            if(language == null || language.isEmpty()) {
                result.put("languageError", "The language field cannot be empty!");
            } else if(!Language.getLanguageByCode(language)) {
                result.put("languageError", "This language does not exist!");
            }
            
            if(adultFiction == null) {
                adultFiction = false;
            }
            
            if(category == null || category.isEmpty()) {
                result.put("categoryError", "The category field cannot be empty!");
            } else if(!Category.getCategoryByName(category)) {
                result.put("categoryError", "This category does not exist!");
            }
            
            if(price != null) {
                if(price < 1000) {
                    result.put("priceError", "The price must be a minimum of 1000 Hungarian Forints!");
                } else {
                    price = (int) (price / 0.80);
                }
            }
            
            if(statusId == null) {
                result.put("statusError", "You have to choose one option!");
            } else if(statusId < 1 || statusId > 2) {
                result.put("statusError", "The option does not exist!");
            } else {
                if(statusId == 2 && price == null) {
                    result.put("priceError", "The price field cannot be empty!");
                } else if(statusId == 1) {
                    price = 0;
                }
                
                if(statusId == 2 && (bankAccountNumber == null || bankAccountNumber.isEmpty())) {
                    result.put("bankAccountNumberError", "The bank account number field cannot be empty!");
                } else if(statusId == 1) {
                    bankAccountNumber = "";
                }
            }
            
            if(coverImage == null || coverImage.isEmpty()) {
                result.put("coverImageError", "The cover image cannot be empty!");
            }
            
            if(text == null || text.isEmpty()) {
                result.put("bookFileError", "The book file cannot be empty!");
            }
            
            
            if(result.isEmpty()) {
                AddBook.addBook(userId, title, description, targetAudience, language, adultFiction, category, statusId, price, coverImage, text, bankAccountNumber);
            }
            
            return result;
           
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in addBook() methode in BookService!");
        }
        
    }
    
    public static JSONObject setBook(Integer bookId, String title, String description, Integer targetAudience, String language, Boolean adultFiction, String category, Integer statusId, Integer price, String coverImage, String text, String bankAccountNumber) throws BookException {
        
        try {
            JSONObject result = new JSONObject();

            if(title == null || title.isEmpty()) {
                result.put("storyTitleError", "Title field cannot be empty!");
            } else if(title.length() < 3) {
                result.put("storyTitleError", "Title must be 3 caracter long!");
            } else if(title.length() > 50) {
                result.put("storyTitleError", "The title cannot be longer than 50 characters!");
            }

            if(description == null || description.isEmpty()) {
                result.put("descriptionError", "The description field cannot be empty!");
            } else if(description.length() < 20) {
                result.put("descriptionError", "The description must be 20 caracter long.");
            } else if(description.length() > 1000) {
                result.put("descriptionError", "The description cannot be longer than 1000 characters!");
            }

            if(targetAudience == null) {
                result.put("targetAudienceError", "The target audience field cannot be empty!");
            } else if(!Ages.getAgesById(targetAudience)) {
                result.put("targetAudienceError", "This target audience does not exist!");
            }
            
            if(language == null || language.isEmpty()) {
                result.put("languageError", "The language field cannot be empty!");
            } else if(!Language.getLanguageByCode(language)) {
                result.put("languageError", "This language does not exist!");
            }
            
            if(adultFiction == null) {
                adultFiction = false;
            }
            
            if(category == null || category.isEmpty()) {
                result.put("categoryError", "The category field cannot be empty!");
            } else if(!Category.getCategoryByName(category)) {
                result.put("categoryError", "This category does not exist!");
            }
            
            if(price != null) {
                if(price < 1000) {
                    result.put("priceError", "The price must be a minimum of 1000 Hungarian Forints!");
                } else {
                    price = (int) (price / 0.80);
                }
            }
            
            if(statusId == null) {
                result.put("statusError", "You have to choose one option!");
            } else if(statusId < 1 || statusId > 2) {
                result.put("statusError", "The option does not exist!");
            } else {
                if(statusId == 2 && price == null) {
                    result.put("priceError", "The price field cannot be empty!");
                } else if(statusId == 1) {
                    price = 0;
                }
                
                if(statusId == 2 && (bankAccountNumber == null || bankAccountNumber.isEmpty())) {
                    result.put("bankAccountNumberError", "The bank account number field cannot be empty!");
                } else if(statusId == 1) {
                    bankAccountNumber = "";
                }
            }
            
            if(coverImage == null || coverImage.isEmpty()) {
                result.put("coverImageError", "The cover image cannot be empty!");
            }
            
            if(text == null || text.isEmpty()) {
                result.put("bookFileError", "The book file cannot be empty!");
            }
            
            
            if(result.isEmpty()) {
                SetBook.setBook(bookId, title, description, targetAudience, language, adultFiction, category, statusId, price, coverImage, text, bankAccountNumber);
            }
            
            return result;
           
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in setBook() methode in BookService!");
        }
        
    }
    
    public static JSONObject getBookDetailsById(Integer bookId) throws BookException {
        try {
            JSONObject error = new JSONObject();
            
            if(bookId == null) {
                error.put("bookError", "This book id does not exist!");
                return error;
            } else {
                JSONObject bookDetails = Book.getBookDetailsById(bookId);
                
                if(bookDetails.isEmpty()) {
                    error.put("bookError", "This book does not exist!");
                    return error;
                } else {
                    return bookDetails;
                }
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getBookDetailsById() method in BookService!");
        }
    }
    
    public static JSONObject getOneRandomBook() throws BookException {
        try {
            JSONObject error = new JSONObject();
            
            JSONObject bookDetails = Book.getOneRandomBook();
                
            if(bookDetails.isEmpty()) {
                error.put("bookError", "No books in the database!");
                return error;
            } else {
                return bookDetails;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getBookDetailsById() method in BookService!");
        }
    }
    
    public static JSONObject getBooksPublished() throws BookException {
        try {
            JSONObject error = new JSONObject();
            
            JSONObject publishedBooks = Book.getBooksPublished();
                
            if(publishedBooks.isEmpty()) {
                error.put("bookError", "There are no published books!");
                return error;
            } else {
                return publishedBooks;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getBookDetailsById() method in BookService!");
        }
    }
    
    public static JSONObject getBooksSelfPublished() throws BookException {
        try {
            JSONObject error = new JSONObject();
            
            JSONObject selfPublishedBooks = Book.getBooksSelfPublished();
                
            if(selfPublishedBooks.isEmpty()) {
                error.put("bookError", "No self-published books!");
                return error;
            } else {
                return selfPublishedBooks;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getBooksSelfPublished() method in BookService!");
        }
    }
    
    public static JSONObject getRecommandedBooks(Integer userId) throws BookException {
        try {
            JSONObject error = new JSONObject();
            
            JSONObject recommandedBooks = Book.getRecommandedBooks(userId);
                
            if(recommandedBooks.isEmpty()) {
                error.put("bookError", "There are no books recommended for you!");
                return error;
            } else {
                return recommandedBooks;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getRecommandedBooks() method in BookService!");
        }
    }
    
}
