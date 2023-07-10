package com.grupo14.apirest.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Ubicacion;

public interface UbicacionRepository 
			extends ListCrudRepository<Ubicacion, UUID>{

	Ubicacion findOneByNombre(String nombre);
	
}
