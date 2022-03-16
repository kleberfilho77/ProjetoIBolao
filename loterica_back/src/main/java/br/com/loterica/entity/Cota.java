package br.com.loterica.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="cota")
public class Cota implements java.io.Serializable, Comparable<Cota>    {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long    idCota;
	private Double  valorCota = 0.;
	private Integer quantidadeCotaVendedor = 0;
    
    @JsonBackReference(value="cotas")
	@ManyToOne(cascade= {CascadeType.PERSIST})
	@JoinColumn(name = "bolao_id", referencedColumnName = "id")
	private Bolao  bolao;
	
	@ManyToOne(cascade = CascadeType.REFRESH)
 	@JoinColumn(name = "vendedor_id", referencedColumnName = "id")
	@JsonBackReference(value="vendedor")
    private  UsuarioVendedor vendedor;
	

	public Cota() {
	}

	public Long getIdCota() {
		return idCota;
	}

	public void setIdCota(Long idCota) {
		this.idCota = idCota;
	}

	public Double getValorCota() {
		return valorCota;
	}

	public void setValorCota(Double valorCota) {
		this.valorCota = valorCota;
	}

	public Bolao getBolao() {
		return bolao;
	}

	public void setBolao(Bolao bolao) {
		this.bolao = bolao;
	}

	 
	public Integer getQuantidadeCotaVendedor() {
		return quantidadeCotaVendedor;
	}

	public void setQuantidadeCotaVendedor(Integer quantidadeCotaVendedor) {
		this.quantidadeCotaVendedor = quantidadeCotaVendedor;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public UsuarioVendedor getVendedor() {
		return vendedor;
	}

	public void setVendedor(UsuarioVendedor vendedor) {
		this.vendedor = vendedor;
	}



	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((idCota == null) ? 0 : idCota.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cota other = (Cota) obj;
		if (idCota == null) {
			if (other.idCota != null)
				return false;
		} else if (!idCota.equals(other.idCota))
			return false;
		return true;
	}

	@Override
	public int compareTo(Cota c) {
		return this.getIdCota().compareTo(c.getIdCota());
	}


}
