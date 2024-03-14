package com.exam.cyberread.Model;

import com.exam.cyberread.Exception.UserException;
import java.io.Serializable;
import java.math.BigInteger;
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
    
    private String profileUsername;
    private Integer pagesNumber;

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
    
    public String getProfileUsername() {
        return profileUsername;
    }
    
    public Integer getPagesNumber() {
        return pagesNumber;
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
    
    
    /**
     * @param userId: logged in user id
     * @param username: username of the logged in user
     * @param profileUsername: username associated with the opened profile
     * 
     * @return
        * general user profile:
            * rank
            * username
            * image
            * following
            * first name
            * last name
            * book count
            * saved book count
            * followers count
            * intro description
            * website
            * cover color code
            * ownProfile
            * email
            * phone number
            * registration year
        * publisher user profile:
            * rank
            * username
            * image
            * following
            * company name
            * book count
            * saved book count
            * followers count
            * intro description
            * website
            * cover color code
            * ownProfile
            * email
            * phone number
            * registration year
        * error: profileUsernameError
     * 
     * @throws UserException: Something wrong
     */
    public static JSONObject getUserDetails(Integer userId, String username, String profileUsername) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getUserDetails");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("usernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("profileUsernameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("usernameIN", username);
            spq.setParameter("profileUsernameIN", profileUsername);

            spq.execute();
            
            Integer resultOUT = (Integer) spq.getOutputParameterValue("result");
            
            if(resultOUT == 1) {
                List<Object[]> resultList = spq.getResultList();
                JSONObject userDetails = new JSONObject();

                for(Object[] result : resultList) {
                    String rank = (String) result[0];
                    userDetails.put("rank", rank);
                    if(rank.equals("general")) {
                        userDetails.put("username", (String) result[1]);
                        userDetails.put("image", (String) result[2]);
                        if((Integer) result[3] == 0) {
                            userDetails.put("following", false);
                        } else {
                            userDetails.put("following", true);
                        }
                        userDetails.put("firstName", (String) result[4]);
                        userDetails.put("lastName", (String) result[5]);
                        userDetails.put("bookCount", (BigInteger) result[6]);
                        userDetails.put("savedBookCount", (BigInteger) result[7]);
                        userDetails.put("followersCount", (BigInteger) result[8]);
                        userDetails.put("introDescription", (String) result[9]);
                        userDetails.put("website", (String) result[10]);
                        userDetails.put("coverColorCode", (String) result[11]);
                        userDetails.put("ownProfile", (Boolean) result[12]);
                        userDetails.put("email", (String) result[13]);
                        userDetails.put("phoneNumber", (String) result[14]);
                        userDetails.put("registrationYear", (Integer) result[15]);
                    } else if(rank.equals("publisher")) {
                        userDetails.put("username", (String) result[1]);
                        userDetails.put("image", (String) result[2]);
                        if((Integer) result[3] == 0) {
                            userDetails.put("following", false);
                        } else {
                            userDetails.put("following", true);
                        }
                        userDetails.put("companyName", (String) result[4]);
                        userDetails.put("bookCount", (BigInteger) result[5]);
                        userDetails.put("writerCount", (BigInteger) result[6]);
                        userDetails.put("followersCount", (BigInteger) result[7]);
                        userDetails.put("introDescription", (String) result[8]);
                        userDetails.put("website", (String) result[9]);
                        userDetails.put("coverColorCode", (String) result[10]);
                        userDetails.put("ownProfile", (Boolean) result[11]);
                        userDetails.put("email", (String) result[12]);
                        userDetails.put("phoneNumber", (String) result[13]);
                        userDetails.put("registrationYear", (Integer) result[14]);
                    }               
                }
            
                return userDetails;
            } else {
                JSONObject error = new JSONObject();
                
                error.put("profileUsernameError", "This user dosn't exists!");
                
                return error;
            }
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in getUserDetails() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param username
     * 
     * @return
        * true: Successfully set username
        * false: Unsuccessfully set username
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setUsername(Integer userId, String username) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setUsername");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("usernameIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("usernameIN", username);

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
     * @param email
     * 
     * @return
        * true: Successfully set email
        * false: Unsuccessfully set email
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setEmail(Integer userId, String email) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setEmail");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("emailIN", email);

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
     * @param password
     * 
     * @return
        * true: Successfully set password
        * false: Unsuccessfully set password
     * 
     * @throws UserException: Something wrong!
     */
    public static Integer setPassword(Integer userId, String password) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setPassword");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("passwordIN", password);

            spq.execute();
            
            Integer resultOUT = (Integer) spq.getOutputParameterValue("result");
            
            return resultOUT;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            
            return 3;
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param userId
     * @param phoneNumber
     * 
     * @return
        * true: Successfully set phone number
        * false: Unsuccessfully set phone number
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setPhoneNumber(Integer userId, String phoneNumber) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setPhoneNumber");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("phoneNumberIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("phoneNumberIN", phoneNumber);

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
     * @param firstName
     * 
     * @return
        * true: Successfully set first name
        * false: Unsuccessfully set first name
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setFirstName(Integer userId, String firstName) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setFirstName");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("firstNameIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("firstNameIN", firstName);

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
     * @param lastName
     * 
     * @return
        * true: Successfully set last name
        * false: Unsuccessfully set last name
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setLastName(Integer userId, String lastName) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setLastName");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("lastNameIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("lastNameIN", lastName);

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
        * true: Successfully set public email
        * false: Unsuccessfully set public email
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setPublicEmail(Integer userId) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setPublicEmail");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);

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
        * true: Successfully set public phone number
        * false: Unsuccessfully set public phone number
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setPublicPhoneNumber(Integer userId) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setPublicPhoneNumber");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);

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
     * @param website
     * 
     * @return
        * true: Successfully set website
        * false: Unsuccessfully set website
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setWebsite(Integer userId, String website) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setWebsite");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("websiteIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("websiteIN", website);

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
     * @param introDescription
     * 
     * @return
        * true: Successfully set intro description
        * false: Unsuccessfully set intro description
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setIntroDescription(Integer userId, String introDescription) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setIntroDescription");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("introDescriptionIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("introDescriptionIN", introDescription);

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
     * @param image
     * 
     * @return
        * true: Successfully set profile image
        * false: Unsuccessfully set profile image
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setProfileImage(Integer userId, String image) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setProfileImage");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("imageIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("imageIN", image);

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
     * @param color
     * 
     * @return
        * true: Successfully set cover color
        * false: Unsuccessfully set cover color
     * 
     * @throws UserException: Something wrong!
     */
    public static Boolean setCoverColor(Integer userId, String color) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("setCoverColor");

            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("coverColorIN", String.class, ParameterMode.IN);

            spq.setParameter("userIdIN", userId);
            spq.setParameter("coverColorIN", color);

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
        * General details:
            * username
            * email
            * phone number
            * first name
            * last name
            * public email
            * public phone number
            * color
            * image
            * intro description
            * website
        * Publisher details:
            * username
            * email
            * phone number
            * first name
            * last name
            * public email
            * public phone number
            * color
            * image
            * intro description
            * website
            * company name
     * 
     * @throws UserException: Something wrong!
     */
    public static JSONObject getDetails(Integer userId) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getDetails");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.setParameter("userIdIN", userId);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONObject details = new JSONObject();
            
            Object[] result = resultList.get(0);
            
            if(result[0].equals("general")) {
                details.put("username", (String) result[1]);
                details.put("email", (String) result[2]);
                details.put("phoneNumber", (String) result[3]);
                details.put("firstName", (String) result[4]);
                details.put("lastName", (String) result[5]);
                details.put("publicEmail", (Boolean) result[6]);
                details.put("publicPhoneNumber", (Boolean) result[7]);
                details.put("color", (String) result[8]);
                details.put("image", (String) result[9]);
                details.put("introDescription", (String) result[10]);
                details.put("website", (String) result[11]);
            } else if(result[0].equals("publisher")) {
                details.put("username", (String) result[1]);
                details.put("email", (String) result[2]);
                details.put("phoneNumber", (String) result[3]);
                details.put("firstName", (String) result[4]);
                details.put("lastName", (String) result[5]);
                details.put("publicEmail", (Boolean) result[6]);
                details.put("publicPhoneNumber", (Boolean) result[7]);
                details.put("color", (String) result[8]);
                details.put("image", (String) result[9]);
                details.put("introDescription", (String) result[10]);
                details.put("website", (String) result[11]);
                details.put("companyName", (String) result[12]);
            }
            
            return details;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new UserException("Error in getDetails() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
    
    /**
     * @param pagesNumber
     * @param profileUsername
     * 
     * @return
        * publisher's writer's:
            * image
            * username
     * 
     * @throws UserException: Something wrong!
     */
    public static JSONArray getPublishersWriters(Integer pagesNumber, String profileUsername) throws UserException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.exam_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getPublishersWriters");

            spq.registerStoredProcedureParameter("pagesNumberIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("profileUsernameIN", String.class, ParameterMode.IN);

            spq.setParameter("pagesNumberIN", pagesNumber);
            spq.setParameter("profileUsernameIN", profileUsername);

            spq.execute();
            
            List<Object[]> resultList = spq.getResultList();
            JSONArray writers = new JSONArray();
            
            for(Object[] result : resultList) {
                JSONObject writer = new JSONObject();
                writer.put("image", result[0]);
                writer.put("username", result[1]);
                
                writers.put(writer);
            }
            
            return writers;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            
            throw new UserException("Error in getPublishersWriters() method!");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }
    
}
