package com.grupo14.apirest.services;

import java.util.List;
import java.util.UUID;

import com.grupo14.apirest.models.dtos.RegisterUserDTO;
import com.grupo14.apirest.models.entities.Usuario;

public interface UserService {

	void save(RegisterUserDTO user) throws Exception;

	void save(Usuario usuario);
	
	Usuario findOneByEmail(String email);
	
	Usuario findOneByUsername(String username);
	Usuario findById(UUID id);
	List<Usuario> all();
	
}
