package com.grupo14.apirest.models.entities;

import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "transaccion")
@NoArgsConstructor
public class Transaccion {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_emisor", nullable = false)
	private Usuario emisor;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_receptor", nullable = false)
	private Usuario receptor;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_ticket", nullable = false)
	private Ticket ticket;
	
	@Column(name = "fecha_realizacion")
	private Date fecha_realizacion;

	public Transaccion(Usuario emisor, Usuario receptor, Ticket ticket, Date fecha_realizacion) {
		super();
		this.emisor = emisor;
		this.receptor = receptor;
		this.ticket = ticket;
		this.fecha_realizacion = fecha_realizacion;
	}
	
}
