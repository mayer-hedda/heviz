package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.AgesException;
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

@Entity
@Table(name = "ages")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Ages.findAll", query = "SELECT a FROM Ages a"),
    @NamedQuery(name = "Ages.findById", query = "SELECT a FROM Ages a WHERE a.id = :id"),
    @NamedQuery(name = "Ages.findByName", query = "SELECT a FROM Ages a WHERE a.name = :name"),
    @NamedQuery(name = "Ages.findByMinAge", query = "SELECT a FROM Ages a WHERE a.minAge = :minAge"),
    @NamedQuery(name = "Ages.findByMaxAge", query = "SELECT a FROM Ages a WHERE a.maxAge = :maxAge")})
public class Ages implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "minAge")
    private int minAge;
    @Basic(optional = false)
    @NotNull
    @Column(name = "maxAge")
    private int maxAge;

    public Ages() {
    }

    public Ages(Integer id) {
        this.id = id;
    }

    public Ages(Integer id, String name, int minAge, int maxAge) {
        this.id = id;
        this.name = name;
        this.minAge = minAge;
        this.maxAge = maxAge;
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

    public int getMinAge() {
        return minAge;
    }

    public void setMinAge(int minAge) {
        this.minAge = minAge;
    }

    public int getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(int maxAge) {
        this.maxAge = maxAge;
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
        if (!(object instanceof Ages)) {
            return false;
        }
        Ages other = (Ages) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Ages[ id=" + id + " ]";
    }
    
    
    // --- MY PROCEDURES ---
    public static Boolean getAgesById(Integer agesId) throws AgesException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAgesById");

            spq.registerStoredProcedureParameter("agesIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("agesIdIN", agesId);

            spq.execute();
            
            java.util.List<Object[]> resultList = spq.getResultList();
            
            return !resultList.isEmpty();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new AgesException("Error in getAgesById() methode in Ages class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    public static ArrayList<Ages> getAllAges() throws AgesException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllAges");

            spq.execute();
            
            java.util.List<Object[]> resultList = spq.getResultList();
            ArrayList<Ages> ages = new ArrayList();
            
            resultList.stream().map(result -> {
                Integer id = (Integer) result[0];
                String name = (String) result[1];
                Integer minAge = (Integer) result[2];
                Integer maxAge = (Integer) result[3];
                Ages age = new Ages(id, name, minAge, maxAge);
                return age;
            }).forEachOrdered(age -> {
                ages.add(age);
            });
            
            return ages;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new AgesException("Error in getAllAges() methode in Ages class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
