package com.grupo14.apirest.models.dtos;

import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SaveEventoDTO {
	
	@NotEmpty
	private String artista;

	@NotEmpty
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fecha;
	
	@NotEmpty
	@JsonFormat(pattern = "HH:mm")
	private LocalTime hora;
	
	@NotEmpty
	@JsonFormat(pattern = "HH:mm")
	private LocalTime duracion;
	
	@NotEmpty
	private String imagen;
	
	@NotEmpty
	private String ubicacion;
	
	@NotEmpty
	private String categoria;
	
}
