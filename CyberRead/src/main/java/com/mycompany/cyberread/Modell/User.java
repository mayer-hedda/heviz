/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.BirthdateException;
import com.mycompany.cyberread.Exception.CompanyNameException;
import com.mycompany.cyberread.Exception.EmailException;
import com.mycompany.cyberread.Exception.FirstNameException;
import com.mycompany.cyberread.Exception.LastNameException;
import com.mycompany.cyberread.Exception.PasswordException;
import com.mycompany.cyberread.Exception.UsernameException;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
    @NamedQuery(name = "User.findByPhone", query = "SELECT u FROM User u WHERE u.phone = :phone"),
    @NamedQuery(name = "User.findByPublicEmail", query = "SELECT u FROM User u WHERE u.publicEmail = :publicEmail"),
    @NamedQuery(name = "User.findByPublicPhone", query = "SELECT u FROM User u WHERE u.publicPhone = :publicPhone"),
    @NamedQuery(name = "User.findByIntroText", query = "SELECT u FROM User u WHERE u.introText = :introText"),
    @NamedQuery(name = "User.findByWebsite", query = "SELECT u FROM User u WHERE u.website = :website"),
    @NamedQuery(name = "User.findByImage", query = "SELECT u FROM User u WHERE u.image = :image"),
    @NamedQuery(name = "User.findByTutorial", query = "SELECT u FROM User u WHERE u.tutorial = :tutorial"),
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
    @Size(max = 50)
    @Column(name = "firstName")
    private String firstName;
    @Size(max = 50)
    @Column(name = "lastName")
    private String lastName;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 15)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publicEmail")
    private boolean publicEmail;
    @Basic(optional = false)
    @NotNull
    @Column(name = "publicPhone")
    private boolean publicPhone;
    @Size(max = 1000)
    @Column(name = "introText")
    private String introText;
    @Size(max = 100)
    @Column(name = "website")
    private String website;
    @Size(max = 100)
    @Column(name = "image")
    private String image;
    @Basic(optional = false)
    @NotNull
    @Column(name = "tutorial")
    private boolean tutorial;
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

    public User(Integer id, String username, String email, String password, String rank, boolean publicEmail, boolean publicPhone, boolean tutorial, Date registrationTime, boolean active, int coverColorId, int userId) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rank = rank;
        this.publicEmail = publicEmail;
        this.publicPhone = publicPhone;
        this.tutorial = tutorial;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean getPublicEmail() {
        return publicEmail;
    }

    public void setPublicEmail(boolean publicEmail) {
        this.publicEmail = publicEmail;
    }

    public boolean getPublicPhone() {
        return publicPhone;
    }

    public void setPublicPhone(boolean publicPhone) {
        this.publicPhone = publicPhone;
    }

    public String getIntroText() {
        return introText;
    }

    public void setIntroText(String introText) {
        this.introText = introText;
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

    public boolean getTutorial() {
        return tutorial;
    }

    public void setTutorial(boolean tutorial) {
        this.tutorial = tutorial;
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
        return "com.mycompany.cyberread.Modell.User[ id=" + id + " ]";
    }
    
    
    // ----- MY PROCEDURES -----
    public static User login(String email, String password) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();


        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("login");

            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("idOUT", Integer.class, ParameterMode.OUT);

            spq.setParameter("emailIN", email);
            spq.setParameter("passwordIN", password);

            spq.execute();

            Integer id = Integer.parseInt(spq.getOutputParameterValue("idOUT").toString());

            return new User(id);
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            return new User();
        } finally {
            em.clear();
            em.close();
            emf.close();
        }
    }



    // ----- CHECKINGS -----
    public static boolean firstNameCheck(String firstName) throws FirstNameException {
        if(firstName.length() >= 3) {
            return true;
        } else {
            throw new FirstNameException("First name must be at least 3 character long.");
        }
    }

    public static boolean lastNameCheck(String lastName) throws LastNameException {
        if(lastName.length() >= 3) {
            return true;
        } else {
            throw new LastNameException("Last name must be at least 3 characters long.");
        }
    }

    public static boolean usernameCheck(String username) throws UsernameException {
        String regex = "^[a-zA-Z0-9._]*$";

        if(username.length() < 3) {
            throw new UsernameException("Username must be at least 3 characters long.");
        } else if (!username.matches(regex)) {
            throw new UsernameException("Invalid username. Please avoid using special characters exept: _ (underscore) and . (dot)");
        } else {
            return true;
        }
    }

    public static boolean companyNameCheck(String companyName) throws CompanyNameException {
        if(companyName.length() < 1) {
            throw new CompanyNameException("Company name cannot be empty.");
        } else {
            return true;
        }
    }

    public static boolean emailCheck(String email) throws EmailException {
        String atRegex = ".*[@].*";
        String dotRegex = "(.*[.].*)";
        int at = email.indexOf("@");
        int dot = email.indexOf(".");

        if(email.length() < 3) {
            throw new EmailException("Email address must be at least 3 characters long.");
        } else if (!email.matches(atRegex)) {
            throw new EmailException("Please include the '@' symbol in your email address.");
        } else if (at == 0) {
            throw new EmailException("Email address cannot empty before \"@\" symbol.");
        } else if (at <= 3) {
            throw new EmailException("Please ensure you have at least 3 characters before the \"@\" symbol.");
        } else if (!email.matches(dotRegex)) {
            throw new EmailException("Last part of email doesn't include dot.");
        } else if (dot - at < 2) {
            throw new EmailException("Last part of email before dot is not enough.");
        } else {
            return true;
        }
    }

    public static boolean passwordCheck(String password) throws PasswordException {
        String upperRegex = ".*[A-Z].*";
        String lowerRegex = ".*[a-z].*";
        String numberRegex = ".*[0-9].*";
        String specialRegex = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*";

        if(password.length() < 8) {
            throw new PasswordException("Password must be at least 8 characters long.");
        } else if (!password.matches(upperRegex) || !password.matches(lowerRegex) || !password.matches(numberRegex) || !password.matches(specialRegex)) {
            throw new PasswordException("The password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character.");
        } else {
            return true;
        }
    }

    public static boolean birthdateCheck(String birthdate) throws BirthdateException, ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(birthdate);
        Date now = new Date();
        long diff = now.getTime() - date.getTime();
        long diffDays = diff / (24 * 60 * 60 * 1000);

        if(diffDays >= 5478) {
            return true;
        } else {
            throw new BirthdateException("You are too young!");
        }
    }
    
}
