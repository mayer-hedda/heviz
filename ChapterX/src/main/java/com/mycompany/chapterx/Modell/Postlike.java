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
@Table(name = "postlike")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Postlike.findAll", query = "SELECT p FROM Postlike p"),
    @NamedQuery(name = "Postlike.findById", query = "SELECT p FROM Postlike p WHERE p.id = :id"),
    @NamedQuery(name = "Postlike.findByUserId", query = "SELECT p FROM Postlike p WHERE p.userId = :userId"),
    @NamedQuery(name = "Postlike.findByPostId", query = "SELECT p FROM Postlike p WHERE p.postId = :postId"),
    @NamedQuery(name = "Postlike.findByLikeTime", query = "SELECT p FROM Postlike p WHERE p.likeTime = :likeTime")})
public class Postlike implements Serializable {

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
    @Column(name = "postId")
    private int postId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "likeTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date likeTime;

    public Postlike() {
    }

    public Postlike(Integer id) {
        this.id = id;
    }

    public Postlike(Integer id, int userId, int postId, Date likeTime) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.likeTime = likeTime;
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

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public Date getLikeTime() {
        return likeTime;
    }

    public void setLikeTime(Date likeTime) {
        this.likeTime = likeTime;
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
        if (!(object instanceof Postlike)) {
            return false;
        }
        Postlike other = (Postlike) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.chapterx.Modell.Postlike[ id=" + id + " ]";
    }
    
}
