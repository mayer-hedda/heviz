package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.CategoryinterestException;
import com.exam.cyberread.Model.Categoryinterest;
import java.util.List;
import org.json.JSONObject;


public class CategoryinterestService {
    
    /**
     * @param userId
     * @param categoryIds
     * 
     * @return
        * true: if successfully added category interest
     * 
     * @throws CategoryinterestException: Something wrong
     */
    public static JSONObject addCategoryInterest(Integer userId, List categoryIds) throws CategoryinterestException {
        try {
            JSONObject error = new JSONObject();
            
            if(categoryIds.size() < 3) {
                error.put("categoryInterestError", "You must select at least 3 fields of interest!");
            } else {
                StringBuilder categories = new StringBuilder();
                for (int i = 0; i < categoryIds.size(); i++) {
                    categories.append(categoryIds.get(i));
                    if (i < categoryIds.size() - 1) {
                        categories.append(",");
                    }
                }

                String categoriesText = categories.toString();
                
                if(!Categoryinterest.addCategoryInterest(userId, categoriesText)) {
                    error.put("categoryInterestError", "Something wrong!");
                }
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new CategoryinterestException("Error in addCategoryInterest() method!");
        }
    }
    
    
}
