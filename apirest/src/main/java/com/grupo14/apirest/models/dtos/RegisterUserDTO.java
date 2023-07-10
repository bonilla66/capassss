package com.grupo14.apirest.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegisterUserDTO {

	
	@NotEmpty(message = "Ingrese un username")
	private String username;
	
	@NotEmpty(message = "Debe ingresar un correo")
	@Pattern(regexp = "^[^@]+@[^@]+\\.[a-zA-Z]{2,}$", message = "Correo Invalido")
	private String email;
	
	@NotEmpty
	private String tokengoogle;
	/*
	@NotEmpty(message = "Debe ingresar una contraseña")
	@Size(min = 8, message = "La contrraseña debe tener como minimo 8 Caracteres")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).+$", 
				message = "La cadena debe contener al menos 1 Mayuscula, 1 caracter especial, una minuscula y un numero")
	private String password;*/
	
}
