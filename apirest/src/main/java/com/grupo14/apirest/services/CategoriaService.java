package com.grupo14.apirest.services;

import java.util.List;
import java.util.UUID;

import com.grupo14.apirest.models.entities.Categoria;

public interface CategoriaService {

	void save(String nombre);
	List<Categoria> allCategories();
	Categoria findOneByName(String nombre);
	Categoria findById(UUID id);
}
