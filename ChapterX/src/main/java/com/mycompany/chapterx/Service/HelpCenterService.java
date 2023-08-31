package com.mycompany.chapterx.Service;

import com.mycompany.chapterx.Modell.Helpcenter;
import org.json.JSONObject;

public class HelpCenterService {

    public static JSONObject getALlHelpCenter() {
        String result = Helpcenter.getAllHelpcenter();

        JSONObject obj = new JSONObject();
        obj.put("helpCenter", result);

        return obj;
    }

}
