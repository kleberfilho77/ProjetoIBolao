import { UsuarioClienteFinal } from './../model/usuarioclientefinal';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Constants } from '../constants';


  const URL2 = 'https://api.postmon.com.br/v1/cep';

 const URL = Constants.URL;

@Injectable()
export class UsuarioClienteFinalService{

     constructor(private https : HttpClient){
  
     }

  public buscaCep(vcep: string): Observable<any>{
      return this.https.get<any>(`${URL2}/${vcep}`)
  }
     
   public create(clientefinal : UsuarioClienteFinal){
     console.log(clientefinal);
       return  this.https.post<UsuarioClienteFinal>(`${URL}/rest/create`,clientefinal);
   }

   public findAll(){
    return  this.https.get<UsuarioClienteFinal[]>(`${URL}/rest/findAll`);
  }

  public findRelatorioClienteAdmin(){
    return this.https.get<any[]>(Constants.URL + `/rest/findRelatorioClienteAdmin`);
  }

  public findRelatorioClienteVend(id : number){
    return this.https.get<any[]>(Constants.URL + `/rest/findRelatorioClienteVend/`+id);
  }

  public findAllFromVend(id : number){
    return  this.https.get<UsuarioClienteFinal[]>(`${URL}/rest/findAllFromVend/`+id);
  }

  public findByName(nome : string){
    return  this.https.get<any[]>(`${URL}/rest/findByName/`+nome);
  }

  public findByCpf(cpf : string){
    return  this.https.get<any[]>(`${URL}/rest/findByCpf/`+cpf);
  }

  public findByNameFromVendedor(nome : string, id: number){
    return  this.https.get<any[]>(`${URL}/rest/findByNameFromVendedor/`+nome+`/`+id);
  }

  public findByCpfFromVendedor(cpf : string, id: number){
    return  this.https.get<any[]>(`${URL}/rest/findByCpfFromVendedor/`+cpf+`/`+id);
  }

  public findById(id : number){
    return  this.https.get<UsuarioClienteFinal>(`${URL}/rest/findById/`+id);
  }

  public update(user: UsuarioClienteFinal){
    return this.https.patch(`${URL}/rest/update`, user);
  }

  public updateVendedor(cli: UsuarioClienteFinal, idvend: number){
    return this.https.patch(`${URL}/rest/updateVendedorFromCliente/`+idvend,cli);
  }

}