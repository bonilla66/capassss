package com.grupo14.apirest.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Localidad;

public interface LocalidadRepository 
				extends ListCrudRepository<Localidad, UUID>{

	List<Localidad> findByEvento(Evento evento);
	
}
