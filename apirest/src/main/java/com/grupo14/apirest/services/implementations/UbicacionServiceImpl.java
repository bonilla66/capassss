package com.grupo14.apirest.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.entities.Ubicacion;
import com.grupo14.apirest.repositories.UbicacionRepository;
import com.grupo14.apirest.services.UbicacionService;

@Service
public class UbicacionServiceImpl implements UbicacionService{

	@Autowired
	private UbicacionRepository ubicacionRepository;
	
	@Override
	public void save(String nombre) {
		
		Ubicacion ubicacion = new Ubicacion();
		
		ubicacion.setNombre(nombre);
		
		ubicacionRepository.save(ubicacion);
		
	}

	@Override
	public Ubicacion findOneByName(String nombre) {
		return ubicacionRepository.findOneByNombre(nombre);
	}

	@Override
	public List<Ubicacion> allCategories() {
		return ubicacionRepository.findAll();
	}

	@Override
	public Ubicacion findById(UUID id) {
		return ubicacionRepository.findById(id).orElse(null);
	}
	
}
