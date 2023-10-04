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
@Table(name = "aszf")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Aszf.findAll", query = "SELECT a FROM Aszf a"),
    @NamedQuery(name = "Aszf.findById", query = "SELECT a FROM Aszf a WHERE a.id = :id"),
    @NamedQuery(name = "Aszf.findByStartDate", query = "SELECT a FROM Aszf a WHERE a.startDate = :startDate"),
    @NamedQuery(name = "Aszf.findByEndDate", query = "SELECT a FROM Aszf a WHERE a.endDate = :endDate"),
    @NamedQuery(name = "Aszf.findByAszfText", query = "SELECT a FROM Aszf a WHERE a.aszfText = :aszfText")})
public class Aszf implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "startDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;
    @Column(name = "endDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "aszfText")
    private String aszfText;

    public Aszf() {
    }

    public Aszf(Integer id) {
        this.id = id;
    }

    public Aszf(Integer id, Date startDate, String aszfText) {
        this.id = id;
        this.startDate = startDate;
        this.aszfText = aszfText;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getAszfText() {
        return aszfText;
    }

    public void setAszfText(String aszfText) {
        this.aszfText = aszfText;
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
        if (!(object instanceof Aszf)) {
            return false;
        }
        Aszf other = (Aszf) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Aszf[ id=" + id + " ]";
    }
    
}
