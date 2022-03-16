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
import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.entity.UsuarioCliente;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.UsuarioAdministradorRepository;
import br.com.loterica.service.UsuarioAdministradorService;
import br.com.loterica.service.EmailUtilService;

@ResponseBody
@RestController
@RequestMapping("/admin")
public class UsuarioAdministradorController {
	
		
	@Autowired
	private UsuarioAdministradorRepository repository;
	
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody UsuarioAdministrador  adm){
		try {
			  UsuarioAdministrador resp=	repository.save(adm);
			  if (resp==null) {
				   throw new Exception("Dados Invalidos");
			   }
			return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	
	@GetMapping("/findByName/{nome}")
	public ResponseEntity<?> findAdministrador(@PathVariable("nome") String nome){
		try {
			List<UsuarioAdministrador> response = repository.getUsuarioAdministrador(nome);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 	@GetMapping("/findByCpf/{cpf}")
	public ResponseEntity<?> findAdministradorByCpf(@PathVariable("cpf") String cpf){
		try {
			List<UsuarioAdministrador> response = repository.getUsuarioAdministradorByCpf(cpf);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	
	@PatchMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@RequestBody UsuarioAdministrador adm){
		EmailUtilService eu = new EmailUtilService();
		String senha = eu.gerarSenha();
		
		try {
			eu.enviarEmail(adm.getEmail(), senha);
//			eu.enviarEmail("araujofletes@gmail.com", senha);
			adm.setPassword(senha);
			repository.update(adm.getId(), senha);
			  
			return ResponseEntity.status(200).body(adm);
		}catch(Exception ex) {
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	@GetMapping("/findById/{id}")
	public UsuarioAdministrador findById(@PathVariable("id")  Long id) {
		
	try {	
		
		return repository.findById(id).get();	
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	 
	@GetMapping("/findAll")
	public List<UsuarioAdministrador> findAll(){
		
	try {	
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findByEmail/{email}")
	public UsuarioAdministrador findByEmail(@PathVariable("email")  String email) {
		
	try {
		
		return repository.findEmail(email);	
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody UsuarioAdministrador usuario) {
		try {
			repository.update(usuario.getId(), usuario.getPassword());
			return ResponseEntity.status(200).body(usuario);

		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	@PatchMapping("/updateContent")
		public ResponseEntity<?> updateContent(@RequestBody UsuarioAdministrador user) {
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
