package com.grupo14.apirest.models.entities;

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
@Table(name = "ticket")
@NoArgsConstructor
@ToString(exclude = {"transaccion"})
public class Ticket {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(name = "estado")
	private Boolean estado = true;  
	
	@Column(name = "fecha_adquirido")
	private Date fecha_adquirido;
	
	@Column(name = "fecha_canjeo")
	private Date fecha_canjeo;
	
	//TODO: Hacer el campo de codigoQR
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_localidad", nullable = false)
	private Localidad localidad;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario usuario;
	
	@OneToMany(mappedBy = "ticket", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Transaccion> transaccion;
	

	public Ticket(Boolean estado, Date fecha_adquirido, Date fecha_canjeo, Localidad localidad, Usuario usuario) {
		super();
		this.estado = estado;
		this.fecha_adquirido = fecha_adquirido;
		this.fecha_canjeo = fecha_canjeo;
		this.localidad = localidad;
		this.usuario = usuario;
	}
	
}
