package com.grupo14.apirest.services.implementations;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.entities.Localidad;
import com.grupo14.apirest.models.entities.Ticket;
import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.repositories.TicketRepository;
import com.grupo14.apirest.services.TicketService;

@Service
public class TicketServiceImpl implements TicketService{

	@Autowired
	private TicketRepository ticketRepository;
	
	@Override
	public void save(Usuario usuario, Localidad localidad) {
		
		Ticket ticket = new Ticket();
		
		Date fechaActual = new Date();
		
		ticket.setFecha_adquirido(fechaActual);
		ticket.setLocalidad(localidad);
		ticket.setUsuario(usuario);
		
		ticketRepository.save(ticket);
		
	}

	@Override
	public List<Ticket> findAllByUsuario(Usuario usuario) {
		return ticketRepository.findByUsuario(usuario);
	}

	@Override
	public Ticket findById(UUID id) {
		return ticketRepository.findById(id).orElse(null);
	}

	@Override
	public void save(Ticket ticket) {
		ticketRepository.save(ticket);
	}
	

}
