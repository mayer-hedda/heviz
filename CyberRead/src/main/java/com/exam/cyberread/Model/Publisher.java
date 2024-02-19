package com.exam.cyberread.Model;

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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@Table(name = "publisher")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Publisher.findAll", query = "SELECT p FROM Publisher p"),
    @NamedQuery(name = "Publisher.findById", query = "SELECT p FROM Publisher p WHERE p.id = :id"),
    @NamedQuery(name = "Publisher.findByCompanyName", query = "SELECT p FROM Publisher p WHERE p.companyName = :companyName"),
    @NamedQuery(name = "Publisher.findByPublishedBookCount", query = "SELECT p FROM Publisher p WHERE p.publishedBookCount = :publishedBookCount"),
    @NamedQuery(name = "Publisher.findByPublishedBookCountOnPage", query = "SELECT p FROM Publisher p WHERE p.publishedBookCountOnPage = :publishedBookCountOnPage")})
public class Publisher implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "companyName")
    private String companyName;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publishedBookCount")
    private int publishedBookCount;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publishedBookCountOnPage")
    private int publishedBookCountOnPage;

    public Publisher() {
    }

    public Publisher(Integer id) {
        this.id = id;
    }

    public Publisher(Integer id, int publishedBookCount, int publishedBookCountOnPage) {
        this.id = id;
        this.publishedBookCount = publishedBookCount;
        this.publishedBookCountOnPage = publishedBookCountOnPage;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getPublishedBookCount() {
        return publishedBookCount;
    }

    public void setPublishedBookCount(int publishedBookCount) {
        this.publishedBookCount = publishedBookCount;
    }

    public int getPublishedBookCountOnPage() {
        return publishedBookCountOnPage;
    }

    public void setPublishedBookCountOnPage(int publishedBookCountOnPage) {
        this.publishedBookCountOnPage = publishedBookCountOnPage;
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
        if (!(object instanceof Publisher)) {
            return false;
        }
        Publisher other = (Publisher) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Publisher[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId
     * @param companyName
     * 
     * @return
        * true: Successfully set company name
        * false: Unsuccessfully set company name
     */
    public static Boolean setCompanyName(Integer userId, String companyName) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setCompanyName");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("companyNameIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("companyNameIN", companyName);

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
