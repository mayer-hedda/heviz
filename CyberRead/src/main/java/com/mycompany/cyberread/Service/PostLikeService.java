package com.mycompany.cyberread.Service;

import com.mycompany.cyberread.Modell.Post;
import com.mycompany.cyberread.Modell.Postlike;


public class PostLikeService {
    
    public static String addPostLike(Integer userId, Integer postId) {
        try {
            if(Post.getPostById(postId)) {
                if(Postlike.getPostLikeForUserIdAndPostId(userId, postId)) {
                    if(Postlike.addPostLike(userId, postId)) {
                        return "Successfully liked the post!";
                    } else {
                        return "Could not like the post!";
                    }
                } else {
                    return "This post has already been liked!";
                }
            } else {
                return "This post does not exist!";
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return "Something wrong!";
        }
    }
    
    public static String deletePostLike(Integer userId, Integer postId) {
        try {
            if(Postlike.deletePostLike(userId, postId)) {
                return "Successfully disliked the post!";
            } else {
                return "Could not dislike the post!";
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return "Something wrong!";
        }
    }
    
}
