package com.mycompany.chapterx.Helpers;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;

public class PublisherRegistration {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String companyName;
    private String password;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getPassword() {
        return password;
    }


    public static boolean publisherRegistration(String firstName, String lastName, String username, String email, String companyName, String password) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_ChapterX_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("publisherRegistration");

            spq.registerStoredProcedureParameter("firstNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("lastNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("usernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("companyNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);

            spq.setParameter("firstNameIN", firstName);
            spq.setParameter("lastNameIN", lastName);
            spq.setParameter("usernameIN", username);
            spq.setParameter("emailIN", email);
            spq.setParameter("companyNameIN", companyName);
            spq.setParameter("passwordIN", password);

            spq.execute();
            return true;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return false;
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }

}
