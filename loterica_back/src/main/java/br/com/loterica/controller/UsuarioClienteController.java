package br.com.loterica.controller;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.loterica.dto.ICotaResponse;
import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.entity.UsuarioCliente;
import br.com.loterica.entity.UsuarioUnidadeLoterica;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.UsuarioAdministradorRepository;
import br.com.loterica.repository.UsuarioClienteRepository;
import br.com.loterica.repository.UsuarioUnidadeLotericaRepository;
import br.com.loterica.repository.UsuarioVendedorRepository;

@ResponseBody
@RestController
@RequestMapping("/rest")
public class UsuarioClienteController {
 
		
	@Autowired
	private UsuarioClienteRepository repository;
	@Autowired
	private UsuarioAdministradorRepository adminRepository;
	@Autowired
	private UsuarioUnidadeLotericaRepository lotericaRepository;
	@Autowired
	private UsuarioVendedorRepository vendedorRepository;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody UsuarioCliente unidade){
		try {
			
			  UsuarioCliente obj =  unidade;
			  obj.setUuid(obj.generatedUUID());
			         
               UsuarioCliente resp = repository.save(obj);			         
			      if (resp==null) {
				     throw new Exception("Dados Invalidos");
			      }
			
			return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	@GetMapping("/findRelatorioClienteAdmin")
	public List<?> findRelatorioClienteAdmin(){
		
	try {	
		
		return repository.findRelatorioClienteAdmin();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findRelatorioClienteVend/{id}")
	public List<?> findRelatorioClienteVend(@PathVariable Long id){
		
	try {	
		
		return repository.findRelatorioClienteVend(id);
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findAll")
	public List<UsuarioCliente> findAll(){
		
	try {	
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAllFromVend/{id}")
	public List<UsuarioCliente> findAllFromVend(@PathVariable("id") Long id){
		
	try {	
		
		return repository.findAllFromVend(id);
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	 
	
 	@PostMapping("/createadmin")
	public ResponseEntity<?> createAdmin(@RequestBody UsuarioAdministrador usuario) {
 		try {
		if (usuario.getPerfil().equals("ADMIN")) {
			usuario.setPassword(criptografia(usuario.getPassword()));
			String token = UUID.randomUUID().toString();
			usuario.setToken(token);
			UsuarioAdministrador resp = adminRepository.save(usuario);
			return ResponseEntity.status(200).body(resp);
		} else {
			 throw new Exception("Acesso do Usuario Illegal");
		}
 		}catch(Exception ex) {
 			Map<String, Object> mapa = new HashMap<String, Object>();
 			  mapa.put("error", ex.getMessage());
 			return ResponseEntity.status(500).body(mapa);
 		}
	}
 	
 	@PostMapping("/createvendedor")
	public ResponseEntity<?> createVendedor(@RequestBody UsuarioVendedor usuario) {
 		try {
		if (usuario.getPerfil().equals("VENDEDOR")) {
			 usuario.setPassword(criptografia(usuario.getPassword()));
			 String token = UUID.randomUUID().toString();
			 usuario.setToken(token);
			 UsuarioVendedor vendedor =vendedorRepository.save(usuario);
			return ResponseEntity.status(200).body(vendedor);
		} else {
			 throw new Exception("Acesso do Usuario Illegal");
		}
 		}catch(Exception ex) {
 			Map<String, Object> mapa = new HashMap<String, Object>();
 			  mapa.put("error", ex.getMessage());
 			return ResponseEntity.status(500).body(mapa);
 		}
	}
 	
 	@PostMapping("/createloterica")
	public ResponseEntity<?> createLoterica(@RequestBody UsuarioUnidadeLoterica usuario) {
 		try {
		if (usuario.getPerfil().equals("LOTERICA")) {
			usuario.setPassword(criptografia(usuario.getPassword()));
			String token = UUID.randomUUID().toString();
			usuario.setToken(token);
			UsuarioUnidadeLoterica loterica = lotericaRepository.save(usuario);
			return ResponseEntity.status(200).body(loterica);
		} else {
			 throw new Exception("Acesso do Usuario Illegal");
		}
 		}catch(Exception ex) {
 			Map<String, Object> mapa = new HashMap<String, Object>();
 			  mapa.put("error", ex.getMessage());
 			return ResponseEntity.status(500).body(mapa);
 		}
	}
 	
 	public String criptografia(String password) throws Exception{
 		MessageDigest md = MessageDigest.getInstance("MD5");
		String chave = "profedsonbelem@gmail.comwww.arq.com.br=1=1+123;";
		md.update((password + chave).getBytes());
		BigInteger hash = new BigInteger(1, md.digest());
		String resposta = hash.toString(16);
		return resposta;
 	}

 	@GetMapping("/findadmin/{email}/{password}")
	public ResponseEntity<?> findAdmin(@PathVariable("email") String email, @PathVariable("password") String password){
		try {
			UsuarioAdministrador response = adminRepository.findByEmailAndPassword(email, password);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 	@GetMapping("/findByName/{nome}")
	public ResponseEntity<?> findCliente(@PathVariable("nome") String nome){
		try {
			List<?> response = repository.getUsuarioCliente(nome);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 	@GetMapping("/findByCpf/{cpf}")
	public ResponseEntity<?> findClienteByCpf(@PathVariable("cpf") String cpf){
		try {
			List<?> response = repository.getUsuarioClienteByCpf(cpf);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 	@GetMapping("/findByNameFromVendedor/{nome}/{id}")
	public ResponseEntity<?> findClienteFromVendedor(@PathVariable("nome") String nome, @PathVariable("id") Long id){
		try {
			List<?> response = repository.getUsuarioClienteFromVendedor(id, nome);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 	@GetMapping("/findByCpfFromVendedor/{cpf}/{id}")
	public ResponseEntity<?> findClienteByCpfFromVendedor(@PathVariable("cpf") String cpf, @PathVariable("id") Long id){
		try {
			List<?> response = repository.getUsuarioClienteByCpfFromVendedor(id, cpf);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 	@GetMapping("/findById/{id}")
	public ResponseEntity<?> findId(@PathVariable("id") Long id){
		try {
			UsuarioCliente response = repository.getUsuarioById(id);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 
 	@RequestMapping(value = "/loginadmin", produces = "application/json", method = RequestMethod.POST)
 	public ResponseEntity<?> loginAdmin(@RequestBody UsuarioAdministrador usuario) {
 		try {
            usuario.setEmail(usuario.getEmail());
 			usuario.setPassword(criptografia(usuario.getPassword()));
			String token = UUID.randomUUID().toString();
			usuario.setToken(token);
 
 			UsuarioAdministrador u = adminRepository.findByEmailAndPassword(usuario.getEmail(), usuario.getPassword());
 			if (u == null) {
 				throw new IllegalArgumentException("Erro no dado do usuario");
 		   } 
 			
 			return ResponseEntity.status(200).body(u);
 		  }catch (Exception ex) {
 			Map<String, Object> mapa = new HashMap<String, Object>() {
 			{
 					put("usuario-error", ex.getMessage());
 					put("status", "nao gravado");
 				}
 			};
 			return ResponseEntity.status(500).body(mapa);
 		}
 
 	}

 
 	@GetMapping("/findvendedor/{email}/{password}")
	public ResponseEntity<?> findVendedor(@PathVariable("email") String email, @PathVariable("password") String password){
		try {
			UsuarioVendedor response = vendedorRepository.findByEmailAndPassword(email, password);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
 	
 		@RequestMapping(value = "/loginvendedor", produces = "application/json", method = RequestMethod.POST)
 	 	public ResponseEntity<?> loginVendedor(@RequestBody UsuarioVendedor usuario) {
 	 		try {
 	            usuario.setEmail(usuario.getEmail());
 	 			usuario.setPassword(criptografia(usuario.getPassword()));
 				String token = UUID.randomUUID().toString();
 				usuario.setToken(token);
 	 
 	 			UsuarioVendedor u = vendedorRepository.findByEmailAndPassword(usuario.getEmail(), usuario.getPassword());
 	 			if (u == null) {
 	 				throw new IllegalArgumentException("Erro no no dado do usuario");
 	 			}
 	 				
 	 			return ResponseEntity.status(200).body(u);
 	 		}catch (Exception ex) {
 	 			Map<String, Object> mapa = new HashMap<String, Object>() {
 	 			{
 	 					put("usuario-error", ex.getMessage());
 	 					put("status", "nao gravado");
 	 				}
 	 			};
 	 			return ResponseEntity.status(500).body(mapa);
 	 		}
  		}
 		
// 		@GetMapping("/findloterica/{email}/{password}")
// 		public ResponseEntity<?> findLoterica(@PathVariable("email") String email, @PathVariable("password") String password){
// 			try {
// 				UsuarioUnidadeLoterica response = lotericaRepository.findByEmailAndPassword(email, password);
// 			  return ResponseEntity.status(200).body(response);
// 			}catch(Exception ex) {
// 				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
// 			}
// 		}
//	
//		@RequestMapping(value = "/loginloterica", produces = "application/json", method = RequestMethod.POST)
// 	 	public ResponseEntity<?> loginLoterica(@RequestBody UsuarioUnidadeLoterica usuario) {
// 	 		try {
// 	            usuario.setEmail1(usuario.getEmail1());
// 	 			usuario.setPassword(criptografia(usuario.getPassword()));
// 				String token = UUID.randomUUID().toString();
// 				usuario.setToken(token);
// 	 
// 				UsuarioUnidadeLoterica u = lotericaRepository.findByEmailAndPassword(usuario.getEmail1(), usuario.getPassword());
// 	 			if (u == null) {
// 	 				throw new IllegalArgumentException("Erro no no dado do usuario");
// 	 			}
// 	 				
// 	 			return ResponseEntity.status(200).body(u);
// 	 		}catch (Exception ex) {
// 	 			Map<String, Object> mapa = new HashMap<String, Object>() {
// 	 			{
// 	 					put("usuario-error", ex.getMessage());
// 	 					put("status", "nao gravado");
// 	 				}
// 	 			};
// 	 			return ResponseEntity.status(500).body(mapa);
// 	 		}
//  		}
 		
 		
 		@PatchMapping("/updateVendedorFromCliente/{id}")
 		public ResponseEntity<?> updateVendedorFromCliente(@PathVariable Long id, @RequestBody UsuarioCliente user) {
 			try {
 				
 				repository.updateVendedorFromCliente(id,user.getId());

 				return ResponseEntity.status(200).body(user);
 			}catch(Exception ex) {
 				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
 			}
 		}
 		
		
 		@PatchMapping("/update")
 		public ResponseEntity<?> update(@RequestBody UsuarioCliente user) {
 			try {
 				repository.update(user.getId(), user.getNome(), user.getCpf(), user.getEndereco(),
 						user.getNumero(), user.getComplemento(), user.getBairro(), user.getCidade(),
 						user.getEstado(), user.getEmail(), user.getContato1(), user.getContato2(), user.getIdVendedor());
 				return ResponseEntity.status(200).body(user);

 			}catch(Exception ex) {
 				return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
 			}
 		}
		
	
}
