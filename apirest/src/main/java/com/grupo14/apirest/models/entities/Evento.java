package com.grupo14.apirest.models.entities;

import java.time.LocalTime;
import java.util.Date;
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
@Entity
@Table(name = "evento")
@NoArgsConstructor
@ToString(exclude = {"localidades","colaboradores"})
public class Evento {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(name = "artista")
	private String artista;
	
	@OneToMany(mappedBy = "evento", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Localidad> localidades;

	@Column(name = "fecha")
	private Date fecha;
	
	@Column(name = "hora")
	private LocalTime hora;
	
	@Column(name = "duracion")
	private LocalTime duracion;
	
	@Column(name = "patrocinadores")
	private String patrocinadores;
	
	@Column(name = "imagen")
	private String imagen;
	
	@Column(name = "imagenlocalidades")
	private String imagenlocalidades;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_ubicacion", nullable = false)
	private Ubicacion ubicacion;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_categoria", nullable = false)
	private Categoria categoria;
	
	@OneToMany(mappedBy = "evento", fetch = FetchType.LAZY)
	private List<Colaboracion> colaboradores;

	public Evento(String artista, Date fecha, LocalTime hora, LocalTime duracion, String patrocinadores, String imagen, Ubicacion ubicacion,
			Categoria categoria) {
		super();
		this.artista = artista;
		this.fecha = fecha;
		this.hora = hora;
		this.duracion = duracion;
		this.patrocinadores = patrocinadores;
		this.imagen = imagen;
		this.ubicacion = ubicacion;
		this.categoria = categoria;
	}
	
	
	
	
}
