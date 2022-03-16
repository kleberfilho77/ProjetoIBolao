package br.com.loterica.dto;

import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.type.TypeSexo;

public class UsuarioAdministradorDto {

	private Long id;
	private String uuid;
	private String cpf;
	private String nome;
	private String endereco;
	private String numero;
	private String complemento;
	private String bairro;
	private String cidade;
	private String estado;
	private String contato1;
	private String contato2;
	private String email;
	private TypeSexo sexo;
	private Integer isSms;
	private String password;
	private String perfil;


	public UsuarioAdministradorDto() {
		// TODO Auto-generated constructor stub
	}

	
	public UsuarioAdministradorDto(String uuid, String cpf, String nome, String endereco, String numero,
			String complemento, String bairro, String cidade, String estado, String contato1,
			String contato2, String email, TypeSexo sexo, Integer isSms, String senha, String perfil) {
		
		this.uuid = uuid;
		this.cpf = cpf;
		this.nome = nome;
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
		this.password = password;
		this.perfil = perfil;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

 
	
	public UsuarioAdministrador convertUsuarioAdministrador() {
		UsuarioAdministrador usu = new UsuarioAdministrador();
		    usu.setId(this.getId());
		    usu.setNome(this.getNome());
		    usu.setEmail(this.getEmail());
		    usu.setEndereco(this.getEndereco());
		    usu.setNumero(this.getNumero());
		    usu.setComplemento(this.getComplemento());
		    usu.setCidade(this.getCidade());
		    usu.setEstado(this.getEstado());
		    usu.setBairro(this.getBairro());
		    usu.setPerfil(this.getPerfil());
		    usu.setContato1(this.getContato1());
		    usu.setContato2(this.getContato2());
		    usu.setPerfil(this.getPerfil());
		    usu.setIsSms(this.getIsSms());
          return usu;
	}


	  
	  

}
