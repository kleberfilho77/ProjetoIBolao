
import { Cota } from "./cota";

export class CadBolao{
    id:number;
    tipoModalidade:string;
    numeroSorteio: string;
    dataSorteio: Date;
    horarioSorteio : string;
    horarioFechamento: string;
    dataBolao: string;
    qtdJogos: number;
    qtdDezenas: number;
    qtdCotas: number;
    qtdCotasDisponiveis : number;
    valorCota: number;
    premioPrevisto: number;
    imgpath: string;
    status: string;
    cotas : Cota[]=[];

    constructor(id?:number, tipoModalidade?:string, numeroSorteio?:string, horarioSorteio?:string, dataSorteio?:Date,
                horarioFechamento?:string, dataBolao?: string, qtdJogos?: number, status?:string,
                qtdDezenas?:number, qtdCotas?:number, qtdCotasDisponiveis?:number, valorCotas?:number,
                premioPrevisto?:number, cotas?:Cota[]){

        this.id = id;
        this.tipoModalidade = tipoModalidade;
        this.numeroSorteio = numeroSorteio;
        this.dataSorteio = dataSorteio;
        this.horarioSorteio = horarioSorteio;
        this.horarioFechamento = horarioFechamento;
        this.dataBolao = dataBolao;
        this.qtdJogos = qtdJogos;
        this.qtdDezenas = qtdDezenas;
        this.status = status;
        this.qtdCotas = qtdCotas;
        this.qtdCotasDisponiveis = qtdCotasDisponiveis;
        this.valorCota = valorCotas;
        this.premioPrevisto = premioPrevisto;
        this.cotas = cotas;

    }

}