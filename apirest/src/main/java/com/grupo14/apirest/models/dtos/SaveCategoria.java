package com.grupo14.apirest.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SaveCategoria {

	@NotEmpty
	private String nombre;
	
}
