package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.HelpCenterException;
import com.exam.cyberread.Model.Helpcenter;
import org.json.JSONArray;


public class HelpcenterService {
    
    /**
     * @return
        * id
        * question
        * answer
     * 
     * @throws HelpCenterException: Something wrong
     */
    public static JSONArray getActiveHelpCenter() throws HelpCenterException {
        try {
            return Helpcenter.getActiveHelpCenter();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new HelpCenterException("Error in getActiveHelpCenter() method!");
        }
    }
    
}
