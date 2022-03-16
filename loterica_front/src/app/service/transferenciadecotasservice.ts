import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants";
import { TransferenciaCotas } from "../model/transferenciadecotas";


 const URL = Constants.URL;

@Injectable()
export class TransferenciaCotasService{

     constructor(private http : HttpClient){
  
     }

     public create(cotas : TransferenciaCotas){
      return  this.http.post(`${URL}/create`,cotas);
  }

    public findAll(){
    return  this.http.get(`${URL}/create`);
  }
 

}