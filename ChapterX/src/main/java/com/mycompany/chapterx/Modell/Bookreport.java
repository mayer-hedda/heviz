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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "bookreport")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bookreport.findAll", query = "SELECT b FROM Bookreport b"),
    @NamedQuery(name = "Bookreport.findById", query = "SELECT b FROM Bookreport b WHERE b.id = :id"),
    @NamedQuery(name = "Bookreport.findByUserId", query = "SELECT b FROM Bookreport b WHERE b.userId = :userId"),
    @NamedQuery(name = "Bookreport.findByBookId", query = "SELECT b FROM Bookreport b WHERE b.bookId = :bookId"),
    @NamedQuery(name = "Bookreport.findByDescription", query = "SELECT b FROM Bookreport b WHERE b.description = :description"),
    @NamedQuery(name = "Bookreport.findByReportTime", query = "SELECT b FROM Bookreport b WHERE b.reportTime = :reportTime")})
public class Bookreport implements Serializable {

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
    @Size(min = 1, max = 500)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "reportTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportTime;

    public Bookreport() {
    }

    public Bookreport(Integer id) {
        this.id = id;
    }

    public Bookreport(Integer id, int userId, int bookId, String description, Date reportTime) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.description = description;
        this.reportTime = reportTime;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getReportTime() {
        return reportTime;
    }

    public void setReportTime(Date reportTime) {
        this.reportTime = reportTime;
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
        if (!(object instanceof Bookreport)) {
            return false;
        }
        Bookreport other = (Bookreport) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.chapterx.Modell.Bookreport[ id=" + id + " ]";
    }
    
}
