package br.com.loterica.dto;

import br.com.loterica.type.TypeSexo;

public class UsuarioVendedorDto {

		private Long id;
		private String uuid;
		private String cpf;
		private String nome;
		private String logradouro;
		private String bairro;
		private String cidade;
		private String estado;
		private String cep;
		private String contato1;
		private String contato2;
		private String email;
		private TypeSexo sexo;
		private Boolean isSms;
		private String password;
		private String perfil;
		private String tipo;

		public UsuarioVendedorDto() {
			// TODO Auto-generated constructor stub
		}

		public UsuarioVendedorDto(Long id, String uuid, String cpf, String nome, String logradouro, String bairro,
				String cidade, String estado, String cep, String contato1, String contato2, String email, TypeSexo sexo,
				Boolean isSms, String password, String perfil, String tipo) {
			super();
			this.id = id;
			this.uuid = uuid;
			this.cpf = cpf;
			this.nome = nome;
			this.logradouro = logradouro;
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
			this.tipo = tipo;
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

		public String getTipo() {
			return tipo;
		}

		public void setTipo(String tipo) {
			this.tipo = tipo;
		}

		public String getPerfil() {
			return perfil;
		}

		public void setPerfil(String perfil) {
			this.perfil = perfil;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		
}
 
