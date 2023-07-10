package com.grupo14.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.dtos.LoginDTO;
import com.grupo14.apirest.models.dtos.MessageDTO;
import com.grupo14.apirest.models.dtos.RegisterUserDTO;
import com.grupo14.apirest.models.dtos.SetPasswordDTO;
import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.services.UserService;
import com.grupo14.apirest.utils.RequestErrorHandler;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private RequestErrorHandler errorHandler;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO info, BindingResult validations){
		
		try {
			
			Usuario usuario = userService.findOneByEmail(info.getEmail());
			
			if (usuario==null) {
				return new ResponseEntity<>(new MessageDTO("Usuario no encontrado"), HttpStatus.NOT_FOUND);
			}
			
			if(usuario.getPassword().equals(info.getPassword())) {
				return new ResponseEntity<>(usuario.getTokenGoogle(), HttpStatus.OK);
			}
			return new ResponseEntity<>(new MessageDTO("No tienes permiso zorra"), HttpStatus.UNAUTHORIZED);
			
			
		} catch (Exception e) {
			return new ResponseEntity<>(new MessageDTO("Ha sucedido un error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Valid RegisterUserDTO info, BindingResult validations){
		if (validations.hasErrors()) {
			return new ResponseEntity<>(
					errorHandler.mapErrors(validations.getFieldErrors()),
					HttpStatus.BAD_REQUEST);
		}
		
		try {
			/*Usuario usuario = userService.findOneByEmail(info.getUsername());
			
			if (usuario!=null) {
				return new ResponseEntity<>( new MessageDTO("Usuario ya existente"), HttpStatus.CONFLICT);
			}*/
			
			userService.save(info);
			return new ResponseEntity<>( new MessageDTO("Usuario creado con exito"), HttpStatus.CREATED);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new MessageDTO("Ha sucedido un Error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping("/register/password")
	public ResponseEntity<?> savePassword(@RequestBody SetPasswordDTO info){
		
		try {
			Usuario usuario = userService.findOneByEmail(info.getEmail());
			
			if (usuario==null) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			usuario.setPassword(info.getPassword());
			
			userService.save(usuario);
			
			return new ResponseEntity<>(new MessageDTO("Contraseña Guardada"), HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/email")
	public boolean findUserByEmail(@RequestParam("email") String email) throws Exception{
		
		try {
			Usuario usuario = userService.findOneByEmail(email);
			
			if (usuario==null) {
				return false;
			}else {
				return true;
			}
		} catch (Exception e) {
			return false;
		}
		
	}
	
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(){
		
		List<Usuario> usuarios = userService.all();
		return new ResponseEntity<>(usuarios, HttpStatus.OK);
	}
	
	
}
