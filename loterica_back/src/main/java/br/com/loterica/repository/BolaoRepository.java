package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.dto.ICotaResponse;
import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.UsuarioCliente;

public interface BolaoRepository extends JpaRepository<Bolao, Long> {

	@Query(value="select u.id as 'usuarioid', u.nome as 'nome', c.id_cota as 'idcota' , "
			+ " c.quantidade_cota_vendedor as 'quantidade',  b.id as 'bolaoid' from "
			+ " usuario_vendedor u inner join cota c on u.id = c.vendedor_id inner join bolao b "
			+ " on b.id = c.bolao_id where c.bolao_id= ?1",
			   nativeQuery = true)
		public List<ICotaResponse> findBybolaoId(Long bolaoId);
	
	@Query(value="select * from bolao "
			+ " where tipo_modalidade= ?1 and status is null",
			   nativeQuery = true)
		public List<Bolao> findBolaoByModalidade(String modalidade);
	
	@Transactional
	@Modifying
	@Query
	(value="update bolao set qtd_cotas_disponiveis = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, Integer qtd);
	
	@Query(value="select * from bolao b inner join cota c on b.id = c.bolao_id"
			+ " where c.vendedor_id= ?1 and c.quantidade_cota_vendedor > 0 and b.status is null and (substring(data_sorteio,6,2) >= substring(extract(year_month from curdate()),5,2) or substring(data_sorteio,1,4) > substring(extract(year_month from curdate()),1,4) ) and "
			+ "	substring(data_sorteio,1,4) >= substring(extract(year_month from curdate()),1,4) and (substring(data_sorteio,9,2) >= substring(curdate(),9,2) or substring(data_sorteio,6,2) > substring(extract(year_month from curdate()),5,2) )",
			   nativeQuery = true)
		public List<Bolao> findAllBoloesVend(Long idVend);
	
	
	@Query(value="select group_concat(b.tipo_modalidade SEPARATOR '-') AS Combo ,sum(bc.qtd_cotas) as TCotas,"
			+ " group_concat(b.id SEPARATOR ',') AS IDS, group_concat(bc.qtd_cotas SEPARATOR '-') AS BCotas, sum(b.valor_cota*bc.qtd_cotas) as total, group_concat(bc.id SEPARATOR ',') AS IDSCOMBOS "
			+ " FROM bolaocombo bc inner join bolao b on b.id = bc.bolao_id where bc.status is null GROUP BY bc.combo_id",
			   nativeQuery = true)
		public List<?> findAllCombos();
	
	@Query
	(value="select group_concat(b.tipo_modalidade SEPARATOR '-') AS Combo ,sum(bc.qtd_cotas) as TCotas,"
			+ " group_concat(b.id SEPARATOR ',') AS IDS, group_concat(bc.qtd_cotas SEPARATOR '-') AS BCotas, sum(b.valor_cota*bc.qtd_cotas) as total "
			+ " FROM bolaocombo bc inner join bolao b on b.id = bc.bolao_id where data_registro between ?1 and ?2 GROUP BY bc.combo_id",
			   nativeQuery = true)
		public List<?> findFromDataToDataCombo(String de, String ate);
	
	
//	@Query(value="select b.tipo_modalidade ,bc.qtd_cotas,  "
//			+ "	 b.id, bc.combo_id, b.valor_cota, b.qtd_cotas as qtdcotas, b.horario_fechamento "
//			+ "	 FROM bolaocombo bc inner join bolao b on b.id = bc.bolao_id",
//			   nativeQuery = true)
//		public List<?> findAllCombos();
	
	@Query(value="select * from bolao where (substring(data_sorteio,6,2) >= substring(extract(year_month from curdate()),5,2) or substring(data_sorteio,1,4) > substring(extract(year_month from curdate()),1,4) ) and"
			+ " substring(data_sorteio,1,4) >= substring(extract(year_month from curdate()),1,4) and (substring(data_sorteio,9,2) >= substring(curdate(),9,2) or substring(data_sorteio,6,2) > substring(extract(year_month from curdate()),5,2) ) and status is null;",
			   nativeQuery = true)
		public List<Bolao> findAllByMonth();
	
	@Query
	(value="select * from bolao where tipo_modalidade like concat(?1,'%')",
			   nativeQuery = true)
		public List<Bolao> getBolao(String cha);
	
	@Query
	(value="select * from bolao where data_sorteio between ?1 and ?2 and status is null",
			   nativeQuery = true)
		public List<Bolao> findFromDataToData(String de, String ate);
	
	
	@Query
	(value="select * from bolao b inner join cota c on c.bolao_id = b.id where data_sorteio between ?2 and ?3  and c.vendedor_id =?1 and status is null",
			   nativeQuery = true)
		public List<Bolao> findFromDataToDataVend(Long id, String de, String ate);

	
	@Query
	(value="select * from bolao where status is null",
			   nativeQuery = true)
		public List<Bolao> findAll();
	
	@Transactional
	@Modifying
	@Query
	(value="update bolao set status = ?2"
			+ " where id = ?1 ",
			   nativeQuery = true)
		public void updateContent(Long id, String status);
	
	@Transactional
	@Modifying
	@Query
	(value="update bolao set qtd_cotas_disponiveis = ?2"
			+ " where id = ?1 ",
			   nativeQuery = true)
		public void updateCotasDisponiveis(Long id, Integer qtdCotasDisponiveis);
	
}
