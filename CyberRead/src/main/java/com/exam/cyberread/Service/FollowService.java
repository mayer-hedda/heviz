package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.FollowException;
import com.exam.cyberread.Model.Follow;
import org.json.JSONObject;


public class FollowService {
    
    /**
     * @param userId
     * @param followedUsername
     * 
     * @return
        * followUserError
     * 
     * @throws FollowException: Something wrong
     */
    public static JSONObject followUser(Integer userId, String followedUsername) throws FollowException {
        try {
            return Follow.followUser(userId, followedUsername);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new FollowException("Error in followUser() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param followedUsername
     * 
     * @return
        * unfollowedUserError
     * 
     * @throws FollowException: Something wrong
     */
    public static JSONObject unfollowedUser(Integer userId, String followedUsername) throws FollowException {
        try {
            return Follow.unfollowedUser(userId, followedUsername);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new FollowException("Error in unfollowedUser() method!");
        }
    }
    
}
