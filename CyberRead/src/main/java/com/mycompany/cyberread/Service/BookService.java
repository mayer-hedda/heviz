    
package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.BookException;
import com.mycompany.cyberread.Helpers.AddBook;
import com.mycompany.cyberread.Modell.Ages;
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
            
            if(statusId == null) {
                result.put("statusError", "You have to choose one option!");
            } else {
                if(statusId == 2 && price == null) {
                    result.put("priceError", "The price field cannot be empty!");
                } else if(statusId == 1) {
                    price = null;
                }
                
                if(statusId == 2 && (bankAccountNumber == null || bankAccountNumber.isEmpty())) {
                    result.put("bankAccountNumberError", "The bank account number field cannot be empty!");
                } else if(statusId == 1) {
                    bankAccountNumber = null;
                }
            }
            
            if(price != null) {
                if(price < 1000) {
                    result.put("priceError", "The price must be a minimum of 1000 Hungarian Forints!");
                } else {
                    price = (int) (price / 0.80);
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
    
}
