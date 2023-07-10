package com.grupo14.apirest.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.dtos.MessageDTO;
import com.grupo14.apirest.models.dtos.SaveLocalidadDTO;
import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Localidad;
import com.grupo14.apirest.services.EventoService;
import com.grupo14.apirest.services.LocalidadService;

@RestController
@RequestMapping("/localidad")
public class LocalidadController {

	@Autowired
	private LocalidadService localidadService;
	
	@Autowired
	private EventoService eventoService;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveLocalidad(@RequestBody SaveLocalidadDTO info){
		
		Evento evento = eventoService.findByArtista(info.getArtista()); //TODO: Hacer que el nombre del artista no pueda repetirse
		
		if(evento != null) {
			localidadService.save(info, evento);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		
		return new ResponseEntity<>(new MessageDTO("Internal Server Error"), HttpStatus.NOT_FOUND);
	}
	
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(){
		
		List<Localidad> localidades = localidadService.getAll();
		
		return new ResponseEntity<>(localidades, HttpStatus.OK);
		
	}
	
	@GetMapping("/all/")
	public ResponseEntity<?> getAllLocalidadesById(@RequestParam("id") String id){
		
		UUID uuid = UUID.fromString(id);
		
		try {
			List<Localidad> localidades = localidadService.getAllById_evento(uuid);
			
			/*List<Localidad> misLocalidadesList = new ArrayList<>();
			
			localidades.forEach(elemento -> {
				if (elemento.getId() == uuid) {
					misLocalidadesList.add(elemento);
				}
			});*/
			
			return new ResponseEntity<>(localidades, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
}
