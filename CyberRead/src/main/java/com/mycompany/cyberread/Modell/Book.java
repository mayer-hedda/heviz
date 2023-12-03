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
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
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
@Table(name = "book")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Book.findAll", query = "SELECT b FROM Book b"),
    @NamedQuery(name = "Book.findById", query = "SELECT b FROM Book b WHERE b.id = :id"),
    @NamedQuery(name = "Book.findByTitle", query = "SELECT b FROM Book b WHERE b.title = :title"),
    @NamedQuery(name = "Book.findByStatus", query = "SELECT b FROM Book b WHERE b.status = :status"),
    @NamedQuery(name = "Book.findByWriterId", query = "SELECT b FROM Book b WHERE b.writerId = :writerId"),
    @NamedQuery(name = "Book.findByPublisherId", query = "SELECT b FROM Book b WHERE b.publisherId = :publisherId"),
    @NamedQuery(name = "Book.findByPublishedTime", query = "SELECT b FROM Book b WHERE b.publishedTime = :publishedTime"),
    @NamedQuery(name = "Book.findByRating", query = "SELECT b FROM Book b WHERE b.rating = :rating"),
    @NamedQuery(name = "Book.findBySummary", query = "SELECT b FROM Book b WHERE b.summary = :summary"),
    @NamedQuery(name = "Book.findByPrice", query = "SELECT b FROM Book b WHERE b.price = :price"),
    @NamedQuery(name = "Book.findByCoverImage", query = "SELECT b FROM Book b WHERE b.coverImage = :coverImage"),
    @NamedQuery(name = "Book.findByText", query = "SELECT b FROM Book b WHERE b.text = :text"),
    @NamedQuery(name = "Book.findByChapterNumber", query = "SELECT b FROM Book b WHERE b.chapterNumber = :chapterNumber"),
    @NamedQuery(name = "Book.findByFreeChapterNumber", query = "SELECT b FROM Book b WHERE b.freeChapterNumber = :freeChapterNumber"),
    @NamedQuery(name = "Book.findByLanguageId", query = "SELECT b FROM Book b WHERE b.languageId = :languageId"),
    @NamedQuery(name = "Book.findByAdultFiction", query = "SELECT b FROM Book b WHERE b.adultFiction = :adultFiction"),
    @NamedQuery(name = "Book.findByAgesId", query = "SELECT b FROM Book b WHERE b.agesId = :agesId"),
    @NamedQuery(name = "Book.findByCategoryId", query = "SELECT b FROM Book b WHERE b.categoryId = :categoryId"),
    @NamedQuery(name = "Book.findByCopyrightId", query = "SELECT b FROM Book b WHERE b.copyrightId = :copyrightId")})
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 23)
    @Column(name = "status")
    private String status;
    @Basic(optional = false)
    @NotNull
    @Column(name = "writerId")
    private int writerId;
    @Column(name = "publisherId")
    private Integer publisherId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publishedTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date publishedTime;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "rating")
    private Double rating;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "summary")
    private String summary;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private int price;
    @Size(max = 50)
    @Column(name = "coverImage")
    private String coverImage;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "text")
    private String text;
    @Basic(optional = false)
    @NotNull
    @Column(name = "chapterNumber")
    private int chapterNumber;
    @Basic(optional = false)
    @NotNull
    @Column(name = "freeChapterNumber")
    private int freeChapterNumber;
    @Basic(optional = false)
    @NotNull
    @Column(name = "languageId")
    private int languageId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "adultFiction")
    private boolean adultFiction;
    @Basic(optional = false)
    @NotNull
    @Column(name = "agesId")
    private int agesId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "categoryId")
    private int categoryId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "copyrightId")
    private int copyrightId;
    
    public Book() {
    }

    public Book(Integer id) {
        this.id = id;
    }

    public Book(Integer id, String title, String status, int writerId, Date publishedTime, String summary, int price, String text, int chapterNumber, int freeChapterNumber, int languageId, boolean adultFiction, int agesId, int categoryId, int copyrightId) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.writerId = writerId;
        this.publishedTime = publishedTime;
        this.summary = summary;
        this.price = price;
        this.text = text;
        this.chapterNumber = chapterNumber;
        this.freeChapterNumber = freeChapterNumber;
        this.languageId = languageId;
        this.adultFiction = adultFiction;
        this.agesId = agesId;
        this.categoryId = categoryId;
        this.copyrightId = copyrightId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getWriterId() {
        return writerId;
    }

    public void setWriterId(int writerId) {
        this.writerId = writerId;
    }

    public Integer getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(Integer publisherId) {
        this.publisherId = publisherId;
    }

    public Date getPublishedTime() {
        return publishedTime;
    }

    public void setPublishedTime(Date publishedTime) {
        this.publishedTime = publishedTime;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(int chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public int getFreeChapterNumber() {
        return freeChapterNumber;
    }

    public void setFreeChapterNumber(int freeChapterNumber) {
        this.freeChapterNumber = freeChapterNumber;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public boolean getAdultFiction() {
        return adultFiction;
    }

    public void setAdultFiction(boolean adultFiction) {
        this.adultFiction = adultFiction;
    }

    public int getAgesId() {
        return agesId;
    }

    public void setAgesId(int agesId) {
        this.agesId = agesId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getCopyrightId() {
        return copyrightId;
    }

    public void setCopyrightId(int copyrightId) {
        this.copyrightId = copyrightId;
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
        if (!(object instanceof Book)) {
            return false;
        }
        Book other = (Book) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Book[ id=" + id + " ]";
    }
    
}
