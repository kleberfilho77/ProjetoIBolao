package br.com.loterica.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "ordem_pagamento")
public class OrdemPagamento  implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String descricao;
	
	private String nomeCliente;
    
	private String emailCliente;
	
    private String cnpjLoterica;
    
    private String nomeLoterica;
	
	private Integer valor;
	
	private String link;
	
	private String isPago;
			
	private Integer vendedorId;
	
	private Integer qtdCotasVendidas;
	
	private String idCota;
	
	private String idCombo;
	
	
	

	
	@Override
	public String toString() {
		return "OrdemPagamento [id=" + id + ", descricao=" + descricao + ", nomeCliente=" + nomeCliente
				+ ", emailCliente=" + emailCliente + ", cnpjLoterica=" + cnpjLoterica + ", nomeLoterica=" + nomeLoterica
				+ ", valor=" + valor + ", link=" + link + ", isPago=" + isPago + ", vendedorId=" + vendedorId
				+ ", qtdCotasVendidas=" + qtdCotasVendidas + ", idCota=" + idCota + ", idCombo=" + idCombo + "]";
	}


	public OrdemPagamento(Long id, String descricao, String nomeCliente, String emailCliente, String cnpjLoterica,
			String nomeLoterica, Integer valor, String link, String isPago, Integer vendedorId,
			Integer qtdCotasVendidas,  String idCota, String idCombo) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.nomeCliente = nomeCliente;
		this.emailCliente = emailCliente;
		this.cnpjLoterica = cnpjLoterica;
		this.nomeLoterica = nomeLoterica;
		this.valor = valor;
		this.link = link;
		this.isPago = isPago;
		this.vendedorId = vendedorId;
		this.qtdCotasVendidas = qtdCotasVendidas;
		this.idCota = idCota;
		this.idCombo = idCombo;
	}


	public OrdemPagamento() {
		super();
	}

	
	public String getIdCota() {
		return idCota;
	}


	public void setIdCota(String idCota) {
		this.idCota = idCota;
	}


	public String getIdCombo() {
		return idCombo;
	}


	public void setIdCombo(String idCombo) {
		this.idCombo = idCombo;
	}


	public Integer getVendedorId() {
		return vendedorId;
	}


	public void setVendedorId(Integer vendedorId) {
		this.vendedorId = vendedorId;
	}


	public Integer getQtdCotasVendidas() {
		return qtdCotasVendidas;
	}


	public void setQtdCotasVendidas(Integer qtdCotasVendidas) {
		this.qtdCotasVendidas = qtdCotasVendidas;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public String getNomeCliente() {
		return nomeCliente;
	}


	public void setNomeCliente(String nomeCliente) {
		this.nomeCliente = nomeCliente;
	}


	public String getEmailCliente() {
		return emailCliente;
	}


	public void setEmailCliente(String emailCliente) {
		this.emailCliente = emailCliente;
	}


	public String getCnpjLoterica() {
		return cnpjLoterica;
	}


	public void setCnpjLoterica(String cnpjLoterica) {
		this.cnpjLoterica = cnpjLoterica;
	}


	public String getNomeLoterica() {
		return nomeLoterica;
	}


	public void setNomeLoterica(String nomeLoterica) {
		this.nomeLoterica = nomeLoterica;
	}


	public Integer getValor() {
		return valor;
	}


	public void setValor(Integer valor) {
		this.valor = valor;
	}


	public String getLink() {
		return link;
	}


	public void setLink(String link) {
		this.link = link;
	}


	public String getIsPago() {
		return isPago;
	}


	public void setIsPago(String isPago) {
		this.isPago = isPago;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}
