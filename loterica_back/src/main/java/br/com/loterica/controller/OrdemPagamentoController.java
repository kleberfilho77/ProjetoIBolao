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

import br.com.loterica.entity.Cota;
import br.com.loterica.entity.OrdemPagamento;
import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.repository.OrdemPagamentoRepository;
import br.com.loterica.service.EmailUtilService;

@ResponseBody
@RestController
@RequestMapping("/ordemPagamento")
public class OrdemPagamentoController {
	
	@Autowired
	private OrdemPagamentoRepository repository;
	
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody OrdemPagamento entrada){
		
		
		try {
			
			entrada.setLink("http://api.ibolao.com.br/#/pagamento?chave=");
			
			OrdemPagamento resp =   repository.save(entrada);
			
			 if (resp==null) {
				 throw new Exception("Dados Invalidos");
			 }
			 
			 resp.setLink(resp.getLink() + resp.getId());
			 
			 repository.update(resp.getId(),resp.getLink());
			 
			 return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	@GetMapping("/findById/{id}")
	public OrdemPagamento findById(@PathVariable("id")  Long id) {
	
	try {
		
		return repository.findById(id).get();	
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findAllOrdemVendedor/{iduser}")
	public List<?> findOrdemVendedor(@PathVariable Long iduser){
		
	try {	
		
		return repository.findAllOrdemVendedor(iduser);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAllOrdem")
	public List<?> findOrdem(){
	
	try {	
		
		return repository.findAllOrdem();
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findByLoterica/{cnpj}")
	public List<OrdemPagamento> findByLoterica(@PathVariable("cnpj")  String cnpj) {
		
	try {	
		
		return repository.findByLoterica(cnpj);	
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@PostMapping("/emailconfirmacao")
	public ResponseEntity<?> enviarEmailConfirmacao(@RequestBody OrdemPagamento op){
		EmailUtilService eu = new EmailUtilService();
		
		
		try {
			eu.enviarEmailCompra(op.getEmailCliente(), op);
			
			
			return ResponseEntity.status(200).body(op);
		}catch(Exception ex) {
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody OrdemPagamento op) {
		try {
			repository.updatePagto(op.getId(), op.getIsPago());
			return ResponseEntity.status(200).body(op);
		      
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
	
	@GetMapping("/findByNameFromVendedor/{nome}/{id}")
	public ResponseEntity<?> findClienteFromVendedor(@PathVariable("nome") String nome, @PathVariable("id") Long id){
		try {
			List<?> response = repository.getUsuarioClienteFromVendedor(id, nome);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}

}
