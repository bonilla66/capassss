package com.grupo14.apirest.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo14.apirest.models.dtos.SaveEventoDTO;
import com.grupo14.apirest.models.dtos.SavePatrocinadoresDTO;
import com.grupo14.apirest.models.dtos.ShowEventoDTO;
import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.services.EventoService;


@RestController
@RequestMapping("/eventos")
public class EventoController {

	@Autowired
	private EventoService eventoService;
	
	@PostMapping("/save")
	public ResponseEntity<?> saveEvento(@RequestBody SaveEventoDTO info) {
		
		try {
			eventoService.save(info);
			
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping("/save/patrocinadores")
	public ResponseEntity<?> saveEvento(@RequestBody SavePatrocinadoresDTO info) {
		
		try {
			
			Evento evento = eventoService.findByArtista(info.getArtista());
			
			if (evento==null) {
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
			}
			
			evento.setPatrocinadores(info.getPatrocinadores());
			evento.setImagenlocalidades(info.getImagenlocalidades());
			
			eventoService.save(evento);
			
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAll(){
		
		List<Evento> eventos = eventoService.getAll();
		
		List<ShowEventoDTO> eventosDTO = new ArrayList<>();
		
		eventos.forEach(e -> {
			ShowEventoDTO eventoDTO = new ShowEventoDTO();
			
			eventoDTO.setId(e.getId());
			eventoDTO.setArtista(e.getArtista());
			
			SimpleDateFormat fecha = new SimpleDateFormat("dd-MM-yyyy");
			String fechaFormat = fecha.format(e.getFecha());
			
			eventoDTO.setFecha(fechaFormat);
			eventoDTO.setImagen(e.getImagen());
			eventoDTO.setUbicacion(e.getUbicacion().getNombre());
			
			eventosDTO.add(eventoDTO);
		});
		
		return new ResponseEntity<>(eventosDTO, HttpStatus.OK);
	}
	
	@GetMapping("/one")
	public ResponseEntity<?> eventoByArtista(@RequestParam("artista") String artista) {
		
		Evento evento = eventoService.findByArtista(artista);
		
		if(evento==null) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(evento, HttpStatus.OK);
		
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> eliminarEvento(@RequestParam("id") String id){

		try {
			UUID idEvento = UUID.fromString(id);
			
			eventoService.deleteEvento(idEvento);
			
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
}
