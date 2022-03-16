import { UsuarioEquipeVendedor } from "./usuarioequipevendedor";

export class Movimentacao{

     id : number;
     descricao : string;
	data : string;
     qtdCotasVendidas:number;
     dinheiro:number;
     debito:number;
     credito:number;
     pix:number;
     outros:number;
     pendente:number;
     ordempagId:number;

     vendedor:UsuarioEquipeVendedor;

    

}