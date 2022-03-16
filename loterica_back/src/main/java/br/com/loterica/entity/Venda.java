package br.com.loterica.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="vendas")
public class Venda  implements java.io.Serializable{
 
	private static final long serialVersionUID = 1L;
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 private Double total=0.;
//	 @OneToMany(mappedBy = "venda")
//	 private List<ItemBolao> items;
//	 
//	 @OneToOne 
//	 @JoinColumn(columnDefinition ="id_usuario",referencedColumnName ="id"  )
//	 private  UsuarioVendedor usuario;
//	 
//	 @OneToOne 
//	 @JoinColumn(columnDefinition ="id_cliente",referencedColumnName ="id"  )
//	 private  UsuarioCliente cliente; 
	 
	 
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
 
//	public List<ItemBolao> getItems() {
//		return items;
//	}
//	public void setItems(List<ItemBolao> items) {
//		this.items = items;
//	}
 
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
//	public UsuarioVendedor getUsuario() {
//		return usuario;
//	}
//	public void setUsuario(UsuarioVendedor usuario) {
//		this.usuario = usuario;
//	}
//	 
	 
	 
	 
}
