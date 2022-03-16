import { UsuarioEquipeAdmin } from '../model/usuarioequipeadmin';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Constants } from '../constants';

const URL2 = 'https://api.postmon.com.br/v1/cep';

 const URL = Constants.URL+"/admin";

@Injectable()
export class UsuarioEquipeAdminService{

     constructor(private https : HttpClient){
  
     }

     public buscaCep(vcep: string): Observable<any>{
      return this.https.get<any>(`${URL2}/${vcep}`)
     }
 
   public create(equipe : UsuarioEquipeAdmin){
       return  this.https.post(`${URL}/create`,equipe);                     
   }

   public findAll(){
    return  this.https.get<UsuarioEquipeAdmin[]>(`${URL}/findAll`);
  }

  public findByEmail(email : string){
    return this.https.get<UsuarioEquipeAdmin>(`${URL}/findByEmail/`+email);
  }

  public findById(id : number){
    return  this.https.get<UsuarioEquipeAdmin>(`${URL}/findById/`+id);
  }

  public update(usuario: UsuarioEquipeAdmin) {
    return this.https.patch<UsuarioEquipeAdmin>(`${URL}/update`, usuario).subscribe(res=>{
      console.log(res);
    });
  }

  public updateContent(user: UsuarioEquipeAdmin){
    return this.https.patch(`${URL}/updateContent`, user).subscribe(res=>{
      console.log(res);
    });
  }

  public resetPassword(user: UsuarioEquipeAdmin) {
    return this.https.patch<UsuarioEquipeAdmin>(`${URL}/resetPassword`, user);
  }

  public findByName(nome : string){
    return  this.https.get<UsuarioEquipeAdmin[]>(`${URL}/findByName/`+nome);
  }

  public findByCpf(cpf : string){
    return  this.https.get<UsuarioEquipeAdmin[]>(`${URL}/findByCpf/`+cpf);
  }
  
}