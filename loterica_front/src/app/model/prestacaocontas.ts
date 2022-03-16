import { UsuarioEquipeVendedor } from "./usuarioequipevendedor";

export class PrestacaoContas{
    id:number;
    valorVendas:number;
    valorPago:number;
    vendedor:UsuarioEquipeVendedor;
    data: string;
    lancamentoPrevio: string;

    constructor(id?:number, valorVendas?:number, valorPago?:number, vendedor?:UsuarioEquipeVendedor){
        this.id = id;
        this.valorVendas = valorVendas;
        this.valorPago = valorPago;
        this.vendedor = vendedor;
    }
}