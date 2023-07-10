package com.grupo14.apirest.services;

import java.util.List;
import java.util.UUID;

import com.grupo14.apirest.models.entities.Localidad;
import com.grupo14.apirest.models.entities.Ticket;
import com.grupo14.apirest.models.entities.Usuario;

public interface TicketService {

	void save(Usuario usuario, Localidad localidad);
	
	List<Ticket> findAllByUsuario(Usuario usuario);
	
	Ticket findById(UUID id);
	
	void save(Ticket ticket);
	
}
