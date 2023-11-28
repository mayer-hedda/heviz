package com.mycompany.cyberread.Helpers;

public class GetPostsByFollowedUsers {

    private String username;
    private String image;
    private String postTime;
    private String postText;
    private Boolean liked;

    public GetPostsByFollowedUsers(String username, String image, String postTime, String postText, Boolean liked) {
        this.username = username;
        this.image = image;
        this.postTime = postTime;
        this.postText = postText;
        this.liked = liked;
    }

    public String getUsername() {
        return username;
    }

    public String getImage() {
        return image;
    }

    public String getPostTime() {
        return postTime;
    }

    public String getPostText() {
        return postText;
    }

    public Boolean getLiked() {
        return liked;
    }
}
