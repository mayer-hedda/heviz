package com.exam.cyberread.Model;

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


@Entity
@Table(name = "bookrating")
@XmlRootElement
@NamedQueries(
{
    @NamedQuery(name = "Bookrating.findAll", query = "SELECT b FROM Bookrating b"),
    @NamedQuery(name = "Bookrating.findById", query = "SELECT b FROM Bookrating b WHERE b.id = :id"),
    @NamedQuery(name = "Bookrating.findByRatingerId", query = "SELECT b FROM Bookrating b WHERE b.ratingerId = :ratingerId"),
    @NamedQuery(name = "Bookrating.findByBookId", query = "SELECT b FROM Bookrating b WHERE b.bookId = :bookId"),
    @NamedQuery(name = "Bookrating.findByRating", query = "SELECT b FROM Bookrating b WHERE b.rating = :rating"),
    @NamedQuery(name = "Bookrating.findByRatingTime", query = "SELECT b FROM Bookrating b WHERE b.ratingTime = :ratingTime")
})
public class Bookrating implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ratingerId")
    private int ratingerId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "bookId")
    private int bookId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "rating")
    private int rating;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ratingTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ratingTime;

    public Bookrating() {
    }

    public Bookrating(Integer id) {
        this.id = id;
    }

    public Bookrating(Integer id, int ratingerId, int bookId, int rating, Date ratingTime) {
        this.id = id;
        this.ratingerId = ratingerId;
        this.bookId = bookId;
        this.rating = rating;
        this.ratingTime = ratingTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getRatingerId() {
        return ratingerId;
    }

    public void setRatingerId(int ratingerId) {
        this.ratingerId = ratingerId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Date getRatingTime() {
        return ratingTime;
    }

    public void setRatingTime(Date ratingTime) {
        this.ratingTime = ratingTime;
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
        if (!(object instanceof Bookrating))
        {
            return false;
        }
        Bookrating other = (Bookrating) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
        {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Bookrating[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId
     * @param bookId
     * @param rating
     * 
     * @return 
        * true: Successfully add book rating
        * false: Unsuccessfully add book rating
        * null: error
     */
    public static Boolean addBookRating(Integer userId, Integer bookId, Integer rating) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("login");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("rating", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("bookIdIN", bookId);
            spq.setParameter("rating", rating);

            spq.execute();

            Integer result = (Integer) spq.getOutputParameterValue("result");

            switch(result) {
                case 1:
                    return true;
                default:
                    return null;
            }
        } catch(Exception ex) {
            return false;
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
