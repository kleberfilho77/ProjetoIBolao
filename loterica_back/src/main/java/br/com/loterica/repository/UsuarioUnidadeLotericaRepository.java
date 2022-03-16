package br.com.loterica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.UsuarioUnidadeLoterica;


@Repository
public interface UsuarioUnidadeLotericaRepository extends JpaRepository<UsuarioUnidadeLoterica, Long>{
	
//	public UsuarioUnidadeLoterica findByEmailAndPassword(String email , String password);
	
	@Query
	(value="select * from usuario_unidade_loterica where email_principal = ?1 ",
			   nativeQuery = true)
		public UsuarioUnidadeLoterica findEmail(String email);
	
	@Transactional
	@Modifying
	@Query
	(value="update usuario_unidade_loterica set password = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long idusuario, String password);
}
