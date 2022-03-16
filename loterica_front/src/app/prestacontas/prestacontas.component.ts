import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestaContasService } from '../service/prestacontasservice';

@Component({
  selector: 'app-prestacontas',
  templateUrl: './prestacontas.component.html',
  styleUrls: ['./prestacontas.component.css']
})
export class PrestacontasComponent implements OnInit {
  mobile:boolean=false;
  nave:string;


  prestacontas: any[] = [];

  constructor(private servicepc : PrestaContasService, private router:Router) { }

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
    this.servicepc.findAllPrestaContasVend().subscribe(res=>{
      this.prestacontas = res;
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

  public detalhes(idvendedor:string){

    localStorage.setItem("idvendprestacontas",idvendedor);
    this.router.navigate(['detalhesprestacontas']);
   
 }

}
