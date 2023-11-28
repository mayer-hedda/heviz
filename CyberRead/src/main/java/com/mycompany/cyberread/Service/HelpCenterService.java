package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.HelpCenterException;
import com.mycompany.cyberread.Modell.Helpcenter;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class HelpCenterService {

    public static JSONArray getAllHelpCenter() throws HelpCenterException {
        try {
            List<Helpcenter> results = Helpcenter.getAllHelpcenter();
            JSONArray jsonArray = new JSONArray();

            for (Helpcenter result : results) {
                JSONObject json = new JSONObject();
                json.put("Question", result.getQuestion());
                json.put("Answer", result.getAnswer());
                jsonArray.put(json);
            }

            return jsonArray;
        } catch (Exception ex) {
            throw new HelpCenterException("Error in getAllHelpCenter() method!");
        }
    }

}