import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovimentacaoService } from '../service/movimentacaoservice';

@Component({
  selector: 'app-detalhesextrato',
  templateUrl: './detalhesextrato.component.html',
  styleUrls: ['./detalhesextrato.component.css']
})
export class DetalhesextratoComponent implements OnInit {

  perfil : string;
  mobile: boolean = false;
  nave: string;
  
  listaExtrato;
  idordem:number;

  constructor(private servicemov: MovimentacaoService, private router:Router){}


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
    this.idordem = parseInt(localStorage.getItem("idextrato"));


    this.listar();

    window.scrollTo( 0,0);

    
  }

  public back(){
    this.router.navigate(['/extratovendedora']);
  }

  public listar(){


    this.servicemov.findMovVendExtrato(this.idordem).subscribe(result=>{
      this.listaExtrato = result;

      console.log(this.listaExtrato);
    });
    

  }

  logout() {
    this.router.navigate(['/login']);
  }

  public home() {
    this.router.navigate(['/home']);
  }

  public cadastrousuario() {
    this.router.navigate(['/cadastrousuario']);
  }

  public cadbolaovend() {
    this.router.navigate(['/cadastrobolaovendedor']);
  }

  public cadastrocombo() {
    this.router.navigate(['/cadastrocombo']);
  }

  public prestacontas() {
    this.router.navigate(['/prestacontas']);
  }

  public extratovendedora() {
    this.router.navigate(['/extratovendedora']);
  }

  public tutorial() {
    this.router.navigate(['/bemvindo']);
  }

  public listausuarios() {
    this.router.navigate(['/listausuarios']);
  }

  public listaboloes() {
    this.router.navigate(['/listaboloes']);
  }

  public listacotas() {
    this.router.navigate(['/listacotas']);
  }

  public listametas() {
    this.router.navigate(['/listametas']);
  }

  public vendaspendentes() {
    this.router.navigate(['/vendaspendentes']);
  }

  public listacombos() {
    this.router.navigate(['/listacombos']);
  }

  public indices() {
    this.router.navigate(['/indices']);
  }

  public visualizaValor(valor) {
    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor / 100);

    if (valor == undefined)
      return ""
    else
      return formatter;
  }

  

}
