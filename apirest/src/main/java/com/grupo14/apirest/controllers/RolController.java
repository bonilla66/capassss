package com.grupo14.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.services.RolService;
import com.grupo14.apirest.services.UserService;

@RestController
@RequestMapping("/rol")
public class RolController {

	@Autowired
	private RolService rolService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public ResponseEntity<?> getAllByEntityUser(@RequestParam String rol){
	
		try {
			List<Usuario> usuarios = rolService.findByNombre(rol);
			
			return new ResponseEntity<>(usuarios, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/user")
	public ResponseEntity<?> getRolByUser(@RequestParam("email") String email){
		
		
		Usuario usuario = userService.findOneByEmail(email);
		
		if (usuario==null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(usuario.getRol() ,HttpStatus.OK);
		
	}
	
}
