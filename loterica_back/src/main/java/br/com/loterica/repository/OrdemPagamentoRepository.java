package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.OrdemPagamento;

public interface OrdemPagamentoRepository extends JpaRepository<OrdemPagamento, Long> {

	@Transactional
	@Modifying
	@Query
	(value="update ordem_pagamento set link = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void update(Long id, String link);
	
	
	@Query
	(value = "select * "
			+ "from ordem_pagamento where cnpj_loterica = ?1 and is_pago = 'true'",
			nativeQuery = true)
		public List<OrdemPagamento> findByLoterica(String cnpj);
	
	
	@Query
	(value = "select op.descricao, op.valor, "
			+ "op.link, op.nome_cliente "
			+ "from ordem_pagamento op where op.vendedor_id = ?1 and op.is_pago is null",
			nativeQuery = true)
		public List<?> findAllOrdemVendedor(Long id);
	
	@Query
	(value = "select op.descricao, op.valor, "
			+ "op.link, v.nome, op.nome_cliente "
			+ "from ordem_pagamento op INNER JOIN usuario_vendedor v on v.id = op.vendedor_id  where op.is_pago is null",
			nativeQuery = true)
		public List<?> findAllOrdem();
	
	@Query
	(value = "select op.descricao, op.valor, "
			+ "op.link, v.nome, op.nome_cliente "
			+ "from ordem_pagamento op INNER JOIN usuario_vendedor v on v.id = op.vendedor_id  where op.is_pago is null and op.nome_cliente like concat(?1,'%') ",
			   nativeQuery = true)
		public List<?> getUsuarioCliente(String cha);
		
		
		@Query
		(value = "select op.descricao, op.valor, "
				+ "op.link, op.nome_cliente "
				+ "from ordem_pagamento op where op.vendedor_id = ?1 and op.is_pago is null and op.nome_cliente like concat(?2,'%') ",
			   nativeQuery = true)
		public List<?> getUsuarioClienteFromVendedor(Long id, String cha);
	
	
	@Transactional
	@Modifying
	@Query
	(value="update ordem_pagamento set is_pago = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void updatePagto(Long id, String pago);
}
