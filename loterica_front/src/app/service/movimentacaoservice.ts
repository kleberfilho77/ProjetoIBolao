import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movimentacao } from "../model/movimentacaoentrada";
import { Constants } from '../constants';

 const URL = Constants.URL+"/movimentacao";


@Injectable()
export class MovimentacaoService{
    constructor(private https : HttpClient){}

    public create(mov : Movimentacao){
        return  this.https.post(`${URL}/create`, mov);
    }

    public findFromDataToData(de:string, ate:string){
        return this.https.get<any[]>(`${URL}/findFromDataToData/`+de+`/`+ate);
    }

    public findFromDataToDataVend(id:number,de:string, ate:string){
        return this.https.get<any[]>(`${URL}/findFromDataToDataVend/`+id+`/`+de+`/`+ate);
    }


    public findFromDataToDataAreceber(de:string, ate:string){
        return this.https.get<any[]>(`${URL}/findFromDataToDataAreceber/`+de+`/`+ate);
    }

    public findFromDataToDataVendAreceber(id:number,de:string, ate:string){
        return this.https.get<any[]>(`${URL}/findFromDataToDataVendAreceber/`+id+`/`+de+`/`+ate);
    }

    public findByName(nome : string){
        return  this.https.get<any[]>(`${URL}/findByName/`+nome);
    }

    public findByNameAreceber(nome : string){
        return  this.https.get<any[]>(`${URL}/findByNameAreceber/`+nome);
    }

    public findByNameAreceberVend(nome : string, id: number){
        return  this.https.get<any[]>(`${URL}/findByNameFromVendedorAreceber/`+nome+`/`+id);
    }

    public findByNameFromVendedor(nome : string, id: number){
        return  this.https.get<any[]>(`${URL}/findByNameFromVendedor/`+nome+`/`+id);
    }

    public updatePendente(id:number){
        let body : Movimentacao;

        this.findById(id).subscribe(res => {
            body = res;
            body.pendente = 0;

            return this.https.patch(URL + `/updatePendente`, body).subscribe(result=>{});
        });
    }

    public findById(id: number){
        return this.https.get<Movimentacao>(URL + `/findById/`+id);
    }

    public findVendasPendentes(){
		return this.https.get<[]>(URL + `/findVendasPendentes`);
	}
	
	public findVendasPendentesVendedor(id : number){
		return this.https.get<[]>(URL + `/findVendasPendentesVendedor/`+id);
	}

    public findAll(){
        return this.https.get<Movimentacao[]>(`${URL}/findAll`);
    }

    public findAllMovVend(id: number){
        return this.https.get<any[]>(URL + `/findAllMovimentacaoVendedor/`+id);
    }
    public findAllMov(){
        return this.https.get<any[]>(URL + `/findAllMovimentacao`);
    }

    public findMovVendExtrato(id: number){
        return this.https.get<[]>(URL + `/findMovimentacaoVendedorExtrato/`+id);
    }
    public findMovExtrato(id: number){
        return this.https.get<[]>(URL + `/findMovimentacaoExtrato/` +id);
    }

    public findMovFinanceiroVendedor(idvendedor: number){
        return this.https.get<[]>(URL + `/findMovFinanceiroVendedor/`+idvendedor);
    }

    public findMovFinanceiro(){
        return this.https.get<[]>(URL + `/findMovFinanceiro`);
    }

    // public update(meta : MetaVariavel){
    //     return this.https.patch(`${URL}/movimentacao/update`,meta);
    // }

    // public remove(metaid : number){
    //     return this.https.delete(`${URL}/movimentacao/remove/`+metaid);
    // }
}