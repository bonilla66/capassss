package com.grupo14.apirest.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class EmailDTO {

	@NotEmpty
	private String toUser;
	
	@NotEmpty
	private String subject;
	
	@NotEmpty
	private String code;
	
}
