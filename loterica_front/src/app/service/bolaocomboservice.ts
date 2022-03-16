
import { BolaoCombo } from './../model/bolaocombo';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class BolaoComboService{

     constructor(private https : HttpClient){
  
     }

    public findListById(id: number){
        return this.https.get<any[]>(URL+`/bolaocombo/findListById/`+id);
    }

    public findById(id: number){
        return this.https.get<BolaoCombo[]>(URL+`/bolaocombo/findById/`+id);
    }

    public findByIdBolaoCombo(id: number){
        return this.https.get<BolaoCombo>(URL+`/bolaocombo/findByIdBolaoCombo/`+id);
    }

    public updateContent(bolaocombo: BolaoCombo){
        return this.https.patch(URL+`/bolaocombo/updateContent`, bolaocombo).subscribe(res=>{
          console.log(res);
        });
      }


}