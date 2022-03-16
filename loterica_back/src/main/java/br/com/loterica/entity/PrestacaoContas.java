package br.com.loterica.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="prestacao_contas")
public class PrestacaoContas {
	
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="valor_vendas")
 	private Double valorVendas;
	
	@Column(name="valor_pago")
 	private Integer valorPago;
	
	private String lancamentoPrevio;
	
	private String data;
	
	@ManyToOne(cascade = CascadeType.MERGE)
 	@JoinColumn(name = "vendedor_id", referencedColumnName = "id")
	@JsonBackReference(value="prestacao_contas")
	private UsuarioVendedor vendedor;
	
	

	public PrestacaoContas(Long id, Double valorVendas, Integer valorPago, String lancamentoPrevio, String data,
			UsuarioVendedor vendedor) {
		super();
		this.id = id;
		this.valorVendas = valorVendas;
		this.valorPago = valorPago;
		this.lancamentoPrevio = lancamentoPrevio;
		this.data = data;
		this.vendedor = vendedor;
	}


	public PrestacaoContas() {
		super();
	}


	@Override
	public String toString() {
		return "PrestacaoContas [id=" + id + ", valorVendas=" + valorVendas + ", valorPago=" + valorPago
				+ ", lancamentoPrevio=" + lancamentoPrevio + ", data=" + data + ", vendedor=" + vendedor + "]";
	}


	public Long getId() {
		return id;
	}
	
	

	public String getLancamentoPrevio() {
		return lancamentoPrevio;
	}


	public void setLancamentoPrevio(String lancamentoPrevio) {
		this.lancamentoPrevio = lancamentoPrevio;
	}


	public void setId(Long id) {
		this.id = id;
	}

	public Double getValorvendas() {
		return valorVendas;
	}

	public void setValorvendas(Double valorvendas) {
		this.valorVendas = valorvendas;
	}

	public Integer getValorpago() {
		return valorPago;
	}

	public void setValorpago(Integer valorpago) {
		this.valorPago = valorpago;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public UsuarioVendedor getVendedor() {
		return vendedor;
	}

	public void setVendedor(UsuarioVendedor vendedor) {
		this.vendedor = vendedor;
	}

	public Double getValorVendas() {
		return valorVendas;
	}

	public void setValorVendas(Double valorVendas) {
		this.valorVendas = valorVendas;
	}

	public Integer getValorPago() {
		return valorPago;
	}

	public void setValorPago(Integer valorPago) {
		this.valorPago = valorPago;
	}
	
	
}
