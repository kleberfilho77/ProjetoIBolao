import { ExitStatus } from "typescript";

export class UsuarioEquipeVendedor{
    id:number;
    perfil:string;
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
    status:string;
    isSms?: boolean;
    password: string;
    idUsuariounidadeloterica:number;

    constructor(id?:number, perfil?:string, nome?:string, cpf?:string, cep?:string,
        endereco?:string, numero?:string, complemento?:string, bairro?:string,
        cidade?:string, estado?: string, email?:string, contato1?:string, status?:string,
        contato2?:string, sexo?:string, isSms?:boolean, password?:string,unidadelotericaid?:number){

        this.id = id;
        this.perfil = perfil;
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
        this.status = status;
        this.isSms = isSms;
        this.password = password;
        this.idUsuariounidadeloterica = unidadelotericaid;

    }

}