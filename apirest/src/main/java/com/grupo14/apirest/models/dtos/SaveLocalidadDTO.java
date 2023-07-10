package com.grupo14.apirest.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SaveLocalidadDTO {

	@NotEmpty
	private String nombre;
	
	@NotEmpty
	private Integer capacidad;
	
	@NotEmpty
	private Double precio;
	
	@NotEmpty
	private String artista;
	
}
