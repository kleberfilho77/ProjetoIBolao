import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamentoaprovado',
  templateUrl: './pagamentoaprovado.component.html',
  styleUrls: ['./pagamentoaprovado.component.css']
})
export class PagamentoaprovadoComponent implements OnInit {

  mobile: boolean = false;
  nave: string;

  nomecli:string;
  emailcli:string;
  nomeloterica:string;
  cnpjloterica:string;
  valor:string;

  constructor() { }

  ngOnInit() {

    if (window.screen.width <= 500) {
      this.mobile = true;
    }
    localStorage.setItem("flag", "false");

    this.nomecli = localStorage.getItem("aprovnomecliente");
    this.emailcli = localStorage.getItem("aprovemailcliente");
    this.nomeloterica = localStorage.getItem("aprovnomelot");
    // this.cnpjloterica = localStorage.getItem("aprovcnpjlot");

    // this.cnpjloterica = localStorage.getItem("aprovcnpjlot").substring(0, 2) + "." + localStorage.getItem("aprovcnpjlot").substring(2, 5) + "." + 
    this.cnpjloterica = localStorage.getItem("aprovcnpjlot");
    localStorage.getItem("aprovcnpjlot").substring(5,8) + "/" + localStorage.getItem("aprovcnpjlot").substring(8,12) + "-" + localStorage.getItem("aprovcnpjlot").substring(12,14);
    this.valor = localStorage.getItem("aprovvalor");

  }

}
