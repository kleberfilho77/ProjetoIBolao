import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadBolao } from '../model/cadbolao';
import { UsuarioUnidadeLoterica } from '../model/UsuarioUnidadeLoterica';
import { UsuarioUnidadeLotericaService } from '../service/usuariounidadelotericaservice';

@Component({
  selector: 'app-usuariounidadeloterica',
  templateUrl: './usuariounidadeloterica.component.html',
  styleUrls: ['./usuariounidadeloterica.component.css']
})
export class UsuariounidadelotericaComponent implements OnInit {

  mobile:boolean = false;
  bolao : CadBolao=new CadBolao();
  unidade : UsuarioUnidadeLoterica=new UsuarioUnidadeLoterica();


  constructor(private service : UsuarioUnidadeLotericaService, private router:Router) { 
    // this.bolao.dataBolao =  new Date();
    // console.log( this.bolao.dataBolao);
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
    window.scrollTo( 0,0);
  }


  public gravar(){
    
      
    this.service.create(this.unidade).subscribe(res=>{
       console.log(" dados gravados ");
    });
    this.unidade = new UsuarioUnidadeLoterica();
    document.getElementById("divsuccess").setAttribute("style","color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");
    
    let timer = setTimeout(function(){    
      document.getElementById("divsuccess").setAttribute("style","display: none;");
    }, 5000);
  
  }


}
