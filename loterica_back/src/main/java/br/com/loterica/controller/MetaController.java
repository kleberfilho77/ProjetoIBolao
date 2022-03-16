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

import br.com.loterica.entity.Meta;
import br.com.loterica.repository.MetaRepository;

@ResponseBody
@RestController
@RequestMapping("/meta")
public class MetaController {
	
	@Autowired
	private MetaRepository repository;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Meta meta){
		try {
			  Meta resp = repository.save(meta);			         
			      if (resp==null) {
				     throw new Exception("Dados Invalidos");
			   }
			      
	   return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
	   return  ResponseEntity.status(200).body("Error :" + ex.getMessage());
		}
	}
	
	@GetMapping("/findAll")
	public List<Meta> findAll(){
		
	try {	
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAllMetasVend/{id}")
	public List<Meta> findAllMetasVend(@PathVariable Long id){
		
	try {	
		
		return repository.findAllMetasVend(id);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody Meta meta){
		try {
			repository.update(meta.getId(), meta.getValor());
			
			return ResponseEntity.status(200).body(meta);
		      
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}

}
