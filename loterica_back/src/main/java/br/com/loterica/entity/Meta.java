package br.com.loterica.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="meta")
public class Meta implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	
	private String mes;
	
	private Integer ano;
	
	private Integer valor;
	
	
	
	@OneToOne(cascade = CascadeType.REFRESH)
	private UsuarioVendedor vendedor;
	
	
	public Integer getValor() {
		return valor;
	}

	public void setValor(Integer valor) {
		this.valor = valor;
	}

	public UsuarioVendedor getVendedor() {
		return vendedor;
	}

	public void setVendedor(UsuarioVendedor vendedor) {
		this.vendedor = vendedor;
	}

	public Meta() {
	}


	@Override
	public String toString() {
		return "Meta [id=" + id + ", mes=" + mes + ", ano=" + ano + ", valor=" + valor + ", vendedor=" + vendedor + "]";
	}
	
	

	public Meta(Long id, String mes, Integer ano, Integer valor, UsuarioVendedor vendedor) {
		super();
		this.id = id;
		this.mes = mes;
		this.ano = ano;
		this.valor = valor;
		this.vendedor = vendedor;
	}
	
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMes() {
		return mes;
	}

	public void setMes(String mes) {
		this.mes = mes;
	}

	public Integer getAno() {
		return ano;
	}

	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
