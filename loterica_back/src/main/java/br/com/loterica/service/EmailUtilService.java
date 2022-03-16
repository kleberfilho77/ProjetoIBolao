package br.com.loterica.service;

import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

import br.com.loterica.entity.OrdemPagamento;

public class EmailUtilService {

	
	private static final String HOSTNAME = "smtp.gmail.com";
    private static final String USERNAME = "sistemaibolao@gmail.com";
    private static final String PASSWORD = "msobmoctfhbqvecx";
	
	
	
	public static String getHostname() {
		return HOSTNAME;
	}

	public static String getUsername() {
		return USERNAME;
	}

	public static String getPassword() {
		return PASSWORD;
	}
	
	
	

	public static Email conectaEmail() throws EmailException{
        Email email = new SimpleEmail();
            email.setHostName(HOSTNAME);
            email.setSmtpPort(587);
            email.setAuthentication(USERNAME, PASSWORD);
            email.setTLS(true);
            email.setSSL(true);
            email.setFrom(USERNAME,USERNAME);
            return email;
    }
	
	 public String gerarSenha(){
		int qtdeMaximaCaracteres = 8;
	    String[] caracteres = { "0", "1", "b", "2", "4", "5", "6", "7", "8",
	                "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
	                "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
	                "x", "y", "z"};
	    
		StringBuilder senha = new StringBuilder();

        for (int i = 0; i < qtdeMaximaCaracteres; i++) {
            int posicao = (int) (Math.random() * caracteres.length);
            senha.append(caracteres[posicao]);
        }
        return senha.toString();
        
	}
    
    
    public String enviarEmail(String para, String senha)throws Exception{
        Email email = new SimpleEmail();
                email = conectaEmail();
                email.setSubject("Recuperação de senha");
                email.addTo(para);
                email.setMsg("Sua senha foi trocada temporariamente para: "+ senha +". Acesse seu perfil para atualizar sua senha");
                email.send(); 
        return "Email Enviado com Sucesso ...";
    }
	
    
    public String enviarEmailCompra(String para, OrdemPagamento ordempag)throws Exception{
        Email email = new SimpleEmail();
                email = conectaEmail();
                email.setSubject("Compra de Bolao - Loterica");
                email.addTo(para);
                
                String valor = ordempag.getValor().toString();
                
                if (ordempag.getValor() < 10) {
                	valor = "0,0" + valor.substring(valor.length()-1);
                }else if (ordempag.getValor() < 100) {
                	valor = (ordempag.getValor()/10) + "," + valor.substring(valor.length()-2);
                }else {
                	valor = (ordempag.getValor()/100) + "," + valor.substring(valor.length()-2);
                }
                
                email.setMsg("Compra aprovada, agradecemos sua preferencia e boa sorte! \n\nResumo da compra\n\n"
                			+"Loterica: "+ ordempag.getNomeLoterica() + "\nCNPJ: "+ ordempag.getCnpjLoterica()
                			+"\nCliente: "+ordempag.getNomeCliente()+"\nValor: R$ " + (valor));
                email.send(); 
        return "Email Enviado com Sucesso ...";
    }
	
	
}
