import { Ordempagamento } from '../model/ordempagamento';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from '../constants';

 const URL = Constants.URL;


@Injectable()
export class OrdemPagamentoService{

     constructor(private http : HttpClient, private https : HttpClient){
  
     }

   public create(ordem : Ordempagamento){
       return  this.https.post<Ordempagamento>(`${URL}/ordemPagamento/create`,ordem);
   }

   public findAll(){
    return  this.https.get<Ordempagamento[]>(`${URL}/ordemPagamento/findAll`);
  }

  public findByLoterica(cnpj : string){
    return this.https.get<Ordempagamento[]>(`${URL}/ordemPagamento/findByLoterica/`+ cnpj);
  }

  public findById(id : number){
    return this.https.get<Ordempagamento>(`${URL}/ordemPagamento/findById/`+ id);
  }

  public findAllOrdemVend(id: number) {
    return this.https.get<[]>(URL + `/ordemPagamento/findAllOrdemVendedor/` + id);
  }
  public findAllOrdem() {
    return this.https.get<[]>(URL + `/ordemPagamento/findAllOrdem`);
  }

  public findByName(nome : string){
    return  this.https.get<any[]>(`${URL}/ordemPagamento/findByName/`+nome);
}

public findByNameFromVendedor(nome : string, id: number){
    return  this.https.get<any[]>(`${URL}/ordemPagamento/findByNameFromVendedor/`+nome+`/`+id);
}

  public update(ordempagto: Ordempagamento) {
    return this.https.patch<Ordempagamento>(`${URL}/ordemPagamento/update`, ordempagto).subscribe(res=>{
    });
  }

  public enviarEmailCompra(ordem : Ordempagamento){
    console.log(ordem);
    return  this.https.post<Ordempagamento>(`${URL}/ordemPagamento/emailconfirmacao`,ordem);
}


}