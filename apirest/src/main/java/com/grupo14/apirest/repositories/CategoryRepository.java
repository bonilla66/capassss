package com.grupo14.apirest.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Categoria;

public interface CategoryRepository 
				extends ListCrudRepository<Categoria, UUID> {

	Categoria findOneByNombre(String nombre);
	
}
