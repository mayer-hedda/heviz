package com.mycompany.cyberread.Helpers;

public class GetUserRecommendations {
    
    private String image;
    private String username;

    public GetUserRecommendations(String image, String username) {
        this.image = image;
        this.username = username;
    }

    public String getImage() {
        return image;
    }

    public String getUsername() {
        return username;
    }
    
}
