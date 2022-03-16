package br.com.loterica;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.UsuarioVendedorRepository;
import br.com.loterica.service.ServiceTransferencia;

@SpringBootApplication
public class LotericaApplication  {
	

	public static void main(String[] args) {
		SpringApplication.run(LotericaApplication.class, args);
	}

 
}

