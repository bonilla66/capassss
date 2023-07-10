package com.grupo14.apirest.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.dtos.MessageDTO;
import com.grupo14.apirest.models.dtos.SaveTicketDTO;
import com.grupo14.apirest.models.dtos.ShareTicketDTO;
import com.grupo14.apirest.models.dtos.ShowTicketsByUser;
import com.grupo14.apirest.models.entities.Localidad;
import com.grupo14.apirest.models.entities.Ticket;
import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.services.LocalidadService;
import com.grupo14.apirest.services.TicketService;
import com.grupo14.apirest.services.UserService;


@RestController
@RequestMapping("/ticket")
public class TicketController {

	@Autowired
	private TicketService ticketService;
	
	@Autowired
	private LocalidadService localidadService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/save")
	private ResponseEntity<?> save(@RequestBody SaveTicketDTO info){
		
		try {
			
			UUID id_Localidad = UUID.fromString(info.getIdLocalidad());
			
			Localidad localidad = localidadService.findById(id_Localidad);
			Usuario usuario = userService.findOneByEmail(info.getEmailUsuario());
			
			if(localidad ==  null || usuario==null) {
				return new ResponseEntity<>(new MessageDTO("No se encontro una especificacion"), HttpStatus.NOT_FOUND);
			}
			
			ticketService.save(usuario, localidad);
			
			return new ResponseEntity<>(new MessageDTO("Ticket creado Con exito!!") ,HttpStatus.OK);
		
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/user")
	private ResponseEntity<?> getAllTicket(@RequestParam("email") String email){
		
		Usuario usuario = userService.findOneByEmail(email);
		if (usuario == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		List<Ticket> tickets = ticketService.findAllByUsuario(usuario);
		
		List<ShowTicketsByUser> ticketUser = new ArrayList<>();
		
		tickets.forEach(e -> {
			
			ShowTicketsByUser info = new ShowTicketsByUser();
			
			info.setId_ticket(e.getId());
			info.setLocalidad(e.getLocalidad());
			info.setEvento(e.getLocalidad().getEvento());
			
			ticketUser.add(info);
		});
		
		return new ResponseEntity<>(ticketUser, HttpStatus.OK);	
	}
	
	@PostMapping("/share")
	private ResponseEntity<?> updateTicket(@RequestBody ShareTicketDTO info){
		
		UUID id = UUID.fromString(info.getIdTicket());
		Ticket nuevoTicket = ticketService.findById(id);
		
		Usuario usuario = userService.findOneByEmail(info.getCorreoDestinatario());
		
		if(usuario== null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		nuevoTicket.setUsuario(usuario);
		
		ticketService.save(nuevoTicket);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}











