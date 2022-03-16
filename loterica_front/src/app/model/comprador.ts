export class Comprador{
    id:number;
    nome:string;
    telefone:string;
    cpf:string;

    constructor(id?:number, nome?:string, telefone?:string, cpf?:string){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.cpf = cpf;
    }
}