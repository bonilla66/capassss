package com.grupo14.apirest.services;

import java.util.List;
import java.util.UUID;

import com.grupo14.apirest.models.dtos.SaveEventoDTO;
import com.grupo14.apirest.models.dtos.SavePatrocinadoresDTO;
import com.grupo14.apirest.models.entities.Evento;

public interface EventoService {

	void save(SaveEventoDTO info) throws Exception;
	Evento findById(UUID id);
	List<Evento> getAll();
	
	void save(Evento evento);
	
	Evento findByArtista(String artista);
	
	void deleteEvento(UUID id);
	
}
