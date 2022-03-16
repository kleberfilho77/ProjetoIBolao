import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants";
import { UsuarioUnidadeLoterica } from "../model/UsuarioUnidadeLoterica";

const URL = Constants.URL+"/api";

@Injectable()
export class UsuarioUnidadeLotericaService{

     constructor(private https : HttpClient){
  
     }

   public create(unidade : UsuarioUnidadeLoterica){
       return  this.https.post(`${URL}/create`,unidade);
   }

  public findByEmail(email : string){
    return this.https.get<UsuarioUnidadeLoterica>(`${URL}/findByEmail/`+email);
  }

  public findAll(){
    return  this.https.get<UsuarioUnidadeLoterica[]>(`${URL}/findAll`);
  }

  public update(usuario: UsuarioUnidadeLoterica) {
    return this.https.patch<UsuarioUnidadeLoterica>(`${URL}/update`, usuario).subscribe(res=>{
      console.log(res);
    });
  }

  public resetPassword(user: UsuarioUnidadeLoterica) {
    return this.https.patch<UsuarioUnidadeLoterica>(`${URL}/resetPassword`,user);
  }

}