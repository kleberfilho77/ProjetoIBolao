package br.com.loterica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.loterica.entity.Bolao;
import br.com.loterica.entity.Movimentacao;

@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

//	@Query
//	(value = "select m.descricao, m.credito+m.debito+m.dinheiro+m.pix+m.outros as valor_venda, "
//			+ "m.qtd_cotas_vendidas, m.data "
//			+ "from movimentacao m where vendedor_id = ?1",
//			nativeQuery = true)
//		public List<?> findAllMovimentacaoVendedor(Long id);
	
	@Query
	(value = "select op.nome_cliente, m.data, m.pendente, m.descricao, m.id, m.qtd_cotas_vendidas, op.email_cliente, v.nome "
			+ "from movimentacao m INNER JOIN usuario_vendedor v on v.id = m.vendedor_id"
			+ " INNER JOIN ordem_pagamento op on op.valor = m.credito + m.debito + m.dinheiro + m.outros + m.pix where op.is_pago is not null and m.pendente > 0  group by m.id",
			nativeQuery = true)
		public List<?> findVendasPendentes();
	
	@Query
	(value = "select op.nome_cliente, m.data, m.pendente, m.descricao, m.id, m.qtd_cotas_vendidas, op.email_cliente "
			+ "from movimentacao m INNER JOIN ordem_pagamento op "
			+ "on op.valor = m.credito + m.debito + m.dinheiro + m.outros + m.pix where m.vendedor_id = ?1 and op.is_pago is not null and m.pendente > 0  group by m.id",
			nativeQuery = true)
		public List<?> findVendasPendentesVendedor(Long id);
	
	@Query
	(value = "select op.nome_cliente, m.data, m.pendente, m.descricao, m.id, m.qtd_cotas_vendidas, op.email_cliente, v.nome "
			+ "from movimentacao m INNER JOIN usuario_vendedor v on v.id = m.vendedor_id"
			+ " INNER JOIN ordem_pagamento op on op.valor = m.credito + m.debito + m.dinheiro + m.outros + m.pix where op.is_pago is not null and m.pendente > 0 and ?1 <= replace(REPLACE(m.data, '-', ''), '-','') and ?2 >= replace(REPLACE(m.data, '-', ''), '-','')  group by m.id",
			   nativeQuery = true)
		public List<?> findFromDataToDataAreceber(String de, String ate);
	
	
	@Query
	(value = "select op.nome_cliente, m.data, m.pendente, m.descricao, m.id, m.qtd_cotas_vendidas, op.email_cliente "
			+ "from movimentacao m INNER JOIN ordem_pagamento op "
			+ "on op.valor = m.credito + m.debito + m.dinheiro + m.outros + m.pix where m.vendedor_id = ?1 and op.is_pago is not null and m.pendente > 0 and ?2 <= replace(REPLACE(m.data, '-', ''), '-','') and ?3 >= replace(REPLACE(m.data, '-', ''), '-','')  group by m.id",
			   nativeQuery = true)
		public List<?> findFromDataToDataVendAreceber(Long id, String de, String ate);
	
	
	@Query
	(value = "select op.nome_cliente, m.data, m.pendente, m.descricao, m.id, m.qtd_cotas_vendidas, op.email_cliente, v.nome "
			+ "from movimentacao m INNER JOIN usuario_vendedor v on v.id = m.vendedor_id"
			+ " INNER JOIN ordem_pagamento op on op.valor = m.credito + m.debito + m.dinheiro + m.outros + m.pix where op.is_pago is not null and m.pendente > 0 and op.nome_cliente like concat(?1,'%') group by m.id",
			   nativeQuery = true)
		public List<?> getUsuarioClienteAreceber(String cha);
		
		
		@Query
		(value = "select op.nome_cliente, m.data, m.pendente, m.descricao, m.id, m.qtd_cotas_vendidas, op.email_cliente "
				+ "from movimentacao m INNER JOIN ordem_pagamento op "
				+ "on op.valor = m.credito + m.debito + m.dinheiro + m.outros + m.pix where m.vendedor_id = ?1 and op.is_pago is not null and m.pendente > 0  and op.nome_cliente like concat(?2,'%') group by m.id",
			   nativeQuery = true)
		public List<?> getUsuarioClienteFromVendedorAreceber(Long id, String cha);
	
	@Transactional
	@Modifying
	@Query
	(value="update movimentacao set pendente = ?2 where id = ?1 ",
			   nativeQuery = true)
		public void updatePendente(Long id, Integer pendente);
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda, "
			+ "m.qtd_cotas_vendidas, m.data, v.nome, op.nome_cliente, op.email_cliente, v.contato1, v.cpf, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix, m.pendente "
			+ "from movimentacao m "
			+ " INNER JOIN ordem_pagamento op on op.valor = m.credito INNER JOIN usuario_vendedor v on v.id = op.vendedor_id where ?1 <= replace(REPLACE(m.data, '-', ''), '-','') and ?2 >= replace(REPLACE(m.data, '-', ''), '-','')",
			   nativeQuery = true)
		public List<?> findFromDataToData(String de, String ate);
	
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda,"
			   +"  m.qtd_cotas_vendidas, m.data, op.nome_cliente, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix"
			   +"  from movimentacao m INNER JOIN ordem_pagamento op on m.credito + m.debito + m.dinheiro + m.outros + m.pix = op.valor "
			   + " where op.vendedor_id = ?1 and op.is_pago is not null and m.credito + m.debito + m.dinheiro + m.outros + m.pix > 0  and ?2 <= replace(REPLACE(m.data, '-', ''), '-','') and ?3 >= replace(REPLACE(m.data, '-', ''), '-','') ",
			   nativeQuery = true)
		public List<?> findFromDataToDataVend(Long id, String de, String ate);
	
	
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda, "
			+ "m.qtd_cotas_vendidas, m.data, v.nome, op.nome_cliente, op.email_cliente, v.contato1, v.cpf, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix, m.pendente "
			+ "from movimentacao m "
			+ " INNER JOIN ordem_pagamento op on op.valor = m.credito INNER JOIN usuario_vendedor v on v.id = op.vendedor_id where op.nome_cliente like concat(?1,'%') ",
			   nativeQuery = true)
		public List<?> getUsuarioCliente(String cha);
		
		
		@Query
		(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda,"
				   +"  m.qtd_cotas_vendidas, m.data, op.nome_cliente, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix"
				   +"  from movimentacao m INNER JOIN ordem_pagamento op on m.credito + m.debito + m.dinheiro + m.outros + m.pix = op.valor "
				   + " where op.vendedor_id = ?1 and op.is_pago is not null and m.credito + m.debito + m.dinheiro + m.outros + m.pix > 0 and op.nome_cliente like concat(?2,'%') ",
			   nativeQuery = true)
		public List<?> getUsuarioClienteFromVendedor(Long id, String cha);
	
//	@Query
//	(value = "select op.descricao, op.valor as valor_venda, "
//			+ "m.qtd_cotas_vendidas, m.data, op.nome_cliente, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix "
//			+ "from movimentacao m  INNER JOIN ordem_pagamento op on m.credito + m.debito + m.dinheiro + m.outros + m.pix = op.valor where m.vendedor_id = ?1 and op.is_pago is not null ",
//			nativeQuery = true)
//		public List<?> findAllMovimentacaoVendedor(Long id);
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda,"
		   +"  m.qtd_cotas_vendidas, m.data, op.nome_cliente, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix"
		   +"  from movimentacao m INNER JOIN ordem_pagamento op on m.credito + m.debito + m.dinheiro + m.outros + m.pix = op.valor "
		   + "where op.vendedor_id = ?1 and op.is_pago is not null and m.credito + m.debito + m.dinheiro + m.outros + m.pix > 0 group by op.id",
			nativeQuery = true)
		public List<?> findAllMovimentacaoVendedor(Long id);
	
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda, "
			+ " m.data, op.nome_cliente, op.email_cliente, v.contato1, v.cpf, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix, m.pendente "
			+ "from movimentacao m  INNER JOIN ordem_pagamento op on m.credito + m.debito + m.dinheiro + m.outros + m.pix = op.valor "
			+ " INNER JOIN usuario_vendedor v on v.id = op.vendedor_id where op.id = ?1",
			nativeQuery = true)
		public List<?> findMovimentacaoVendedorExtrato(Long id);
	
	
//	@Query
//	(value = "select m.descricao, m.credito as valor_venda, "
//			+ "m.qtd_cotas_vendidas, m.data, v.nome, op.nome_cliente, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix "
//			+ "from movimentacao m INNER JOIN usuario_vendedor v on v.id = m.vendedor_id"
//			+"  INNER JOIN ordem_pagamento op on op.valor = m.credito where op.is_pago is not null",
//			nativeQuery = true)
//		public List<?> findAllMovimentacao();
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda,"
			+ "			m.qtd_cotas_vendidas, m.data, v.nome, op.nome_cliente, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix "
			+ "			from movimentacao m INNER JOIN ordem_pagamento op on m.credito + m.debito + m.dinheiro + m.outros + m.pix = op.valor "
			+ "			INNER JOIN usuario_vendedor v on v.id = op.vendedor_id where op.is_pago is not null and m.credito + m.debito + m.dinheiro + m.outros + m.pix > 0 group by op.id",
			nativeQuery = true)
		public List<?> findAllMovimentacao();
	
	@Query
	(value = "select op.descricao, m.credito + m.debito + m.dinheiro + m.outros + m.pix as valor_venda, "
			+ "m.qtd_cotas_vendidas, m.data, v.nome, op.nome_cliente, op.email_cliente, v.contato1, v.cpf, op.id, m.credito , m.debito , m.dinheiro , m.outros , m.pix, m.pendente "
			+ "from movimentacao m "
			+"  INNER JOIN ordem_pagamento op on op.valor = m.credito INNER JOIN usuario_vendedor v on v.id = op.vendedor_id where op.id = ?1",
			nativeQuery = true)
		public List<?> findMovimentacaoExtrato(Long id);
	
	@Query
	(value = "select sum(credito), sum(debito), sum(dinheiro), sum(outros), sum(pix), sum(pendente) "
			+ "from movimentacao",
			nativeQuery = true)
		public Object findMovFinanceira();
	
	@Query
	(value = "select sum(credito), sum(debito), sum(dinheiro), sum(outros), sum(pix), sum(pendente) "
			+ "from movimentacao where vendedor_id = ?1",
			nativeQuery = true)
		public Object findMovFinanceiraVendedor(Long id);
	
}
