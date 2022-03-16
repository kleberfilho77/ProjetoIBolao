package br.com.loterica.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.BolaoCombo;

public interface BolaoComboRepository extends JpaRepository<BolaoCombo, Long> {

	@Query(value="select c.id, b.tipo_modalidade, bc.qtd_cotas, "
			+ "b.valor_cota, b.data_bolao, bc.bolao_id, bc.id as idcombobolao, c.multiplicador "
			+ "from bolaocombo bc "
			+ "inner join combo c on c.id = bc.combo_id "
			+ "inner join bolao b on b.id = bc.bolao_id where bc.status is null order by c.id ",
			   nativeQuery = true)
		public List<?> findLists();
	
	@Query(value="select qtd_cotas, bolao_id from bolaocombo where combo_id = ?1 and status is null",
			   nativeQuery = true)
		public List<?> findListById(Long id);
	
	@Query(value="select * from bolaocombo where bolao_id = ?1 and status is null",
			   nativeQuery = true)
		public List<BolaoCombo> findByBolaoId(Long id);
	
	
	@Transactional
	@Modifying
	@Query
	(value="update bolaocombo set status = ?2"
			+ " where id = ?1 ",
			   nativeQuery = true)
		public void updateContent(Long comboid, String status);
	
}
