package com.example.sampleapplication;

import com.example.sampleapplication.model.Mail;
import com.example.sampleapplication.repository.MailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SampleapplicationApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SampleapplicationApplication.class, args);
	}

	@Autowired
	MailRepository mailRepository;


	@Override
	public void run(String...args) throws Exception {
		this.mailRepository.save(new Mail("testmail1@gmail.com", "test subject1", "some message1"));
		this.mailRepository.save(new Mail("testmail2@gmail.com", "test subject2", "some message2"));
		this.mailRepository.save(new Mail( "testmail3@gmail.com", "test subject3", "some message3"));
	}

}
