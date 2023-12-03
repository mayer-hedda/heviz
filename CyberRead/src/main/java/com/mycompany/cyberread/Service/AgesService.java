package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.AgesException;
import com.mycompany.cyberread.Modell.Ages;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;


public class AgesService {
    
    public static JSONObject getAllAges() throws AgesException {
        try {
            ArrayList<Ages> ages = Ages.getAllAges();
            JSONArray array = new JSONArray();
            JSONObject result = new JSONObject();

            for(Ages age : ages) {
                JSONObject json = new JSONObject();

                json.put("id", age.getId());
                json.put("name", age.getName());
                json.put("minAge", age.getMinAge());
                json.put("maxAge", age.getMaxAge());

                array.put(json);
            }
            result.put("targetAudience", array);
            
            return result;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new AgesException("Error in getAllAges() methode in AgesService!");
        }
    }
    
}
