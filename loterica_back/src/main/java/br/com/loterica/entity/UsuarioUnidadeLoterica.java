package br.com.loterica.entity;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
 

@Entity
@Table(name="usuario_unidade_loterica",uniqueConstraints = {@UniqueConstraint(columnNames = {"emailPrincipal","cnpj"})})
public class UsuarioUnidadeLoterica implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String numeroUl;
	private String cnpj;
	private String razaoSocial;
	private String nomeFantasia;
	private String logradouro;
	private String bairro;
	private String cidade;
	private String estado;
	private String cep;
	private String contato1;
	private String contato2;
	private String contato3;
	private String telefone1;
	private String telefone2;
	private String telefone3;
	private String perfil;
	
	@Column(name="password")
	@JsonProperty("password")
	private String password;
	
	@Column(name="token")
	@JsonProperty("token")
	private String token;
	
	private String emailPrincipal;
	private String email1;
	private String email2;
 	private String email3;
    private Boolean isSms;
    private String senha;
    private String uuid;
    
    
	  
	{
		 uuid = UUID.randomUUID().toString();
	}
	
    
	public UsuarioUnidadeLoterica() {
	}

	public UsuarioUnidadeLoterica(Long id, String numeroUl, String cnpj, String razaoSocial, String nomeFantasia,
			String logradouro, String bairro, String cidade, String estado, String cep, String telefone1,
			String telefone2, String telefone3, String email, String email1, String email2, String email3) {
		super();
		this.id = id;
		this.numeroUl = numeroUl;
		this.cnpj = cnpj;
		this.razaoSocial = razaoSocial;
		this.nomeFantasia = nomeFantasia;
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.cep = cep;
		this.telefone1 = telefone1;
		this.telefone2 = telefone2;
		this.telefone3 = telefone3;
		this.emailPrincipal = email;
		this.email1 = email1;
		this.email2 = email2;
		this.email3 = email3;
	}

   
	 public String generatedUUID()
	{
		 uuid = UUID.randomUUID().toString();
		 return uuid;
	}
	
	public UsuarioUnidadeLoterica(Long id, String numeroUl, String cnpj, String razaoSocial, String nomeFantasia,
			String logradouro, String bairro, String cidade, String estado, String cep, String contato1,
			String contato2, String contato3, String telefone1, String telefone2, String telefone3, String email,
			String email1, String email2, String email3, Boolean isSms) {
		super();
		this.id = id;
		this.numeroUl = numeroUl;
		this.cnpj = cnpj;
		this.razaoSocial = razaoSocial;
		this.nomeFantasia = nomeFantasia;
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.cep = cep;
		this.contato1 = contato1;
		this.contato2 = contato2;
		this.contato3 = contato3;
		this.telefone1 = telefone1;
		this.telefone2 = telefone2;
		this.telefone3 = telefone3;
		this.emailPrincipal = email;
		this.email1 = email1;
		this.email2 = email2;
		this.email3 = email3;
		this.isSms = isSms;
	}
	
	
	

	@Override
	public String toString() {
		return "UnidadeLoterica [id=" + id + ", numeroUl=" + numeroUl + ", cnpj=" + cnpj + ", razaoSocial="
				+ razaoSocial + ", nomeFantasia=" + nomeFantasia + ", logradouro=" + logradouro + ", bairro=" + bairro
				+ ", cidade=" + cidade + ", estado=" + estado + ", cep=" + cep + ", contato1=" + contato1
				+ ", contato2=" + contato2 + ", contato3=" + contato3 + ", telefone1=" + telefone1 + ", telefone2="
				+ telefone2 + ", telefone3=" + telefone3 + ", email=" + emailPrincipal + ", email1=" + email1 + ", email2=" + email2 + ", email3="
				+ email3 + ", isSms=" + isSms + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumeroUl() {
		return numeroUl;
	}

	public void setNumeroUl(String numeroUl) {
		this.numeroUl = numeroUl;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
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

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getTelefone1() {
		return telefone1;
	}

	public void setTelefone1(String telefone1) {
		this.telefone1 = telefone1;
	}

	public String getTelefone2() {
		return telefone2;
	}

	public void setTelefone2(String telefone2) {
		this.telefone2 = telefone2;
	}

 
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getTelefone3() {
		return telefone3;
	}

	public void setTelefone3(String telefone3) {
		this.telefone3 = telefone3;
	}

	public String getEmail1() {
		return email1;
	}

	public void setEmail1(String email1) {
		this.email1 = email1;
	}

	public String getEmail2() {
		return email2;
	}

	public void setEmail2(String email2) {
		this.email2 = email2;
	}

	public String getEmail3() {
		return email3;
	}

	public void setEmail3(String email3) {
		this.email3 = email3;
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

	public String getContato3() {
		return contato3;
	}

	public void setContato3(String contato3) {
		this.contato3 = contato3;
	}

  
	public Boolean getIsSms() {
		return isSms;
	}

	public void setIsSms(Boolean isSms) {
		this.isSms = isSms;
	}

	public String getEmailPrincipal() {
		return emailPrincipal;
	}

	public void setEmail(String email) {
		this.emailPrincipal = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
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

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	
}
