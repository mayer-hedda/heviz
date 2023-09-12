package com.mycompany.chapterx.Service;

import com.mycompany.chapterx.Modell.Category;
import com.mycompany.chapterx.Modell.Categoryinterest;

import java.util.HashMap;
import java.util.List;

public class CategoryInterestService {

    public static String addCategoryInterest(Integer userId, List<String> categoryNames) {
        try {
            HashMap<Integer, String> categories = Category.getAllCategory();
            boolean allSuccessful = true;

            for (String categoryName : categoryNames) {
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

            if (allSuccessful) {
                return "All categories added successfully!";
            } else {
                return "Some categories were not added successfully!";
            }
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }

}