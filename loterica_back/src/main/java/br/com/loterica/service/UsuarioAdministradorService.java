package br.com.loterica.service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.entity.UsuarioUnidadeLoterica;
import br.com.loterica.entity.UsuarioVendedor;
import br.com.loterica.repository.UsuarioAdministradorRepository;
import br.com.loterica.repository.UsuarioUnidadeLotericaRepository;
import br.com.loterica.repository.UsuarioVendedorRepository;
 

@Service
public class UsuarioAdministradorService {

	@Autowired
	UsuarioAdministradorRepository admin;
	
	@Autowired
	UsuarioVendedorRepository vendedor;
	
	@Autowired
	UsuarioUnidadeLotericaRepository unidade; 

	@Autowired
	private JavaMailSender senderEmail;
    
    
    
    
    
    
    
    
    
 
	public Map<String, Object> criptografia(UsuarioAdministrador u) throws Exception {
		MessageDigest md = MessageDigest.getInstance("MD5");
		String chave = "profedsonbelem@gmail.comwww.arq.com.br=1=1+123;";
		md.update((u.getPassword() + chave).getBytes());
		BigInteger hash = new BigInteger(1, md.digest());
		String resposta = hash.toString(16);
		Map<String, Object> mapa = new HashMap<String, Object>() {
			{
				put("user-password", resposta);
			}
		};
		return mapa;
	}
	
 
	

 
	public Map<String, Object> enviarEmailAdministrador(UsuarioAdministrador u) {
		try {
			SimpleMailMessage msg = new SimpleMailMessage();
			msg.setTo(u.getEmail());
			msg.setSubject("Recuperacao java dia 25 de dezembro hohoho...");
			msg.setText("Seja Bem vindo a minha loja Virtual SR :" + u.getNome());
			senderEmail.send(msg);
			Map<String, Object> mapa = new HashMap<String, Object>() {
				{
					put("email", "email enviado para :" + u.getEmail());
				}
			};
			return mapa;
		} catch (Exception ex) {
			Map<String, Object> mapa = new HashMap<String, Object>() {
				{
					put("error-email", "deu ruim no envio, " + u.getEmail());
				}
			};
			return mapa;
		}
	}
 
	
//	public Object loginGeneric(String perfil, String email, String password) {
//		try {
//		if (perfil.equals("ADMIN")) {
//			UsuarioAdministrador usuarioAdm = admin.findByEmailAndPassword(email, password);
//         	return usuarioAdm ;		
//			
//		}else if (perfil.equals("VENDEDOR")) {
//			UsuarioVendedor uvendedor = vendedor.findByEmailAndPassword(email, password);
//         	return uvendedor ;		
//		}else if(perfil.equals("LOTERICA")) {
//			UsuarioUnidadeLoterica loterica = unidade.findByEmailAndPassword(email, password);
//			return loterica;
//		}else {
//			throw new Exception("Usuario Nao Encontrado");
//		}
//		
//		}catch(Exception ex) {
//			return ex.getMessage();
//		}
// }

}
