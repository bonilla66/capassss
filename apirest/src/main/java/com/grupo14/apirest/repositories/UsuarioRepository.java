package com.grupo14.apirest.repositories;

import java.util.UUID;

import org.springframework.data.repository.ListCrudRepository;

import com.grupo14.apirest.models.entities.Usuario;

public interface UsuarioRepository extends ListCrudRepository<Usuario, UUID>{

	Usuario findByUsuario(String username);
	
	Usuario findOneByEmail(String email);
	
}
