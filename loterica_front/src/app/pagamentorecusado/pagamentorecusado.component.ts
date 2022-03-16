import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagamentorecusado',
  templateUrl: './pagamentorecusado.component.html',
  styleUrls: ['./pagamentorecusado.component.css']
})
export class PagamentorecusadoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  public back(){
    this.location.back();
  }

}
