
import { BolaoCombo } from './bolaocombo';
import { CadBolao } from './cadbolao';

export class CadCombo{
    id:number;
    multiplicador:number;
    bolaoCombo: BolaoCombo[]=[];
    
    constructor(id?:number, multiplicador?:number, comboloes?:BolaoCombo[]){
        this.id = id;
        this.multiplicador = multiplicador;
        this.bolaoCombo = comboloes;
    }

}