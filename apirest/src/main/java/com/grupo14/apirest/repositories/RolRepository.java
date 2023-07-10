package com.grupo14.apirest.repositories;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Rol;

public interface RolRepository extends ListCrudRepository<Rol, Integer> {

	Rol findByNombre(String nombre);
	
}
