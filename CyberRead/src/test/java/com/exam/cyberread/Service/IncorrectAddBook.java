package com.exam.cyberread.Service;

import com.exam.cyberread.Exception.BookException;
import java.util.Arrays;
import java.util.List;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.skyscreamer.jsonassert.JSONAssert;


@RunWith(Parameterized.class)
public class IncorrectAddBook {
    
    private String title;
    private String description;
    private Integer targetAudienceId;
    private Integer languageId;
    private Boolean adultFiction;
    private Integer categoryId;
    private Integer statusId;
    private Integer price;
    private String coverImage;
    private String file;
    private String bankAccountNumber;
    private Integer chapterNumber;
    private JSONObject error; 

    // Teszt adatok
    @Parameterized.Parameters
    public static List<Object[]> data() {
        return Arrays.asList(new Object[][] {
            {
                "", 
                "", 
                1,
                1,
                true,
                1,
                1,
                1,
                "", 
                "", 
                "", 
                1, 
                new JSONObject()
                    .put("storyTitleError", "Title field cannot be empty!")
                    .put("descriptionError", "The description field cannot be empty!")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
            },
            {
                "!!!!", 
                "!!!!", 
                0,
                0,
                false,
                0,
                0,
                0,
                "", 
                "", 
                "", 
                1, 
                new JSONObject()
                    .put("storyTitleError", "The title of the book should not consist exclusively of special characters!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
                    .put("statusError", "The option does not exist!")
            },
            {
                "Most jó?", 
                "Ez nincs 20", 
                100,
                100,
                true,
                100,
                100,
                1000,
                "", 
                "", 
                "", 
                10000, 
                new JSONObject()
                    .put("statusError", "The option does not exist!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
            },
            {
                "Most jó?", 
                "Ez nincs 20", 
                100,
                100,
                true,
                100,
                2,
                0,
                "", 
                "", 
                "", 
                10000, 
                new JSONObject()
                    .put("priceError", "The price must be a minimum of 1000 Hungarian Forints!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
                    .put("bankAccountNumberError", "The bank account number field cannot be empty!")
            },
            {
               "Most jó?", 
                "Ez nincs 20 asdasdasdsadsadsadsadsadsasadsadsda", 
                1,
                1,
                true,
                1,
                2,
                10,
                "pictures/book/asd.jpg", 
                "", 
                "12345678-12345678-12345678", 
                10, 
                new JSONObject()
                    .put("priceError", "The price must be a minimum of 1000 Hungarian Forints!")
                    .put("bookFileError", "The book file cannot be empty!")
            },
            {
                "", 
                "", 
                1,
                1,
                true,
                1,
                1,
                1000,
                "", 
                "", 
                "", 
                1, 
                new JSONObject()
                    .put("storyTitleError", "Title field cannot be empty!")
                    .put("descriptionError", "The description field cannot be empty!")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
            },
            {
                "", 
                "null", 
                1,
                1,
                false,
                1,
                2,
                1000,
                "", 
                "", 
                "null", 
                2, 
                new JSONObject()
                    .put("storyTitleError", "Title field cannot be empty!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
            },
            {
                "!!!!aa", 
                "Ez talán megvan 20 karakter", 
                -1,
                -1,
                true,
                -1,
                2,
                1000,
                null, 
                null, 
                "", 
                3, 
                new JSONObject()
                    .put("bankAccountNumberError", "The bank account number field cannot be empty!")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
            },
            {
                "!!!!", 
                "!!!!", 
                -1,
                -1,
                true,
                -1,
                2,
                1000,
                null, 
                null, 
                "", 
                3, 
                new JSONObject()
                    .put("storyTitleError", "The title of the book should not consist exclusively of special characters!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("bookFileError", "The book file cannot be empty!")
                    .put("coverImageError", "The cover image cannot be empty!")
                    .put("bankAccountNumberError", "The bank account number field cannot be empty!")
            },
            {
                "!!!!", 
                "!!!!", 
                11,
                11,
                true,
                11,
                3,
                100,
                "asd", 
                "asd", 
                "asd", 
                0, 
                new JSONObject()
                    .put("storyTitleError", "The title of the book should not consist exclusively of special characters!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("statusError", "The option does not exist!")
            },
            {
                "!!!!", 
                "!!!!", 
                11,
                11,
                true,
                11,
                3,
                100,
                "asd", 
                "asd", 
                "asd", 
                -1, 
                new JSONObject()
                    .put("storyTitleError", "The title of the book should not consist exclusively of special characters!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("statusError", "The option does not exist!")
                    .put("chapterNumberError", "The book cannot have less than zero chapters!")
            },
            {
                "!!!!", 
                "!!!!", 
                11,
                11,
                true,
                11,
                2,
                100,
                "asd", 
                "asd", 
                "asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad", 
                -1, 
                new JSONObject()
                    .put("storyTitleError", "The title of the book should not consist exclusively of special characters!")
                    .put("descriptionError", "The description must be 20 caracter long.")
                    .put("priceError", "The price must be a minimum of 1000 Hungarian Forints!")
                    .put("chapterNumberError", "The book cannot have less than zero chapters!")
                    .put("bankAccountNumberError", "The length of the bank account number must not exceed 30 characters!")
            },
        });
    }

    // Registration details check construct
    public IncorrectAddBook(String title, String description, Integer targetAudienceId, Integer languageId, Boolean adultFiction, Integer categoryId, Integer statusId, Integer price, String coverImage, String file, String bankAccountNumber, Integer chapterNumber, JSONObject error) {
        this.title = title;
        this.description = description;
        this.targetAudienceId = targetAudienceId;
        this.languageId = languageId;
        this.adultFiction = adultFiction;
        this.categoryId = categoryId;
        this.statusId = statusId;
        this.price = price;
        this.coverImage = coverImage;
        this.file = file;
        this.bankAccountNumber = bankAccountNumber;
        this.chapterNumber = chapterNumber;
        this.error = error; 
    }

    @Test
    public void testPublisherRegistration() throws BookException {
        JSONObject result = BookService.addBook(1, title, description, targetAudienceId, languageId, adultFiction, categoryId, statusId, price, coverImage, file, bankAccountNumber, chapterNumber);

        try {
            JSONAssert.assertEquals(error, result, true);
        } catch (JSONException ex) {
            Assert.fail("JSONException message: " + ex.getMessage());
        }
    }
    
}
