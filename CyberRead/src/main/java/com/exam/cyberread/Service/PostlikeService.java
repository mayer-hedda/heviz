package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.PostlikeException;
import com.exam.cyberread.Model.Postlike;


public class PostlikeService {
    
    /**
     * @param userId
     * @param postId
     * 
     * @return
        * 1: Successfully liked the post
        * 2: The post doesn't exist
     * 
     * @throws PostlikeException: Something wrong
     */
    public static Integer postLike(Integer userId, Integer postId) throws PostlikeException {
        try{
            if(Postlike.postLike(userId, postId) == 1) {
                return 1;
            } else {
                return 2;
            }
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            throw new PostlikeException("Error in postLike() method!");
        }
    }
    
    
    /**
     * @param userId
     * @param postId
     * 
     * @return
        * 1: Successfully liked the post
        * 2: The post doesn't exist
     * 
     * @throws PostlikeException: Something wrong
     */
    public static Integer postDislike(Integer userId, Integer postId) throws PostlikeException {
        try{
            if(Postlike.postDislike(userId, postId) == 1) {
                return 1;
            } else {
                return 2;
            }
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            throw new PostlikeException("Error in postDislike() method!");
        }
    }
    
}
