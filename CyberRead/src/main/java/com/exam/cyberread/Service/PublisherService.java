package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.PublisherException;
import com.exam.cyberread.Model.Publisher;
import org.json.JSONObject;


public class PublisherService {
    
    /**
     * @param userId
     * @param companyName
     * 
     * @return
        * error:
            * companyNameError
            * setCompanyNameError
        * empty JSONObject: Successfully set company name
     * 
     * @throws PublisherException: Something wrong!
     */
    public static JSONObject setCompanyName(Integer userId, String companyName) throws PublisherException {
        try {
            JSONObject error = new JSONObject();
            
            if(companyName.length() > 50) {
                error.put("companyNameError", "The company name cannot be longer than 50 characters!");
            } else if(!Publisher.setCompanyName(userId, companyName)) {
                error.put("setCompanyNameError", "Could not change your company name!");
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PublisherException("Error in setCompanyName() method!");
        }
    }
    
}
