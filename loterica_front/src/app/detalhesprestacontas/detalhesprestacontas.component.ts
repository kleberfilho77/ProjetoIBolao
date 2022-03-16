import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestacaoContas } from '../model/prestacaocontas';
import { MovimentacaoService } from '../service/movimentacaoservice';
import { PrestaContasService } from '../service/prestacontasservice';

@Component({
  selector: 'app-detalhesprestacontas',
  templateUrl: './detalhesprestacontas.component.html',
  styleUrls: ['./detalhesprestacontas.component.css']
})
export class DetalhesprestacontasComponent implements OnInit {

  mobile: boolean = false;
  nave: string;
  idvendprestacontas :number;
  prestacontas: any[]=[];
  prestacaocontas: PrestacaoContas = new PrestacaoContas();
  valorNovo: string [] = [];

  de : string;
  ate : string;

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

   this.idvendprestacontas = parseInt(localStorage.getItem("idvendprestacontas"));
   this.listar();

  }

  public listar(){

    this.servicepc.findAllPrestaContasByVend(this.idvendprestacontas).subscribe(res=>{
      this.prestacontas = res;
      
      console.log(res);

      this.valorNovo = [];

    })

  }

  public filtraExtrato(){

    if(this.mobile == true){
      let from;
      let to;
     from = this.de.substring(6,10)+"-"+this.de.substring(3,5)+"-"+this.de.substring(0,2);
     to = this.ate.substring(6,10)+"-"+this.ate.substring(3,5)+"-"+this.ate.substring(0,2);
  
     this.filtrarporData(this.idvendprestacontas,from,to);
    }else{
      this.filtrarporData(this.idvendprestacontas,this.de,this.ate);
    }
  
    
  }
  
  filtrarporData(id:number,de:string,ate:string){
  
    this.servicepc.findFromDataToData(id,de,ate).subscribe(res=>{
      this.prestacontas=res;
      
      });
    
  
  }

  public atualizaValorPago(id:number, index:number){
    this.prestacaocontas.id = id;

    if ((document.getElementById('valorpago'+index) as HTMLInputElement).value == ''){
      let valor = this.prestacontas[index][1] - this.prestacontas[index][2];
      this.valorNovo[index] = valor.toString();
    }else{
      console.log(this.valorNovo[index]);
      while (this.valorNovo[index].includes(",")) {
        this.valorNovo[index] = this.valorNovo[index].replace(",", "");
      }
    
      while (this.valorNovo.includes(".")) {
        this.valorNovo[index] = this.valorNovo[index].replace(".", "");
      }
    }
    
    this.prestacaocontas.valorPago = this.prestacontas[index][2] + parseInt(this.valorNovo[index]);

    this.servicepc.update(this.prestacaocontas).subscribe(res => {
      console.log(res);
      this.listar();
    });

    document.getElementById("divsuccess").setAttribute("style","color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");
    
    let timer = setTimeout(function(){    
      document.getElementById("divsuccess").setAttribute("style","display: none;");
    }, 5000);
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

}
