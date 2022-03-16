package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.UsuarioAdministrador;
import br.com.loterica.entity.UsuarioCliente;
import br.com.loterica.entity.UsuarioVendedor;

public interface UsuarioVendedorRepository  extends JpaRepository<UsuarioVendedor, Long> {

	public UsuarioVendedor findByEmailAndPassword(String email, String password);
	
	@Query
	(value="select * from usuario_vendedor where email = ?1 and status is null",
			   nativeQuery = true)
		public UsuarioVendedor findEmail(String email);
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_vendedor set password = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long idusuario, String password);
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_vendedor set nome = ?2, cpf = ?3, endereco = ?4, numero = ?5,"
			+ " complemento = ?6, bairro = ?7, cidade = ?8, estado = ?9, email = ?10,"
			+ " contato1 = ?11, contato2 = ?12, status = ?13 where id = ?1 ",
			   nativeQuery = true)
		public void updateContent(Long id, String nome, String cpf, String endereco, String num,
				String compl, String bairro, String cidade, String estado, String email,
				String contato1, String contato2, String status);
	
	
	@Query
	(value = "select v.nome , c.quantidade_cota_vendedor "
			+ "from cota c INNER JOIN usuario_vendedor v on v.id = c.vendedor_id where c.bolao_id = ?1",
			nativeQuery = true)
		public List<?> findBolaoVendedores(Long id);
	
	@Query
	(value="select * from usuario_vendedor where status is null",
			   nativeQuery = true)
		public List<UsuarioVendedor> findAll();
	
	@Query
	(value="select * from usuario_vendedor where nome like concat(?1,'%') ",
			   nativeQuery = true)
		public List<UsuarioVendedor> getUsuarioVendedor(String cha);
	
	@Query
	(value="select * from usuario_vendedor where cpf like concat(?1,'%') ",
			   nativeQuery = true)
		public List<UsuarioVendedor> getUsuarioVendedorByCpf(String cha);
}
