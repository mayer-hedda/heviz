/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Config.Token;
import com.mycompany.cyberread.Exception.ListException;
import com.mycompany.cyberread.Helpers.GetPostsByFollowedUsers;
import com.mycompany.cyberread.Modell.List;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author eepseelona
 */
public class ListService {
    
    public static JSONArray getMostListedBooksOfTheMoth() throws ListException {
        try {
            java.util.List<List> results = List.getMostListedBooksOfTheMoth();
            JSONArray jsonArray = new JSONArray();

            for (List result : results) {
                JSONObject json = new JSONObject();
                json.put("bookId", result.getBookId());
                jsonArray.put(json);
            }

            return jsonArray;
        } catch (Exception ex) {
            throw new ListException("Error in getMostListedBooksOfTheMoth() method!");
        }
    }

    public static JSONArray getPostsByFollowedUsers(String token) throws ListException {
        try {
            Integer userId = Token.getUserIdByToken(token);

            java.util.List<GetPostsByFollowedUsers> results = List.getPostsByFollowedUsers(userId);
            JSONArray jsonArray = new JSONArray();

            for (GetPostsByFollowedUsers result : results) {
                JSONObject json = new JSONObject();
                json.put("username", result.getUsername());
                json.put("image", result.getImage());
                json.put("postTime", result.getPostTime());
                json.put("text", result.getPostText());
                json.put("liked", result.getLiked());
                jsonArray.put(json);
            }

            return jsonArray;
        } catch (Exception ex) {
            throw new ListException("Error in getPostsByFollowedUsers() method!");
        }
    }
    
}
