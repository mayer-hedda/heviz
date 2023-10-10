package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Modell.Category;
import com.mycompany.cyberread.Modell.Categoryinterest;

import java.util.HashMap;
import java.util.List;

public class CategoryInterestService {

    public static String addCategoryInterest(Integer userId, List<String> categoryNames) {
        try {
            HashMap<Integer, String> categories = Category.getAllCategory();
            List<String> userCategories = Categoryinterest.getAllCategoryforUserId(userId);
            boolean allSuccessful = true;

            if(categoryNames.size() < 3) {
                return "You must select at least 3 categories!";
            } else {
                for (String categoryName : categoryNames) {
                    if(!userCategories.contains(categoryName)) {
                        Integer categoryId = null;

                        for (Integer key : categories.keySet()) {
                            if (categories.get(key).equals(categoryName)) {
                                categoryId = key;
                                break;
                            }
                        }

                        if (!Categoryinterest.addCategoryInterest(userId, categoryId)) {
                            allSuccessful = false;
                        }
                    }
                }

                if (allSuccessful) {
                    return "All categories added successfully!";
                } else {
                    return "Some categories were not added successfully!";
                }
            }
            
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }

}