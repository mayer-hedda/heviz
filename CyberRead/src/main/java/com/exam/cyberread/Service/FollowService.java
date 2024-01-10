package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.FollowException;
import com.exam.cyberread.Model.Follow;
import org.json.JSONObject;


public class FollowService {
    
    /**
     * @param userId
     * @param followUserId
     * 
     * @return
        * followUserError
     * 
     * @throws FollowException: Something wrong
     */
    public static JSONObject followUser(Integer userId, Integer followUserId) throws FollowException {
        try {
            return Follow.followUser(userId, followUserId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new FollowException("Error in followUser() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param followUserId
     * 
     * @return
        * unfollowedUserError
     * 
     * @throws FollowException: Something wrong
     */
    public static JSONObject unfollowedUser(Integer userId, Integer followUserId) throws FollowException {
        try {
            return Follow.unfollowedUser(userId, followUserId);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new FollowException("Error in unfollowedUser() method!");
        }
    }
    
}
