package br.com.loterica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.loterica.entity.UsuarioUnidadeLoterica;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.UsuarioUnidadeLotericaRepository;
import br.com.loterica.service.EmailUtilService;

@ResponseBody
@RestController
@RequestMapping("/api")
public class UsuarioUnidadeLotericaController{
	 
	
	@Autowired
	private UsuarioUnidadeLotericaRepository repository;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody UsuarioUnidadeLoterica unidade){
		try {
			 unidade.setUuid(unidade.generatedUUID());
			UsuarioUnidadeLoterica resp =   repository.save(unidade);
			 if (resp==null) {
				 throw new Exception("Dados Invalidos");
			 }
			return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	
	 @GetMapping("/findAll")
	 public List<UsuarioUnidadeLoterica> findAll(){
	
	 try {
		 
		 return repository.findAll();
		 
	 } catch (Exception ex) {
			return null;
	 }
	 }
	 
	 @GetMapping("/findByEmail/{email}")
	 public UsuarioUnidadeLoterica findByEmail(@PathVariable String email){
		 
	 try { 
		 
		 return repository.findEmail(email);
		 
	 } catch (Exception ex) {
			return null;
	 }
	 }
	 
	 
	 @PatchMapping("/resetPassword")
		public ResponseEntity<?> resetPassword(@RequestBody UsuarioUnidadeLoterica user){
			EmailUtilService eu = new EmailUtilService();
			String senha = eu.gerarSenha();
			
			
			try {
				eu.enviarEmail(user.getEmailPrincipal(), senha);
				//eu.enviarEmail("araujofletes@gmail.com", senha);
				user.setPassword(senha);
				repository.update(user.getId(), senha);
				  
				return ResponseEntity.status(200).body(user);
			}catch(Exception ex) {
				return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
			}
		}
	 
	 
	 @PatchMapping("/update")
		public ResponseEntity<?> update(@RequestBody UsuarioUnidadeLoterica usuario) {
			try {
				repository.update(usuario.getId(), usuario.getPassword());
				return ResponseEntity.status(200).body(usuario);

			}catch(Exception ex) {
				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
			}
		}
	
}
