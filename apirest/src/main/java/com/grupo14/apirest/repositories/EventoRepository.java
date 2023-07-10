package com.grupo14.apirest.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Evento;

public interface EventoRepository extends ListCrudRepository<Evento, UUID>{

	Evento findByArtista(String artista);
	
}
