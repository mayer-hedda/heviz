package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.AgesException;
import com.mycompany.cyberread.Exception.LanguageException;
import com.mycompany.cyberread.Modell.Ages;
import com.mycompany.cyberread.Modell.Language;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class LanguageService {
    
    public static JSONObject getAllLanguage() throws LanguageException {
        try {
            ArrayList<Language> languages = Language.getAllLanguage();
            JSONArray array = new JSONArray();
            JSONObject result = new JSONObject();

            for(Language lang : languages) {
                JSONObject json = new JSONObject();

                json.put("code", lang.getCode());
                json.put("language", lang.getLanguage());

                array.put(json);
            }
            result.put("Languages", array);
            
            return result;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new LanguageException("Error in getAllLanguage() methode in LanguageService!");
        }
    }
    
}
