package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.entity.UsuarioCliente;

public interface UsuarioAdministradorRepository extends JpaRepository<UsuarioAdministrador, Long> {
	
	public UsuarioAdministrador findByEmailAndPassword(String email, String password);
	
	
	@Query
	(value="select * from usuario_administrador where email = ?1 and status is null",
			   nativeQuery = true)
		public UsuarioAdministrador findEmail(String email);
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_administrador set password = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long idusuario, String password);
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_administrador set nome = ?2, cpf = ?3, endereco = ?4, numero = ?5,"
			+ " complemento = ?6, bairro = ?7, cidade = ?8, estado = ?9, email = ?10,"
			+ " contato1 = ?11, contato2 = ?12, status = ?13 where id = ?1 ",
			   nativeQuery = true)
		public void updateContent(Long id, String nome, String cpf, String endereco, String num,
				String compl, String bairro, String cidade, String estado, String email,
				String contato1, String contato2, String status);
	
	@Query
	(value="select * from usuario_administrador where status is null",
			   nativeQuery = true)
		public List<UsuarioAdministrador> findAll();
	
	@Query
	(value="select * from usuario_administrador where nome like concat(?1,'%') ",
			   nativeQuery = true)
		public List<UsuarioAdministrador> getUsuarioAdministrador(String cha);
	
	@Query
	(value="select * from usuario_administrador where cpf like concat(?1,'%') ",
			   nativeQuery = true)
		public List<UsuarioAdministrador> getUsuarioAdministradorByCpf(String cha);
}