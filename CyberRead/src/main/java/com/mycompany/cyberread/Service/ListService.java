/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.ListException;
import com.mycompany.cyberread.Modell.List;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author eepseelona
 */
public class ListService {
    
    public static JSONArray getMostListedBooksOfTheMonth() throws ListException {
        try {
            java.util.List<List> results = List.getMostListedBooksOfTheMonth();
            JSONArray jsonArray = new JSONArray();

            for (List result : results) {
                JSONObject json = new JSONObject();
                json.put("bookId", result.getBookId());
                jsonArray.put(json);
            }

            return jsonArray;
        } catch (Exception ex) {
            throw new ListException("Error in getMostListedBooksOfTheMoth() method in ListService!");
        }
    }
    
}
