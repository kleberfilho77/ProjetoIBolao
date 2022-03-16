package br.com.loterica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.BolaoCombo;
import br.com.loterica.entity.Combo;
import br.com.loterica.entity.Cota;
import br.com.loterica.repository.BolaoComboRepository;
import br.com.loterica.repository.BolaoRepository;
import br.com.loterica.repository.ComboRepository;

@ResponseBody
@RestController
@RequestMapping("/bolaocombo")
public class BolaoComboController {
	
	@Autowired
	private BolaoComboRepository repository;
	
	@Autowired
	private ComboRepository comborepository;
	
	@Autowired
	private BolaoRepository bolaorepository;
	
	
	
	@GetMapping("/findListById/{id}")
	public List<?> findListById(@PathVariable Long id){
		
		try {
			return repository.findListById(id);
		} catch( Exception ex) {
			return null;
		}
		
		
	}
	
	@GetMapping("/findById/{id}")
	public List<BolaoCombo> findById(@PathVariable Long id){
		
		try {
			return repository.findByBolaoId(id);

		} catch (Exception ex) {
			return null;
		}
	}
	
	@GetMapping("/findByIdBolaoCombo/{id}")
	public BolaoCombo findByIdBolaoCombo(@PathVariable Long id){
	
		try {

			return repository.findById(id).get();

		} catch (Exception ex) {
			return null;
		}
	}
	
	
	@PatchMapping("/updateContent")
	public ResponseEntity<?> updateContent(@RequestBody BolaoCombo bolaocombo) {
		try {
			repository.updateContent(bolaocombo.getId(), bolaocombo.getStatus());
			return ResponseEntity.status(200).body(bolaocombo);

		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
		
	}
	
}
