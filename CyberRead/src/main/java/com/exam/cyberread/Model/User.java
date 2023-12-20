package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.UserException;
import java.io.Serializable;
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
@Table(name = "user")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
    @NamedQuery(name = "User.findById", query = "SELECT u FROM User u WHERE u.id = :id"),
    @NamedQuery(name = "User.findByUsername", query = "SELECT u FROM User u WHERE u.username = :username"),
    @NamedQuery(name = "User.findByEmail", query = "SELECT u FROM User u WHERE u.email = :email"),
    @NamedQuery(name = "User.findByPassword", query = "SELECT u FROM User u WHERE u.password = :password"),
    @NamedQuery(name = "User.findByRank", query = "SELECT u FROM User u WHERE u.rank = :rank"),
    @NamedQuery(name = "User.findByFirstName", query = "SELECT u FROM User u WHERE u.firstName = :firstName"),
    @NamedQuery(name = "User.findByLastName", query = "SELECT u FROM User u WHERE u.lastName = :lastName"),
    @NamedQuery(name = "User.findByPhoneNumber", query = "SELECT u FROM User u WHERE u.phoneNumber = :phoneNumber"),
    @NamedQuery(name = "User.findByPublicEmail", query = "SELECT u FROM User u WHERE u.publicEmail = :publicEmail"),
    @NamedQuery(name = "User.findByPublicPhoneNumber", query = "SELECT u FROM User u WHERE u.publicPhoneNumber = :publicPhoneNumber"),
    @NamedQuery(name = "User.findByIntroDescription", query = "SELECT u FROM User u WHERE u.introDescription = :introDescription"),
    @NamedQuery(name = "User.findByWebsite", query = "SELECT u FROM User u WHERE u.website = :website"),
    @NamedQuery(name = "User.findByImage", query = "SELECT u FROM User u WHERE u.image = :image"),
    @NamedQuery(name = "User.findByRegistrationTime", query = "SELECT u FROM User u WHERE u.registrationTime = :registrationTime"),
    @NamedQuery(name = "User.findByActive", query = "SELECT u FROM User u WHERE u.active = :active"),
    @NamedQuery(name = "User.findByCoverColorId", query = "SELECT u FROM User u WHERE u.coverColorId = :coverColorId"),
    @NamedQuery(name = "User.findByUserId", query = "SELECT u FROM User u WHERE u.userId = :userId")})
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username")
    private String username;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 9)
    @Column(name = "rank")
    private String rank;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "firstName")
    private String firstName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "lastName")
    private String lastName;
    @Size(max = 15)
    @Column(name = "phoneNumber")
    private String phoneNumber;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publicEmail")
    private boolean publicEmail;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publicPhoneNumber")
    private boolean publicPhoneNumber;
    @Size(max = 1000)
    @Column(name = "introDescription")
    private String introDescription;
    @Size(max = 100)
    @Column(name = "website")
    private String website;
    @Size(max = 100)
    @Column(name = "image")
    private String image;
    @Basic(optional = false)
    @NotNull
    @Column(name = "registrationTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationTime;
    @Basic(optional = false)
    @NotNull
    @Column(name = "active")
    private boolean active;
    @Basic(optional = false)
    @NotNull
    @Column(name = "coverColorId")
    private int coverColorId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "userId")
    private int userId;

    public User() {
    }

    public User(Integer id) {
        this.id = id;
    }
    
    public User(Integer id, String username, String image, String rank, Boolean active) {
        this.id = id;
        this.username = username;
        this.image = image;
        this.rank = rank;
        this.active = active;
    }

    public User(Integer id, String username, String email, String password, String rank, String firstName, String lastName, boolean publicEmail, boolean publicPhoneNumber, Date registrationTime, boolean active, int coverColorId, int userId) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rank = rank;
        this.firstName = firstName;
        this.lastName = lastName;
        this.publicEmail = publicEmail;
        this.publicPhoneNumber = publicPhoneNumber;
        this.registrationTime = registrationTime;
        this.active = active;
        this.coverColorId = coverColorId;
        this.userId = userId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean getPublicEmail() {
        return publicEmail;
    }

    public void setPublicEmail(boolean publicEmail) {
        this.publicEmail = publicEmail;
    }

    public boolean getPublicPhoneNumber() {
        return publicPhoneNumber;
    }

    public void setPublicPhoneNumber(boolean publicPhoneNumber) {
        this.publicPhoneNumber = publicPhoneNumber;
    }

    public String getIntroDescription() {
        return introDescription;
    }

    public void setIntroDescription(String introDescription) {
        this.introDescription = introDescription;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getRegistrationTime() {
        return registrationTime;
    }

    public void setRegistrationTime(Date registrationTime) {
        this.registrationTime = registrationTime;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getCoverColorId() {
        return coverColorId;
    }

    public void setCoverColorId(int coverColorId) {
        this.coverColorId = coverColorId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.exam.cyberread.Model.User[ id=" + id + " ]";
    }
    
    
    
    // --- MY PROCEDURES ---
    /**
     * @param email: user email address
     * @param password: user password
     * 
     * @return user
        * id
        * username
        * image
        * rank
     */
    public static User login(String email, String password) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("login");

            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("userIdOUT", Integer.class, ParameterMode.OUT);
            spq.registerStoredProcedureParameter("usernameOUT", String.class, ParameterMode.OUT);
            spq.registerStoredProcedureParameter("imageOUT", String.class, ParameterMode.OUT);
            spq.registerStoredProcedureParameter("rankOUT", String.class, ParameterMode.OUT);
            spq.registerStoredProcedureParameter("activeOUT", Boolean.class, ParameterMode.OUT);

            spq.setParameter("emailIN", email);
            spq.setParameter("passwordIN", password);

            spq.execute();

            Integer id = (Integer) spq.getOutputParameterValue("userIdOUT");
            String username = (String) spq.getOutputParameterValue("usernameOUT");
            String image = (String) spq.getOutputParameterValue("imageOUT");
            String rank = (String) spq.getOutputParameterValue("rankOUT");
            Boolean active = (Boolean) spq.getOutputParameterValue("activeOUT");

            return new User(id, username, image, rank, active);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return new User();
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param username
     * @param firstName
     * @param lastName
     * @param email
     * @param birthdate
     * @param password
     * 
     * @return 
        * true: Successfully registration
        * false: Unsuccessfully registration
     */
    public static Boolean generalRegistration(String username, String firstName, String lastName, String email, String birthdate, String password) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("generalRegistration");

            spq.registerStoredProcedureParameter("usernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("firstNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("lastNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("birthdateIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);

            spq.setParameter("usernameIN", username);
            spq.setParameter("firstNameIN", firstName);
            spq.setParameter("lastNameIN", lastName);
            spq.setParameter("birthdateIN", birthdate);
            spq.setParameter("emailIN", email);
            spq.setParameter("passwordIN", password);

            spq.execute();
            return true;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return false;
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param username
     * @param firstName
     * @param lastName
     * @param companyName
     * @param email
     * @param password
     * 
     * @return 
        * true: Successfully registration
        * false: Unsuccessfully registration
     */
    public static boolean publisherRegistration(String username, String firstName, String lastName, String companyName, String email, String password) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("publisherRegistration");

            spq.registerStoredProcedureParameter("usernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("firstNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("lastNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("companyNameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);

            spq.setParameter("usernameIN", username);
            spq.setParameter("firstNameIN", firstName);
            spq.setParameter("lastNameIN", lastName);
            spq.setParameter("companyNameIN", companyName);
            spq.setParameter("emailIN", email);
            spq.setParameter("passwordIN", password);

            spq.execute();
            return true;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return false;
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
        * recommanded users
            * image
            * username
     * 
     * @throws UserException: Something wrong
     */
    public static JSONArray getRecommandedUsers(Integer userId) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getRecommandedUsers");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray users = new JSONArray();
            
            for(Object[] result : resultList) {
                JSONObject user = new JSONObject();
                
                user.put("image", result[0]);
                user.put("username", result[1]);
                
                users.put(user);
            }
            
            return users;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in getRecommandedUsers() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
