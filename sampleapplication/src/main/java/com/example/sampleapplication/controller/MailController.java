package com.example.sampleapplication.controller;


import com.example.sampleapplication.model.Mail;
import com.example.sampleapplication.repository.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MailController {

    @Autowired
    MailRepository mailRepository;

    @GetMapping("/mails")
    public ResponseEntity<List<Mail>> getAllMails(@RequestParam(required = false) String address) {
        try {
            List<Mail> mails = new ArrayList<>();

            if (address == null)
                mailRepository.findAll().forEach(mails::add);
            else
                mailRepository.findByAddressContaining(address).forEach(mails::add);

            if (mails.isEmpty()) {
                return new ResponseEntity<>(Collections.EMPTY_LIST, HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(mails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/mails/{id}")
    public ResponseEntity<Mail> getMailById(@PathVariable("id") long id) {
        Optional<Mail> mailData = mailRepository.findById(id);

        if (mailData.isPresent()) {
            return new ResponseEntity<>(mailData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/mails")
    public ResponseEntity<Mail> createMail(@RequestBody Mail mail) {
        try {
            Mail _mail = mailRepository
                    .save(new Mail(mail.getAddress(), mail.getSubject(), mail.getMessage()));
            return new ResponseEntity<>(_mail, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/mails/{id}")
    public ResponseEntity<Mail> updateMail(@PathVariable("id") long id, @RequestBody Mail mail) {
        Optional<Mail> mailData = mailRepository.findById(id);

        if (mailData.isPresent()) {
            Mail _mail = mailData.get();
            _mail.setAddress(mail.getAddress());
            _mail.setSubject(mail.getSubject());
            _mail.setMessage(mail.getMessage());
            return new ResponseEntity<>(mailRepository.save(_mail), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/mails/{id}")
    public ResponseEntity<HttpStatus> deleteMail(@PathVariable("id") long id) {
        try {
            mailRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/mails")
    public ResponseEntity<HttpStatus> deleteAllMails() {
        try {
            mailRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
