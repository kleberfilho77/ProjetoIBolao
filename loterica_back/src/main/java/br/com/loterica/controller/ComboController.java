package br.com.loterica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.BolaoCombo;
import br.com.loterica.entity.Combo;
import br.com.loterica.entity.Cota;
import br.com.loterica.entity.Meta;
import br.com.loterica.repository.BolaoComboRepository;
import br.com.loterica.repository.ComboRepository;



@ResponseBody
@RestController
@RequestMapping("/combo")
public class ComboController {

	
	@Autowired
	private ComboRepository repository;
	
	@Autowired
	private BolaoComboRepository combolaoRepository;
	
	
	@RequestMapping(value = "/create", method = RequestMethod.POST,
	     	consumes = MediaType.APPLICATION_JSON_VALUE,
	        produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createCombo(@RequestBody Combo combo){
		try {
			  List<BolaoCombo> boloes = combo.getBolaoCombo();
			  
			     
			  Combo resp = repository.save(combo);
               
               for(BolaoCombo c : boloes) {
            	   
            	   c.setCombo(resp);
            	   
            	   combolaoRepository.save(c);
               }
          	      if (resp==null) {
				     throw new Exception("Dados Invalidos");
			   }
			      
	   return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
	 ex.printStackTrace();
	   return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	
	
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody Combo combo) {
		try {
			repository.update(combo.getId(), combo.getMultiplicador());
			return ResponseEntity.status(200).body(combo);
		      
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	@GetMapping("/findAll")
	public List<Combo> findAll(){
		
	try {
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findList")
	public List<?> findLists(){
	
	try {
		
		return combolaoRepository.findLists();
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
//	@GetMapping("/findByIdCombo/{id}")
//	public List<?> findByIdCombo(@PathVariable Long id){
//		return repository.findByIdCombo(id);
//	}
}
