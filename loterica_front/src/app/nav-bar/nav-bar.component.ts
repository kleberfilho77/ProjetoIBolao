import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { LoginService } from '../service/login.service';
import { UsuarioEquipeAdminService } from '../service/usuarioequipeadminservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  logado:Login;
  perfil:string;

  constructor(private router: Router, private servicevend : UsuarioEquipeVendedorService, 
    private serviceadmin : UsuarioEquipeAdminService, public authService: LoginService) { }

  ngOnInit() {

    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
    localStorage.getItem("perfil") == 'VENDEDOR' || 
   localStorage.getItem("perfil") == 'LOTERICA'){
     
   }else{
     this.router.navigate(['/login']);
   }

    this.perfil = localStorage.getItem("perfil");
  }

  logout() {
    this.authService.logout();
    localStorage.setItem("perfil","");
    this.router.navigate(['/login']);
    }
    
    public tutorial(){
      this.router.navigate(['/bemvindo']);
    }

    public home(){
      this.router.navigate(['/home']);
    }

    public cadcliente(){
      this.router.navigate(['/cadastrobolao']);
    }

    public cadbolaovend(){
      this.router.navigate(['/cadastrobolaovendedor']);
    }

    public cadastrousuario(){
      this.router.navigate(['/cadastrousuario']);
    }

    public cadastrometas(){
      this.router.navigate(['/cadastrometas']);
    }

    public cadastrocombo(){
      this.router.navigate(['/cadastrocombo']);
    }

    public transferenciacota(){
      this.router.navigate(['/transferenciacota']);
    }

    public painelvendedora(){
      this.router.navigate(['/painelvendedora']);
    }

    public prestacontas(){
      this.router.navigate(['/prestacontas']);
    }
    
    public extratovendedora(){
      this.router.navigate(['/extratovendedora']);
    }

    public areceber(){
      this.router.navigate(['/pagamentoareceber']);
    }

    public listausuarios(){
      this.router.navigate(['/listausuarios']);
    }

    public listaboloes(){
      this.router.navigate(['/listaboloes']);
    }

    public listacombos(){
      this.router.navigate(['/listacombos']);
    }

    public listacotas(){
      this.router.navigate(['/listacotas']);
    }

    public listametas(){
      this.router.navigate(['/listametas']);
    }

    public vendaspendentes(){
      this.router.navigate(['/vendaspendentes']);
    }

    public indices(){
      this.router.navigate(['/indices']);
    }

    public templates(){
      this.router.navigate(['/templates']);
    }

    public mudarPerfil(){
      
      if(this.perfil == "ADMINISTRADOR"){

        this.serviceadmin.findById(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
          console.log(res);
          
    
        this.servicevend.findByEmail(res.email).subscribe(res3=>{
          console.log(res3);

              this.gravaLocalStorage(res3.perfil, res3);
              localStorage.setItem("habilitavenda","SIM");
              localStorage.setItem("idVend",res3.id.toString());
              this.router.navigate(['/painelvendedora']);
          
        });
      });

      }
      // else{


      //   this.servicevend.findById(parseInt(localStorage.getItem("idVend"))).subscribe(res=>{

      //     console.log(res);
        
          
      //   this.serviceadmin.findByEmail(res.email).subscribe(res3=>{
  
      //     this.gravaLocalStorage(res3.perfil, res3);
          
      //     window.location.reload();

      //   });
      

      // },error=>{
      //   alert("Este usuário não possui perfil de Administrador")
      // });

      // }
    }

    public gravaLocalStorage(perfil: string, user: any){

    
      localStorage.setItem("perfil", perfil);
  
      if (perfil == "VENDEDOR"){
        localStorage.setItem("nome",user.nome);
        localStorage.setItem("idVend",user.id);
  
      }else{
        localStorage.setItem("nome",user.nome);
        localStorage.setItem("idAdmin",user.id);
  
      }
  
    }

}
