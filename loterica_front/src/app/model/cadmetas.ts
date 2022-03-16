
import { UsuarioEquipeVendedor } from './usuarioequipevendedor';

export class CadMetas{
    
    id:number;
    mes:string;
    ano:number;
    valor:number;
    vendedor:UsuarioEquipeVendedor;


    constructor(id?:number, mes?:string, ano?:number, valor?:number,vendedor?:UsuarioEquipeVendedor){
        this.id = id;
        this.mes = mes;
        this.ano = ano;
        this.valor = valor;
        this.vendedor = vendedor;
    }

}