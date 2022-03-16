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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.loterica.entity.Meta;
import br.com.loterica.entity.MetaVariavel;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.MetaVariavelRepository;

@ResponseBody
@RestController
@RequestMapping("/metavar")
public class MetaVariavelController {
	
	@Autowired
	private MetaVariavelRepository repository;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody MetaVariavel meta){
		try {
			MetaVariavel resp = repository.save(meta);			         
			      if (resp==null) {
				     throw new Exception("Dados Invalidos");
			   }
			      
	   return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
	   return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	@RequestMapping(value="/remove/{id}", method=RequestMethod.DELETE)
	public void delete(@PathVariable Long id) {
		try {
			repository.deleteById(id);
			
		}catch(Exception ex) {
			
		}
				
	}
	
	@GetMapping("/findAll")
	public List<MetaVariavel> findAll(){
		
	try {	
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody MetaVariavel meta) {
		try {
			repository.update(meta.getId(), meta.getComissao(), meta.getValor());
			return ResponseEntity.status(200).body(meta);

		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	

}
