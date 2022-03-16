import { UsuarioEquipeVendedor } from './../model/usuarioequipevendedor';
import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { CotaService } from './../service/cotaservice';

import { Component, OnInit } from '@angular/core';
import { CadBolaoService } from '../service/cadbolaoservice';
import { CadBolao } from '../model/cadbolao';
import { Cota } from '../model/cota';
import { CotaResponse } from '../model/cotaresponse';
import { Router } from '@angular/router';
import { BolaoComboService } from '../service/bolaocomboservice';

@Component({
  selector: 'app-transferenciacota',
  templateUrl: './transferenciacota.component.html',
  styleUrls: ['./transferenciacota.component.css']
})
export class TransferenciacotaComponent implements OnInit {

  mobile:boolean = false;
  nave: string;
  selectedValue:any;
  idBolao: number;
  cotassuplentes : number;
  listanum : number[]=[];

  numcota : number []=[];
  flag : boolean = false;
  cotas: CotaResponse[]=[];
  cotas2 : Cota[]=[];
  boloes: CadBolao[]=[];
  bolao : CadBolao = new CadBolao();
  somacotas:number=0;
  cotasvendidas:number=0;
  cotascombo:number=0;

  selectedValue2: string;

  vendedores : UsuarioEquipeVendedor[]=[];

  constructor( private service : CadBolaoService, private service2 : CotaService
    , private service3 :  UsuarioEquipeVendedorService, private service4:BolaoComboService, private router:Router) { }

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

    // this.selectedValue2="MEGA";
    // this.filtrarBolao(this.selectedValue2);

    window.scrollTo( 0,0);
    
  }

  public proxetapa(){
    this.cotascombo=0;
    this.somacotas=0;
    this.cotas=[];
    this.listanum = [];
    this.bolao = new CadBolao();
    window.scrollTo(0, 700);
    let idbolao = (document.getElementById("modalidade")as HTMLInputElement).value;
    this.service.findById(parseInt(idbolao)).subscribe(res=>{
      this.bolao = res;
      this.service2.findByIdBolao(this.bolao.id).subscribe(res2 => {
        this.cotas= res2;
         this.listarCotas();
      });
      
    });
    this.flag = true;
    
  }

public listarCotas(){

  this.service4.findById(this.bolao.id).subscribe(res3=>{

    for(let i=0; i < res3.length; i++){
      this.cotascombo += res3[i].qtdCotas;
    }
  });
  
  for(let j = 0 ; j < this.cotas.length; j++){
    this.listanum.push(this.cotas[j].quantidade);
    this.somacotas += this.cotas[j].quantidade;
  }
  this.somacotas += this.bolao.qtdCotasDisponiveis;



}

public atualizactodisp(index:number){
  let temp = parseInt((document.getElementById("qtdyes_"+index+"") as HTMLInputElement).value);
  let operacao : number;
  let validacao = 0;
  //funcao pra atualizar as cotas disponíveis
  if(temp > this.listanum[index]){
    operacao = temp - this.listanum[index];
    this.listanum[index] = temp;

    if (this.bolao.qtdCotasDisponiveis - operacao >= 0){
      this.bolao.qtdCotasDisponiveis = this.bolao.qtdCotasDisponiveis - operacao;
    }else{
      alert("Limíte de cotas disponíveis excedido");
      this.listanum[index] -= operacao;
      (document.getElementById("qtdyes_"+index+"") as HTMLInputElement).value = ""+this.listanum[index];
    }

  }else{
    operacao = this.listanum[index] - temp;
    this.listanum[index] = temp;
    this.bolao.qtdCotasDisponiveis = this.bolao.qtdCotasDisponiveis + operacao;
  }

  operacao = 0;
}

  public addQtd(n : number){
  //  var qtd = parseInt((document.getElementById("qtd")as HTMLInputElement).value);
   // qtd++;
  if (this.bolao.qtdCotasDisponiveis > 0){
    this.cotas[n].quantidade ++;
    this.listanum[n]++;
    this.bolao.qtdCotasDisponiveis--;
  }
   //(document.getElementById("this.lista")as HTMLInputElement).value = ''+qtd;
 }

 public removeQtd(n : number){
  //  var qtd = parseInt((document.getElementById("qtd")as HTMLInputElement).value);
  //   qtd--;
  //  (document.getElementById("qtd")as HTMLInputElement).value = ''+qtd;
  if (this.cotas[n].quantidade > 0){
    this.cotas[n].quantidade --;
    this.listanum[n]--;
    this.bolao.qtdCotasDisponiveis++;
  }
  
 }

 public soma(n1 : number, n2 : number): number{

    return n1 + n2;
 }

 public alteraCotas(index:number){

  let gap : number = this.soma(this.cotas[index].quantidade, this.bolao.qtdCotasDisponiveis);
  

  if (this.listanum[index] < 0){
    alert("por favor, insira um numero válido");
    this.listanum[index] = this.cotas[index].quantidade;
    return;
  }
  else if (this.listanum[index] > gap){
    alert("não é possível exceder o valor de cotas disponiveis");
    this.listanum[index] = gap;
    this.cotas[index].quantidade = gap;
    this.bolao.qtdCotasDisponiveis = 0;
    return;
  }
  else{
    this.bolao.qtdCotasDisponiveis = this.bolao.qtdCotasDisponiveis + (this.cotas[index].quantidade - this.listanum[index]);
  }

  this.cotas[index].quantidade = this.listanum[index];
  

 }

 public preparaValorDe(valor) {
  let inteiro = valor/100 + 1;
  let resto = ""+(valor%100);

  if (valor%100 < 10)
    resto += "0";
  let novo = "R$ "+inteiro+","+resto;

  let formatter = new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency: 'BRL'
  }).format(valor/100);

  return formatter;
}

  public filtrarBolao(modalide:string){
    this.service.findAllBoloesByModalidade(modalide).subscribe(res=>{
      this.boloes = res;
    })
    this.cotas=[];
  }

  // public listarVendedorByBolao(idBolao:number){
  //   this.service.findAllVendedoresByBolao(idBolao).subscribe(res=>{
  //     this.vendedores = res;
  //   })
  // }

  public salvarMudancas(){

    if (this.bolao.qtdCotasDisponiveis >= 0){
      for (let x = 0; x < this.cotas.length; x++){
        this.cotas2.push(new Cota());
        this.cotas2[x].valorCota = this.bolao.valorCota;
        this.cotas2[x].idCota = this.cotas[x].idCota;
        this.cotas2[x].quantidadeCotaVendedor = this.cotas[x].quantidade;

        // this.service3.findById(this.cotas[x].usuarioId).subscribe( res => {
        //       this.cotas2[x].vendedor.id = res.id;
        // });
        // this.cota = this.cotas2[x];
        this.service2.update(this.cotas2[x]);
        
        // this.cota = new Cota();
      }
      this.service.update(this.bolao);


      
      document.getElementById("divsuccess").setAttribute("style","color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

      let timer = setTimeout(function(){    
        document.getElementById("divsuccess").setAttribute("style","display: none;");
      }, 5000);
    }else {
      alert("Limíte de cotas disponíveis excedido");
    }
  }
}
