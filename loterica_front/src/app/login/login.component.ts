import { UsuarioEquipeAdmin } from './../model/usuarioequipeadmin';
import { UsuarioUnidadeLotericaService } from './../service/usuariounidadelotericaservice';
import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { UsuarioUnidadeLoterica } from './../model/usuariounidadeloterica';
import { UsuarioEquipeVendedor } from './../model/usuarioequipevendedor';
import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { Router } from '@angular/router';
import { UsuarioEquipeAdminService } from '../service/usuarioequipeadminservice';
import { EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  autenticacao: Login;
    logado:Login;

    mobile : boolean;
    perfil : string="VENDEDOR";
    email : string;
    password : string;
    admin : UsuarioEquipeAdmin;
    vendedor : UsuarioEquipeVendedor;
    unidade : UsuarioUnidadeLoterica;
    erro = true;
    show : boolean = false;

  constructor(private router: Router,
  private serviceadmin : UsuarioEquipeAdminService, private servicevend : UsuarioEquipeVendedorService
  , private serviceund : UsuarioUnidadeLotericaService ) {
    this.logado = new Login();
  }
  ngOnInit(): void {
  this.autenticacao = new Login();

  if (window.screen.width <= 500) { 
    this.mobile = true;
  }
  localStorage.setItem("nome","VENDEDOR");
  localStorage.setItem("habilitavenda","");
  
  }

  logar() {
    this.autenticacao.email = this.autenticacao.email.toLowerCase();

    this.serviceadmin.findByEmail(this.autenticacao.email).subscribe(res=>{
      
      
      if (res==undefined){
        this.serviceund.findByEmail(this.autenticacao.email).subscribe(res2=>{
          

          if (res2 == undefined){
            this.servicevend.findByEmail(this.autenticacao.email).subscribe(res3=>{

              if (res3 == undefined){
                alert("Usuário não encontrado, verifique seu email e senha");
                localStorage.clear();
                this.erro = false;
                return;
              }

              if (this.autenticacao.senha == res3.password &&
                this.autenticacao.email == res3.email){
      
                  this.gravaLocalStorage(res3.perfil, res3);
                   this.router.navigate(['/bemvindo']);
                  //this.router.navigate(['/prepagamento']);
              }else{
                this.erro = false;
                alert("Usuário não encontrado, verifique seu email e senha");
                return;
                
              }    

            });
            return;
          }

          if (this.autenticacao.senha == res2.password &&
            this.autenticacao.email == res2.emailPrincipal){
  
              this.gravaLocalStorage(res2.perfil, res2);
               this.router.navigate(['/bemvindo']);
              //this.router.navigate(['/prepagamento']);
          }else{
            this.erro = false;
            alert("Usuário não encontrado, verifique seu email e senha");
            return;
          }    

        });
        return;
      }


      if (this.autenticacao.senha == res.password &&
        this.autenticacao.email == res.email){

        this.gravaLocalStorage(res.perfil, res);
         this.router.navigate(['/bemvindo']);
        //this.router.navigate(['/prepagamento']);
      }else{
        this.erro = false;
        alert("Usuário não encontrado, verifique seu email e senha");
        return;
        
      }    

    });
    
    // if(this.perfil == "ADMINISTRADOR"){
    //     this.serviceadmin.findByEmail(this.autenticacao.email).subscribe(res=>{
    //         if (res == undefined){
    //           alert("Usuário não encontrado, verifique seu email e senha");
    //           localStorage.clear();
    //           this.erro = false;
    //           return;
    //         }

    //         this.admin = res;

    //         if (this.autenticacao.senha == this.admin.password &&
    //           this.autenticacao.email == this.admin.email){
    
    //             this.gravaLocalStorage(this.perfil, this.admin);
    //             this.router.navigate(['/home']);
    //         }else{
    //           this.erro = false;
    //           alert("Senha inválida");
    //           return;
              
    //         }     

    //     });

      
    //     }else if(this.perfil == "VENDEDOR"){

    //     this.servicevend.findByEmail(this.autenticacao.email).subscribe(res=>{
    //       if (res == undefined){
    //         alert("Usuário não encontrado, verifique seu email e senha");
    //         localStorage.clear();
    //         this.erro = false;
    //         return;
    //       }

    //       this.vendedor = res;

    //       if (this.autenticacao.senha == this.vendedor.password &&
    //         this.autenticacao.email == this.vendedor.email){
  
    //           this.gravaLocalStorage(this.perfil, this.vendedor);
    //           this.router.navigate(['/home']);
    //       }else{
    //         this.erro = false;
    //         alert("Senha inválida");
    //         return;
            
    //       }     

    //     });
      
      
    //     }else if(this.perfil == "LOTERICA"){
    //     this.serviceund.findByEmail(this.autenticacao.email).subscribe(res=>{
    //       if (res == undefined){
    //         alert("Usuário não encontrado, verifique seu email e senha");
    //         localStorage.clear();
    //         this.erro = false;
    //         return;
    //       }

    //       this.unidade = res;

    //       if (this.autenticacao.senha == this.unidade.password &&
    //         this.autenticacao.email == this.unidade.emailPrincipal){
  
    //           this.gravaLocalStorage(this.perfil, this.unidade);
    //           this.router.navigate(['/home']);
    //       }else{
    //         this.erro = false;
    //         alert("Senha inválida");
    //         return;
            
    //       }     

    //     });
    //     }else{
    //       alert("Perfil não selecionado, por favor selecione seu perfil ");
    //     }

  }

  public gravaLocalStorage(perfil: string, user: any){

    
    localStorage.setItem("perfil", perfil);

    if (perfil == "VENDEDOR"){
      localStorage.setItem("nome",user.nome);
      localStorage.setItem("idVend",user.id);

    }else if (perfil == "ADMINISTRADOR"){
      localStorage.setItem("nome",user.nome);
      localStorage.setItem("idAdmin",user.id);

    }
    else if (perfil == "LOTERICA"){
      localStorage.setItem("nome",user.nomeFantasia);
      localStorage.setItem("idLot",user.id);
      localStorage.setItem("logradouro",user.logradouro);
    }

  }

  public perfiladmin(){
    this.perfil = "ADMINISTRADOR";
    localStorage.setItem("tipoPerfil","ADMINISTRADOR");
  }

  public perfilvend(){
    this.perfil = "VENDEDOR";
    localStorage.setItem("tipoPerfil","VENDEDOR");
  }

  public perfilundlot(){
    this.perfil = "LOTERICA";
    localStorage.setItem("tipoPerfil","LOTERICA");
  }

  redirecionar() {
    this.router.navigateByUrl('register');
  }

  public navegar(){
    
    this.router.navigate(['/esquecisenha']);
  }

  public navegarpol(){
    this.router.navigate(['/politica']);
  }

  public navegartu(){
    this.router.navigate(['/termosuso']);
  }

  public navegarinst(){
    this.router.navigate(['/institucional']);
  }

  public showpass(){

    if(this.show == false){
    (document.getElementById("senha")as HTMLInputElement).setAttribute("type","text");
    this.show = true;
    }else{
      (document.getElementById("senha")as HTMLInputElement).setAttribute("type","password");
      this.show = false;
    }
  }
 
}
