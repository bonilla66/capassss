package com.grupo14.apirest.services;

public interface EmailService {

	void sendEmail(String toUser, String subjuct, String message);
	
}
