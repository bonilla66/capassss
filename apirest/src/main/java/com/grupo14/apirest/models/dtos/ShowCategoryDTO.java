package com.grupo14.apirest.models.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowCategoryDTO {

	List<String> categorias;
	
}
