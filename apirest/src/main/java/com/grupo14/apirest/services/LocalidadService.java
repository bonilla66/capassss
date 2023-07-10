package com.grupo14.apirest.services;

import java.util.List;
import java.util.UUID;

import com.grupo14.apirest.models.dtos.SaveLocalidadDTO;
import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Localidad;

public interface LocalidadService {

	void save(SaveLocalidadDTO info, Evento evento);
	List<Localidad> getAll();
	
	List<Localidad> getAllById_evento(UUID id);
	
	Localidad findById(UUID id);
}
