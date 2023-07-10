package com.grupo14.apirest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.dtos.EmailDTO;
import com.grupo14.apirest.services.EmailService;

@RestController
@RequestMapping("/mail")
public class MailController {
	
	@Autowired
	private EmailService emailService;

	@PostMapping("/send")
	public ResponseEntity<?> receiveRequestEmail(@RequestBody EmailDTO emailDTO){
		
		emailService.sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getCode());
		
		//Validar si hubo un problema
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
}
