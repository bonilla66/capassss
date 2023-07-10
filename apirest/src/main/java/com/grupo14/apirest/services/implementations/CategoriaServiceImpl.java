package com.grupo14.apirest.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.entities.Categoria;
import com.grupo14.apirest.repositories.CategoryRepository;
import com.grupo14.apirest.services.CategoriaService;

@Service
public class CategoriaServiceImpl implements CategoriaService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public void save(String nombre) {
		
		Categoria categoria = new Categoria(); //TODO: Validar que no se dupliquen
		
		categoria.setNombre(nombre);
		
		categoryRepository.save(categoria);
		
	}

	@Override
	public List<Categoria> allCategories() {
		
		return categoryRepository.findAll();
		
	}

	@Override
	public Categoria findOneByName(String nombre) {
		
		return categoryRepository.findOneByNombre(nombre);
	}

	@Override
	public Categoria findById(UUID id) {
		return categoryRepository.findById(id).orElse(null);
	}

}
