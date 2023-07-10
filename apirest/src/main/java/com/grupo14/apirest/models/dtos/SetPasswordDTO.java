package com.grupo14.apirest.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SetPasswordDTO {

	@NotEmpty
	private String password;
	
	@NotEmpty
	private String email;
	
}
