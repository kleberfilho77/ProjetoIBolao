export class BolaoVendedor{


    tipoModalidade : string;
    dataBolao : Date;
    valorCota : number;
    quantidadeCotaVendedor : number;
    id : number;

    constructor(tipoModalidade?:string, dataBolao?:Date, valorCota?:number, quantidadeCotaVendedor?:number, idcota?:number){
        this.tipoModalidade = tipoModalidade;
        this.dataBolao = dataBolao;
        this.valorCota = valorCota;
        this.quantidadeCotaVendedor = quantidadeCotaVendedor;
        this.id = idcota;
    }
}