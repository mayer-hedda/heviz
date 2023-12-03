/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.CategoryException;
import com.mycompany.cyberread.Exception.LanguageException;
import java.io.Serializable;
import java.util.HashMap;
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
@Table(name = "category")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Category.findAll", query = "SELECT c FROM Category c"),
    @NamedQuery(name = "Category.findById", query = "SELECT c FROM Category c WHERE c.id = :id"),
    @NamedQuery(name = "Category.findByName", query = "SELECT c FROM Category c WHERE c.name = :name"),
    @NamedQuery(name = "Category.findByImage", query = "SELECT c FROM Category c WHERE c.image = :image")})
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "image")
    private String image;

    public Category() {
    }

    public Category(Integer id) {
        this.id = id;
    }

    public Category(Integer id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
        if (!(object instanceof Category)) {
            return false;
        }
        Category other = (Category) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Category[ id=" + id + " ]";
    }
    
    
    // ----- MY PROCEDURES -----
    public static HashMap<Integer, String> getAllCategory() throws CategoryException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllCategory");

            spq.execute();

            java.util.List<Object[]> resultList = spq.getResultList();
            HashMap<Integer, String> categoryList = new HashMap<>();

            for (Object[] result : resultList) {
                categoryList.put((Integer) result[0], (String) result[1]);
            }

            return categoryList;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new CategoryException("Error in getAllCategory() methode in Category class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    public static Boolean getCategoryByName(String categoryName) throws CategoryException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getCategoryByName");

            spq.registerStoredProcedureParameter("categoryNameIN", String.class, ParameterMode.IN);

            spq.setParameter("categoryNameIN", categoryName);

            spq.execute();
            
            java.util.List<Object[]> resultList = spq.getResultList();
            
            return !resultList.isEmpty();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new CategoryException("Error in getCategoryByName() methide in Category class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
}
