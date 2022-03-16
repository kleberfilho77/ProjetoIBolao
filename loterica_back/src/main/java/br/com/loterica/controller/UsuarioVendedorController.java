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

import br.com.loterica.dto.ICotaResponse;
import br.com.loterica.entity.Cota;
import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.entity.UsuarioCliente;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.UsuarioVendedorRepository;
import br.com.loterica.service.EmailUtilService;

	@ResponseBody
	@RestController
	@RequestMapping("/vendedor")
	public class UsuarioVendedorController {
	 
		@Autowired
		private UsuarioVendedorRepository repository;
 
		
		@PostMapping("/saved")
		public ResponseEntity<?> create(@RequestBody UsuarioVendedor unidade){
			try {
				 unidade.setUuid(unidade.generatedUUID());
				UsuarioVendedor adm =  repository.save(unidade); 
				 if (adm==null) {
					   throw new Exception("Dados Invalidos");
				 }
				
				return ResponseEntity.status(200).body(adm);
			}catch(Exception ex) {
				return  ResponseEntity.status(200).body("Error :" + ex.getMessage());
			}
		}
		
		
		@GetMapping("/findAll")
		public List<UsuarioVendedor> findAll(){
			
		try {	
			return repository.findAll();
			
		} catch (Exception ex) {
			return null;
		}
		}
		
		
		@GetMapping("/findById/{id}")
		public UsuarioVendedor findById(@PathVariable("id")  Long id) {
			
		try{	
			
			return repository.findById(id).get();
			
		} catch (Exception ex) {
			return null;
		}
		}
		
		@GetMapping("/findBolaoVendedores/{id}")
		public List<?> findBolaoVendedores(@PathVariable("id")  Long id) {
		
		try {	
			
			return repository.findBolaoVendedores(id);	
			
		} catch (Exception ex) {
			return null;
		}
		}
		
		@GetMapping("/findByEmail/{email}")
		public UsuarioVendedor findByEmail(@PathVariable("email")  String email) {
			
		try {	
			
			return repository.findEmail(email);	
			
		} catch (Exception ex) {
			return null;
		}
		}
		
		@GetMapping("/findByName/{nome}")
		public ResponseEntity<?> findVendedor(@PathVariable("nome") String nome){
			try {
				List<UsuarioVendedor> response = repository.getUsuarioVendedor(nome);
			  return ResponseEntity.status(200).body(response);
			}catch(Exception ex) {
				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
			}
		}
	 	
	 	@GetMapping("/findByCpf/{cpf}")
		public ResponseEntity<?> findVendedorByCpf(@PathVariable("cpf") String cpf){
			try {
				List<UsuarioVendedor> response = repository.getUsuarioVendedorByCpf(cpf);
			  return ResponseEntity.status(200).body(response);
			}catch(Exception ex) {
				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
			}
		}
		
		@PatchMapping("/resetPassword")
		public ResponseEntity<?> resetPassword(@RequestBody UsuarioVendedor user){
			EmailUtilService eu = new EmailUtilService();
			String senha = eu.gerarSenha();
			
			
			try {
				eu.enviarEmail(user.getEmail(), senha);
				//eu.enviarEmail("araujofletes@gmail.com", senha);
				user.setPassword(senha);
				repository.update(user.getId(), senha);
				  
				return ResponseEntity.status(200).body(user);
			}catch(Exception ex) {
				return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
			}
		}
		
		
		
		@PatchMapping("/update")
		public ResponseEntity<?> update(@RequestBody UsuarioVendedor usuario) {
			try {
				repository.update(usuario.getId(), usuario.getPassword());
				return ResponseEntity.status(200).body(usuario);
 
			}catch(Exception ex) {
				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
			}
		}
		
		@PatchMapping("/updateContent")
 		public ResponseEntity<?> updateContent(@RequestBody UsuarioVendedor user) {
 			try {
 				repository.updateContent(user.getId(), user.getNome(), user.getCpf(), user.getEndereco(),
 						user.getNumero(), user.getComplemento(), user.getBairro(), user.getCidade(),
 						user.getEstado(), user.getEmail(), user.getContato1(), user.getContato2(), user.getStatus());
 				return ResponseEntity.status(200).body(user);

 			}catch(Exception ex) {
 				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
 			}
 		}
		
	  
 }
 
