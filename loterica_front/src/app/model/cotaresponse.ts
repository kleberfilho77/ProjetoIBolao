export class CotaResponse{

    idCota:number;
    bolaoId:number;
    usuarioId:number;
    nome:string;
    quantidade:number;

    constructor(idCota?:number, bolaoId?:number, usuarioId?:number,
         nome?:string, quantidade?:number){
             this.idCota=idCota;
             this.bolaoId=bolaoId;
             this.usuarioId=usuarioId;
             this.nome=nome;
             this.quantidade=quantidade;
         }

}