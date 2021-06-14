package com.example.sampleapplication.repository;

import com.example.sampleapplication.model.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MailRepository extends JpaRepository<Mail, Long> {
    List<Mail> findByAddressContaining(String address);
}
