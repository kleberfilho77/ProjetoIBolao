package br.com.loterica.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="meta_variavel")
public class MetaVariavel implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="comissao")
 	private Double comissao;
	
	@Column(name="valor")
 	private Integer valor;

	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getComissao() {
		return comissao;
	}

	public void setComissao(Double comissao) {
		this.comissao = comissao;
	}

	public Integer getValor() {
		return valor;
	}

	public void setValor(Integer valor) {
		this.valor = valor;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "MetaVariavel [id=" + id + ", comissao=" + comissao + ", valor=" + valor + "]";
	}

	public MetaVariavel(Long id, Double comissao, Integer valor) {
		super();
		this.id = id;
		this.comissao = comissao;
		this.valor = valor;
	}

	public MetaVariavel() {
		super();
	}
	
	
}