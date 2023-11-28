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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "read")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Read.findAll", query = "SELECT r FROM Read r"),
    @NamedQuery(name = "Read.findById", query = "SELECT r FROM Read r WHERE r.id = :id"),
    @NamedQuery(name = "Read.findByUserId", query = "SELECT r FROM Read r WHERE r.userId = :userId"),
    @NamedQuery(name = "Read.findByBookId", query = "SELECT r FROM Read r WHERE r.bookId = :bookId"),
    @NamedQuery(name = "Read.findByReadTime", query = "SELECT r FROM Read r WHERE r.readTime = :readTime"),
    @NamedQuery(name = "Read.findByReadSecound", query = "SELECT r FROM Read r WHERE r.readSecound = :readSecound")})
public class Read implements Serializable {

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
    @Column(name = "readTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date readTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "readSecound")
    private int readSecound;

    public Read() {
    }

    public Read(Integer id) {
        this.id = id;
    }

    public Read(Integer id, int userId, int bookId, Date readTime, int readSecound) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.readTime = readTime;
        this.readSecound = readSecound;
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

    public Date getReadTime() {
        return readTime;
    }

    public void setReadTime(Date readTime) {
        this.readTime = readTime;
    }

    public int getReadSecound() {
        return readSecound;
    }

    public void setReadSecound(int readSecound) {
        this.readSecound = readSecound;
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
        if (!(object instanceof Read)) {
            return false;
        }
        Read other = (Read) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Read[ id=" + id + " ]";
    }
    
}