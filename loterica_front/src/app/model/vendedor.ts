export class Vendedor{
    id:number;
    nome: string;
    valorMetaFixaVendedor:number[]=[];
    valorMetaVariavelVendedor:number[]=[];

    constructor(id?:number, nome?:string, cotaVendedor?:number[],
         valorMetaFixaVendedor ?: number[], valorMetaVariavelVendedor?: number[]){
        this.id = id;
        this.nome = nome;
        this.valorMetaFixaVendedor = valorMetaFixaVendedor;
        this.valorMetaVariavelVendedor = valorMetaVariavelVendedor;
    }
}