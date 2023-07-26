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
@Table(name = "follow")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Follow.findAll", query = "SELECT f FROM Follow f"),
    @NamedQuery(name = "Follow.findById", query = "SELECT f FROM Follow f WHERE f.id = :id"),
    @NamedQuery(name = "Follow.findByFollowerId", query = "SELECT f FROM Follow f WHERE f.followerId = :followerId"),
    @NamedQuery(name = "Follow.findByFollowdId", query = "SELECT f FROM Follow f WHERE f.followdId = :followdId"),
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
    @Column(name = "followdId")
    private int followdId;
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

    public Follow(Integer id, int followerId, int followdId, Date followingTime) {
        this.id = id;
        this.followerId = followerId;
        this.followdId = followdId;
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

    public int getFollowdId() {
        return followdId;
    }

    public void setFollowdId(int followdId) {
        this.followdId = followdId;
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
        return "com.mycompany.chapterx.Modell.Follow[ id=" + id + " ]";
    }
    
}
