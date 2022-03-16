package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.MetaVariavel;

public interface MetaVariavelRepository extends JpaRepository<MetaVariavel, Long> {

	@Transactional
	@Modifying
	@Query
	(value="update meta_variavel set comissao = ?2, valor = ?3 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, Double value2, Integer value3);
	
	@Query
	(value="select * from meta_variavel order by id",
	nativeQuery = true)
	public List<MetaVariavel>findAll();
	
}
