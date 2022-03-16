import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BolaoCombo } from '../model/bolaocombo';
import { CadBolaoService } from '../service/cadbolaoservice';

@Component({
  selector: 'app-listacombo',
  templateUrl: './listacombo.component.html',
  styleUrls: ['./listacombo.component.css']
})
export class ListacomboComponent implements OnInit {

  mobile:boolean=false;
  nave:string;

  perfil : string;

  combos: any[]=[];
  de : string;
  ate : string;

  constructor(private servicebolao : CadBolaoService, private router:Router) { }

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

      this.servicebolao.findAllCombos().subscribe(res=>{
        
        this.combos = res;

      });
  }

  public preparaValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;

  }

  // public detalhes(id:string){
  
  public detalhes(ids:string, cotas:string, bcids:string){

     localStorage.setItem("detalhesComboSelecionadoIds",ids);
     localStorage.setItem("detalhesComboSelecionadoCotas",cotas);
     localStorage.setItem("idbolaocombo",bcids);

    // localStorage.setItem("detalhesComboId",id);
    
    this.router.navigate(['detalhescombo']);
		
  }


  public filtraExtrato(){

    if(this.mobile == true){
      let from;
      let to;
     from = this.de.substring(6,10)+"-"+this.de.substring(3,5)+"-"+this.de.substring(0,2);
     to = this.ate.substring(6,10)+"-"+this.ate.substring(3,5)+"-"+this.ate.substring(0,2);
  
     this.filtrarporData(from,to);
    }else{
      this.filtrarporData(this.de,this.ate);
    }
  
    
  }

  public refresh(){
    window.location.reload();
  }
  
  filtrarporData(de:string,ate:string){
  
    this.servicebolao.findFromDataToDataCombo(de,ate).subscribe(res=>{
      this.combos=res;
      
      });
  
  }

  public zeraInputDe(){
    (document.getElementById("de") as HTMLInputElement).value = "";
  }

  public zeraInputAte(){
    (document.getElementById("ate") as HTMLInputElement).value = "";
  }

}
