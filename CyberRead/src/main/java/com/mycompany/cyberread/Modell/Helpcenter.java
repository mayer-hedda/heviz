/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.cyberread.Modell;

import com.mycompany.cyberread.Exception.HelpCenterException;
import java.io.Serializable;
import java.util.ArrayList;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author eepseelona
 */
@Entity
@Table(name = "helpcenter")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Helpcenter.findAll", query = "SELECT h FROM Helpcenter h"),
    @NamedQuery(name = "Helpcenter.findById", query = "SELECT h FROM Helpcenter h WHERE h.id = :id"),
    @NamedQuery(name = "Helpcenter.findByActive", query = "SELECT h FROM Helpcenter h WHERE h.active = :active")})
public class Helpcenter implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "question")
    private String question;
    @Lob
    @Size(max = 65535)
    @Column(name = "answer")
    private String answer;
    @Basic(optional = false)
    @NotNull
    @Column(name = "active")
    private boolean active;

    public Helpcenter() {
    }
    
    public Helpcenter(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public Helpcenter(Integer id) {
        this.id = id;
    }

    public Helpcenter(Integer id, String question, boolean active) {
        this.id = id;
        this.question = question;
        this.active = active;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
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
        if (!(object instanceof Helpcenter)) {
            return false;
        }
        Helpcenter other = (Helpcenter) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.cyberread.Modell.Helpcenter[ id=" + id + " ]";
    }
    
    
    // ----- MY PROCEDURES -----

    public static java.util.List<Helpcenter> getAllHelpcenter() throws HelpCenterException {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_CyberRead_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllHelpCenter");

            spq.execute();

            java.util.List<Object[]> resultList = spq.getResultList();
            java.util.List<Helpcenter> helpcenterList = new ArrayList<>();

            for(Object[] result : resultList) {
                String question = (String) result[0];
                String answer = (String) result[1];

                Helpcenter h = new Helpcenter(question, answer);
                helpcenterList.add(h);
            }

            return helpcenterList;
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
            throw new HelpCenterException("Error in getAllHelpcenter");
        } finally {
            em.clear();
            em.close();
            emf.close();
        }

    }
    
}
