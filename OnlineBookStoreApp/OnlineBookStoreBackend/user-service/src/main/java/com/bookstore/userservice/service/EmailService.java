package com.bookstore.userservice.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.util.encoders.UTF8;
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

    public void sendStoreApplicationEmail(String toEmail, String applicantName, String token){

        String applicationLink = frontendUrl + "/store-application?token=" + token;

        String subject ="Complete Your Bookstore Application";

        String body = """
                
                            <html>
                            <body style="font-family: Arial, sans-serif; color: #333;">
                                <h2>Welcome to the Online Bookstore Platform</h2>
                                <p>Dear %s,</p>
                                <p>Thank you for your interest in becoming a store on our platform.</p>
                                <p>Please click the button below to complete your store registration form.
                                   This link will expire in <strong>48 hours</strong>.</p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="%s"
                                       style="background-color: #4CAF50; color: white; padding: 14px 24px;
                                              text-decoration: none; border-radius: 4px; font-size: 16px;">
                                        Complete Registration
                                    </a>
                                </div>
                                <p>Or copy and paste this link into your browser:</p>
                                <p><a href="%s">%s</a></p>
                                <p>If you did not request this, please ignore this email.</p>
                                <br>
                                <p>Best regards,<br>Online Bookstore Platform Team</p>
                            </body>
                            </html>
                
                """.formatted(applicantName, applicationLink, applicationLink, applicationLink);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message, true, "UTF-8"
            );
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
            log.info("Store Application Mail sent to: {}", toEmail);
        }catch (MessagingException e){
            log.error("Failed to send Store Application Email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send Application email " + e.getMessage());
        }

    }

}
