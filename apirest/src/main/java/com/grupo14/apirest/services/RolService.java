package com.grupo14.apirest.services;

import java.util.List;

import com.grupo14.apirest.models.entities.Rol;
import com.grupo14.apirest.models.entities.Usuario;

public interface RolService {

	List<Usuario> findByNombre(String nombre);
	
	Rol findById(Integer id);
	
}
