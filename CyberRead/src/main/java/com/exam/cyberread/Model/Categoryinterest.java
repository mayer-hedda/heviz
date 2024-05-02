package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.CategoryinterestException;
import java.io.Serializable;
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
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@Table(name = "categoryinterest")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Categoryinterest.findAll", query = "SELECT c FROM Categoryinterest c"),
    @NamedQuery(name = "Categoryinterest.findById", query = "SELECT c FROM Categoryinterest c WHERE c.id = :id"),
    @NamedQuery(name = "Categoryinterest.findByUserId", query = "SELECT c FROM Categoryinterest c WHERE c.userId = :userId"),
    @NamedQuery(name = "Categoryinterest.findByCategoryId", query = "SELECT c FROM Categoryinterest c WHERE c.categoryId = :categoryId")})
public class Categoryinterest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "userId")
    private int userId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "categoryId")
    private int categoryId;

    public Categoryinterest() {
    }

    public Categoryinterest(Integer id) {
        this.id = id;
    }

    public Categoryinterest(Integer id, int userId, int categoryId) {
        this.id = id;
        this.userId = userId;
        this.categoryId = categoryId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
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
        if (!(object instanceof Categoryinterest)) {
            return false;
        }
        Categoryinterest other = (Categoryinterest) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Categoryinterest[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId
     * @param categoryIds
     * 
     * @return
        * true: if successfully added category interest
     * 
     * @throws CategoryinterestException: Something wrong
     */
    public static Boolean addCategoryInterest(Integer userId, String categoryIds) throws CategoryinterestException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("addCategoryInterest");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIds", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("categoryIds", categoryIds);

            spq.execute();
            
            return true;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new CategoryinterestException("Error in addCategoryInterest() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
