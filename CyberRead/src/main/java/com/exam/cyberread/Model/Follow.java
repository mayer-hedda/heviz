package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.FollowException;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import org.json.JSONObject;


@Entity
@Table(name = "follow")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Follow.findAll", query = "SELECT f FROM Follow f"),
    @NamedQuery(name = "Follow.findById", query = "SELECT f FROM Follow f WHERE f.id = :id"),
    @NamedQuery(name = "Follow.findByFollowerId", query = "SELECT f FROM Follow f WHERE f.followerId = :followerId"),
    @NamedQuery(name = "Follow.findByFollowedId", query = "SELECT f FROM Follow f WHERE f.followedId = :followedId"),
    @NamedQuery(name = "Follow.findByFollowingTime", query = "SELECT f FROM Follow f WHERE f.followingTime = :followingTime")})
public class Follow implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "followerId")
    private int followerId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "followedId")
    private int followedId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "followingTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date followingTime;

    public Follow() {
    }

    public Follow(Integer id) {
        this.id = id;
    }

    public Follow(Integer id, int followerId, int followedId, Date followingTime) {
        this.id = id;
        this.followerId = followerId;
        this.followedId = followedId;
        this.followingTime = followingTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getFollowerId() {
        return followerId;
    }

    public void setFollowerId(int followerId) {
        this.followerId = followerId;
    }

    public int getFollowedId() {
        return followedId;
    }

    public void setFollowedId(int followedId) {
        this.followedId = followedId;
    }

    public Date getFollowingTime() {
        return followingTime;
    }

    public void setFollowingTime(Date followingTime) {
        this.followingTime = followingTime;
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
        if (!(object instanceof Follow)) {
            return false;
        }
        Follow other = (Follow) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Follow[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId
     * @param followUserId
     * 
     * @return
        * followUserError  
     * 
     * @throws FollowException: Something wrong
     */
    public static JSONObject followUser(Integer userId, Integer followUserId) throws FollowException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("followUser");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("followUserIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("followUserIdIN", followUserId);

            spq.execute();
            
            JSONObject error = new JSONObject();
            if((Integer) spq.getOutputParameterValue("result") == 2) {
                error.put("followUserError", "This user is already followed!");
            } else if((Integer) spq.getOutputParameterValue("result") == 3) {
                error.put("followUserError", "You cannot follow your own profile!");
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new FollowException("Error in followUser() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param followUserId
     * 
     * @return
        * unfollowedUserError  
     * 
     * @throws FollowException: Something wrong
     */
    public static JSONObject unfollowedUser(Integer userId, Integer followUserId) throws FollowException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("unfollowedUser");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("followUserIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("followUserIdIN", followUserId);

            spq.execute();
            
            JSONObject error = new JSONObject();
            if((Integer) spq.getOutputParameterValue("result") == 2) {
                error.put("unfollowedUserError", "You are not following this user, so you cannot unfollow them!");
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new FollowException("Error in unfollowedUser() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
