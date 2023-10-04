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
@Table(name = "subscription")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Subscription.findAll", query = "SELECT s FROM Subscription s"),
    @NamedQuery(name = "Subscription.findById", query = "SELECT s FROM Subscription s WHERE s.id = :id"),
    @NamedQuery(name = "Subscription.findByName", query = "SELECT s FROM Subscription s WHERE s.name = :name"),
    @NamedQuery(name = "Subscription.findByPrice", query = "SELECT s FROM Subscription s WHERE s.price = :price"),
    @NamedQuery(name = "Subscription.findByDescription", query = "SELECT s FROM Subscription s WHERE s.description = :description"),
    @NamedQuery(name = "Subscription.findByValidityDay", query = "SELECT s FROM Subscription s WHERE s.validityDay = :validityDay"),
    @NamedQuery(name = "Subscription.findByOptional", query = "SELECT s FROM Subscription s WHERE s.optional = :optional")})
public class Subscription implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private int price;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "validityDay")
    private int validityDay;
    @Column(name = "optional")
    @Temporal(TemporalType.DATE)
    private Date optional;

    public Subscription() {
    }

    public Subscription(Integer id) {
        this.id = id;
    }

    public Subscription(Integer id, String name, int price, String description, int validityDay) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.validityDay = validityDay;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getValidityDay() {
        return validityDay;
    }

    public void setValidityDay(int validityDay) {
        this.validityDay = validityDay;
    }

    public Date getOptional() {
        return optional;
    }

    public void setOptional(Date optional) {
        this.optional = optional;
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
        if (!(object instanceof Subscription)) {
            return false;
        }
        Subscription other = (Subscription) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Subscription[ id=" + id + " ]";
    }
    
}
