package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.TargetAudienceException;
import java.io.Serializable;
import java.util.List;
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
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import org.json.JSONArray;
import org.json.JSONObject;


@Entity
@Table(name = "targetaudience")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Targetaudience.findAll", query = "SELECT t FROM Targetaudience t"),
    @NamedQuery(name = "Targetaudience.findById", query = "SELECT t FROM Targetaudience t WHERE t.id = :id"),
    @NamedQuery(name = "Targetaudience.findByName", query = "SELECT t FROM Targetaudience t WHERE t.name = :name"),
    @NamedQuery(name = "Targetaudience.findByMinAge", query = "SELECT t FROM Targetaudience t WHERE t.minAge = :minAge"),
    @NamedQuery(name = "Targetaudience.findByMaxAge", query = "SELECT t FROM Targetaudience t WHERE t.maxAge = :maxAge")})
public class Targetaudience implements Serializable {

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

    public Targetaudience() {
    }

    public Targetaudience(Integer id) {
        this.id = id;
    }

    public Targetaudience(Integer id, String name, int minAge, int maxAge) {
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
        if (!(object instanceof Targetaudience)) {
            return false;
        }
        Targetaudience other = (Targetaudience) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Targetaudience[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @return
        * target audience id
        * target audience name
        * target audience minimum age
        * target audience maximum age
     * 
     * @throws TargetAudienceException: Something wrong
     */
    public static JSONArray getAllTargetAudiences() throws TargetAudienceException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllTargetAudiences");
            
            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray targetAudiences = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject targetAudience = new JSONObject();
                targetAudience.put("id", (Integer) result[0]);
                targetAudience.put("name", (String) result[1]);
                targetAudience.put("minAge", (Integer) result[2]);
                targetAudience.put("maxAge", (Integer) result[3]);
                
                targetAudiences.put(targetAudience);
            }
            
            return targetAudiences;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new TargetAudienceException("Error in getAllTargetAudiences() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
