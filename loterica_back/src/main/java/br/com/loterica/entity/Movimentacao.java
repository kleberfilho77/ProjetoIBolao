package br.com.loterica.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "movimentacao")
public class Movimentacao implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String data;
	
	@ManyToOne(cascade = CascadeType.MERGE)
 	@JoinColumn(name = "vendedor_id", referencedColumnName = "id")
	@JsonBackReference(value="movimentacao")
	private UsuarioVendedor vendedor;
	
	private String descricao;
	
	private Integer qtdCotasVendidas;
	
	private Integer dinheiro;
	private Integer debito;
	private Integer credito;
	private Integer pix;
	private Integer outros;
	private Integer pendente;
	private Long ordempagId;

	

	public Movimentacao(Long id, String data, UsuarioVendedor vendedor, String descricao, Integer qtdCotasVendidas,
			Integer dinheiro, Integer debito, Integer credito, Integer pix, Integer outros, Integer pendente,
			Long ordempagId) {
		super();
		this.id = id;
		this.data = data;
		this.vendedor = vendedor;
		this.descricao = descricao;
		this.qtdCotasVendidas = qtdCotasVendidas;
		this.dinheiro = dinheiro;
		this.debito = debito;
		this.credito = credito;
		this.pix = pix;
		this.outros = outros;
		this.pendente = pendente;
		this.ordempagId = ordempagId;
	}



	public Movimentacao() {
		super();
	}

	

	public Long getOrdempagId() {
		return ordempagId;
	}



	public void setOrdempagId(Long ordempagId) {
		this.ordempagId = ordempagId;
	}



	public Integer getPendente() {
		return pendente;
	}



	public void setPendente(Integer pendente) {
		this.pendente = pendente;
	}



	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getData() {
		return data;
	}


	public void setData(String data) {
		this.data = data;
	}


	public Integer getQtdCotasVendidas() {
		return qtdCotasVendidas;
	}



	public void setQtdCotasVendidas(Integer qtdCotasVendidas) {
		this.qtdCotasVendidas = qtdCotasVendidas;
	}



	public UsuarioVendedor getVendedor() {
		return vendedor;
	}


	public void setVendedor(UsuarioVendedor vendedor) {
		this.vendedor = vendedor;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public Integer getDinheiro() {
		return dinheiro;
	}


	public void setDinheiro(Integer dinheiro) {
		this.dinheiro = dinheiro;
	}


	public Integer getDebito() {
		return debito;
	}


	public void setDebito(Integer debito) {
		this.debito = debito;
	}


	public Integer getCredito() {
		return credito;
	}


	public void setCredito(Integer credito) {
		this.credito = credito;
	}


	public Integer getPix() {
		return pix;
	}


	public void setPix(Integer pix) {
		this.pix = pix;
	}


	public Integer getOutros() {
		return outros;
	}


	public void setOutros(Integer outros) {
		this.outros = outros;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
