package com.grupo14.apirest.services;

import java.util.UUID;

public interface ColaboracionService {

	void save(UUID id_evento, UUID id_usuario) throws Exception;
	
}
