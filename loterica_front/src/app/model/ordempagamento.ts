import { UsuarioEquipeVendedor } from "./usuarioequipevendedor";

export class Ordempagamento{

    id:number;
    nomeCliente:string;
    emailCliente:string;
    cnpjLoterica:string;
    nomeLoterica:string;
    descricao:string;
    valor:number;
    link:string;
    isPago:string;
    idCota:string;
    idCombo:string;

    vendedorId: number;
    qtdCotasVendidas: number; 

    constructor(id?:number, nomeCliente?:string, emailCliente?:string, cnpjLoterica?:string, nomeLoterica?:string, descricao?:string, valor?:number, link?:string, isPago?:string){

        this.id = id;
        this.nomeCliente = nomeCliente;
        this.emailCliente = emailCliente;
        this.cnpjLoterica = cnpjLoterica;
        this.nomeLoterica = nomeLoterica;
        this.descricao = descricao;
        this.valor = valor;
        this.link = link;
        this.isPago = isPago;
    }
}