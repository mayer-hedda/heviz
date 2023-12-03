package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.CategoryException;
import com.mycompany.cyberread.Modell.Category;
import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;

public class CategoryService {
    
    public static JSONObject getAllCategory() throws CategoryException {
        try {
            HashMap<Integer, String> categories = Category.getAllCategory();
            JSONArray result = new JSONArray();
            JSONObject json = new JSONObject();

            for (Integer key : categories.keySet()) {
                result.put(categories.get(key));
            }
            json.put("categories", result);

            return json;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new CategoryException("Error in getAllCategory() methode in CategoryService!");
        }
    }
    
}
