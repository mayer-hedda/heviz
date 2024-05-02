package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.BookshoppingException;
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
@Table(name = "bookshopping")
@XmlRootElement
@NamedQueries(
{
    @NamedQuery(name = "Bookshopping.findAll", query = "SELECT b FROM Bookshopping b"),
    @NamedQuery(name = "Bookshopping.findById", query = "SELECT b FROM Bookshopping b WHERE b.id = :id"),
    @NamedQuery(name = "Bookshopping.findByUserId", query = "SELECT b FROM Bookshopping b WHERE b.userId = :userId"),
    @NamedQuery(name = "Bookshopping.findByBookId", query = "SELECT b FROM Bookshopping b WHERE b.bookId = :bookId"),
    @NamedQuery(name = "Bookshopping.findByShoppingTime", query = "SELECT b FROM Bookshopping b WHERE b.shoppingTime = :shoppingTime")
})
public class Bookshopping implements Serializable {

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
    @Column(name = "bookId")
    private int bookId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "shoppingTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date shoppingTime;

    public Bookshopping() {
    }

    public Bookshopping(Integer id) {
        this.id = id;
    }

    public Bookshopping(Integer id, int userId, int bookId, Date shoppingTime) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.shoppingTime = shoppingTime;
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

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public Date getShoppingTime() {
        return shoppingTime;
    }

    public void setShoppingTime(Date shoppingTime) {
        this.shoppingTime = shoppingTime;
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
        if (!(object instanceof Bookshopping))
        {
            return false;
        }
        Bookshopping other = (Bookshopping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)))
        {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.Bookshopping[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * null : Successfully add book shopping
        * error
     * 
     * @throws BookshoppingException: Something wrong!
     */
    public static JSONObject addBookShopping(Integer userId, Integer bookId) throws BookshoppingException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("addBookShopping");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("bookIdIN", bookId);

            spq.execute();
            
            Integer result = (Integer) spq.getOutputParameterValue("result");
            
            switch(result) {
                case 1:
                    return null;
                case 2:
                    return new JSONObject().put("error", "You do not have access to this operation!");
                case 3:
                    return new JSONObject().put("error", "This book does not exist!");
                default:
                    return new JSONObject().put("exist", "You have already bought this book!");
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookshoppingException("Error in addBookShopping() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
