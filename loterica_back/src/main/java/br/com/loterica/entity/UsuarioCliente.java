package br.com.loterica.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.loterica.type.TypeSexo;

@Entity
@Table(name = "usuario_cliente")
public class UsuarioCliente implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String cpf;
	private String cep;
	private String nome;
	private String password;
	private String token;
	private String endereco;
	private String numero;
	private String complemento;
	private String bairro;
	private String cidade;
	private String estado;
	private String contato1;
	private String contato2;
	private String email;
	private String uuid;
	@Enumerated(EnumType.STRING)
	private TypeSexo sexo;
	private Boolean isSms;
	@JsonFormat(pattern="dd/MM/yyyy")
	private java.util.Date dataCadastro;
// 	@JsonIgnore()
// 	@ManyToOne
// 	@JoinColumn(name = "id_vendedor", referencedColumnName = "id")
// 	private UsuarioVendedor vendedorVinculado;
	
	private Long idVendedor;
 	
 	
 	
	public UsuarioCliente(Long id, String cpf, String cep, String nome, String password, String token, String endereco,
			String numero, String complemento, String bairro, String cidade, String estado, String contato1,
			String contato2, String email, String uuid, TypeSexo sexo, Boolean isSms, Date dataCadastro,
			Long idVendedor) {
		super();
		this.id = id;
		this.cpf = cpf;
		this.cep = cep;
		this.nome = nome;
		this.password = password;
		this.token = token;
		this.endereco = endereco;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.contato1 = contato1;
		this.contato2 = contato2;
		this.email = email;
		this.uuid = uuid;
		this.sexo = sexo;
		this.isSms = isSms;
		this.dataCadastro = dataCadastro;
		this.idVendedor = idVendedor;
	}
	public UsuarioCliente() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getContato1() {
		return contato1;
	}
	public void setContato1(String contato1) {
		this.contato1 = contato1;
	}
	public String getContato2() {
		return contato2;
	}
	public void setContato2(String contato2) {
		this.contato2 = contato2;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public TypeSexo getSexo() {
		return sexo;
	}
	public void setSexo(TypeSexo sexo) {
		this.sexo = sexo;
	}
	public Boolean getIsSms() {
		return isSms;
	}
	public void setIsSms(Boolean isSms) {
		this.isSms = isSms;
	}
	public java.util.Date getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(java.util.Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	
	public Long getIdVendedor() {
		return idVendedor;
	}
	
	public void setIdVendedor(Long idVendedor) {
		this.idVendedor = idVendedor;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public String generatedUUID()
	{
		 uuid = UUID.randomUUID().toString();
		 return uuid;
	}
	
	@Override
	public String toString() {
		return "UsuarioCliente [id=" + id + ", cpf=" + cpf + ", cep=" + cep + ", nome=" + nome + ", password="
				+ password + ", token=" + token + ", endereco=" + endereco + ", numero=" + numero + ", complemento="
				+ complemento + ", bairro=" + bairro + ", cidade=" + cidade + ", estado=" + estado + ", contato1="
				+ contato1 + ", contato2=" + contato2 + ", email=" + email + ", uuid=" + uuid + ", sexo=" + sexo
				+ ", isSms=" + isSms + ", dataCadastro=" + dataCadastro + ", idVendedor=" + idVendedor
				+ "]";
	}
 

	

	 
}
