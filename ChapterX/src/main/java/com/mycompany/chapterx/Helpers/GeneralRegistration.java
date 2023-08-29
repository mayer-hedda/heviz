package com.mycompany.chapterx.Helpers;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;

public class GeneralRegistration {

    private String username;
    private String email;
    private String birthdate;
    private String password;

    public String getUsername() {
        return username;
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


    public static boolean generalRegistration(String username, String email, String birthdate, String password) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_ChapterX_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("generalRegistration");

            spq.registerStoredProcedureParameter("usernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("birthdateIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);

            spq.setParameter("usernameIN", username);
            spq.setParameter("birthdateIN", birthdate);
            spq.setParameter("emailIN", email);
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