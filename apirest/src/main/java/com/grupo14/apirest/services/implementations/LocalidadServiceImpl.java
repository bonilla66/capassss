package com.grupo14.apirest.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.dtos.SaveLocalidadDTO;
import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Localidad;
import com.grupo14.apirest.repositories.EventoRepository;
import com.grupo14.apirest.repositories.LocalidadRepository;
import com.grupo14.apirest.services.LocalidadService;

import jakarta.transaction.Transactional;

@Service
public class LocalidadServiceImpl implements LocalidadService {

	@Autowired
	private LocalidadRepository localidadRepository;
	
	@Autowired
	private EventoRepository eventoRepository;
	
	@Override
	@Transactional
	public void save(SaveLocalidadDTO info, Evento evento) {
		
		try {
			Localidad localidad = new Localidad();
			
			localidad.setNombre(info.getNombre());
			localidad.setPrecio(info.getPrecio());
			localidad.setCapacidad(info.getCapacidad());
			localidad.setEvento(evento);
			
			
			localidadRepository.save(localidad);;
			
		} catch (Exception e) {
			throw e;
		}
		
	}

	@Override
	public List<Localidad> getAll() {
		return localidadRepository.findAll();
	}

	@Override
	public List<Localidad> getAllById_evento(UUID id) {
		
		Evento evento = eventoRepository.findById(id).orElse(null);
		
		return localidadRepository.findByEvento(evento);
	}

	@Override
	public Localidad findById(UUID id) {
		return localidadRepository.findById(id).orElse(null);
	}

}
