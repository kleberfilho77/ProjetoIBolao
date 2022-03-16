package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Cota;

public interface CotaRepository  extends JpaRepository<Cota, Long>  {
	
	@Transactional
	@Modifying
	@Query
	(value="update cota set quantidade_cota_vendedor = ?2 where id_cota = ?1 ",
			   nativeQuery = true)
		public void update(Long cotaid, Integer qtdcota);
	
	@Query
	(value = "select b.tipo_modalidade , b.data_bolao, c.valor_cota, c.quantidade_cota_vendedor, c.id_cota, c.bolao_id, b.horario_fechamento, b.qtd_cotas "
			+ "from cota c INNER JOIN bolao b on b.id = c.bolao_id where c.vendedor_id = ?1 and b.tipo_modalidade = ?2 and"
			+ " c.quantidade_cota_vendedor > 0",
			nativeQuery = true)
		public List<?> findByModalidadeVendedor(Long vendedor, String bolao);
	
	
	@Query
	(value = "select b.tipo_modalidade , b.data_bolao, c.valor_cota, c.quantidade_cota_vendedor "
			+ "from cota c INNER JOIN bolao b on b.id = c.bolao_id where c.vendedor_id = ?1 and"
			+ " c.quantidade_cota_vendedor > 0 and b.status is null",
			nativeQuery = true)
		public List<?> findByVendedor(Long vendedor);
	
	@Query
	(value = "select b.tipo_modalidade , b.data_bolao, c.valor_cota, c.quantidade_cota_vendedor, v.nome "
			+ "from cota c INNER JOIN bolao b on b.id = c.bolao_id  INNER JOIN usuario_vendedor v on v.id = c.vendedor_id where"
			+ "	c.quantidade_cota_vendedor > 0 and b.status is null order by valor_cota desc",
			nativeQuery = true)
		public List<?> findAll2();
	
	@Query
	(value = "select b.tipo_modalidade , c.valor_cota, m.qtd_cotas_vendidas "
			+ "from cota c INNER JOIN bolao b on b.id = c.bolao_id INNER JOIN movimentacao_entrada m"
			+ " on m.id_vendedor = c.vendedor_id where c.vendedor_id = ?1",
			nativeQuery = true)
		public List<?> findVendasByVendedor(Long vendedor);

}
