
export class MetaVariavel{
    id:number;
    valor:number;
    comissao:number;
    
    constructor (comissao?:number, valor?:number, id?:number){
        this.id = id;
        this.valor = valor;
        this.comissao = comissao
    }

}