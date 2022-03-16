import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadMetas } from '../model/CadMetas';
import { MetaVariavel } from '../model/metavariavel';
import { CadMetasService } from '../service/cadmetasservice';
import { MetaVariavelService } from '../service/metavariavelservice';

@Component({
  selector: 'app-listametas',
  templateUrl: './listametas.component.html',
  styleUrls: ['./listametas.component.css']
})
export class ListametasComponent implements OnInit {

  mobile:boolean=false;
  nave:string;
  perfil:string;

  metas: CadMetas[] = [];

  metavar : MetaVariavel [] = [];

  selectedValue :string;

  constructor(private service : CadMetasService,
        private varserv : MetaVariavelService,
        private router: Router) { }

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

    this.perfil = localStorage.getItem("perfil");

    if(this.perfil != 'VENDEDOR'){
      this.listar();
      }else{
      this.listarVend();
      }
    // this.selectedValue = "2";
    window.scrollTo( 0,0);
  }

  public listar(){
    this.service.findAll().subscribe(res=>{
      this.metas = res;
    });

    this.varserv.findAll().subscribe(res => {
      this.metavar = res;
    });
  }

  public listarVend(){
    this.service.findAllMetasVend(parseInt(localStorage.getItem("idVend"))).subscribe(res=>{
      this.metas = res;
    });

    this.varserv.findAll().subscribe(res => {
      this.metavar = res;
    });
  }

  public visualizaValor(valor){
    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    if (valor == undefined)
      return ""
    else
      return formatter;
  }

  public preparaValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;

  }

public converter(num:number){
  
 return Number(num/1000).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1});
  
}

}
