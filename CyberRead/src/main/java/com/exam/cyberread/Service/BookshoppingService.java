package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.BookshoppingException;
import com.exam.cyberread.Model.Bookshopping;
import org.json.JSONObject;


public class BookshoppingService {
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * null : Successfully add book shopping
        * error
     * 
     * @throws BookshoppingException: Something wrong!
     */
    public static JSONObject addBookShopping(Integer userId, Integer bookId) throws BookshoppingException {
        try {
            return Bookshopping.addBookShopping(userId, bookId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookshoppingException("Error in addBookShopping() method!");
        }
    }
    
}
