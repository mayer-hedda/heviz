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
@Table(name = "bookrating")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bookrating.findAll", query = "SELECT b FROM Bookrating b"),
    @NamedQuery(name = "Bookrating.findById", query = "SELECT b FROM Bookrating b WHERE b.id = :id"),
    @NamedQuery(name = "Bookrating.findByRatingerId", query = "SELECT b FROM Bookrating b WHERE b.ratingerId = :ratingerId"),
    @NamedQuery(name = "Bookrating.findByBookId", query = "SELECT b FROM Bookrating b WHERE b.bookId = :bookId"),
    @NamedQuery(name = "Bookrating.findByRatingTime", query = "SELECT b FROM Bookrating b WHERE b.ratingTime = :ratingTime"),
    @NamedQuery(name = "Bookrating.findByRating", query = "SELECT b FROM Bookrating b WHERE b.rating = :rating")})
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
    @Column(name = "ratingTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ratingTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "rating")
    private int rating;

    public Bookrating() {
    }

    public Bookrating(Integer id) {
        this.id = id;
    }

    public Bookrating(Integer id, int ratingerId, int bookId, Date ratingTime, int rating) {
        this.id = id;
        this.ratingerId = ratingerId;
        this.bookId = bookId;
        this.ratingTime = ratingTime;
        this.rating = rating;
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

    public Date getRatingTime() {
        return ratingTime;
    }

    public void setRatingTime(Date ratingTime) {
        this.ratingTime = ratingTime;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
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
        if (!(object instanceof Bookrating)) {
            return false;
        }
        Bookrating other = (Bookrating) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.chapterx.Modell.Bookrating[ id=" + id + " ]";
    }
    
}
