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
@Table(name = "search")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Search.findAll", query = "SELECT s FROM Search s"),
    @NamedQuery(name = "Search.findById", query = "SELECT s FROM Search s WHERE s.id = :id"),
    @NamedQuery(name = "Search.findByUserId", query = "SELECT s FROM Search s WHERE s.userId = :userId"),
    @NamedQuery(name = "Search.findByCategoryId", query = "SELECT s FROM Search s WHERE s.categoryId = :categoryId"),
    @NamedQuery(name = "Search.findBySearchTime", query = "SELECT s FROM Search s WHERE s.searchTime = :searchTime")})
public class Search implements Serializable {

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
    @Column(name = "categoryId")
    private int categoryId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "searchTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date searchTime;

    public Search() {
    }

    public Search(Integer id) {
        this.id = id;
    }

    public Search(Integer id, int userId, int categoryId, Date searchTime) {
        this.id = id;
        this.userId = userId;
        this.categoryId = categoryId;
        this.searchTime = searchTime;
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

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public Date getSearchTime() {
        return searchTime;
    }

    public void setSearchTime(Date searchTime) {
        this.searchTime = searchTime;
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
        if (!(object instanceof Search)) {
            return false;
        }
        Search other = (Search) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Search[ id=" + id + " ]";
    }
    
}
