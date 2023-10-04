/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "forgotpassword")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Forgotpassword.findAll", query = "SELECT f FROM Forgotpassword f"),
    @NamedQuery(name = "Forgotpassword.findById", query = "SELECT f FROM Forgotpassword f WHERE f.id = :id"),
    @NamedQuery(name = "Forgotpassword.findByUserId", query = "SELECT f FROM Forgotpassword f WHERE f.userId = :userId"),
    @NamedQuery(name = "Forgotpassword.findByCode", query = "SELECT f FROM Forgotpassword f WHERE f.code = :code"),
    @NamedQuery(name = "Forgotpassword.findByActive", query = "SELECT f FROM Forgotpassword f WHERE f.active = :active")})
public class Forgotpassword implements Serializable {

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
    @Size(min = 1, max = 6)
    @Column(name = "code")
    private String code;
    @Basic(optional = false)
    @NotNull
    @Column(name = "active")
    private boolean active;

    public Forgotpassword() {
    }

    public Forgotpassword(Integer id) {
        this.id = id;
    }

    public Forgotpassword(Integer id, int userId, String code, boolean active) {
        this.id = id;
        this.userId = userId;
        this.code = code;
        this.active = active;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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
        if (!(object instanceof Forgotpassword)) {
            return false;
        }
        Forgotpassword other = (Forgotpassword) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Forgotpassword[ id=" + id + " ]";
    }
    
}
