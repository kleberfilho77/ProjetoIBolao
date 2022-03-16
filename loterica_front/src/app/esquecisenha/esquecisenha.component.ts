import { Router } from '@angular/router';
import { Login } from '../login/login';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { UsuarioEquipeAdminService } from '../service/usuarioequipeadminservice';
import { UsuarioUnidadeLotericaService } from '../service/usuariounidadelotericaservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';

@Component({
  selector: 'app-esquecisenha',
  templateUrl: './esquecisenha.component.html',
  styleUrls: ['./esquecisenha.component.css']
})
export class EsqueciSenhaComponent {

  login: Login;

  constructor(
    private server: LoginService,
    private router: Router,
    private serviceadmin: UsuarioEquipeAdminService,
    private servicevend: UsuarioEquipeVendedorService,
    private serviceund: UsuarioUnidadeLotericaService
  ) {
    this.login = new Login();
  }

  public seguir() {

    // let perfil = localStorage.getItem("tipoPerfil");
    let user;

    // try{

    //   if (perfil=="VENDEDOR"){
    //     this.servicevend.findByEmail(this.login.email).subscribe(res=>{
    //       user = res;

    //       console.log(res);
    //       this.servicevend.resetPassword(user).subscribe(res2=>{
    //         console.log(res2);
    //       });

    //         this.router.navigate(['/login']);


    //     });



    //   }else if (perfil == "ADMINISTRADOR"){

    //     this.serviceadmin.findByEmail(this.login.email).subscribe(res=>{
    //       user = res;

    //       console.log(res);
    //       this.serviceadmin.resetPassword(user).subscribe(res2=>{
    //         console.log(res2);
    //       });

    //         this.router.navigate(['/login']);

    //     });
    //   }
    //   else{

    //     this.serviceund.findByEmail(this.login.email).subscribe(res=>{
    //       user = res;

    //       console.log(res);
    //       this.serviceund.resetPassword(user).subscribe(res2=>{
    //         console.log(res2);
    //       });

    //         this.router.navigate(['/login']);

    //     });

    //   }



    // }
    // catch{

    // }


    this.servicevend.findByEmail(this.login.email).subscribe(res => {


      if (res == undefined) {
        this.serviceadmin.findByEmail(this.login.email).subscribe(res2 => {


          if (res2 == undefined) {
            this.serviceund.findByEmail(this.login.email).subscribe(res3 => {

              user = res3;

              console.log(res);
              this.serviceund.resetPassword(user).subscribe(res2 => {
                console.log(res2);
              });

              this.router.navigate(['/login']);

            });
          }

          user = res2;

          console.log(res);
          this.serviceadmin.resetPassword(user).subscribe(res2 => {
            console.log(res2);
          });

          this.router.navigate(['/login']);

        });
      }

      user = res;

      console.log(res);
      this.servicevend.resetPassword(user).subscribe(res2 => {
        console.log(res2);
      });

      this.router.navigate(['/login']);

    });

  }
}