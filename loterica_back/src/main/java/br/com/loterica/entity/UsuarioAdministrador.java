package br.com.loterica.entity;

import java.util.ArrayList;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.loterica.type.TypeSexo;

@Entity
@Table(name="usuario_administrador")
public class UsuarioAdministrador implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String uuid;
	private String cpf;
	
	@Column(name="nome")
	@JsonProperty("nome")
	private String nome;
	
	@Column(name="password")
	@JsonProperty("password")
	private String password;
	
	@Column(name="token")
	@JsonProperty("token")
	private String token;
	
	private String cep;
	private String endereco;
	private String numero;
	private String complemento;
	private String bairro;
	private String cidade;
	private String estado;
	private String status;
	private String contato1;
	private String contato2;
	@Column(unique=true)
	private String email;
	@Enumerated(EnumType.STRING)
	private TypeSexo sexo;
	private Integer isSms;
	
	private String perfil;
	
	private Long lotericaId;
   
    @JsonIgnore
 	@OneToMany(mappedBy="administrador",cascade={CascadeType.ALL})
    private List<UsuarioVendedor>  vendedores=new ArrayList<UsuarioVendedor>();
 	
    
	  
	{
		 uuid = UUID.randomUUID().toString();
  	}
	
	
	public UsuarioAdministrador() {
		
	}
	

	public UsuarioAdministrador(Long id, String uuid, String nome, String password, String token, String cep,
			String endereco, String numero, String complemento, String bairro, String cidade, String estado, String cpf,
			String contato1, String contato2, String email, TypeSexo sexo, Integer isSms, String perfil,String status,
			Long lotericaId, List<UsuarioVendedor> vendedores) {
		super();
		this.id = id;
		this.uuid = uuid;
		this.nome = nome;
		this.password = password;
		this.token = token;
		this.cep = cep;
		this.cpf = cpf;
		this.endereco = endereco;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.contato1 = contato1;
		this.contato2 = contato2;
		this.email = email;
		this.sexo = sexo;
		this.isSms = isSms;
		this.perfil = perfil;
		this.status = status;
		this.lotericaId = lotericaId;
		this.vendedores = vendedores;
	}


	public String getCep() {
		return cep;
	}


	public void setCep(String cep) {
		this.cep = cep;
	}


	public void generateUuid() {
		 this.uuid =  UUID.randomUUID().toString();
	 }


 
	@Override
	public String toString() {
		return "UsuarioAdministrador [id=" + id + ", uuid=" + uuid + ", nome=" + nome + ", password=" + password
				+ ", token=" + token + ", cep=" + cep + ", cpf=\" + cpf + \", endereco=" + endereco + ", numero=" + numero
				+ ", complemento=" + complemento + ", bairro=" + bairro + ", cidade=" + cidade + ", estado=" + estado
				+ ", contato1=" + contato1 + ", contato2=" + contato2 + ", status=\" + status + \", email=" + email + ", sexo=" + sexo
				+ ", isSms=" + isSms + ", perfil=" + perfil + ", lotericaId=" + lotericaId + ", vendedores="
				+ vendedores + "]";
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

   

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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

 

	public TypeSexo getSexo() {
		return sexo;
	}

	public void setSexo(TypeSexo sexo) {
		this.sexo = sexo;
	}

   

	public Integer getIsSms() {
		return isSms;
	}


	public void setIsSms(Integer isSms) {
		this.isSms = isSms;
	}

	
	public Long getLotericaId() {
		return lotericaId;
	}


	public void setLotericaId(Long lotericaId) {
		this.lotericaId = lotericaId;
	}


	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
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

	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public String getToken() {
		return token;
	}


	public void setToken(String token) {
		this.token = token;
	}


	public List<UsuarioVendedor> getVendedores() {
		return vendedores;
	}


	public void setVendedores(List<UsuarioVendedor> vendedores) {
		this.vendedores = vendedores;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getCpf() {
		return cpf;
	}


	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	
 
}
