package com.example.sampleapplication.schedule;

import com.example.sampleapplication.model.Mail;
import com.example.sampleapplication.repository.MailRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Autowired
    MailSendingService mailSendingService;

    @Autowired
    MailRepository mailRepository;

    @Scheduled(cron = "0 0 0/1 * * ?")
    //@Scheduled(fixedRate = 100000)
    public void reportCurrentTime() {
        log.info("emails are sent out :: Execution Time - {}", dateFormat.format(LocalDateTime.now()));
        try {
            this.sendMailsOut();
        } catch (Exception e) {
            log.info("There is error during mailSchedule running ::  - {}", e);
        }
    }

    public void sendMailsOut() throws Exception {
        log.info("Spring Mail - Sending mails");
        List<Mail> mailList = mailRepository.findAll();
        mailList.forEach(mail -> {
            mailSendingService.sendSimpleMessage(mail);
            mailRepository.deleteById(mail.getId());
        });
    }
}
