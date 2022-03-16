import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CadBolao } from "../model/CadBolao";
import { Cota } from "../model/cota";
import { UsuarioEquipeVendedor } from "../model/usuarioequipevendedor";
import { Vendedor } from "../model/vendedor";
import { Constants } from '../constants';

 const URL = Constants.URL;
  
@Injectable()
export class CadBolaoService{

     constructor(private https : HttpClient){
  
     }

  public create(bolao : CadBolao){
      return  this.https.post(`${URL}/bolao/create`,bolao);
  }

  
  public createCotas(bolao : CadBolao){
    return  this.https.post(`${URL}/bolao/createcota`,bolao);
  }

  public findById(id : number){
    return this.https.get<CadBolao>(`${URL}/bolao/findById/`+id);
  }

  public findAll(){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findAll`);
  }

  public findAllByMonth(){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findAllByMonth`);
  }

  public findFromDataToData(de:string, ate:string){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findFromDataToData/`+de+`/`+ate);
  }

  public findFromDataToDataVend(idvend:number,de:string, ate:string){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findFromDataToDataVend/`+idvend+`/`+de+`/`+ate);
  }

  public findFromDataToDataCombo(de:string, ate:string){
    return this.https.get<any[]>(`${URL}/bolao/findFromDataToDataCombo/`+de+`/`+ate);
  }

  public findAllCombos(){
    return this.https.get<any[]>(`${URL}/bolao/findAllCombos`);
  }

  public FindAllBoloesVend(idvend:number){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findAllBoloesVend/`+idvend);
  }
  
  public findAllVendedores(){
    return this.https.get<Vendedor[]>(`${URL}/findallvendedores`);
  }

  public findAllVendedoresByBolao(id:number){
    return this.https.get<Vendedor[]>(`${URL}/findallvendedores/`+ id);
  }

  public findAllBoloesByModalidade(modalidade:string){
    return this.https.get<CadBolao[]>(`${URL}/bolao/findAllboloesbymodalidade/`+ modalidade);
  }

  public findByTipoMod(modalidade : string){
    return  this.https.get<CadBolao[]>(`${URL}/bolao/findByTipoMod/`+modalidade);
  }

  public createCotasBolaoVendedor(equipe : UsuarioEquipeVendedor){
    return  this.https.post(`${URL}/bolao/createCotasBolaoVendedor`,equipe);
}

  // public update(id: number, bolao: CadBolao) {
  //   return this.https.put<CadBolao>(`${URL}/bolao/`+ id, bolao);
  // }

  public update(bolao: CadBolao) {
    return this.https.patch<Cota>(`${URL}/bolao/update`, bolao).subscribe(res=>{
      console.log(res);
    });
  }

  public updateContent(bolao: CadBolao){
    return this.https.patch(`${URL}/bolao/updateContent`, bolao).subscribe(res=>{
      console.log(res);
    });
  }

  public updateCotasDisponiveis(bolao: CadBolao){
    return this.https.patch(`${URL}/bolao/updateCotasDisponiveis`, bolao).subscribe(res=>{
      console.log(res);
    });
  }

}