/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "general")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "General.findAll", query = "SELECT g FROM General g"),
    @NamedQuery(name = "General.findById", query = "SELECT g FROM General g WHERE g.id = :id"),
    @NamedQuery(name = "General.findByAuthorName", query = "SELECT g FROM General g WHERE g.authorName = :authorName"),
    @NamedQuery(name = "General.findByBirthdate", query = "SELECT g FROM General g WHERE g.birthdate = :birthdate"),
    @NamedQuery(name = "General.findByPublicFullName", query = "SELECT g FROM General g WHERE g.publicFullName = :publicFullName"),
    @NamedQuery(name = "General.findByPublishedBookCount", query = "SELECT g FROM General g WHERE g.publishedBookCount = :publishedBookCount"),
    @NamedQuery(name = "General.findBySelfPublishedBookCount", query = "SELECT g FROM General g WHERE g.selfPublishedBookCount = :selfPublishedBookCount")})
public class General implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "authorName")
    private String authorName;
    @Basic(optional = false)
    @NotNull
    @Column(name = "birthdate")
    @Temporal(TemporalType.DATE)
    private Date birthdate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publicFullName")
    private boolean publicFullName;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publishedBookCount")
    private int publishedBookCount;
    @Basic(optional = false)
    @NotNull
    @Column(name = "selfPublishedBookCount")
    private int selfPublishedBookCount;

    public General() {
    }

    public General(Integer id) {
        this.id = id;
    }

    public General(Integer id, Date birthdate, boolean publicFullName, int publishedBookCount, int selfPublishedBookCount) {
        this.id = id;
        this.birthdate = birthdate;
        this.publicFullName = publicFullName;
        this.publishedBookCount = publishedBookCount;
        this.selfPublishedBookCount = selfPublishedBookCount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public boolean getPublicFullName() {
        return publicFullName;
    }

    public void setPublicFullName(boolean publicFullName) {
        this.publicFullName = publicFullName;
    }

    public int getPublishedBookCount() {
        return publishedBookCount;
    }

    public void setPublishedBookCount(int publishedBookCount) {
        this.publishedBookCount = publishedBookCount;
    }

    public int getSelfPublishedBookCount() {
        return selfPublishedBookCount;
    }

    public void setSelfPublishedBookCount(int selfPublishedBookCount) {
        this.selfPublishedBookCount = selfPublishedBookCount;
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
        if (!(object instanceof General)) {
            return false;
        }
        General other = (General) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.General[ id=" + id + " ]";
    }
    
}
