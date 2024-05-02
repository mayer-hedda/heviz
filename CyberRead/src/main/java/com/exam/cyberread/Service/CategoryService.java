package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.CategoryinterestException;
import com.exam.cyberread.Model.Category;
import org.json.JSONArray;


public class CategoryService {
    
    /**
     * @return
        * category id
        * category name
        * category image
     * 
     * @throws CategoryinterestException: Something wrong
     */
    public static JSONArray getAllCategory() throws CategoryinterestException {
        try {
            return Category.getAllCategory();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new CategoryinterestException("Error in getAllCategory() method!");
        }
    }
    
}
