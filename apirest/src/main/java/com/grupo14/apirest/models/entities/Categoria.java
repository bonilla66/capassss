package com.grupo14.apirest.models.entities;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Table(name = "categoria")
@ToString(exclude = {"eventos"})
@NoArgsConstructor
public class Categoria {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(name = "nombre")
	private String nombre;
	
	@OneToMany(mappedBy = "categoria", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Evento> eventos;
	
}
