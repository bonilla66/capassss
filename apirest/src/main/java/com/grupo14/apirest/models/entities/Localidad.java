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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Table(name = "localidad")
@Entity
@ToString(exclude = {"tickets"})
@NoArgsConstructor
public class Localidad {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(name = "nombre")
	private String nombre;
	
	@Column(name = "capacidad")
	private Integer capacidad;
	
	@Column(name = "precio")
	private Double precio;
	
	@OneToMany(mappedBy = "localidad", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Ticket> tickets;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_evento", nullable = false)
	@JsonIgnore
	private Evento evento;

	public Localidad(String nombre, Integer capacidad, Double precio, Evento evento) {
		super();
		this.nombre = nombre;
		this.capacidad = capacidad;
		this.precio = precio;
		this.evento = evento;
	}
	
}
