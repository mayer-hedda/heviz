package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Exception.PostException;
import com.mycompany.cyberread.Helpers.GetPostsByFollowedUsers;
import com.mycompany.cyberread.Modell.Post;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class PostService {
    
    public static JSONArray getPostsByFollowedUsers(Integer userId) throws PostException {
        try {
            ArrayList<GetPostsByFollowedUsers> posts = Post.getPostsByFollowedUsers(userId);
            JSONArray result = new JSONArray();
            
            for(GetPostsByFollowedUsers post : posts) {
                JSONObject json = new JSONObject();
                json.put("username", post.getUsername());
                json.put("image", post.getImage());
                json.put("time", post.getPostTime());
                json.put("text", post.getPostText());
                json.put("liked", post.getLiked());
                result.put(json);
            }

            return result;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getPostsByFollowedUsers() method in PostService!");
        }
    }
    
    public static String addPost(Integer userId, String text) throws PostException {
        try {
            if(text == null || text.isEmpty()) {
                return "The post description cannot be empty!";
            } else {
                Post.addPost(userId, text);
                return "Successfull!";
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in addPost() method in PostService!");
        }
    }
    
}
