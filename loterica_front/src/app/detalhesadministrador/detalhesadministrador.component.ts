import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioEquipeAdmin } from '../model/usuarioequipeadmin';
import { UsuarioEquipeAdminService } from '../service/usuarioequipeadminservice';

@Component({
  selector: 'app-detalhesadministrador',
  templateUrl: './detalhesadministrador.component.html',
  styleUrls: ['./detalhesadministrador.component.css']
})
export class DetalhesadministradorComponent implements OnInit {

  equipe: UsuarioEquipeAdmin;
  mobile: boolean = false;
  perfil:string;
  nave: string;

  constructor(private service: UsuarioEquipeAdminService, private router: Router) { }

  ngOnInit() {

   if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
     localStorage.getItem("perfil") == 'VENDEDOR' || 
    localStorage.getItem("perfil") == 'LOTERICA'){
      
    }else{
      this.router.navigate(['/login']);
    }

    if (window.screen.width <= 500) { 
      this.mobile = true;
    }
    localStorage.setItem("flag","false");

    this.service.findById(parseInt(localStorage.getItem("detalhesAdminSelecionado"))).subscribe(res=>{
      this.equipe = res;
    });

    this.perfil = localStorage.getItem("perfil");

    window.scrollTo( 0,0);
  }

  public gravar(){
    this.service.updateContent(this.equipe);
    this.router.navigate(['/home']);
  }

  deletar() {
    if (confirm('Tem certeza que deseja excluir esse usuário?')) {
      // Save it!
      this.equipe.status = "INVALIDO";
      this.service.updateContent(this.equipe);
      this.router.navigate(['/home']);
    } else {
      // Do nothing!
      console.log('usuario não foi excluido da base de dados.');
    }
    
  }

}
