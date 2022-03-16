export class Pagamento{
    titular :string;
    numerocartao : string;
    bandeira : string;
    parcelas : number;
    codseguranca : string;
    validade :string;
    valor : string;

    constructor(titular?:string, numerocartao?:string, bandeira?:string,
         parcelas?:number, codseguranca?:string, validade?:string, valor?:string){
        this.titular = titular;
        this.numerocartao = numerocartao;
        this.bandeira = bandeira;
        this.parcelas = parcelas;
        this.codseguranca = codseguranca;
        this.validade = validade;
        this.valor = valor;
    }
}