package br.com.loterica.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;



@Entity
@Table(name="combo")
public class Combo implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	
	private Integer multiplicador;


	@JsonManagedReference(value="bolao_combo")
	@OneToMany(mappedBy="combo", cascade= {CascadeType.ALL})
	private List<BolaoCombo>  bolaoCombo = new ArrayList<BolaoCombo>();


	public Combo() {
		super();
	}





	public Integer getMultiplicador() {
		return multiplicador;
	}





	public void setMultiplicador(Integer multiplicador) {
		this.multiplicador = multiplicador;
	}





	public Combo(Long id, Integer multiplicador, List<BolaoCombo> bolaoCombo) {
		super();
		this.id = id;
		this.multiplicador = multiplicador;
		this.bolaoCombo = bolaoCombo;
	}





	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public List<BolaoCombo> getBolaoCombo() {
		return bolaoCombo;
	}


	public void setBolaoCombo(List<BolaoCombo> bolaoCombo) {
		this.bolaoCombo = bolaoCombo;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	


	




	
	
	
}
