package com.grupo14.apirest.services;

import java.util.List;
import java.util.UUID;

import com.grupo14.apirest.models.entities.Ubicacion;

public interface UbicacionService {

	void save(String nombre);
	Ubicacion findOneByName(String nombre);
	List<Ubicacion> allCategories();
	
	Ubicacion findById(UUID id);
	
}
