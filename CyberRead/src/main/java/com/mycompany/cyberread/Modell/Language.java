/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.AgesException;
import com.mycompany.cyberread.Exception.LanguageException;
import java.io.Serializable;
import java.util.ArrayList;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "language")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Language.findAll", query = "SELECT l FROM Language l"),
    @NamedQuery(name = "Language.findById", query = "SELECT l FROM Language l WHERE l.id = :id"),
    @NamedQuery(name = "Language.findByCode", query = "SELECT l FROM Language l WHERE l.code = :code"),
    @NamedQuery(name = "Language.findByLanguage", query = "SELECT l FROM Language l WHERE l.language = :language")})
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "language")
    private String language;

    public Language() {
    }

    public Language(Integer id) {
        this.id = id;
    }

    public Language(Integer id, String code, String language) {
        this.id = id;
        this.code = code;
        this.language = language;
    }

    public Language(String code, String language) {
        this.code = code;
        this.language = language;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Language)) {
            return false;
        }
        Language other = (Language) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Language[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    public static Boolean getLanguageByCode(String languageCode) throws LanguageException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getLanguageByCode");

            spq.registerStoredProcedureParameter("languageCodeIN", String.class, ParameterMode.IN);

            spq.setParameter("languageCodeIN", languageCode);

            spq.execute();
            
            java.util.List<Object[]> resultList = spq.getResultList();
            
            return !resultList.isEmpty();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new LanguageException("Error in getLanguageById() methide in Language class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    public static ArrayList<Language> getAllLanguage() throws LanguageException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllLanguage");

            spq.execute();
            
            java.util.List<Object[]> resultList = spq.getResultList();
            ArrayList<Language> languages = new ArrayList();
            
            for(Object[] result : resultList) {
                String code = (String) result[0];
                String lang = (String) result[1];
                
                Language language = new Language(code, lang);
                
                languages.add(language);
            }
            
            return languages;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new LanguageException("Error in getAllLanguage() methode in Language class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
