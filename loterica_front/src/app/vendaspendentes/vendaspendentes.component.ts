import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordempagamento } from '../model/ordempagamento';
import { OrdemPagamentoService } from '../service/ordempagamentoservice';

@Component({
  selector: 'app-vendaspendentes',
  templateUrl: './vendaspendentes.component.html',
  styleUrls: ['./vendaspendentes.component.css']
})
export class VendaspendentesComponent implements OnInit {

  flag : boolean = false;
  mobile: boolean = false;
  nave: string;
  perfil: string;
  nome: string = "";
  telefone: string = "";
  cpf: string = "";
  email: string = "";
  listaExtrato;

  selected1: string;


  constructor(private serviceordem: OrdemPagamentoService, private router : Router) { }

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

     this.listar();

    window.scrollTo( 0,0);
  }

  public listar(){

    if(this.perfil == "VENDEDOR"){

    this.serviceordem.findAllOrdemVend(parseInt(localStorage.getItem("idVend"))).subscribe(result=>{
      
      this.listaExtrato = result;
      if (this.selected1 != undefined){
        this.filtrar();
      }

    });
    } else {

      this.serviceordem.findAllOrdem().subscribe(result=>{
            
        this.listaExtrato = result;
        if (this.selected1 != undefined){
          this.filtrar();
        }
  
      });


    }

    
  }


  public tutorial(){
    this.router.navigate(['/bemvindo']);
  }

  public listausuarios(){
    this.router.navigate(['/listausuarios']);
  }

  public listaboloes(){
    this.router.navigate(['/listaboloes']);
  }

  public listacotas(){
    this.router.navigate(['/listacotas']);
  }

  public listametas(){
    this.router.navigate(['/listametas']);
  }

  public listacombos(){
    this.router.navigate(['/listacombos']);
  }

  public indices(){
    this.router.navigate(['/indices']);
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

  public cadastrocombo() {
    this.router.navigate(['/cadastrocombo']);
  }

  public painelvendedora(){
    this.router.navigate(["/painelvendedora"]);
  }

  public extratovendedora() {
    this.router.navigate(['/extratovendedora']);
  }

  public prestacontas() {
    this.router.navigate(['/prestacontas']);
  }

  

  public trataValor(valor: string) {
    let novo = valor.replace(",", "");
    return novo;
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
 
  public filtrar(){
    
    // let novo: any [] = [];

    // for(let item of this.listaExtrato){
    //   if (item[3] == this.selected1){
    //     novo.push(item);
    //   }
    // }

    // this.listaExtrato = novo;

    let msg: string;
    if(this.perfil == "VENDEDOR"){
    let id: number = parseInt(localStorage.getItem("idVend"));
    msg = (document.getElementById("inputcliente") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.serviceordem.findByNameFromVendedor(msg, id).subscribe(res => {
        this.listaExtrato = res;

      });
    }else{
      this.listaExtrato = [];
    }
   }else{

    let id: number = parseInt(localStorage.getItem("idVend"));
    msg = (document.getElementById("inputcliente") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.serviceordem.findByName(msg).subscribe(res => {
        this.listaExtrato = res;

      });
    }else{
      this.listaExtrato = [];
    }
  }
}
  

}
