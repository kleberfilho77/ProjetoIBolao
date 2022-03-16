
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BolaoVendedor } from '../model/bolaovendedor';
import { Cota } from '../model/cota';
import { Movimentacao } from '../model/movimentacaoentrada';
import { ViewVendas } from '../model/viewvendas';
import { CotaService } from '../service/cotaservice';
import { MovimentacaoService } from '../service/movimentacaoservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  naoexibir : boolean;
  mobile : boolean;
  nave: string;
  nomeuser : string;
  perfil : string;

  cotas: BolaoVendedor[]=[];

  vendas: any;
  movimentacaoVendedor : any;
  movimentacao : any;
  nomeVendedor : any[]=[];

  
  constructor(private cotaservice: CotaService, private movservice: MovimentacaoService, private router:Router) {
    
   }

  ngOnInit() {

    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
     localStorage.getItem("perfil") == 'VENDEDOR' || 
    localStorage.getItem("perfil") == 'LOTERICA'){
      
    }else{
      this.router.navigate(['/login']);
    }

    this.perfil = localStorage.getItem("perfil");

    this.movimentacao = new Movimentacao();
   
    if (window.screen.width <= 500) { 
      this.mobile = true;
    }
    localStorage.setItem("flag","false");
    this.nomeuser = localStorage.getItem("nome");

    this.listar();

    this.movfinanceira();

    window.scrollTo( 0,0);
  }

  public movfinanceira(){

    if(localStorage.getItem("perfil") == 'VENDEDOR'){
      this.movservice.findMovFinanceiroVendedor(parseInt(localStorage.getItem("idVend"))).subscribe(res=>{
        this.movimentacaoVendedor = res;


        for (let i = 0; i < res.length; i++){
          if (res[i] == null){
            this.movimentacaoVendedor[i] = 0;
          }
        }

      });
    }else{
      this.movservice.findMovFinanceiro().subscribe(res2=>{
        this.movimentacao = res2;


        for (let i = 0; i < res2.length; i++){
          if (res2[i] == null){
            this.movimentacao[i] = 0;
          }
        }

      });
    }


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

  public listar(){
    
    if (localStorage.getItem("perfil") == "VENDEDOR"){
      let id = parseInt(localStorage.getItem("idVend"));

      this.movservice.findAllMovVend(id).subscribe(res=>{
        
        this.vendas = res;
      });

      this.cotaservice.findByVendedor(id).subscribe(res=>{
        
        for (let p = 0; p < res.length; p++){
          this.cotas.push(new BolaoVendedor());
          this.cotas[this.cotas.length-1].tipoModalidade = res[p][0];
          this.cotas[this.cotas.length-1].dataBolao = res[p][1];
          this.cotas[this.cotas.length-1].valorCota = res[p][2];
          this.cotas[this.cotas.length-1].quantidadeCotaVendedor = res[p][3];
          
        }
      });
    }
    else{
      this.cotaservice.findAll2().subscribe(res=>{
        for (let p = 0; p < res.length; p++){
          this.cotas.push(new BolaoVendedor());
          this.cotas[this.cotas.length-1].tipoModalidade = res[p][0];
          this.cotas[this.cotas.length-1].dataBolao = res[p][1];
          this.cotas[this.cotas.length-1].valorCota = res[p][2];
          this.cotas[this.cotas.length-1].quantidadeCotaVendedor = res[p][3];
          this.nomeVendedor.push(res[p][4]);
        }
      })

      this.movservice.findAllMov().subscribe(res2=>{
        
        this.vendas = res2;
      });

    }
    
  }

  public redirecionaAreceber(){
    this.router.navigate(['/pagamentoareceber']);
  }

  public preparaValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;

  }


  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [59, 75 ,33, 44], label: ''}
  ];

  public chartLabels: Array<any> = ['Meta Atual', 'Meta Mensal'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  
}
  