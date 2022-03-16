import { CadBolao } from "./cadbolao";
import { UsuarioEquipeVendedor } from "./usuarioequipevendedor";

export class Cota{
    idCota:number;
    valorCota:number;
    quantidadeCotaVendedor:number;
    bolao : CadBolao;
    vendedor : UsuarioEquipeVendedor;


    constructor(id?:number, valorCota?: number, qtdcotavendedor?:number, bolao?:CadBolao, vendedor?:UsuarioEquipeVendedor){
        
        this.idCota=id;
        this.valorCota=valorCota;
        this.quantidadeCotaVendedor = qtdcotavendedor;
        this.bolao = bolao;
        this.vendedor = vendedor;

    }
}