package com.grupo14.apirest.services.implementations;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.dtos.SaveEventoDTO;
import com.grupo14.apirest.models.entities.Categoria;
import com.grupo14.apirest.models.entities.Evento;
import com.grupo14.apirest.models.entities.Ubicacion;
import com.grupo14.apirest.repositories.EventoRepository;
import com.grupo14.apirest.services.CategoriaService;
import com.grupo14.apirest.services.EventoService;
import com.grupo14.apirest.services.UbicacionService;

import jakarta.transaction.Transactional;

@Service
public class EventoServiceImpl implements EventoService{

	@Autowired
	private EventoRepository eventoRepository;
	
	@Autowired
	private CategoriaService categoriaService;
	
	@Autowired
	private UbicacionService ubicacionService;
	
	@Override
	@Transactional(rollbackOn = Exception.class)
	public void save(SaveEventoDTO info) throws Exception{
		
		UUID categoriaUuid = UUID.fromString(info.getCategoria());
		UUID ubicacionUuid = UUID.fromString(info.getUbicacion()); 
		
		Categoria categoria = categoriaService.findById(categoriaUuid);
		if (categoria==null) {
			throw new Exception();
		}
		
		Ubicacion ubicacion = ubicacionService.findById(ubicacionUuid);
		if (ubicacion==null) {
			throw new Exception();
		}
		
		try {
			Evento newEvento = new Evento();
			
			newEvento.setArtista(info.getArtista());
			
			//SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
			//Date dateFormateado = formato.parse(info.getFecha());
			newEvento.setFecha(info.getFecha());
			
			newEvento.setHora(info.getHora());
			newEvento.setDuracion(info.getDuracion());
			newEvento.setImagen(info.getImagen());
			newEvento.setUbicacion(ubicacion);
			newEvento.setCategoria(categoria);
			
			
			eventoRepository.save(newEvento);
		} catch (Exception e) {
			throw new Exception();
		}
		
	}

	@Override
	public Evento findById(UUID id) {
		return eventoRepository.findById(id).orElse(null);
	}

	@Override
	public List<Evento> getAll() {
		return eventoRepository.findAll();
	}

	@Override
	public Evento findByArtista(String artista) {
		return eventoRepository.findByArtista(artista);
	}

	@Override
	public void save(Evento evento) {
		eventoRepository.save(evento);
		
	}

	@Override
	public void deleteEvento(UUID id) {
		eventoRepository.deleteById(id);
		
	}
	
	
}
