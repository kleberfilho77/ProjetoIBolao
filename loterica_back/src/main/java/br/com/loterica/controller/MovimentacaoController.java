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

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.MetaVariavel;
import br.com.loterica.entity.Movimentacao;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.MovimentacaoRepository;

@ResponseBody
@RestController
@RequestMapping("/movimentacao")
public class MovimentacaoController {
	
	@Autowired
	private MovimentacaoRepository repository;

	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Movimentacao meta){
		String dataatual[];
		dataatual = meta.getData().split("/");
		meta.setData(dataatual[2]+"-"+dataatual[1]+"-"+dataatual[0]);
		
		try {
			Movimentacao resp = repository.save(meta);	
			
			if (resp==null) {
				throw new Exception("Dados Invalidos");
			 }
			      
			return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
			System.out.println(ex.getMessage());
			return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}

//	@GetMapping("/findFromDataToData/{de}/{ate}")
//	public List<Movimentacao> findFromDataToData(@PathVariable("de")  String de, @PathVariable("ate")  String ate){
//		String[] novoDe, novoAte;
//		
//		novoDe = de.split("-");
//		novoAte = ate.split("-");
//		
//		return repository.findFromDataToData(novoDe[2]+"/"+novoDe[1]+"/"+novoDe[0],novoAte[2]+"/"+novoAte[1]+"/"+novoAte[0]);
//		
//	}
	
	@GetMapping("/findFromDataToData/{de}/{ate}")
	public List<?> findFromDataToData(@PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
		try {
		
		
		while(de.contains("-")) {
			de = de.replace("-", "");
		}
		while(ate.contains("-")) {
			ate = ate.replace("-", "");
		}
		System.out.println(de);
		System.out.println(ate);
		
		return repository.findFromDataToData(de,ate);
		
		} catch (Exception ex) {
			return null;
		}
		
	}
	
	@GetMapping("/findFromDataToDataVend/{idvend}/{de}/{ate}")
	public List<?> findFromDataToDataVend(@PathVariable("idvend")  Long id, @PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
	try {	
		
		while(de.contains("-")) {
			de = de.replace("-", "");
		}
		while(ate.contains("-")) {
			ate = ate.replace("-", "");
		}
		
		System.out.println(de);
		System.out.println(ate);
		System.out.println(id);
		return repository.findFromDataToDataVend(id,de,ate);
		
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	
	@GetMapping("/findFromDataToDataAreceber/{de}/{ate}")
	public List<?> findFromDataToDataAreceber(@PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
	try {	
		
		while(de.contains("-")) {
			de = de.replace("-", "");
		}
		while(ate.contains("-")) {
			ate = ate.replace("-", "");
		}
		System.out.println(de);
		System.out.println(ate);
		
		return repository.findFromDataToDataAreceber(de,ate);
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	@GetMapping("/findFromDataToDataVendAreceber/{idvend}/{de}/{ate}")
	public List<?> findFromDataToDataVendAreceber(@PathVariable("idvend")  Long id, @PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
	try {	
		
		while(de.contains("-")) {
			de = de.replace("-", "");
		}
		while(ate.contains("-")) {
			ate = ate.replace("-", "");
		}
		
		System.out.println(de);
		System.out.println(ate);
		System.out.println(id);
		return repository.findFromDataToDataVendAreceber(id,de,ate);
		
	} catch (Exception ex) {
		return null;
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
	
	
	@GetMapping("/findByNameAreceber/{nome}")
	public ResponseEntity<?> findClienteAreceber(@PathVariable("nome") String nome){
		try {
			List<?> response = repository.getUsuarioClienteAreceber(nome);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	@GetMapping("/findByNameFromVendedorAreceber/{nome}/{id}")
	public ResponseEntity<?> findClienteFromVendedorAreceber(@PathVariable("nome") String nome, @PathVariable("id") Long id){
		try {
			List<?> response = repository.getUsuarioClienteFromVendedorAreceber(id, nome);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	@PatchMapping("/updatePendente")
	public ResponseEntity<?> updatePendente(@RequestBody Movimentacao meta) {
		try {
			repository.updatePendente(meta.getId(), meta.getPendente());
			return ResponseEntity.status(200).body(meta);

		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	@GetMapping("/findById/{id}")
	public Movimentacao findById(@PathVariable Long id) {
		
	try {	
		return repository.findById(id).get();
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findVendasPendentes")
	public List<?> findVendasPendentes(){
	
	try {
		
		return repository.findVendasPendentes();
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findVendasPendentesVendedor/{id}")
	public List<?> findVendasPendentesVendedor(@PathVariable Long id){
		
	try {	
		
		return repository.findVendasPendentesVendedor(id);
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findAllMovimentacaoVendedor/{iduser}")
	public List<?> findMovimentacaoVendedor(@PathVariable Long iduser){
		
	try {
		
		return repository.findAllMovimentacaoVendedor(iduser);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findAllMovimentacao")
	public List<?> findMovimentacao(){
		
	try {
		return repository.findAllMovimentacao();
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findMovimentacaoVendedorExtrato/{idordempagto}")
	public List<?> findMovimentacaoVendedorExtrato(@PathVariable Long idordempagto){
	
	try {
		
		return repository.findMovimentacaoVendedorExtrato(idordempagto);
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findMovimentacaoExtrato/{idordempagto}")
	public List<?> findMovimentacaoExtrato(@PathVariable Long idordempagto){
		
	try {	
		
		return repository.findMovimentacaoExtrato(idordempagto);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findMovFinanceiro")
	public Object findMovFinanceiro(){
		
	try {
		
		return repository.findMovFinanceira();
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findMovFinanceiroVendedor/{idvend}")
	public Object findMovFinanceiroVend(@PathVariable Long idvend){
	
	try {	
		
		return repository.findMovFinanceiraVendedor(idvend);
		
	} catch (Exception ex) {
		return null;
	}
		
	}
}
