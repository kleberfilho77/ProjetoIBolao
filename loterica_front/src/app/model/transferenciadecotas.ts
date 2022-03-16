import { CadBolao } from "./cadbolao";
import { Vendedor } from "./vendedor";

export class TransferenciaCotas{
    id:number;
    numeroSorteio: string;
    dataSorteio: Date = new Date();
    horarioFechamento: string;
    dataBolao: Date = new Date();
    qtdJogos: number;
    qtdDezenas: number;
    qtdCotas: number;
    valorCotas: number;
    premioPrevisto: number;
    bolao : CadBolao;
    vendedor : Vendedor[]=[];
    cotaVendedor : number;

    constructor(id?:number, numeroSorteio?:string, dataSorteio?:Date,
                horarioFechamento?:string, dataBolao?: Date, qtdJogos?: number,
                qtdDezenas?:number, qtdCotas?:number, valorCotas?:number,
                premioPrevisto?:number, bolao?:CadBolao,vendedor?:Vendedor[],
                cotaVendedor?: number){

                    this.id = id;
                    this.numeroSorteio = numeroSorteio;
                    this.dataSorteio = dataSorteio;
                    this.horarioFechamento = horarioFechamento;
                    this.dataBolao = dataBolao;
                    this.qtdJogos = qtdJogos;
                    this.qtdDezenas = qtdDezenas;
                    this.qtdCotas = qtdCotas;
                    this.valorCotas = valorCotas;
                    this.premioPrevisto = premioPrevisto;
                    this.bolao = bolao;
                    this.vendedor = vendedor;
                    this.cotaVendedor = cotaVendedor;

    }

}