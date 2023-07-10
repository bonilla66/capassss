package com.grupo14.apirest.services.implementations;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.entities.Colaboracion;
import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.repositories.ColaboracionRepository;
import com.grupo14.apirest.services.ColaboracionService;
import com.grupo14.apirest.services.EventoService;
import com.grupo14.apirest.services.UserService;

@Service
public class ColaboracionServiceImpl implements ColaboracionService{

	@Autowired
	private EventoService eventoService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ColaboracionRepository colaboracionRepository;
	
	@Override
	public void save(UUID id_evento, UUID id_usuario) throws Exception {
		
		Evento evento = eventoService.findById(id_evento);
		if (evento==null) {
			throw new Exception();
		}
		
		Usuario usuario = userService.findById(id_usuario);
		if (usuario==null) {
			throw new Exception();
		}
		
		try {
			Colaboracion colaboracion = new Colaboracion();
			
			colaboracion.setEvento(evento);
			//colaboracion.setUsuario(usuario);
			
			colaboracionRepository.save(colaboracion);
			
		} catch (Exception e) {
			throw e;
		}
		
	}

}
