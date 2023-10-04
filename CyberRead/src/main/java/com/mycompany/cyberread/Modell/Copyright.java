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
@Table(name = "copyright")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Copyright.findAll", query = "SELECT c FROM Copyright c"),
    @NamedQuery(name = "Copyright.findById", query = "SELECT c FROM Copyright c WHERE c.id = :id"),
    @NamedQuery(name = "Copyright.findByName", query = "SELECT c FROM Copyright c WHERE c.name = :name"),
    @NamedQuery(name = "Copyright.findByDescription", query = "SELECT c FROM Copyright c WHERE c.description = :description"),
    @NamedQuery(name = "Copyright.findByHelpCenterId", query = "SELECT c FROM Copyright c WHERE c.helpCenterId = :helpCenterId")})
public class Copyright implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 200)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "helpCenterId")
    private int helpCenterId;

    public Copyright() {
    }

    public Copyright(Integer id) {
        this.id = id;
    }

    public Copyright(Integer id, String name, String description, int helpCenterId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.helpCenterId = helpCenterId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getHelpCenterId() {
        return helpCenterId;
    }

    public void setHelpCenterId(int helpCenterId) {
        this.helpCenterId = helpCenterId;
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
        if (!(object instanceof Copyright)) {
            return false;
        }
        Copyright other = (Copyright) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Copyright[ id=" + id + " ]";
    }
    
}
