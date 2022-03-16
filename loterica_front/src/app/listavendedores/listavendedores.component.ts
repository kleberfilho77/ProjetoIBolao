import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { Component, OnInit } from '@angular/core';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listavendedores',
  templateUrl: './listavendedores.component.html',
  styleUrls: ['./listavendedores.component.css']
})
export class ListavendedoresComponent implements OnInit {

  mobile:boolean=false;
  nave:string;


  vendedores: UsuarioEquipeVendedor[] = [];

  constructor(private servicevend : UsuarioEquipeVendedorService, private router:Router) { }

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

    this.listar();
    window.scrollTo( 0,0);
  }

  public listar(){
    let name : string;
    this.servicevend.findAll().subscribe(res=>{
      this.vendedores = res;
      for(let i=0; i < res.length; i++){
      name = res[i].nome;
      this.vendedores[i].nome = this.pegaNome(name);
      
      }
    })
  } 

  public pegaNome(nome: string) {
    if (nome.indexOf(' ') == -1) {
      return nome;
    } else {
      let pos = 0;

      for (let i = nome.length - 1; i > 0; i--) {

        if (nome.charAt(i) == ' ') {
          pos = i;
          break;
        }

      }

      let nome2 = nome.substring(nome.indexOf(' ') + 1, nome.indexOf(' ', nome.indexOf(' ') + 1));
      console.log(nome2);

      if (nome2.length <= 3) {
        nome2 = nome.substring(pos + 1, nome.length);
      }

      return nome.substring(0, nome.indexOf(' ')) + " " + nome2;
    }
  }
}
