package br.com.loterica.interfaces;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import br.com.loterica.type.TypeSexo;

public interface IAdministradorDto {
	
	public Long getId();
	
	public String getUuid();  
	
	public String getCpf(); 
	
	public String getNome(); 
 
	public String getEndereco(); 
 
	public String getNumero();
 
	public String getComplemento();
 
	public String getBairro();
 
	public String getCidade();
		 
	public String getEstado();  
 
	public String getContato1();
	 
	public String getContato2();
 
	public String getEmail();
 
	public TypeSexo getSexo();
 
 
	public Boolean getIsSms();
 
	public String getPassword();  
 
	public String getPerfil();
 
	
	
}
