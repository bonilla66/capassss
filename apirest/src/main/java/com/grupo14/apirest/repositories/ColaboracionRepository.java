package com.grupo14.apirest.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Colaboracion;

public interface ColaboracionRepository 
				extends ListCrudRepository<Colaboracion, UUID>{

	
	
}
