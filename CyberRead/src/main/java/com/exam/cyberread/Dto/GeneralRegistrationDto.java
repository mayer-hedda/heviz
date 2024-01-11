package com.exam.cyberread.Dto;


public class GeneralRegistrationDto {
    
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String birthdate;
    private String password;
    private Boolean aszf;

    public GeneralRegistrationDto() {}

    public GeneralRegistrationDto(String username, String firstName, String lastName, String email, String birthdate, String password, Boolean aszf) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthdate = birthdate;
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

    public String getEmail() {
        return email;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getAszf() {
        return aszf;
    }
    
}
