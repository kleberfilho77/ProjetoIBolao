import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants";
import { PainelVendedora } from "../model/painelvendedora";

 const URL = Constants.URL;

@Injectable()
export class PainelVendedoraService{

     constructor(private https : HttpClient){
  
     }

     public create(painel : PainelVendedora){
      return  this.https.post(`${URL}/create`,painel);
  }

    public findAll(){
    return  this.https.get(`${URL}/findAll`);
  }
 

}