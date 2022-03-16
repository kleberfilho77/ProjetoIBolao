import { UsuarioEquipeAdmin } from './usuarioequipeadmin';
import { UsuarioEquipeVendedor } from './usuarioequipevendedor';
import { Vendedor } from './vendedor';
export class UsuarioClienteFinal{
    id:number;
    nome:string;
    cpf:string;
    cep:string;
    endereco:string;
    numero:string;
    complemento:string;
    bairro:string;
    cidade:string;
    estado:string;
    email:string;
    contato1: string;
    contato2: string;
    sexo:string;
    idVendedor : number;
    dataCadastro: Date;
    isSms?: boolean;
    senha?: string;

    constructor(id?:number, nome?:string, cpf?:string, cep?:string,
        endereco?:string, numero?:string, complemento?:string, bairro?:string,
        cidade?:string, estado?: string, email?:string, contato1?:string,
        contato2?:string, sexo?:string, idVendedor?:number, dataCadastro?:Date, isSms?:boolean, senha?:string ){


            this.id = id;
            this.nome = nome;
            this.cpf = cpf;
            this.cep = cep;
            this.endereco = endereco;
            this.numero = numero;
            this.complemento = complemento;
            this.bairro = bairro;
            this.cidade = cidade;
            this.estado = estado;
            this.email = email;
            this.contato1 = contato1;
            this.contato2 = contato2;
            this.sexo = sexo;
            this.idVendedor = idVendedor;
            this.dataCadastro = dataCadastro;
            this.isSms = isSms;
            this.senha = senha;

    }

}