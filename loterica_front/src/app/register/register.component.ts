import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { UsuarioEquipeVendedor } from './../model/usuarioequipevendedor';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { UsuarioEquipeAdminService } from '../service/usuarioequipeadminservice';
import { UsuarioEquipeAdmin } from '../model/usuarioequipeadmin';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  
  login: Login;
  usuario : UsuarioEquipeVendedor;
  usuarioadm :  UsuarioEquipeAdmin;
  show: boolean = false;

  constructor(
    private service: UsuarioEquipeVendedorService,
    private serviceadm: UsuarioEquipeAdminService,
    private router: Router
  ) {
    this.usuario = new UsuarioEquipeVendedor();
    this.usuarioadm = new UsuarioEquipeAdmin();
  }

     public registrar(){ 

      if((document.getElementById("flexCheckDefault2")as HTMLInputElement).checked == true){

      this.serviceadm.findByEmail(this.usuario.email).subscribe(res => {
      if (res == undefined) {
      this.service.findByEmail(this.usuario.email).subscribe(res2 => {
        let senha = this.usuario.password;
        let flag = false;
        
        console.log("vendedor:",res2);
        this.usuario = res2;

        console.log("senha atual: ", this.usuario.password);

        if(this.usuario.password == null){
          localStorage.setItem('nome', this.usuario.nome);
          this.usuario.password = senha;
          console.log("senha nova: ",senha);
          flag = true;
        }
        else{
          alert("Usuario ja cadastrado");
          return;
        }

        if (flag){
          this.service.update(this.usuario);
        }
        

      }, error => {
        alert("Email não cadastrado");
      });
      this.router.navigate(['/login']);
    }
        let senha = this.usuario.password;
        let flag = false;
        
        console.log("vendedor:",res);
        this.usuarioadm = res;

        console.log("senha atual: ", this.usuarioadm.password);

        if(this.usuarioadm.password == null){
          localStorage.setItem('nome', this.usuarioadm.nome);
          this.usuarioadm.password = senha;
          console.log("senha nova: ",senha);
          flag = true;
        }
        else{
          alert("Usuario ja cadastrado");
          return;
        }

        if (flag){
          this.serviceadm.update(this.usuarioadm);
        }
        

      }, error => {
        alert("Email não cadastrado");
      });
      this.router.navigate(['/login']);

    }else{
      alert("É preciso concordar com os termos e política para efetuar o cadastro");
    }
    
  }

  public showpass(){
    if(this.show == false){
    (document.getElementById("senharepetida")as HTMLInputElement).setAttribute("type","text");
    (document.getElementById("senha")as HTMLInputElement).setAttribute("type","text");
    
    this.show = true;
    }else{
      (document.getElementById("senharepetida")as HTMLInputElement).setAttribute("type","password");
      (document.getElementById("senha")as HTMLInputElement).setAttribute("type","password");
      this.show = false;
    }
  }

  public verificar(){
    if((document.getElementById("senharepetida") as HTMLInputElement).value != this.usuario.password ){
      document.getElementById("showInputField2").setAttribute("style","font-size: 20px; display: inline; position: absolute; z-index: 999; padding-top: 5px; padding-left: 3px;");
      document.getElementById("showInputField1").setAttribute("style","font-size: 19px; display: none; position: absolute; z-index: 999; padding-top: 3px;");
    }else{
      document.getElementById("showInputField1").setAttribute("style","font-size: 19px; display: inline; position: absolute; z-index: 999; padding-top: 5px; padding-left: 3px;");
      document.getElementById("showInputField2").setAttribute("style","font-size: 20px; display: none; position: absolute; z-index: 999; padding-top: 3px;");
    }
  }

  voltarNavigate(){
    this.router.navigate(['navigate']);
  }
}