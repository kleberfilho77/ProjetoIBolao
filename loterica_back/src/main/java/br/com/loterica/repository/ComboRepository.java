package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.BolaoCombo;
import br.com.loterica.entity.Combo;

@Repository
public interface ComboRepository extends JpaRepository<Combo, Long> {

	
	
	@Transactional
	@Modifying
	@Query
	(value="update combo set multiplicador = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, Integer qtd);
	
//	
//	@Query(value="select b.tipo_modalidade ,bc.qtd_cotas,  "
//			+ "	 b.id, bc.combo_id, b.valor_cota "
//			+ "	 FROM bolaocombo bc inner join bolao b on b.id = bc.bolao_id where bc.combo_id=?1",
//			   nativeQuery = true)
//		public List<?> findByIdCombo(Long id);
}


