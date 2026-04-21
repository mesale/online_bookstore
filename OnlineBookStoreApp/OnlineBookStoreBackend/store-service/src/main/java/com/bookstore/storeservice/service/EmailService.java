package com.bookstore.storeservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendCompleteProfileEmail(String toEmail, String storeName) {
        String completionLink = frontendUrl + "/complete-profile";
        String subject = "Action Required: Complete Your Store Profile";

        String body = """
                <html>
                <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Congratulations!</h2>
                    <p>Dear <strong>%s</strong>,</p>
                    <p>Your store has been successfully created on our platform.</p>
                    <p>To start listing books and receiving payments, you must complete your business profile and upload your identity documents for verification.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="%s" 
                           style="background-color: #4CAF50; color: white; padding: 14px 24px; 
                                  text-decoration: none; border-radius: 4px; font-size: 16px;">
                            Complete Store Profile
                        </a>
                    </div>
                    <p>Once submitted, our team will review your documents within 24-48 hours.</p>
                    <br>
                    <p>Best regards,<br>Online Bookstore Platform Team</p>
                </body>
                </html>
                """.formatted(storeName, completionLink);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
            log.info("Completion Profile Mail sent to: {}", toEmail);
        } catch (MessagingException e) {
            log.error("Failed to send Completion Email to: {}", toEmail, e);
            // We log but don't throw to prevent transaction rollback
        }
    }
}