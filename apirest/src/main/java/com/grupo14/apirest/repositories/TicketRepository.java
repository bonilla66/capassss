package com.grupo14.apirest.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Ticket;
import com.grupo14.apirest.models.entities.Usuario;

public interface TicketRepository 
			extends ListCrudRepository<Ticket, UUID>{

	List<Ticket> findByUsuario(Usuario usuario);
	
}
