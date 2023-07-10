package com.grupo14.apirest.models.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowEventoDTO {

	private UUID id;
	
	private String artista;
	
	private String fecha;
	
	private String ubicacion;
	
	private String imagen;
	
}
