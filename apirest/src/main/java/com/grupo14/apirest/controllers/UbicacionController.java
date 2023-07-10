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

import com.grupo14.apirest.models.dtos.SaveUbicacion;
import com.grupo14.apirest.models.entities.Ubicacion;
import com.grupo14.apirest.services.UbicacionService;

@RestController
@RequestMapping("/ubicacion")
public class UbicacionController {

	@Autowired
	private UbicacionService ubicacionService;
	
	
	@PostMapping("/save")
	public ResponseEntity<?> saveUbicacion(@RequestBody SaveUbicacion saveUbicacion) {
		
		String nombre = saveUbicacion.getNombre();
		
		ubicacionService.save(nombre);
		
		return new ResponseEntity<>("Guardao", HttpStatus.OK);
		
	}
	
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(){
		
		List<Ubicacion> ubicaciones = ubicacionService.allCategories();
		
		return new ResponseEntity<>(ubicaciones, HttpStatus.OK);
	}
	
}
