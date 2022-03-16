package br.com.loterica.entity;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.loterica.type.TypeSexo;

@Entity
@Table(name = "usuario_vendedor")
public class UsuarioVendedor implements java.io.Serializable, Comparable<UsuarioVendedor> {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String cpf;
	@Column(name = "nome")
	@JsonProperty("nome")
	private String nome;

	@Column(name = "password")
	@JsonProperty("password")
	private String password;

	@Column(name = "token")
	@JsonProperty("token")
	private String token;

	private String endereco;
	private String numero;
	private String complemento;
	private String bairro;
	private String cidade;
	private String estado;
	private String cep;
	private String contato1;
	private String contato2;
	@Enumerated(EnumType.STRING)
	private TypeSexo sexo;
	private Boolean isSms;
	private String perfil;
	private String uuid;
	private String email;
	private String status;

	@JsonIgnore
	@JsonManagedReference(value = "vendedor")
	@OneToMany(mappedBy = "vendedor", cascade = CascadeType.ALL)
	private List<Cota> cotas;
	
	@OneToMany(mappedBy = "vendedor", cascade = CascadeType.ALL)
	@JsonManagedReference(value="vendedor")
	@JsonIgnore
	private List<Movimentacao> movimentacao;
	
	@OneToMany(mappedBy = "vendedor", cascade = CascadeType.ALL)
	@JsonManagedReference(value="vendedor")
	@JsonIgnore
	private List<PrestacaoContas> prestacontas;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id_administrador", referencedColumnName = "id")
	private UsuarioAdministrador administrador;
	
	
 	
 	private Long idUsuariounidadeloterica;

	
//	@OneToOne(mappedBy = "vendedor")
//    private Meta meta;
	
	
	
	{
		uuid = UUID.randomUUID().toString();
	}

	

	public UsuarioVendedor(Long id, String cpf, String nome, String password, String token, String endereco, String numero,
		String complemento, String bairro, String cidade, String estado, String cep, String contato1, String contato2,
		TypeSexo sexo, Boolean isSms, String perfil, String uuid, String email, String status, List<Cota> cotas,
		List<Movimentacao> movimentacao, List<PrestacaoContas> prestacontas, UsuarioAdministrador administrador,
		 Long idUsuariounidadeloterica) {
	super();
	this.id = id;
	this.cpf = cpf;
	this.nome = nome;
	this.password = password;
	this.token = token;
	this.endereco = endereco;
	this.numero = numero;
	this.complemento = complemento;
	this.bairro = bairro;
	this.cidade = cidade;
	this.estado = estado;
	this.cep = cep;
	this.contato1 = contato1;
	this.contato2 = contato2;
	this.sexo = sexo;
	this.isSms = isSms;
	this.perfil = perfil;
	this.uuid = uuid;
	this.email = email;
	this.status = status;
	this.cotas = cotas;
	this.movimentacao = movimentacao;
	this.prestacontas = prestacontas;
	this.administrador = administrador;
	this.idUsuariounidadeloterica = idUsuariounidadeloterica;
}


	public UsuarioVendedor() {

	}

	
	@Override
	public String toString() {
		return "UsuarioVendedor [id=" + id + ", cpf=" + cpf + ", nome=" + nome + ", password=" + password + ", token="
				+ token + ", endereco=" + endereco + ", numero=" + numero + ", complemento=" + complemento + ", bairro="
				+ bairro + ", cidade=" + cidade + ", estado=" + estado + ", cep=" + cep + ", contato1=" + contato1
				+ ", contato2=" + contato2 + ", sexo=" + sexo + ", isSms=" + isSms + ", perfil=" + perfil + ", uuid="
				+ uuid + ", email=" + email + ", status=" + status + ", cotas=" + cotas + ", movimentacao="
				+ movimentacao + ", prestacontas=" + prestacontas + ", administrador=" + administrador
				+ ", idUsuariounidadeloterica=" + idUsuariounidadeloterica + "]";
	}




	public String generatedUUID() {
		uuid = UUID.randomUUID().toString();
		return uuid;
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

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UsuarioAdministrador getAdministrador() {
		return administrador;
	}

	public void setAdministrador(UsuarioAdministrador administrador) {
		this.administrador = administrador;
	}

	public List<Cota> getCotas() {
		return cotas;
	}

	public void setCotas(List<Cota> cotas) {
		this.cotas = cotas;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	
	public List<Movimentacao> getMovimentacao() {
		return movimentacao;
	}


	public void setMovimentacao(List<Movimentacao> movimentacao) {
		this.movimentacao = movimentacao;
	}


	public Long getIdUsuariounidadeloterica() {
		return idUsuariounidadeloterica;
	}


	public void setIdUsuariounidadeloterica(Long idUsuariounidadeloterica) {
		this.idUsuariounidadeloterica = idUsuariounidadeloterica;
	}

	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}
	
	public List<PrestacaoContas> getPrestacontas() {
		return prestacontas;
	}




	public void setPrestacontas(List<PrestacaoContas> prestacontas) {
		this.prestacontas = prestacontas;
	}




	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		UsuarioVendedor other = (UsuarioVendedor) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public int compareTo(UsuarioVendedor u) {
		return this.getId().compareTo(u.getId());
	}
	
	

}
