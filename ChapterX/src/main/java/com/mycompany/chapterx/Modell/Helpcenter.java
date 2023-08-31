/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.chapterx.Modell;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.Serializable;
import java.sql.ResultSet;
import javax.persistence.*;
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
        return "com.mycompany.chapterx.Modell.Helpcenter[ id=" + id + " ]";
    }





    // ----- MY PROCEDURES -----

    public static String getAllHelpcenter() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.mycompany_ChapterX_war_1.0-SNAPSHOTPU");
        EntityManager em = emf.createEntityManager();

        JSONArray jsonArray = new JSONArray();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllHelpCenter");

            spq.execute();

            ResultSet resultSet = (ResultSet) spq.getOutputParameterValue(1);

            while (resultSet.next()) {
                String question = resultSet.getString("question");
                String answer = resultSet.getString("answer");

                JSONObject helpCenterJson = new JSONObject();
                helpCenterJson.put("question", question);
                helpCenterJson.put("answer", answer);

                jsonArray.put(helpCenterJson);
            }

        } catch(Exception ex) {
            System.err.println(ex.getMessage());
        } finally {
            em.clear();
            em.close();
            emf.close();
        }

        return jsonArray.toString();
    }

}
