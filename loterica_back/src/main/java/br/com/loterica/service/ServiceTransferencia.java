package br.com.loterica.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.loterica.entity.Cota;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.CotaRepository;
import br.com.loterica.repository.UsuarioVendedorRepository;

@Service
public class ServiceTransferencia {
 
	@Autowired 
	UsuarioVendedorRepository repository;
	
	
	@Autowired
	CotaRepository repositoryco;
	
	
	private static List<UsuarioVendedor> lista = new ArrayList<UsuarioVendedor>(); 
 
	public void init() {
		lista = repository.findAll();
	}
	
	
	
	public int  transferenciaCota(Long de,Long idCotaDe, Long idCotaPara,
			                      Integer quantidadeTrans,Long para ) 
			 throws Exception {
	 try {
	  UsuarioVendedor respde  =	 repository.findById(de).get();
		 
	  UsuarioVendedor resppara  =	 repository.findById(para).get(); 
	  
		int flag=0;
		int flag2=0;
		Cota requestde = null;
		Cota requestpara = null;
		
		 int indice1  =0;
		 int indice2 =0;
	     Collections.sort(respde.getCotas());
		 Collections.sort(resppara.getCotas());
		 
	    for (Cota c : respde.getCotas()) {
	    	 if (c.getIdCota().equals(idCotaDe)) {
	    		 requestde = c;
	    		 indice1 = (respde.getCotas().contains(c)==true)?respde.getCotas().indexOf(c):-1;
	    		 flag=1;
	    		 break;
	    	 }
	    	
	    }
	    if (indice1==-1) {
	    	throw new Exception("Nao encotrado o indice");
	    }
	    if (flag==0 ) {
	    	throw new Exception("nao foi encontrado a Cota da Transferencia");
	    }
	    
	    
	    for (Cota c : resppara.getCotas()) {
	    	 if (c.getIdCota().equals(idCotaPara)) {
	    		 requestpara = c;
	    		 flag2=1;
	    		 break;
	    	 }
	    	
	    }
	    
	    
	  if (flag==1 && flag2==1) {
	     Integer quantidade  = requestde.getQuantidadeCotaVendedor();
	     
	     if(quantidadeTrans <= quantidade) {
	 
	  	 requestde.
	    setQuantidadeCotaVendedor(requestde.getQuantidadeCotaVendedor() - quantidadeTrans);
	  	 requestpara.setQuantidadeCotaVendedor(requestpara.getQuantidadeCotaVendedor() + quantidadeTrans);
	  	     
	  	    respde.getCotas().set(indice1, requestde);
	  	    resppara.getCotas().set(indice2, requestpara);
	  	  
	  	   // repository.save(respde);
	  	  //  repository.save(resppara);
	  	    repositoryco.save(respde.getCotas().get(indice1));
	  	    repositoryco.save(resppara.getCotas().get(indice2));
	  	  
	  	  
	     }
	     
	     else if(flag2==0) {
	    	 Cota c = new Cota();
	    	 requestde.
	 	    setQuantidadeCotaVendedor(requestde.getQuantidadeCotaVendedor() - quantidadeTrans);
	    	 c.setQuantidadeCotaVendedor(quantidadeTrans);
	 	     respde.getCotas().set(indice1,requestde);
	    	 resppara.getCotas().add(c);
	    	     repository.save(respde);
		  	    repository.save(resppara);
		  	    //repositoryco.save(respde.getCotas().get(indice1));
		  	   // repositoryco.save(resppara.getCotas().get(indice2));
	     }
	     else {
	    	 throw new Exception(" Error de transferencia");
	     }
	  }
	     
		return 1;
		
	}catch(Exception ex) {
		ex.printStackTrace();
		 return 0;
	}
 }
	
	
}
