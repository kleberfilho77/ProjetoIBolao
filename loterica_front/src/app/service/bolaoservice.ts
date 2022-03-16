import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadBolao } from "../model/cadbolao";

import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class BolaoService{

     constructor(private https : HttpClient){
  
     }

  public create(bolao : CadBolao){
      return  this.https.post(`${URL}/api/create`,bolao);
  }

  public findAll(){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findAll`);
  }

  public findById(){
    return this.https.get<CadBolao>(`${URL}/bolao/findById`);
  }
  
  public findByModalidade(modalidade: string) {
    return this.https.get<CadBolao[]>(`${URL}/api/findbymodalidade`+ modalidade);
  }

}