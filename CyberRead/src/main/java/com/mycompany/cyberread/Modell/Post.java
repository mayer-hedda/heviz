/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.PostException;
import com.mycompany.cyberread.Helpers.GetPostsByFollowedUsers;
import java.io.Serializable;
import java.util.ArrayList;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "post")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Post.findAll", query = "SELECT p FROM Post p"),
    @NamedQuery(name = "Post.findById", query = "SELECT p FROM Post p WHERE p.id = :id"),
    @NamedQuery(name = "Post.findByUserId", query = "SELECT p FROM Post p WHERE p.userId = :userId"),
    @NamedQuery(name = "Post.findByText", query = "SELECT p FROM Post p WHERE p.text = :text"),
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
    @Column(name = "text")
    private String text;
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

    public Post(Integer id, int userId, String text, Date postTime) {
        this.id = id;
        this.userId = userId;
        this.text = text;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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
        return "com.mycompany.cyberread.Modell.Post[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    public static boolean getPostById(Integer postId) throws PostException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPostById");

            spq.registerStoredProcedureParameter("postIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("postIdIN", postId);

            spq.execute();

            java.util.List<Object[]> resultList = spq.getResultList();
            
            return !resultList.isEmpty();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getPostById() method in Post class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    public static boolean getPostByUserId(Integer userId) throws PostException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPostByUserId");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);

            spq.execute();

            java.util.List<Object[]> resultList = spq.getResultList();
            
            return !resultList.isEmpty();
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getPostByUserId() method in Post class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    public static ArrayList<GetPostsByFollowedUsers> getPostsByFollowedUsers(Integer userId) throws PostException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPostsByFollowedUsers");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);

            spq.execute();

            java.util.List<Object[]> resultList = spq.getResultList();
            ArrayList<GetPostsByFollowedUsers> posts = new ArrayList();
            
            resultList.stream().map(result -> {
                String username = (String) result[0];
                String image = (String) result[1];
                String postTime = (String) result[2];
                String postText = (String) result[3];
                Boolean liked;
                if((int) result[4] == 0) {
                    liked = false;
                } else {
                    liked = true;
                }
                
                GetPostsByFollowedUsers p = new GetPostsByFollowedUsers(username, image, postTime, postText, liked);
                return p;
            }).forEachOrdered(p -> {
                posts.add(p);
            });
            
            return posts;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in getPostsByFollowedUsers() method in Post class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    public static Boolean addPost(Integer userId, String text) throws PostException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("addPost");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("textIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("textIN", text);

            spq.execute();
            
            return true;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new PostException("Error in addPost() method in Post class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
