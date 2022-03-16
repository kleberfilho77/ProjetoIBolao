import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Constants } from '../constants';

const URL2 = 'https://api.postmon.com.br/v1/cep';

const URL = Constants.URL;

@Injectable()
export class UsuarioEquipeVendedorService{

     constructor(private http : HttpClient, private https : HttpClient){
  
     }

     public buscaCep(vcep: string): Observable<any>{
      return this.https.get<any>(`${URL2}/${vcep}`)
  }

   public create(equipe : UsuarioEquipeVendedor){
       return  this.https.post<UsuarioEquipeVendedor>(`${URL}/vendedor/saved`,equipe);
   }


   public findAll(){
    // return  this.https.get<UsuarioEquipeVendedor[]>(`${URL}/vendedor/findAll`);
    return  this.https.get<UsuarioEquipeVendedor[]>(`${URL}/vendedor/findAll`);
  }

  public findById(id : number){
    return this.https.get<UsuarioEquipeVendedor>(`${URL}/vendedor/findById/`+ id);
  }

  public findByEmail(email : string){
    return this.https.get<UsuarioEquipeVendedor>(`${URL}/vendedor/findByEmail/`+email);
  } 

  public findbyEmailAndPassword(email : string, senha : string){
    return this.https.get<UsuarioEquipeVendedor>(`${URL}/vendedor/findvendedor/`+email+`/`+senha);
  }

  public update(usuario: UsuarioEquipeVendedor) {
    return this.https.patch<UsuarioEquipeVendedor>(`${URL}/vendedor/update`, usuario).subscribe(res=>{
    });
  }

  public updateContent(user: UsuarioEquipeVendedor){
    return this.https.patch(`${URL}/vendedor/updateContent`, user).subscribe(res=>{
      console.log(res);
    });
  }

  public findBolaoVendedores(bolaoid:number){
    return  this.https.get<any[]>(`${URL}/vendedor/findBolaoVendedores/`+bolaoid);
  }

  public findByName(nome : string){
    return  this.https.get<UsuarioEquipeVendedor[]>(`${URL}/vendedor/findByName/`+nome);
  }

  public findByCpf(cpf : string){
    return  this.https.get<UsuarioEquipeVendedor[]>(`${URL}/vendedor/findByCpf/`+cpf);
  }

  public resetPassword(user: UsuarioEquipeVendedor) {
    return this.https.patch<UsuarioEquipeVendedor>(`${URL}/vendedor/resetPassword`,user);
  }

}