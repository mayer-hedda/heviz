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
@Table(name = "user_x_subscription")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "UserXSubscription.findAll", query = "SELECT u FROM UserXSubscription u"),
    @NamedQuery(name = "UserXSubscription.findById", query = "SELECT u FROM UserXSubscription u WHERE u.id = :id"),
    @NamedQuery(name = "UserXSubscription.findByUserId", query = "SELECT u FROM UserXSubscription u WHERE u.userId = :userId"),
    @NamedQuery(name = "UserXSubscription.findBySubscriptionId", query = "SELECT u FROM UserXSubscription u WHERE u.subscriptionId = :subscriptionId"),
    @NamedQuery(name = "UserXSubscription.findBySubscriptionTime", query = "SELECT u FROM UserXSubscription u WHERE u.subscriptionTime = :subscriptionTime")})
public class UserXSubscription implements Serializable {

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
    @Column(name = "subscriptionId")
    private int subscriptionId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "subscriptionTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date subscriptionTime;

    public UserXSubscription() {
    }

    public UserXSubscription(Integer id) {
        this.id = id;
    }

    public UserXSubscription(Integer id, int userId, int subscriptionId, Date subscriptionTime) {
        this.id = id;
        this.userId = userId;
        this.subscriptionId = subscriptionId;
        this.subscriptionTime = subscriptionTime;
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

    public int getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(int subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public Date getSubscriptionTime() {
        return subscriptionTime;
    }

    public void setSubscriptionTime(Date subscriptionTime) {
        this.subscriptionTime = subscriptionTime;
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
        if (!(object instanceof UserXSubscription)) {
            return false;
        }
        UserXSubscription other = (UserXSubscription) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.UserXSubscription[ id=" + id + " ]";
    }
    
}
