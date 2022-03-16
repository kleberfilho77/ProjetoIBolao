import { Vendedor } from './../model/vendedor';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadMetas } from "../model/CadMetas";
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class CadMetasService{

     constructor(private https : HttpClient){
  
     }

     public create(metas : CadMetas){
      return  this.https.post(`${URL}/meta/create`,metas);
    }

    public findAll(){
    return  this.https.get<CadMetas[]>(`${URL}/meta/findAll`);
    }

    public update(meta: CadMetas) {
      return this.https.patch<CadMetas>(`${URL}/meta/update`, meta).subscribe(res=>{
        console.log(res);
      });
    }

    public findAllMetasVend(idvendedor:number){
      return  this.https.get<CadMetas[]>(`${URL}/meta/findAllMetasVend/`+idvendedor);
      }
    
}