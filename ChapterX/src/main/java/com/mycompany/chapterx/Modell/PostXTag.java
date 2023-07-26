/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.chapterx.Modell;

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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "post_x_tag")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PostXTag.findAll", query = "SELECT p FROM PostXTag p"),
    @NamedQuery(name = "PostXTag.findById", query = "SELECT p FROM PostXTag p WHERE p.id = :id"),
    @NamedQuery(name = "PostXTag.findByPostId", query = "SELECT p FROM PostXTag p WHERE p.postId = :postId"),
    @NamedQuery(name = "PostXTag.findByTagId", query = "SELECT p FROM PostXTag p WHERE p.tagId = :tagId")})
public class PostXTag implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "postId")
    private int postId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "tagId")
    private int tagId;

    public PostXTag() {
    }

    public PostXTag(Integer id) {
        this.id = id;
    }

    public PostXTag(Integer id, int postId, int tagId) {
        this.id = id;
        this.postId = postId;
        this.tagId = tagId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
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
        if (!(object instanceof PostXTag)) {
            return false;
        }
        PostXTag other = (PostXTag) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.chapterx.Modell.PostXTag[ id=" + id + " ]";
    }
    
}
