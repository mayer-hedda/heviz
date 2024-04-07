package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.BookException;
import com.exam.cyberread.Exception.MissingCategoryException;
import com.exam.cyberread.Exception.MissingFilterException;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
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
import org.json.JSONArray;
import org.json.JSONObject;


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
    @NamedQuery(name = "Book.findByDescription", query = "SELECT b FROM Book b WHERE b.description = :description"),
    @NamedQuery(name = "Book.findByPrice", query = "SELECT b FROM Book b WHERE b.price = :price"),
    @NamedQuery(name = "Book.findByCoverImage", query = "SELECT b FROM Book b WHERE b.coverImage = :coverImage"),
    @NamedQuery(name = "Book.findByFile", query = "SELECT b FROM Book b WHERE b.file = :file"),
    @NamedQuery(name = "Book.findByChapterNumber", query = "SELECT b FROM Book b WHERE b.chapterNumber = :chapterNumber"),
    @NamedQuery(name = "Book.findByFreeChapterNumber", query = "SELECT b FROM Book b WHERE b.freeChapterNumber = :freeChapterNumber"),
    @NamedQuery(name = "Book.findByPagesNumber", query = "SELECT b FROM Book b WHERE b.pagesNumber = :pagesNumber"),
    @NamedQuery(name = "Book.findByAdultFiction", query = "SELECT b FROM Book b WHERE b.adultFiction = :adultFiction"),
    @NamedQuery(name = "Book.findByBankAccountNumber", query = "SELECT b FROM Book b WHERE b.bankAccountNumber = :bankAccountNumber"),
    @NamedQuery(name = "Book.findByLanguageId", query = "SELECT b FROM Book b WHERE b.languageId = :languageId"),
    @NamedQuery(name = "Book.findByTargetAudienceId", query = "SELECT b FROM Book b WHERE b.targetAudienceId = :targetAudienceId"),
    @NamedQuery(name = "Book.findByCategoryId", query = "SELECT b FROM Book b WHERE b.categoryId = :categoryId")})
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
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private int price;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "coverImage")
    private String coverImage;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "file")
    private String file;
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
    @Column(name = "pagesNumber")
    private int pagesNumber;
    @Basic(optional = false)
    @NotNull
    @Column(name = "adultFiction")
    private boolean adultFiction;
    @Size(max = 30)
    @Column(name = "bankAccountNumber")
    private String bankAccountNumber;
    @Basic(optional = false)
    @NotNull
    @Column(name = "languageId")
    private int languageId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "targetAudienceId")
    private int targetAudienceId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "categoryId")
    private int categoryId;
    
    private int statusId;
    
    private int filter;
    
    private String searchText;
    
    public Book() {
    }

    public Book(Integer id) {
        this.id = id;
    }

    public Book(Integer id, String title, String status, int writerId, Date publishedTime, String description, int price, String coverImage, String file, int chapterNumber, int freeChapterNumber, int pagesNumber, boolean adultFiction, int languageId, int targetAudienceId, int categoryId) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.writerId = writerId;
        this.publishedTime = publishedTime;
        this.description = description;
        this.price = price;
        this.coverImage = coverImage;
        this.file = file;
        this.chapterNumber = chapterNumber;
        this.freeChapterNumber = freeChapterNumber;
        this.pagesNumber = pagesNumber;
        this.adultFiction = adultFiction;
        this.languageId = languageId;
        this.targetAudienceId = targetAudienceId;
        this.categoryId = categoryId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
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

    public int getPagesNumber() {
        return pagesNumber;
    }

    public void setPagesNumber(int pagesNumber) {
        this.pagesNumber = pagesNumber;
    }

    public boolean getAdultFiction() {
        return adultFiction;
    }

    public void setAdultFiction(boolean adultFiction) {
        this.adultFiction = adultFiction;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public int getTargetAudienceId() {
        return targetAudienceId;
    }

    public void setTargetAudienceId(int targetAudienceId) {
        this.targetAudienceId = targetAudienceId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    
    public int getStatusId() {
        return statusId;
    }
    
    public int getFilter() {
        return filter;
    }
    
    public String getSearchText() {
        return searchText;
    }
    
    /**
     * @param status
     * 
     * @return 
        * 1: looking for a publisher
        * 2: self-published
        * 3: published by
        * 
        * 0: something wrong
     */
    public static int getStatusIdByStatus(String status) {
        if(status.equals("looking for a publisher")) {
            return 1;
        } else if(status.equals("self-published")) {
            return 2;
        } else if(status.equals("published by")) {
            return 3;
        }
        
        return 0;
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
        return "com.exam.cyberread.Model.Book[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param userId: id of the logged in user
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * publisher company name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getMostSavedBooksOfTheMonth(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getMostSavedBooksOfTheMonth");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) {    
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("publisher", (String) result[6]);
                book.put("description", (String) result[7]);
                book.put("pagesNumber", (Integer) result[8]);
                book.put("rating", (BigDecimal) result[9]);
                book.put("language", (String) result[10]);
                if((Integer) result[11] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[12]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getMostSavedBooksOfTheMonth() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * publisher company name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getPublishedBooks(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPublishedBooks");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("publisher", (String) result[6]);
                book.put("description", (String) result[7]);
                book.put("pagesNumber", (Integer) result[8]);
                book.put("rating", (BigDecimal) result[9]);
                book.put("language", (String) result[10]);
                if((Integer) result[11] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[12]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getPublishedBooks() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getSelfPublishedBooks(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getSelfPublishedBooks");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                if((Integer) result[10] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[11]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSelfPublishedBooks() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * publisher company name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getOneRandomBook(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getOneRandomBook");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("publisher", (String) result[6]);
                book.put("description", (String) result[7]);
                book.put("pagesNumber", (Integer) result[8]);
                book.put("rating", (BigDecimal) result[9]);
                book.put("language", (String) result[10]);
                if((Integer) result[11] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[12]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getOneRandomBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * publisher company name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getRecommandedBooks(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getRecommandedBooks");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("publisher", (String) result[6]);
                book.put("description", (String) result[7]);
                book.put("pagesNumber", (Integer) result[8]);
                book.put("rating", (BigDecimal) result[9]);
                book.put("language", (String) result[10]);
                if((Integer) result[11] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[12]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getRecommandedBooks() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param title
     * @param description
     * @param targetAudienceId
     * @param languageId
     * @param adultFiction
     * @param categoryId
     * @param statusId
        * 1: looking for a publisher
        * 2: self-published
     * @param price
     * @param coverImage
     * @param file
     * @param bankAccountNumber
     * @param chapterNumber
     * @param freeChapterNumber
     * 
     * @return
        * 1: Successfully add book
        * 2: This target audience does not exist
        * 3: This language does not exist
        * 4: This category does not exist
        * 
        * 5: This target audience does not exist AND This language does not exist
        * 6: This target audience does not exist AND This category does not exist
        * 7: This language does not exist AND This category does not exist
        * 
        * 8: None of them exist.
     * 
     * @throws BookException: Something wrong
     */
    public static Integer addBook(Integer userId, String title, String description, Integer targetAudienceId, Integer languageId, Boolean adultFiction, Integer categoryId, Integer statusId, Integer price, String coverImage, String file, String bankAccountNumber, Integer chapterNumber, Integer freeChapterNumber) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("addBook");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("titleIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("descriptionIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("targetAudienceIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("languageIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("adultFictionIN", Boolean.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("statusIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("priceIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("coverImageIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("fileIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bankAccountNumberIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("chapterNumberIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("freeChapterNumberIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("titleIN", title);
            spq.setParameter("descriptionIN", description);
            spq.setParameter("targetAudienceIdIN", targetAudienceId);
            spq.setParameter("languageIdIN", languageId);
            spq.setParameter("adultFictionIN", adultFiction);
            spq.setParameter("categoryIdIN", categoryId);
            spq.setParameter("statusIN", statusId);
            spq.setParameter("priceIN", price);
            spq.setParameter("coverImageIN", coverImage);
            spq.setParameter("fileIN", file);
            spq.setParameter("bankAccountNumberIN", bankAccountNumber);
            spq.setParameter("chapterNumberIN", chapterNumber);
            spq.setParameter("freeChapterNumberIN", freeChapterNumber);

            spq.execute();
            
            return (Integer) spq.getOutputParameterValue("result");
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in addBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param bookId
     * 
     * @return
        * book id
        * title
        * description
        * target audience id
        * language id
        * adult fiction
        * category id
        * status id
        * price
        * cover image
        * file
        * bank account number
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getBookDetails(Integer bookId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getBookDetails");
            
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("bookIdIN", bookId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONObject bookDetails = new JSONObject();
            
            for(Object[] result : resultList) {    
                bookDetails.put("id", (Integer) result[0]);
                bookDetails.put("title", (String) result[1]);
                bookDetails.put("description", (String) result[2]);
                bookDetails.put("targetAudienceId", (Integer) result[3]);
                bookDetails.put("languageId", (Integer) result[4]);
                bookDetails.put("adultFiction", (Boolean) result[5]);
                bookDetails.put("categoryId", (Integer) result[6]);
                bookDetails.put("statusId", Book.getStatusIdByStatus((String) result[7]));
                bookDetails.put("price", (Integer) result[8]);
                bookDetails.put("coverImage", (String) result[9]);
                bookDetails.put("file", (String) result[10]);
                bookDetails.put("bankAccountNumber", (String) result[11]);
            }
            
            return bookDetails;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getBookDetails() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param bookId
     * @param title
     * @param description
     * @param targetAudienceId
     * @param languageId
     * @param adultFiction
     * @param categoryId
     * @param statusId
        * 1: looking for a publisher
        * 2: self-published
     * @param price
     * @param coverImage
     * @param file
     * @param bankAccountNumber
     * @param chapterNumber
     * @param freeChapterNumber
     * 
     * @return
        * 1: Successfully add book
        * 2: This target audience does not exist
        * 3: This language does not exist
        * 4: This category does not exist
        * 
        * 5: This target audience does not exist AND This language does not exist
        * 6: This target audience does not exist AND This category does not exist
        * 7: This language does not exist AND This category does not exist
        * 
        * 8: None of them exist.
     * 
     * @throws BookException: Something wrong
     */
    public static Integer setBook(Integer bookId, String title, String description, Integer targetAudienceId, Integer languageId, Boolean adultFiction, Integer categoryId, Integer statusId, Integer price, String coverImage, String file, String bankAccountNumber, Integer chapterNumber, Integer freeChapterNumber) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setBook");
            
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("titleIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("descriptionIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("targetAudienceIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("languageIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("adultFictionIN", Boolean.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("statusIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("priceIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("coverImageIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("fileIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bankAccountNumberIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("chapterNumberIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("freeChapterNumberIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

            spq.setParameter("bookIdIN", bookId);
            spq.setParameter("titleIN", title);
            spq.setParameter("descriptionIN", description);
            spq.setParameter("targetAudienceIdIN", targetAudienceId);
            spq.setParameter("languageIdIN", languageId);
            spq.setParameter("adultFictionIN", adultFiction);
            spq.setParameter("categoryIdIN", categoryId);
            spq.setParameter("statusIdIN", statusId);
            spq.setParameter("priceIN", price);
            spq.setParameter("coverImageIN", coverImage);
            spq.setParameter("fileIN", file);
            spq.setParameter("bankAccountNumberIN", bankAccountNumber);
            spq.setParameter("chapterNumberIN", chapterNumber);
            spq.setParameter("freeChapterNumberIN", freeChapterNumber);

            spq.execute();
            
            return (Integer) spq.getOutputParameterValue("result");
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in setBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getOneRandomLookingForPublisherBook(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getOneRandomLookingForPublisherBook");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                if((Integer) result[10] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[11]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getOneRandomLookingForPublisherBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: id of the logged in user
     * 
     * @return
        * book id
        * cover image
        * title
        * username
        * first name
        * last name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getRecommandedBooksForPublisher(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getRecommandedBooksForPublisher");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("username", (String) result[3]);
                book.put("firstName", (String) result[4]);
                book.put("lastName", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                if((Integer) result[10] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[11]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getRecommandedBooksForPublisher() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * book id
        * category name
        * cover image
        * title
        * username
        * first name
        * last name
        * book description
        * pages number
        * book rating
        * language
        * saved
        * price
     * 
     * @throws BookException: Something wrong
     */
    public static JSONArray getRandomBookByCategory(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getRandomBookByCategory");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("categoryName", (String) result[1]);
                book.put("coverImage", (String) result[2]);
                book.put("title", (String) result[3]);
                book.put("username", (String) result[4]);
                book.put("firstName", (String) result[5]);
                book.put("lastName", (String) result[6]);
                book.put("description", (String) result[7]);
                book.put("pagesNumber", (Integer) result[8]);
                book.put("rating", (BigDecimal) result[9]);
                book.put("language", (String) result[10]);
                book.put("saved", (Boolean) result[11]);
                book.put("price", (Integer) result[12]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getRandomBookByCategory() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId: logged in user id
     * @param profileUsername: username associated with the opened profile
     * 
     * @return
        * books
            * book id
            * category name
            * cover image
            * title
            * username
            * first name
            * last name
            * company name
            * book description
            * pages number
            * book rating
            * language
            * saved
            * price
        * ownBooks
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getUserBooks(Integer userId, String profileUsername) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getUserBooks");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("profileUsernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            spq.registerStoredProcedureParameter("ownBooks", Boolean.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("profileUsernameIN", profileUsername);

            spq.execute();
            
            if((Integer) spq.getOutputParameterValue("result") == 1) {
                List<Object[]> resultList = spq.getResultList();
                JSONArray books = new JSONArray();

                for(Object[] result : resultList) { 
                    JSONObject book = new JSONObject();
                    book.put("id", (Integer) result[0]);
                    book.put("coverImage", (String) result[1]);
                    book.put("title", (String) result[2]);
                    book.put("username", (String) result[3]);
                    book.put("firstName", (String) result[4]);
                    book.put("lastName", (String) result[5]);
                    book.put("companyName", (String) result[6]);
                    book.put("description", (String) result[7]);
                    book.put("pagesNumber", (Integer) result[8]);
                    book.put("rating", (BigDecimal) result[9]);
                    book.put("language", (String) result[10]);
                    if((Integer) result[11] == 0) {
                        book.put("saved", false);
                    } else {
                        book.put("saved", true);
                    }
                    book.put("price", (Integer) result[12]);

                    books.put(book);
                }

                return new JSONObject().put("myBooks", books).put("ownBooks", (Boolean) spq.getOutputParameterValue("ownBooks"));
            } else {
                JSONObject error = new JSONObject();
                error.put("profileUsernameError", "This user dosn't exists!");
                
                return error;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getUserBooks() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * saveBookError
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject saveBook(Integer userId, Integer bookId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("saveBook");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("bookIdIN", bookId);

            spq.execute();
            
            JSONObject error = new JSONObject();
            if((Integer) spq.getOutputParameterValue("result") == 2) {
                error.put("saveBookError", "This book is alredy saved!");
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in saveBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * deleteSavedBookError
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject deleteSavedBook(Integer userId, Integer bookId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("deleteSavedBook");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("bookIdIN", bookId);

            spq.execute();
            
            JSONObject error = new JSONObject();
            if((Integer) spq.getOutputParameterValue("result") == 2) {
                error.put("deleteSavedBookError", "This book has not yet been saved!");
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in deleteSavedBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param bookId
     * 
     * @return
        * deleteBookError
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject deleteBook(Integer userId, Integer bookId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("deleteBook");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("bookIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("bookIdIN", bookId);

            spq.execute();
            
            JSONObject error = new JSONObject();
            if((Integer) spq.getOutputParameterValue("result") == 2) {
                error.put("deleteBookError", "This book dosn't exist!");
            } else if((Integer) spq.getOutputParameterValue("result") == 3) {
                error.put("deleteBookError", "This book is not your book!");
            }
            
            return error;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in deleteBook() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param categoryId
     * @param categoryName
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * saved
            * price
            * username
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: The name of the category id is not the same as the category name!
     */
    public static JSONArray getAllBooksByCategory(Integer userId, Integer categoryId, String categoryName) throws BookException, MissingCategoryException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllBooksByCategory");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("categoryIdIN", categoryId);
            spq.setParameter("categoryNameIN", categoryName);

            spq.execute();
            
            Integer resultOUT = (Integer) spq.getOutputParameterValue("result");
            
            switch (resultOUT) {
                case 1:
                    List<Object[]> resultList = spq.getResultList();
                    JSONArray books = new JSONArray();
                    
                    for(Object[] result : resultList) {
                        JSONObject book = new JSONObject();
                        book.put("id", (Integer) result[0]);
                        book.put("coverImage", (String) result[1]);
                        book.put("title", (String) result[2]);
                        book.put("firstName", (String) result[3]);
                        book.put("lastName", (String) result[4]);
                        book.put("publisher", (String) result[5]);
                        book.put("description", (String) result[6]);
                        book.put("pagesNumber", (Integer) result[7]);
                        book.put("rating", (BigDecimal) result[8]);
                        book.put("language", (String) result[9]);
                        if((Integer) result[10] == 0) {
                            book.put("saved", false);
                        } else {
                            book.put("saved", true);
                        }
                        book.put("price", (Integer) result[11]);
                        book.put("username", (String) result[12]);
                        
                        books.put(book);
                    }
                    
                    return books;
                case 2:
                    throw new MissingCategoryException();
                default:
                    throw new BookException("Something wrong!");
            }
        } catch(MissingCategoryException ex) {
            throw ex;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getAllBooksByCategory() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param filter
     * @param categoryId
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * saved
            * price
            * username
     * 
     * @throws BookException: Something wrong
     * @throws MissingCategoryException: This category does not exist!
     * @throws MissingFilterException: This filter number does not exist!
     */
    public static JSONArray getFilteredBooks(Integer userId, Integer filter, Integer categoryId) throws BookException, MissingCategoryException, MissingFilterException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getFilteredBooks");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("filter", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("filter", filter);
            spq.setParameter("categoryIdIN", categoryId);

            spq.execute();
            
            Integer resultOUT = (Integer) spq.getOutputParameterValue("result");
            
            switch (resultOUT) {
                case 1:
                    List<Object[]> resultList = spq.getResultList();
                    JSONArray books = new JSONArray();
                    
                    for(Object[] result : resultList) {
                        JSONObject book = new JSONObject();
                        book.put("id", (Integer) result[0]);
                        book.put("coverImage", (String) result[1]);
                        book.put("title", (String) result[2]);
                        book.put("firstName", (String) result[3]);
                        book.put("lastName", (String) result[4]);
                        book.put("publisher", (String) result[5]);
                        book.put("description", (String) result[6]);
                        book.put("pagesNumber", (Integer) result[7]);
                        book.put("rating", (BigDecimal) result[8]);
                        book.put("language", (String) result[9]);
                        if((Integer) result[10] == 0) {
                            book.put("saved", false);
                        } else {
                            book.put("saved", true);
                        }
                        book.put("price", (Integer) result[11]);
                        book.put("username", (String) result[12]);
                        
                        books.put(book);
                    }
                    
                    return books;
                case 2:
                    throw new MissingCategoryException("This category does not exist!");
                case 3:
                    throw new MissingFilterException("This filter number does not exist!");
                default:
                    throw new BookException("Something wrong!");
            }
        } catch(MissingCategoryException | MissingFilterException ex) {
            throw ex;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getFilteredBooks() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param searchText
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * saved
            * price
            * username
     * 
     * @throws BookException: Something wrong
     */
    public static JSONObject getSearchBooks(Integer userId, String searchText) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getSearchBooks");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("searchTextIN", String.class, ParameterMode.IN);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("searchTextIN", searchText);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("firstName", (String) result[3]);
                book.put("lastName", (String) result[4]);
                book.put("publisher", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                if((Integer) result[10] == 0) {
                    book.put("saved", false);
                } else {
                    book.put("saved", true);
                }
                book.put("price", (Integer) result[11]);
                book.put("username", (String) result[12]);
                
                books.put(book);
            }
            
            JSONObject returnBooks = new JSONObject();
            
            returnBooks.put("books", books);
            
            return returnBooks;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSearchBooks() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * price
            * username
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONArray getSavedBooksByUserId(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getSavedBooksByUserId");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("firstName", (String) result[3]);
                book.put("lastName", (String) result[4]);
                book.put("publisher", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                book.put("price", (Integer) result[10]);
                book.put("username", (String) result[11]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSavedBooksByUserId() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * username
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONArray getPayedBooksByUserId(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPayedBooksByUserId");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("firstName", (String) result[3]);
                book.put("lastName", (String) result[4]);
                book.put("publisher", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                book.put("username", (String) result[10]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getPayedBooksByUserId() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * price
            * username
     * 
     * @throws BookException: Something wrong!
     */
    public static JSONArray getPublishedBooksByUserId(Integer userId) throws BookException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPublishedBooksByUserId");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray books = new JSONArray();
            
            for(Object[] result : resultList) { 
                JSONObject book = new JSONObject();
                book.put("id", (Integer) result[0]);
                book.put("coverImage", (String) result[1]);
                book.put("title", (String) result[2]);
                book.put("firstName", (String) result[3]);
                book.put("lastName", (String) result[4]);
                book.put("publisher", (String) result[5]);
                book.put("description", (String) result[6]);
                book.put("pagesNumber", (Integer) result[7]);
                book.put("rating", (BigDecimal) result[8]);
                book.put("language", (String) result[9]);
                book.put("price", (Integer) result[10]);
                book.put("username", (String) result[11]);
                
                books.put(book);
            }
            
            return books;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getPublishedBooksByUserId() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param categoryId
     * 
     * @return
        * books:
            * book id
            * cover image
            * title
            * first name
            * last name
            * publisher company name
            * description
            * pages number
            * book rating
            * language
            * price
            * username
     * 
     * @throws BookException: Something wrong!
     * @throws MissingCategoryException: The categoryId is wrong!
     */
    public static JSONArray getSavedBooksByCategoryId(Integer userId, Integer categoryId) throws BookException, MissingCategoryException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getSavedBooksByCategoryId");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("categoryIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);
            
            spq.setParameter("userIdIN", userId);
            spq.setParameter("categoryIdIN", categoryId);

            spq.execute();
            
            Integer resultOUT = (Integer) spq.getOutputParameterValue("result");
            
            switch(resultOUT) {
                case 1:
                    List<Object[]> resultList = spq.getResultList();
                    JSONArray books = new JSONArray();

                    for(Object[] result : resultList) { 
                        JSONObject book = new JSONObject();
                        book.put("id", (Integer) result[0]);
                        book.put("coverImage", (String) result[1]);
                        book.put("title", (String) result[2]);
                        book.put("firstName", (String) result[3]);
                        book.put("lastName", (String) result[4]);
                        book.put("publisher", (String) result[5]);
                        book.put("description", (String) result[6]);
                        book.put("pagesNumber", (Integer) result[7]);
                        book.put("rating", (BigDecimal) result[8]);
                        book.put("language", (String) result[9]);
                        book.put("price", (Integer) result[10]);
                        book.put("username", (String) result[11]);

                        books.put(book);
                    }
                    
                    return books;
                case 2:
                    throw new MissingCategoryException("This category does not exist!");
                default:
                    throw new BookException("Something wrong!");
            }
        } catch(MissingCategoryException ex) {
            throw ex;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new BookException("Error in getSavedBooksByCategoryId() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
        
}
