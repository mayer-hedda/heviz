/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.chapterx.Modell;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "bookshopping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bookshopping.findAll", query = "SELECT b FROM Bookshopping b"),
    @NamedQuery(name = "Bookshopping.findById", query = "SELECT b FROM Bookshopping b WHERE b.id = :id"),
    @NamedQuery(name = "Bookshopping.findByUserId", query = "SELECT b FROM Bookshopping b WHERE b.userId = :userId"),
    @NamedQuery(name = "Bookshopping.findByBookId", query = "SELECT b FROM Bookshopping b WHERE b.bookId = :bookId"),
    @NamedQuery(name = "Bookshopping.findByShoppingTime", query = "SELECT b FROM Bookshopping b WHERE b.shoppingTime = :shoppingTime")})
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
        if (!(object instanceof Bookshopping)) {
            return false;
        }
        Bookshopping other = (Bookshopping) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.chapterx.Modell.Bookshopping[ id=" + id + " ]";
    }
    
}
