package com.bookstore.paymentservice.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.mail.internet.MimeMessage;
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

    public void sendStripeOnboardingEmail(String toEmail, String storeName, String onboardingLink) {

        String subject = "Complete Your Payment Setup to Start Receiving Payments";

        String body = """
            <html>
            <body style="font-family: Arial, sans-serif; color: #333;">

                <h2 style="color: #4CAF50;">You're Almost Ready to Get Paid 🎉</h2>

                <p>Dear <strong>%s</strong>,</p>

                <p>Your store has been successfully created on our platform.</p>

                <p>
                    To start receiving payments from customers, you need to complete your secure payment setup.
                    This is handled through our trusted payment partner and usually takes just a few minutes.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="%s" 
                       style="background-color: #4CAF50; color: white; padding: 14px 24px; 
                              text-decoration: none; border-radius: 4px; font-size: 16px;">
                        Complete Payment Setup
                    </a>
                </div>

                <p>
                    🔒 During setup, you may be asked to provide:
                    <ul>
                        <li>Business or personal details</li>
                        <li>Identity verification documents</li>
                        <li>Bank account information for payouts</li>
                    </ul>
                </p>

                <p>
                    ⏳ <strong>Note:</strong> This link is time-sensitive. If it expires, you can request a new one from your dashboard.
                </p>

                <p>
                    Once completed, your account will be reviewed and activated so you can start accepting payments.
                </p>

                <br>

                <p>Best regards,<br>Online Bookstore Platform Team</p>

            </body>
            </html>
            """.formatted(storeName, onboardingLink);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
            log.info("Stripe onboarding email sent to: {}", toEmail);

        } catch (MessagingException e) {
            log.error("Failed to send Stripe onboarding email to: {}", toEmail, e);
        }
    }

}
