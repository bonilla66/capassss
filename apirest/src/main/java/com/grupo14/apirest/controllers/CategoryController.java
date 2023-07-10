package com.grupo14.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.dtos.SaveCategoria;
import com.grupo14.apirest.models.entities.Categoria;
import com.grupo14.apirest.services.CategoriaService;

@RestController
@RequestMapping("/categoria")
public class CategoryController {

	@Autowired
	private CategoriaService categoriaService;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveCategory(@RequestBody SaveCategoria saveCategoria) {
		
		String nombre = saveCategoria.getNombre();
		categoriaService.save(nombre);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(){
		
		List<Categoria> categories = categoriaService.allCategories();
		
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}
	
}
