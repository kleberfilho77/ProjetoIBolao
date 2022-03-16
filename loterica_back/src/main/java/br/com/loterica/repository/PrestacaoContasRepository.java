package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.PrestacaoContas;

public interface PrestacaoContasRepository extends JpaRepository<PrestacaoContas, Long> {

	@Transactional
	@Modifying
	@Query
	(value="update prestacao_contas set valor_pago = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, Integer valorpago);
	
	
	@Query
	(value="select * from prestacao_contas order by id",
	nativeQuery = true)
	public List<PrestacaoContas> findAll();
	
	
	@Query(value="select v.nome, sum(p.valor_vendas - p.valor_pago), v.id from prestacao_contas p "
			+ " INNER JOIN usuario_vendedor v on p.vendedor_id = v.id group by v.id",
			   nativeQuery = true)
		public List<?> findAllPrestaContasVend();
	
	@Query(value="select v.nome, p.valor_vendas, p.valor_pago, p.data, p.id, p.lancamento_previo from prestacao_contas p "
			+ " INNER JOIN usuario_vendedor v on p.vendedor_id = v.id"
			+ " where p.vendedor_id = ?1",
			   nativeQuery = true)
		public List<?> findAllPrestaContasByVend(Long id);
	
	@Query(value="select * from prestacao_contas where vendedor_id = ?1 order by id",
			   nativeQuery = true)
		public List<PrestacaoContas> findByIdVendedor(Long id);
	
	
	@Query
	(value="select v.nome, p.valor_vendas, p.valor_pago, p.data, p.id, p.lancamento_previo from prestacao_contas p "
			+ " INNER JOIN usuario_vendedor v on p.vendedor_id = v.id"
			+ " where p.vendedor_id = ?1 and p.data between ?2 and ?3 and status is null",
			   nativeQuery = true)
		public List<?> findFromDataToData(Long id, String de, String ate);
	
}