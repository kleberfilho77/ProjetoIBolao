import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioUnidadeLoterica } from '../model/UsuarioUnidadeLoterica';
import { UsuarioUnidadeLotericaService } from '../service/usuariounidadelotericaservice';

@Component({
  selector: 'app-cadastrousuario',
  templateUrl: './cadastrousuario.component.html',
  styleUrls: ['./cadastrousuario.component.css']
})
export class CadastrousuarioComponent implements OnInit {

  mobile: boolean = false;
  perfil: string;
  nave: string;
  selectedValue: any;
  selectedValue2: any;
  unidade: UsuarioUnidadeLoterica = new UsuarioUnidadeLoterica();
  constructor(private service: UsuarioUnidadeLotericaService, private router:Router) {

  }

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
    localStorage.setItem("flag", "false");
    this.perfil = localStorage.getItem("perfil");

    window.scrollTo( 0,0);
  }

  // public mudarUsuario(){
  //   if(this.selectedValue == "2"){
  //     this.selectedValue =3
  //   }else{
  //     this.selectedValue = 2
  //   }

  // }

  public gravar() {
    this.service.create(this.unidade);
  }

  public trocadtvinculada() {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear().toString();

    (document.getElementById("datavinculo") as HTMLInputElement).value = '' + date;
  }

  isShown: boolean = false; // hidden by default


  toggleShow() {
    this.isShown = !this.isShown;

  }

}
