use bdbolao;

create view v$data as
   select u.id as "usuarioId", u.nome as "nome", c.id_cota as 'idCota', 
   c.quantidade_cota_vendedor as "quantidade",  b.id as "bolaoId"   from usuario_vendedor u inner join cota c    on u.id = c.vendedor_id inner join bolao b
   on b.id = c.bolao_id;


