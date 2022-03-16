import { Combopainel } from './../model/combopainel';
import { BolaoCombo } from './../model/bolaocombo';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadCombo } from "../model/CadCombo";
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class CadComboService{

     constructor(private https : HttpClient){
  
     }

     public create(combo : CadCombo){
      return  this.https.post(`${URL}/combo/create`,combo);
     }

    public findAll(){
    return  this.https.get(`${URL}/combo/findAll`);
    }

    public findList(){
        return  this.https.get<Combopainel[]>(`${URL}/combo/findList`);
    }

    public findListById(id: number){
        return this.https.get<BolaoCombo[]>(URL+`/combo/findListById/`+id);
    }


    public findById(id: number){
        return this.https.get<CadCombo>(URL+`/combo/findById/`+id);
    }

    public update(combo : CadCombo) {
        return this.https.patch<CadCombo>(`${URL}/combo/update`, combo).subscribe(res=>{
          console.log(res);
        });
    }

}