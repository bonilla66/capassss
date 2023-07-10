package com.grupo14.apirest.services.implementations;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grupo14.apirest.models.dtos.RegisterUserDTO;
import com.grupo14.apirest.models.entities.Rol;
import com.grupo14.apirest.models.entities.Usuario;
import com.grupo14.apirest.repositories.UsuarioRepository;
import com.grupo14.apirest.services.RolService;
import com.grupo14.apirest.services.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private RolService rolService;
	
	@Override
	public void save(RegisterUserDTO info) {
		try {
			Usuario usuario = new Usuario();
			
			Rol rol = rolService.findById(1);
			
			usuario.setUsuario(info.getUsername());
			usuario.setEmail(info.getEmail());
			usuario.setRol(rol);;
			usuario.setTokenGoogle(info.getTokengoogle());
			
			usuarioRepository.save(usuario);
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public Usuario findOneByUsername(String username) {
		return usuarioRepository.findByUsuario(username);
	}

	@Override
	public List<Usuario> all() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario findById(UUID id) {
		return usuarioRepository.findById(id).orElse(null);
	}

	@Override
	public Usuario findOneByEmail(String email) {
		return usuarioRepository.findOneByEmail(email);
	}

	@Override
	public void save(Usuario usuario) {
		
		usuarioRepository.save(usuario);
	}

}
