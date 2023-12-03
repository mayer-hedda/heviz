/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.ListException;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "list")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "List.findAll", query = "SELECT l FROM List l"),
    @NamedQuery(name = "List.findById", query = "SELECT l FROM List l WHERE l.id = :id"),
    @NamedQuery(name = "List.findByUserId", query = "SELECT l FROM List l WHERE l.userId = :userId"),
    @NamedQuery(name = "List.findByBookId", query = "SELECT l FROM List l WHERE l.bookId = :bookId"),
    @NamedQuery(name = "List.findByDate", query = "SELECT l FROM List l WHERE l.date = :date")})
public class List implements Serializable {

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
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    public List() {
    }

    public List(Integer id) {
        this.id = id;
    }
    
    public List(Integer id, Integer bookId) {
        this.id = id;
        this.bookId = bookId;
    }

    public List(Integer id, int userId, int bookId, Date date) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.date = date;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
        if (!(object instanceof List)) {
            return false;
        }
        List other = (List) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.List[ id=" + id + " ]";
    }
    
    
    // ----- MY PROCEDURES -----
    public static java.util.List<List> getMostListedBooksOfTheMonth() throws ListException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getMostListedBooksOfTheMonth");

            spq.execute();

            java.util.List<Object[]> resultList = spq.getResultList();
            java.util.List<List> listList = new ArrayList();


            for(Object[] result : resultList) {
                Integer id = (Integer) result[0];
                Integer bookId = (Integer) result[1];

                List l = new List(id, bookId);
                listList.add(l);
            }

            return listList;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new ListException("Error in getMostListedBooksOfTheMoth() method in List Class!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
