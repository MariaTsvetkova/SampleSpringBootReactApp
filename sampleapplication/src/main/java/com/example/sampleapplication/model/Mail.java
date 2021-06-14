package com.example.sampleapplication.model;

import javax.persistence.*;

@Entity
@Table(name = "mails")
public class Mail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "address")
    private String address;

    @Column(name = "subject")
    private String subject;

    @Column(name = "message")
    private String message;

    public Mail() {

    }

    public Mail(String address, String subject, String message) {
        this.address = address;
        this.subject = subject;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Mail [id=" + id + ", address=" + address + ", subject=" + subject + ", message=" + message + "]";
    }
}
