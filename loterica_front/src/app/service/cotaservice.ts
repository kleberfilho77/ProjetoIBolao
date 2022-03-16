import { BolaoVendedor } from './../model/bolaovendedor';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cota } from "../model/cota";
import { CotaResponse } from "../model/cotaresponse";
import { ViewVendas } from '../model/viewvendas';
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class CotaService{

     constructor(private https : HttpClient){
     }

     public findAll(){
      return this.https.get<Cota[]>(`${URL}/cota/findAll/`);
    }

  public findByIdBolao(id:number){
    return this.https.get<CotaResponse[]>(`${URL}/cota/findbolao/`+ id);
  }

  public findById(id:number){
    return this.https.get<Cota>(URL+`/cota/findById/`+id);
  }

  public update(cota: Cota) {
    return this.https.patch<Cota>(`${URL}/cota/update`, cota).subscribe(res=>{
      console.log(res);
    });
  }

  public findByModalidadeVendedor(modalidade:string, idvendedor:number){
    return this.https.get<BolaoVendedor[]>(`${URL}/cota/findByModalidadeVendedor/`+ idvendedor +'/' + modalidade);
  }

  public findByVendedor(idvendedor:number){
    return this.https.get<BolaoVendedor[]>(`${URL}/cota/findByVendedor/`+ idvendedor);
  }

  public findAll2(){
    return this.https.get<BolaoVendedor[]>(`${URL}/cota/findAll2/`);
  }

  public findVendasByVendedor(vend:number){
    return this.https.get<ViewVendas[]>(`${URL}/cota/findVendasByVendedor/`+vend);
  }

  //this.https.put<Cota>(`${URL}/cota/update`, cota);
}


