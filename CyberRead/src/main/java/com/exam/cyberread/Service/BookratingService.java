package com.exam.cyberread.Service;

import com.exam.cyberread.Model.Bookrating;


public class BookratingService {
    
    /**
     * @param userId
     * @param bookId
     * @param rating
     * 
     * @return 
        * true: Successfully add book rating
        * false: Unsuccessfully add book rating
        * null: error
     */
    public static Boolean addBookRating(Integer userId, Integer bookId, Integer rating) {
        try {
            return Bookrating.addBookRating(userId, bookId, rating);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw ex;
        }
    }
    
}
