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
@Table(name = "userrating")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Userrating.findAll", query = "SELECT u FROM Userrating u"),
    @NamedQuery(name = "Userrating.findById", query = "SELECT u FROM Userrating u WHERE u.id = :id"),
    @NamedQuery(name = "Userrating.findByRatingerId", query = "SELECT u FROM Userrating u WHERE u.ratingerId = :ratingerId"),
    @NamedQuery(name = "Userrating.findByUserId", query = "SELECT u FROM Userrating u WHERE u.userId = :userId"),
    @NamedQuery(name = "Userrating.findByRatingTime", query = "SELECT u FROM Userrating u WHERE u.ratingTime = :ratingTime"),
    @NamedQuery(name = "Userrating.findByRating", query = "SELECT u FROM Userrating u WHERE u.rating = :rating")})
public class Userrating implements Serializable {

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
    @Column(name = "userId")
    private int userId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ratingTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ratingTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "rating")
    private int rating;

    public Userrating() {
    }

    public Userrating(Integer id) {
        this.id = id;
    }

    public Userrating(Integer id, int ratingerId, int userId, Date ratingTime, int rating) {
        this.id = id;
        this.ratingerId = ratingerId;
        this.userId = userId;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
        if (!(object instanceof Userrating)) {
            return false;
        }
        Userrating other = (Userrating) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.chapterx.Modell.Userrating[ id=" + id + " ]";
    }
    
}
