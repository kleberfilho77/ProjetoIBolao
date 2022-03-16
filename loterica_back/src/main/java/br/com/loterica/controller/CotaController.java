package br.com.loterica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.loterica.dto.ICotaResponse;
import br.com.loterica.entity.Cota;
import br.com.loterica.repository.BolaoRepository;
import br.com.loterica.repository.CotaRepository;

@ResponseBody
@RestController
@RequestMapping("/cota")
public class CotaController {

	
	@Autowired
	private BolaoRepository bolaoRepository;
		
	@Autowired
	private CotaRepository repository;
	
	
	
	//refazer
	
//	@GetMapping("/findByIdBolao/{id}")
//	public List<Cota> findById(@PathVariable("id") Long id){
//		Bolao bolao = bolaoRepository.findById(id).get();
//		List<Cota> g = repository.findAll();
//		List<UsuarioVendedor> vendedor = vendedorRepository.findAll();
//		List<Cota> cotasnovas = new ArrayList<Cota>();
//		
//		
//		for (Cota i : g) {
//			for (Integer b = 0;  b < bolao.getCotas().size(); b++) {
//				if (i.getIdCota() == bolao.getCotas().get(b).getIdCota()) {
//					for (Integer f = 0; f < vendedor.size(); f++) {
//						if (vendedor.get(f).getId() == i.getVendedor().getId()) {
//							i.setVendedor(vendedor.get(f));
//							System.out.println(i.getVendedor());
//							break;
//						}
//					}
//					cotasnovas.add(i);
//				}
//				
//			}
//		}
//		return cotasnovas;
//	}
	@GetMapping("/findAll")
	public List<Cota> findAll(){
		
	try {	
		
		return repository.findAll();
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	@GetMapping("/findById/{id}")
	public Cota findById(@PathVariable Long id) {
		
	try {	
		
		return repository.findById(id).get();
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	@GetMapping("/findByModalidadeVendedor/{vend}/{bolao}")
	public List<?> findByModalidadeVendedor(@PathVariable Long vend, @PathVariable String bolao){
		
	try {	
		
		return repository.findByModalidadeVendedor(vend, bolao);
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	
	@GetMapping("/findByVendedor/{vend}")
	public List<?> findByModalidadeVendedor(@PathVariable Long vend){
		
	try {
		
		return repository.findByVendedor(vend);
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	@GetMapping("/findAll2")
	public List<?> findAll2(){
		
	try {	
		
		return repository.findAll2();
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	
	@GetMapping("/findVendasByVendedor/{id}")
	public List<?> findVendasByVendedor(@PathVariable Long id){
		
	try {	
		
		return repository.findVendasByVendedor(id);
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	
	@GetMapping("/findbolao/{id}")
	public ResponseEntity<?> findByIdBolao(@PathVariable("id") Long id){
		try {
			
		 List <ICotaResponse> response = bolaoRepository.findBybolaoId(id);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody Cota cota) {
		try {
			repository.update(cota.getIdCota(), cota.getQuantidadeCotaVendedor());
			return ResponseEntity.status(200).body(cota);
		      
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
//	@PutMapping(value = "/usuario", produces = "application/json", consumes = "application/json")
//	public ResponseEntity<?> alterar(@RequestBody Usuario usuario) {
//		try {
//			new UsuarioRepository().update(usuario);
//
//			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
//		} catch (Exception ex) {
//			return new ResponseEntity<String>("Deu Ruim",
//
//					HttpStatus.CONFLICT);
//
//		}
//	}
	
	
	
}
