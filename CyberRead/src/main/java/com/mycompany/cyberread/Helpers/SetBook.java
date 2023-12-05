package com.mycompany.cyberread.Helpers;

import com.mycompany.cyberread.Exception.BookException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;

public class SetBook {
    
    private Integer bookId;
    private String title;
    private String description;
    private Integer targetAudienceId;
    private String language;
    private Boolean adultFiction;
    private String category;
    private Integer statusId;
    private Integer price;
    private String coverImage;
    private String text;
    private String bankAccountNumber;

    public SetBook() {
    }

    public SetBook(Integer bookId, String title, String description, Integer targetAudienceId, String language, Boolean adultFiction, String category, Integer statusId, Integer price, String coverImage, String text, String bankAccountNumber) {
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.targetAudienceId = targetAudienceId;
        this.language = language;
        this.adultFiction = adultFiction;
        this.category = category;
        this.statusId = statusId;
        this.price = price;
        this.coverImage = coverImage;
        this.text = text;
        this.bankAccountNumber = bankAccountNumber;
    }

    public Integer getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Integer getTargetAudienceId() {
        return targetAudienceId;
    }

    public String getLanguage() {
        return language;
    }

    public Boolean getAdultFiction() {
        return adultFiction;
    }

    public String getCategory() {
        return category;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public Integer getPrice() {
        return price;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public String getText() {
        return text;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }
    
    
    
    // --- MY PROCEDURES ---
    public static Boolean setBook(Integer bookId, String title, String description, Integer targetAudience, String language, Boolean adultFiction, String category, Integer statusId, Integer price, String coverImage, String text, String bankAccountNumber) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setBook");

            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("titleIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("descriptioniN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("targetAudienceIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("languageIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("adultFictionIN", Boolean.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("statusIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("priceIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("coverImageIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("textIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bankAccountNumberIN", String.class, ParameterMode.IN);

            spq.setParameter("bookIdIN", bookId);
            spq.setParameter("titleIN", title);
            spq.setParameter("descriptioniN", description);
            spq.setParameter("targetAudienceIdIN", targetAudience);
            spq.setParameter("languageIN", language);
            spq.setParameter("adultFictionIN", adultFiction);
            spq.setParameter("categoryIN", category);
            spq.setParameter("statusIN", statusId);
            spq.setParameter("priceIN", price);
            spq.setParameter("coverImageIN", coverImage);
            spq.setParameter("textIN", text);
            spq.setParameter("bankAccountNumberIN", bankAccountNumber);

            spq.execute();

            return true;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in setBook() method in SetBook class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
