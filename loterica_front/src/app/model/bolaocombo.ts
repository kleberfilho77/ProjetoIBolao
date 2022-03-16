import { CadBolao } from "./cadbolao";
import { CadCombo } from "./CadCombo";

export class BolaoCombo{
    id:number;
    combo: CadCombo;
    bolao = new CadBolao;
    qtdCotas : number;
    dataRegistro: Date;
    status : string;

    constructor(id?:number, combo?:CadCombo, bolao?: CadBolao, qtdCotas?:number, dataRegistro?:Date, status?:string){

        this.id = id;
        this.bolao = bolao;
        this.combo = combo;
        this.qtdCotas = qtdCotas;
        this.dataRegistro = dataRegistro;
        this.status = status;
    }

    

}