package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Meta;

public interface MetaRepository extends JpaRepository<Meta, Long> {
	
	@Query(value="select * from meta"
			+ " where vendedor_id= ?1",
			   nativeQuery = true)
		public List<Meta> findAllMetasVend(Long idVend);
	
	@Transactional
	@Modifying
	@Query
	(value="update meta set valor = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, Integer valor);

}
