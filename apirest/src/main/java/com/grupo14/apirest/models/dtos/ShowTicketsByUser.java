package com.grupo14.apirest.models.dtos;

import java.util.UUID;

import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Localidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowTicketsByUser {

	private UUID id_ticket;
	
	private Localidad localidad;
	
	private Evento evento;
	
}
