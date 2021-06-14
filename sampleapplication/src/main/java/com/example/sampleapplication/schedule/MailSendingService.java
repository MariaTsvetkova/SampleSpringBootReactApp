package com.example.sampleapplication.schedule;

import com.example.sampleapplication.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class MailSendingService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendSimpleMessage(
            Mail mail) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@memorynotfound.com");
        message.setTo(mail.getAddress());
        message.setSubject(mail.getSubject());
        message.setText(mail.getMessage());
        javaMailSender.send(message);
    }
}
