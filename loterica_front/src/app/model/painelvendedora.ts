
import { CadBolao } from './cadbolao';
import { Comprador } from './comprador';
import { Pagamento } from './pagamento';

export class PainelVendedora{
    id:number;
    bolao:CadBolao[]=[];
    comprador: Comprador;
    pagamento: Pagamento;


    constructor(id?:number, bolao?:CadBolao[], comprador?:Comprador, pagamento?:Pagamento){
        this.id = id;
        this.bolao = bolao;
        this.comprador = comprador;
        this.pagamento = pagamento;
    }

}