package com.grupo14.apirest.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SavePatrocinadoresDTO {

	@NotEmpty
	private String artista;
	
	@NotEmpty
	private String patrocinadores; 
	
	private String imagenlocalidades;
	
}
