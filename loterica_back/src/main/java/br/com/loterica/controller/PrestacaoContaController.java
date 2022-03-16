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

import br.com.loterica.entity.PrestacaoContas;
import br.com.loterica.repository.PrestacaoContasRepository;


@ResponseBody
@RestController
@RequestMapping("/prestacaocontas")
public class PrestacaoContaController {
	
	
	
	@Autowired
	private PrestacaoContasRepository repository;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody PrestacaoContas prestacontas){
		try {
			System.out.println(prestacontas);
			  PrestacaoContas resp = repository.save(prestacontas);			         
			      if (resp==null) {
				     throw new Exception("Dados Invalidos");
			   }
			      
	   return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
	   return  ResponseEntity.status(200).body("Error :" + ex.getMessage());
		}
	}
	
	@GetMapping("/findByIdVendedor/{id}")
	public List<PrestacaoContas> findByIdVendedor(@PathVariable Long id){
		
	try {	
		
		return repository.findByIdVendedor(id);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAll")
	public List<PrestacaoContas> findAll(){
		
	try {	
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAllPrestaContasVend")
	public List<?> findAllPrestaContasVend(){
		
	try {	
		
		return repository.findAllPrestaContasVend();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAllPrestaContasByVend/{id}")
	public List<?> findAllPrestaContasVend(@PathVariable("id")  Long id){
	
	try {	
		
		return repository.findAllPrestaContasByVend(id);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findFromDatatoData/{id}/{de}/{ate}")
	public List<?> findFromDatatoData(@PathVariable("id")  Long id, @PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
	try {
		
		return repository.findFromDataToData(id,de,ate);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody PrestacaoContas prestacontas){
		try {
			repository.update(prestacontas.getId(), prestacontas.getValorPago());
			
			return ResponseEntity.status(200).body(prestacontas);
		      
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}

}
