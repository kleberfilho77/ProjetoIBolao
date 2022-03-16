package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.UsuarioCliente;
import br.com.loterica.entity.UsuarioUnidadeLoterica;

@Repository
public interface UsuarioClienteRepository extends JpaRepository<UsuarioCliente, Long>{
	
	@Query
	(value="select c.nome, c.cpf, c.email, c.contato1, v.nome as vendedor, c.id from usuario_cliente c "
			+ "	 inner join usuario_vendedor v on v.id = c.id_vendedor where c.nome like concat(?1,'%') ",
			   nativeQuery = true)
		public List<?> getUsuarioCliente(String cha);
	
	@Query
	(value="select c.nome, c.cpf, c.email, c.contato1, v.nome as vendedor, c.id from usuario_cliente c "
			+ "	inner join usuario_vendedor v on v.id = c.id_vendedor where c.cpf like concat(?1,'%') ",
			   nativeQuery = true)
		public List<?> getUsuarioClienteByCpf(String cha);
	
	@Query
	(value="select c.nome, c.cpf, c.email, c.contato1, v.nome as vendedor, c.id from usuario_cliente c "
		+  " inner join usuario_vendedor v on v.id = c.id_vendedor where c.nome like concat(?2,'%') and c.id_vendedor = ?1 ",
			   nativeQuery = true)
		public List<?> getUsuarioClienteFromVendedor(Long id, String cha);
	
	@Query
	(value="select c.nome, c.cpf, c.email, c.contato1, v.nome as vendedor, c.id from usuario_cliente c"
			+ " inner join usuario_vendedor v on v.id = c.id_vendedor where c.cpf like concat(?2,'%') and c.id_vendedor = ?1",
			   nativeQuery = true)
		public List<?> getUsuarioClienteByCpfFromVendedor(Long id, String cha);
	
	@Query
	(value="select * from usuario_cliente where id = ?1 ",
			   nativeQuery = true)
		public UsuarioCliente getUsuarioById(Long id);
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_cliente set nome = ?2, cpf = ?3, endereco = ?4, numero = ?5,"
			+ " complemento = ?6, bairro = ?7, cidade = ?8, estado = ?9, email = ?10,"
			+ " contato1 = ?11, contato2 = ?12, id_vendedor = ?13 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, String nome, String cpf, String endereco, String num,
				String compl, String bairro, String cidade, String estado, String email,
				String contato1, String contato2, Long idVendedor);
	 
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_cliente set id_vendedor = ?1 where id = ?2 ",
			   nativeQuery = true)
		public void updateVendedorFromCliente(Long id, Long idcli);
	
	
	
	@Query(value="select * from usuario_cliente where id_vendedor = ?1 ",
			   nativeQuery = true)
		public List<UsuarioCliente> findAllFromVend(Long idVend);
	
	@Query(value="select c.nome, c.cpf, c.email, c.contato1, v.nome as vendedor, c.id from usuario_cliente c"
			+ " inner join usuario_vendedor v on v.id = c.id_vendedor",
			   nativeQuery = true)
		public List<?> findRelatorioClienteAdmin();
	
	@Query(value="select c.nome, c.cpf, c.email, c.contato1, v.nome as vendedor, c.id from usuario_cliente c"
			+ " inner join usuario_vendedor v on v.id = c.id_vendedor where c.id_vendedor = ?1",
			   nativeQuery = true)
		public List<?> findRelatorioClienteVend(Long id);
	 
}

