package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.PostException;
import java.sql.Timestamp;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import org.json.JSONArray;
import org.json.JSONObject;


@Entity
@Table(name = "post")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Post.findAll", query = "SELECT p FROM Post p"),
    @NamedQuery(name = "Post.findById", query = "SELECT p FROM Post p WHERE p.id = :id"),
    @NamedQuery(name = "Post.findByUserId", query = "SELECT p FROM Post p WHERE p.userId = :userId"),
    @NamedQuery(name = "Post.findByDescription", query = "SELECT p FROM Post p WHERE p.description = :description"),
    @NamedQuery(name = "Post.findByPostTime", query = "SELECT p FROM Post p WHERE p.postTime = :postTime")})
public class Post implements Serializable {

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
    @Size(min = 1, max = 1000)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "postTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date postTime;

    public Post() {
    }

    public Post(Integer id) {
        this.id = id;
    }

    public Post(Integer id, int userId, String description, Date postTime) {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.postTime = postTime;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPostTime() {
        return postTime;
    }

    public void setPostTime(Date postTime) {
        this.postTime = postTime;
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
        if (!(object instanceof Post)) {
            return false;
        }
        Post other = (Post) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Post[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId
     * @param description
     * 
     * @return 
        * true: Successfully added the post
        * false: Unsuccessfully added tho post
     */
    public static Boolean addPost(Integer userId, String description) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("addPost");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("descriptionIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("descriptionIN", description);

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
    
    
    /**
     * @param userId
     * 
     * @return
        * posts by followed user
            * id
            * username
            * image
            * post time
            * post description
            * liked
     * 
     * @throws PostException: Something wrong
     */
    public static JSONArray getFeedPosts(Integer userId) throws PostException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getFeedPosts");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray posts = new JSONArray();
            
            for(Object[] result : resultList) {
                JSONObject post = new JSONObject();
                
                post.put("id", (Integer) result[0]);
                post.put("username", (String) result[1]);
                post.put("image", (String) result[2]);
                post.put("postTime", (String) result[3]);
                post.put("description", (String) result[4]);
                if((Integer) result[5] == 0) {
                    post.put("liked", false);
                } else {
                    post.put("liked", true);
                }
                
                posts.put(post);
            }
            
            return posts;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getFeedPosts() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: logged in user id
     * @param profileUsername: username associated with the opened profile
     * 
     * @return
        * posts:
            * post id
            * username
            * image
            * post time
            * description
            * liked
        * own posts
     * 
     * @throws PostException: Something wrong
     */
    public static JSONObject getUserPosts(Integer userId, String profileUsername) throws PostException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getUserPosts");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("profileUsernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            spq.registerStoredProcedureParameter("ownPosts", Boolean.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("profileUsernameIN", profileUsername);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            
            if((Integer) spq.getOutputParameterValue("result") == 1) {
                JSONArray posts = new JSONArray();

                for(Object[] result : resultList) { 
                    JSONObject post = new JSONObject();
                    post.put("id", (Integer) result[0]);
                    post.put("username", (String) result[1]);
                    post.put("image", (String) result[2]);
                    post.put("postTime", (Timestamp) result[3]);
                    post.put("description", (String) result[4]);
                    if((Integer) result[5] == 0) {
                        post.put("liked", false);
                    } else {
                        post.put("liked", true);
                    }

                    posts.put(post);
                }

                return new JSONObject().put("myPosts", posts).put("ownPosts", (Boolean) spq.getOutputParameterValue("ownPosts"));
            } else {
                return new JSONObject().put("profileUsernameError", "This user dosn't exists!");
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getUserPosts() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
