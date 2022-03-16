export class LinkPagamentoPagCom{
    installmentLimit: number;
    amount: string;
    description: string;
    duedate: string;
    name: string;
    email: string;

    constructor(installmentLimit ?: number, amount ?: string, description ?: string, duedate ?: string,
        name ?: string, email ?: string){

        this.installmentLimit = installmentLimit;
        this.amount = amount; 
        this.description = description;
        this.duedate = duedate;
        this.name = name;
        this.email = email;
    }
}