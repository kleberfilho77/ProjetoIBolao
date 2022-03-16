import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ordempagamento } from '../model/ordempagamento';
import { OrdemPagamentoService } from '../service/ordempagamentoservice';

@Component({
  selector: 'app-extratoloterica',
  templateUrl: './extratoloterica.component.html',
  styleUrls: ['./extratoloterica.component.css']
})
export class ExtratolotericaComponent implements OnInit {

  mobile:boolean=false;
  nave:string;
  valorTotal:number =0;
  nomeLoterica : string;
  cnpjLoterica : string;
  logradouro : string;
  ordempagto : Ordempagamento[]=[];

  constructor(private service : OrdemPagamentoService, private router: Router) { }

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

    this.nomeLoterica = localStorage.getItem("nome");
    this.cnpjLoterica = localStorage.getItem("cnpj").substring(0, 2) + "." + localStorage.getItem("cnpj").substring(2, 5) + "." + 
    localStorage.getItem("cnpj").substring(5,8) + "/" + localStorage.getItem("cnpj").substring(8,12) + "-" + localStorage.getItem("cnpj").substring(12,14);
    this.logradouro = localStorage.getItem("logradouro");

    // let cnpj= localStorage.getItem("cnpj").replace(".","").replace(".","").replace("/","").replace("-","");
    let cnpj= localStorage.getItem("cnpj");
    this.service.findByLoterica(cnpj).subscribe(res=>{
      this.ordempagto = res;
      

      for(let i=0; i < this.ordempagto.length; i++){
        this.valorTotal = this.valorTotal + this.ordempagto[i].valor;
        
      }
    });

    window.scrollTo( 0,0);
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


  public prevenda(){
    this.router.navigate(['/prepagamento']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
