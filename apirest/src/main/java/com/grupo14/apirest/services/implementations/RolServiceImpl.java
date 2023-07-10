package com.grupo14.apirest.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.entities.Rol;
import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.repositories.RolRepository;
import com.grupo14.apirest.services.RolService;

@Service
public class RolServiceImpl implements RolService{

	@Autowired
	private RolRepository rolRepository;
	
	@Override
	public List<Usuario> findByNombre(String nombre) {
		
		Rol rol = rolRepository.findByNombre(nombre);
		
		List<Usuario> usuarios = rol.getUsuarios();
		
		return usuarios;
	}

	@Override
	public Rol findById(Integer id) {
		return rolRepository.findById(id).orElse(null);
	}

}
