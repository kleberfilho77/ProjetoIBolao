export class UsuarioUnidadeLoterica {
    id: number;
    perfil:string;
    numeroUl: string;
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    logradouro: string;
    numero :string;
    complemento : string;
    bairro: string;
    cidade: string; 
    estado: string;
    cep: string;
    contato1: string;
    contato2: string;
    contato3: string;
    telefone1: string;
    telefone2: string;
    telefone3: string;
    emailPrincipal: string;
    email1: string;
    email2: string;
    email3: string;
    isSms: boolean;
    password: string;

    cosntructor(id?: number,
        perfil?:string,
        numeroUl?: string,
        cnpj?: string,
        razaoSocial?: string,
        nomeFantasia?: string,
        logradouro?: string,
        numero?:string,
        complemento?:string,
        bairro?: string,
        cidade?: string,
        estado?: string,
        cep?: string,
        contato1?: string,
        contato2?: string,
        contato3?: string,
        telefone1?: string,
        telefone2?: string,
        telefone3?: string,
        emailPrincipal?: string,
        email1?: string,
        email2?: string,
        email3?: string,
        isSms?: boolean,
        senha?: string) {
        this.id = id;
        this.perfil = perfil;
        this.numeroUl = numeroUl;
        this.cnpj = cnpj;
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.contato1 = contato1;
        this.contato2 = contato2;
        this.contato3 = contato3;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.telefone3 = telefone3;
        this.emailPrincipal = emailPrincipal;
        this.email1 = email1;
        this.email2 = email2;
        this.email3 = email3;
        this.isSms = isSms;
        this.password = senha;
    }

}