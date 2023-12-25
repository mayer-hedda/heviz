package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.PostException;
import com.exam.cyberread.Model.Post;
import org.json.JSONArray;
import org.json.JSONObject;


public class PostService {
    
    /**
     * @param userId
     * @param description
     * 
     * @return
        * error: if the post description is empty
        * 1: Successfully added the post
        * 2: Unsuccessfully added the post
     * 
     * @throws PostException: Something wrong
     */
    public static String addPost(Integer userId, String description) throws PostException {
        try{
            JSONObject error = new JSONObject();
            
            if(description == null || description.isEmpty()) {
                error.put("postError", "The post description cannot be empty!");
            } else if(description.length() > 1000) {
                error.put("postError", "The post cannot be longer than 1000 characters!");
            } else {
                if(Post.addPost(userId, description)) {
                    return "1";
                }
                return "2";
            }
            
            return error.toString();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in addPost() method!");
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * posts by followed user
            * id
            * username
            * image
            * post time
            * post description
            * liked
     * 
     * @throws PostException: Something wrong
     */
    public static JSONArray getFeedPosts(Integer userId) throws PostException {
        try{
            return Post.getFeedPosts(userId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getFeedPosts() method!");
        }
    }
    
    
    /**
     * @param userId: logged in user id
     * @param profileUsername: username associated with the opened profile
     * 
     * @return
        * posts:
            * post id
            * username
            * image
            * post time
            * description
            * liked
        * own posts
     * 
     * @throws PostException: Something wrong
     */
    public static JSONObject getUserPosts(Integer userId, String profileUsername) throws PostException {
        try {
            return Post.getUserPosts(userId, profileUsername);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getUserPosts() method!");
        }
    }
    
}
