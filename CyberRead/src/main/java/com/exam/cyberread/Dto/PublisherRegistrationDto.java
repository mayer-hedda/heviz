package com.exam.cyberread.Dto;


public class PublisherRegistrationDto {
    
    private String username;
    private String firstName;
    private String lastName;
    private String companyName;
    private String email;
    private String password;
    private Boolean aszf;

    public PublisherRegistrationDto() {}

    public PublisherRegistrationDto(String username, String firstName, String lastName, String companyName, String email, String password, Boolean aszf) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.email = email;
        this.password = password;
        this.aszf = aszf;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getAszf() {
        return aszf;
    }
    
}
