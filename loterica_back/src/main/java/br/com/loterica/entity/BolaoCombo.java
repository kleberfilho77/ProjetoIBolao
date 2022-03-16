package br.com.loterica.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="bolaocombo")
public class BolaoCombo implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long    id;
	

	@ManyToOne(cascade = CascadeType.PERSIST)
 	@JoinColumn(name = "combo_id", referencedColumnName = "id")
	@JsonBackReference(value="bolao_combo")
    private  Combo combo;
	
	
	@ManyToOne(cascade= {CascadeType.REFRESH})
	@JoinColumn(name = "bolao_id", referencedColumnName = "id")
	@JsonBackReference(value="bolao")
	private Bolao  bolao;
	
	@Column(name="qtd_cotas")
 	private Integer qtdCotas;
	
	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="data_registro")
	private java.util.Date dataRegistro;
	
	private String status;
	
	public BolaoCombo() {
		super();
	}



	public BolaoCombo(Long id, Combo combo, Bolao bolao, Integer qtdCotas, Date dataRegistro, String status) {
		super();
		this.id = id;
		this.combo = combo;
		this.bolao = bolao;
		this.qtdCotas = qtdCotas;
		this.dataRegistro = dataRegistro;
		this.status = status;
	}
	
	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public Long getIdCota() {
		return id;
	}




	public void setIdCota(Long id) {
		this.id = id;
	}




	public Bolao getBolao() {
		return bolao;
	}




	public void setBolao(Bolao bolao) {
		this.bolao = bolao;
	}




	public Combo getCombo() {
		return combo;
	}




	public void setCombo(Combo combo) {
		this.combo = combo;
	}



	public Long getId() {
		return id;
	}




	public void setId(Long id) {
		this.id = id;
	}




	public Integer getQtdCotas() {
		return qtdCotas;
	}




	public void setQtdCotas(Integer qtdCotas) {
		this.qtdCotas = qtdCotas;
	}




	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	public java.util.Date getDataRegistro() {
		return dataRegistro;
	}



	public void setDataRegistro(java.util.Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}



	@Override
	public String toString() {
		return "BolaoCombo [id=" + id + ", combo=" + combo + ", bolao=" + bolao + ", qtdCotas=" + qtdCotas
				+ ", dataRegistro=" + dataRegistro + ", status=" + status + "]";
	}



}
