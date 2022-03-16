import { OrdemPagamentoService } from './../service/ordempagamentoservice';
import { Component, OnInit } from '@angular/core';
import { Ordempagamento } from '../model/ordempagamento';
import { Router } from '@angular/router';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-prepagamento',
  templateUrl: './prepagamento.component.html',
  styleUrls: ['./prepagamento.component.css']
})
export class PrepagamentoComponent implements OnInit {

  mobile: boolean = false;
  nave: string;
  ordempagamento = new Ordempagamento();
  nomeLoterica : string;
  cnpjLoterica : string;
  logradouro : string;

  valor = 0;

  valor1 : number;

  constructor(private service : OrdemPagamentoService, private router: Router) { }

  ngOnInit() {

  //   if(localStorage.getItem("perfil") != 'ADMINISTRADOR' ||
  //   localStorage.getItem("perfil") != 'VENDEDOR' || 
  //  localStorage.getItem("perfil") != 'LOTERICA'){
  //    this.router.navigate(['/login']);
  //  }

    if (window.screen.width <= 500) {
      this.mobile = true;
    }
    localStorage.setItem("flag", "false");
    // let altura = window.screen.height;
    // let largura = window.screen.width;

    // document.getElementById("main").setAttribute("style","width:"+largura+"px; height:"+altura+"px;");
    this.nomeLoterica = localStorage.getItem("nome");
    this.cnpjLoterica = localStorage.getItem("cnpj").substring(0, 2) + "." + localStorage.getItem("cnpj").substring(2, 5) + "." + 
    localStorage.getItem("cnpj").substring(5,8) + "/" + localStorage.getItem("cnpj").substring(8,12) + "-" + localStorage.getItem("cnpj").substring(12,14);
    this.logradouro = localStorage.getItem("logradouro");

  }

  gerarlink() {
    this.valor1 = parseFloat(this.valor.toString().replace('.','').replace(',',''));

    this.ordempagamento.valor = this.valor1;

    this.ordempagamento.nomeLoterica = localStorage.getItem("nome");
    this.ordempagamento.cnpjLoterica = localStorage.getItem("cnpj");

    this.service.create(this.ordempagamento).subscribe(res => {

      (document.getElementById("linkpagto")as HTMLInputElement).value= res.link
      if(this.mobile==false){
      document.getElementById("linkpagto").setAttribute("style", "display:flex; width:400px; border:none;");
      }else{
        document.getElementById("linkpagto").setAttribute("style", "display:flex; width:350px; border:none;");  
      }
       document.getElementById("btnlinkpagto").setAttribute("style", "display:flex;");
      this.ordempagamento = new Ordempagamento();
      this.zeraInput();
    });
    
  }

  public ajustaCentavos(){
    let valor = (document.getElementById("valor") as HTMLInputElement).value;

    if (valor.length == 1){
      valor = "R$ 0,0"+valor;
    }
    else if (valor.length == 2){
      valor = "R$ 0,"+valor;
    }
    else{
      valor = "R$ "+valor;
    }

    (document.getElementById("valor") as HTMLInputElement).value = valor;
  }

  public zeraInput(){
    (document.getElementById("valor") as HTMLInputElement).value = "";
  }

  public copiarLink(inputElement){
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
      document.getElementById("msgcopiado").setAttribute("style", "display:flex; color:green;");
  }


    logout() {
    this.router.navigate(['/login']);
    }

    public home(){
      this.router.navigate(['/home']);
    }

    public extratoloterica(){
      this.router.navigate(['/extratoloterica'])
    }

}
