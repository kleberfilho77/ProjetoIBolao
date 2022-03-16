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

import br.com.loterica.dto.ICotaResponse;
import br.com.loterica.dto.TransferenciaDto;
import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.Cota;
import br.com.loterica.entity.UsuarioCliente;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.BolaoRepository;
import br.com.loterica.repository.CotaRepository;
import br.com.loterica.repository.UsuarioVendedorRepository;
import br.com.loterica.service.ServiceTransferencia;

@ResponseBody
@RestController
@RequestMapping("/bolao")
public class BolaoController {
	
	@Autowired
	private BolaoRepository repository;
	
	@Autowired
	private CotaRepository cotaRepository;
	
	@Autowired
	private ServiceTransferencia service;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Bolao bolao){
		try {
			  Bolao obj =  bolao;
               Bolao resp = repository.save(bolao);			         
			      if (resp==null) {
				     throw new Exception("Dados Invalidos");
			   }
			      
	   return ResponseEntity.status(200).body(resp);
		}catch(Exception ex) {
	   return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	@PatchMapping("/updateContent")
	public ResponseEntity<?> updateContent(@RequestBody Bolao bolao) {
		try {
			repository.updateContent(bolao.getId(), bolao.getStatus());
			return ResponseEntity.status(200).body(bolao);

		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
		
	}
	
	@PatchMapping("/updateCotasDisponiveis")
	public ResponseEntity<?> updateCotasDisponiveis(@RequestBody Bolao bolao) {
		try {
			repository.updateCotasDisponiveis(bolao.getId(), bolao.getQtdCotasDisponiveis());
			return ResponseEntity.status(200).body(bolao);

		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	
	
	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody Bolao bolao) {
		try {
			repository.update(bolao.getId(), bolao.getQtdCotasDisponiveis());
			return ResponseEntity.status(200).body(bolao);
		      
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
	
	
	@PostMapping("/createCotasBolaoVendedor")
	public ResponseEntity<?> SalvaNovasCotas(@RequestBody UsuarioVendedor vendedor) {
		try {
			
			List<Bolao>boloes = repository.findAll();
			Cota c = new Cota();
			UsuarioVendedor uv = new UsuarioVendedor();
			uv.setId(vendedor.getId());
			Integer count=0;
            
//            for(Bolao b : boloes) {
			for(int i =0; i < boloes.size();i++){
            	
         	   c.setBolao(boloes.get(i));
         	   c.setVendedor(uv);
         	   c.setQuantidadeCotaVendedor(0);
         	   c.setValorCota(boloes.get(i).getValorCota());
         	   
         	   cotaRepository.save(c);
         	   c = new Cota();
         	   
            }
            return ResponseEntity.status(200).body(c);
		      
		} catch (Exception ex) {
			return ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
	
	
	@RequestMapping(value = "/createcota", method = RequestMethod.POST,
	     	consumes = MediaType.APPLICATION_JSON_VALUE,
	        produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> createCota(@RequestBody Bolao bolao){
		try {
			  List<Cota>cotas = bolao.getCotas();
               Bolao resp = repository.save(bolao);
               for(Cota c : cotas) {
            	   c.setBolao(resp);
            	   cotaRepository.save(c);
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
	
	
	
	@GetMapping("/findAll")
	public List<Bolao> findAll(){
		
		try {
			return repository.findAll();
		}catch(Exception ex) {
			return null;
		}
		
	}
	
	@GetMapping("/findAllByMonth")
	public List<Bolao> findAllByMonth(){
		
		try {
			return repository.findAllByMonth();
		}catch(Exception ex) {
			return null;
		}
		
		
	}
	
	@GetMapping("/findFromDataToData/{de}/{ate}")
	public List<Bolao> findFromDataToData(@PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
		try {

			return repository.findFromDataToData(de, ate);

		} catch (Exception ex) {
			return null;
		}
		
	}
	
	@GetMapping("/findFromDataToDataVend/{idvend}/{de}/{ate}")
	public List<Bolao> findFromDataToDataVend(@PathVariable("idvend")  Long id, @PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
	try {	
		
		return repository.findFromDataToDataVend(id,de,ate);
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	@GetMapping("/findFromDataToDataCombo/{de}/{ate}")
	public List<?> findFromDataToDataCombo(@PathVariable("de")  String de, @PathVariable("ate")  String ate){
		
	try {	
		
		return repository.findFromDataToDataCombo(de,ate);
		
	} catch (Exception ex) {
		return null;
	}
		
	}
	
	
	@GetMapping("/findAllCombos")
	public List<?> findAllCombos(){
		
	try {
		
		return repository.findAllCombos();
		
	} catch (Exception ex) {
		return null;
	}
	
	}
	
	@GetMapping("/findAllBoloesVend/{idvend}")
	public List<Bolao> findAllBoloesVend(@PathVariable("idvend")  Long id){
		
	try {
		
		return repository.findAllBoloesVend(id);
		
	} catch (Exception ex) {
		return null;
	}
	}
	
	@GetMapping("/findById/{id}")
	public Bolao findById(@PathVariable("id")  Long id) {
		
	try {
		
		return repository.findById(id).get();	
		
	} catch (Exception ex) {
		return null;
	}
	}
	 
	
	@GetMapping("/findByTipoMod/{modalidade}")
	public ResponseEntity<?> findBolao(@PathVariable("modalidade") String modalidade){
		try {
			List<Bolao> response = repository.getBolao(modalidade);
		  return ResponseEntity.status(200).body(response);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("Nao Encontrado ..." + ex.getMessage());
		}
	}
  
	@GetMapping("/findAllboloesbymodalidade/{modalidade}")
	public ResponseEntity<?> findBolaoByModalidade(@PathVariable("modalidade")  String modalidade) {
		try {
			List<Bolao> bolao = repository.findBolaoByModalidade(modalidade);
			 return ResponseEntity.status(200).body(bolao);
			}catch(Exception ex) {
				return ResponseEntity.status(500).body("error:" + ex.getMessage());
			}
	}
	
	@GetMapping("/findbybolao/{id}")
	public ResponseEntity<?> findIcotasByIdBolao(@PathVariable("id") Long id){
		try {
		List <ICotaResponse> responses = repository.findBybolaoId(id);
		 return ResponseEntity.status(200).body(responses);
		}catch(Exception ex) {
			return ResponseEntity.status(500).body("error:" + ex.getMessage());
		}
	}
	
	@RequestMapping(value = "/transferenciacota", method = RequestMethod.POST,
	     	consumes = MediaType.APPLICATION_JSON_VALUE,
	        produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> transferenciaCota(@RequestBody TransferenciaDto dto){
		try {
			try {
 			 //  UsuarioVendedor u1 = repou.findById(dto.getIdUsuarioVendedorDe()).get();
 			//   UsuarioVendedor u2 = repou.findById(dto.getIdUsuarioVendedorPara()).get();
 			//  Cota    c1 = 	cotaRepository.findById(dto.getIdCotaDe()).get();
 			//  Cota    c2 = 	cotaRepository.findById(dto.getIdCotaPara()).get();
 	 			  
 			  //505...507
 			  //cota _ 12_ 13
 			  // quantidade_1
 			 int resp =	service.transferenciaCota(dto.getIdUsuarioVendedorDe(), dto.getIdCotaDe(),dto.getIdCotaPara(), dto.getQuantidadeTransferencia(), dto.getIdUsuarioVendedorPara());  
 			  
 		  return ResponseEntity.status(200).body(resp);   
 			 
					}catch(Exception ex) {
					ex.printStackTrace();
					   return ResponseEntity.status(500).body("error ..."); 
				}
					
	   
		}catch(Exception ex) {
	 ex.printStackTrace();
	   return  ResponseEntity.status(500).body("Error :" + ex.getMessage());
		}
	}
	
}
