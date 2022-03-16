import { BolaoCombo } from './bolaocombo';
export class Combopainel{
    id: number;
    descricao : string;
    multiplicador : number;
    boloes: BolaoCombo[]=[];

    constructor(id?:number, desc?:string, multiplicador?:number, boloes ?:BolaoCombo[]){
        this.id = id;
        this.descricao = desc;
        this.multiplicador = multiplicador;
        this.boloes = boloes;
    }
}