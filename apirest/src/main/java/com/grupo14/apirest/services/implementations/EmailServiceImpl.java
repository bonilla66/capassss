package com.grupo14.apirest.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService{

	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	public void sendEmail(String toUser, String subject, String message) {
		
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		
		mailMessage.setFrom("smungcapas@gmail.com");
		mailMessage.setTo(toUser);
		mailMessage.setSubject(subject);
		mailMessage.setText("El codigo de transferencia es: " + message);
		
		mailSender.send(mailMessage);
		
	}

}
