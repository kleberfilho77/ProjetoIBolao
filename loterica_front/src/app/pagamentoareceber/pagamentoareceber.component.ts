import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movimentacao } from '../model/movimentacaoentrada';
import { Ordempagamento } from '../model/ordempagamento';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { MovimentacaoService } from '../service/movimentacaoservice';
import { OrdemPagamentoService } from '../service/ordempagamentoservice';

@Component({
  selector: 'app-pagamentoareceber',
  templateUrl: './pagamentoareceber.component.html',
  styleUrls: ['./pagamentoareceber.component.css']
})
export class PagamentoareceberComponent implements OnInit {


  mobile: boolean = false;
  nave: string;
  listaMovimentacao;
  perfil : string;
  formapag: string [] = [];

  movimentacao: Movimentacao;
  ordemPagamento: Ordempagamento;

  pagando : string [] = [];
  selected1;
  filtroCliente;
  de;
  ate;
  

  linkGerado: any [] = [];

  constructor(private service: MovimentacaoService, private serviceop : OrdemPagamentoService,
        private router: Router) { }

  ngOnInit() {


    if (localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
    localStorage.getItem("perfil") == 'VENDEDOR' ||
    localStorage.getItem("perfil") == 'LOTERICA') {

  } else {
    this.router.navigate(['/login']);
  }


  if (window.screen.width <= 500) {
    this.mobile = true;

  }
  localStorage.setItem("flag", "false");
    
    this.perfil = localStorage.getItem('perfil');
    this.listar();
  }

  public checaValor(index : number){

    let valor = this.pagando[index].replace(',','').replace('.','').replace('.','');

    if (parseInt(valor) > parseInt(this.listaMovimentacao[index][2].toString())){
      alert("O valor inserido não pode ser superior ao valor a ser quitado.");
      this.pagando[index] = "";
    }
  }

  public linkspendentes(){
    this.router.navigate(['/vendaspendentes']);
  }

  public listar(){

    if (this.perfil != 'VENDEDOR')
      this.service.findVendasPendentes().subscribe(res => {
        this.listaMovimentacao = res;
        console.log(this.listaMovimentacao);
        this.filtrar();
      });
    else{
      this.service.findVendasPendentesVendedor(parseInt(localStorage.getItem('idVend'))).subscribe(res => {
        this.listaMovimentacao = res;
        console.log(this.listaMovimentacao);
        this.filtrar();
      });
    }

    

    this.movimentacao = new Movimentacao();
  }

  public pagar(index: number){
    let Pagando = this.pagando[index].replace(',','').replace('.','').replace('.','');

    let conta = parseInt(this.listaMovimentacao[index][2].toString()) - parseInt(Pagando);

    this.service.updatePendente(this.listaMovimentacao[index][4]);

    console.log(this.linkGerado[index]);

    let today = new Date();

    this.movimentacao.descricao = this.listaMovimentacao[index][3];
    this.movimentacao.pendente = conta;
    this.movimentacao.vendedor = new UsuarioEquipeVendedor();
    this.movimentacao.vendedor.id = parseInt(localStorage.getItem('idVend'));
    this.movimentacao.qtdCotasVendidas = 0;

    if (today.getDate() < 10){
      if ((today.getMonth()+1) < 10){
        this.movimentacao.data = "0"+today.getDate()+"/0"+(today.getMonth()+1)+"/"+today.getFullYear();
      }else{
        this.movimentacao.data = "0"+today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
      }
    }else{
      if ((today.getMonth()+1) < 10){
        this.movimentacao.data = today.getDate()+"/0"+(today.getMonth()+1)+"/"+today.getFullYear();
      }else{
        this.movimentacao.data = today.getDate()+"/0"+(today.getMonth()+1)+"/"+today.getFullYear();
      }
    }
    
    if (this.formapag[index] == 'DINHEIRO'){
      this.movimentacao.dinheiro = parseInt(Pagando);
      this.movimentacao.credito = 0;
      this.movimentacao.debito = 0;
      this.movimentacao.outros = 0;
      this.movimentacao.pix = 0;
    }else if (this.formapag[index] == 'CARTAO'){
      this.movimentacao.dinheiro = 0;
      this.movimentacao.credito = 0;
      this.movimentacao.debito = parseInt(Pagando);
      this.movimentacao.outros = 0;
      this.movimentacao.pix = 0;
    }else if (this.formapag[index] == 'PIX'){
      this.movimentacao.dinheiro = 0;
      this.movimentacao.credito = 0;
      this.movimentacao.debito = 0;
      this.movimentacao.outros = 0;
      this.movimentacao.pix = parseInt(Pagando);
    }else if (this.formapag[index] == 'OUTROS'){
      this.movimentacao.dinheiro = 0;
      this.movimentacao.credito = 0;
      this.movimentacao.debito = 0;
      this.movimentacao.outros = parseInt(Pagando);
      this.movimentacao.pix = 0;
    } else if (this.formapag[index] == 'LINK ONLINE'){
      this.movimentacao.credito = parseInt(Pagando);
      this.movimentacao.dinheiro = 0;
      this.movimentacao.debito = 0;
      this.movimentacao.outros = 0;
      this.movimentacao.pix = 0;

    }

    this.ordemPagamento = new Ordempagamento();

    this.ordemPagamento.nomeCliente = this.listaMovimentacao[index][0];
    this.ordemPagamento.descricao = this.listaMovimentacao[index][3];
    this.ordemPagamento.valor = parseInt(Pagando);

    if (this.formapag[index] != 'LINK ONLINE'){
      this.ordemPagamento.isPago = "true";
    }
    this.ordemPagamento.emailCliente = this.listaMovimentacao[index][6];
    this.ordemPagamento.qtdCotasVendidas = 0;
    this.ordemPagamento.vendedorId = parseInt(localStorage.getItem('idVend'));

    this.criarMovimentacao(index);

    document.getElementById("divsuccess").setAttribute("style","color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");
    
    let timer = setTimeout(function(){    
      document.getElementById("divsuccess").setAttribute("style","display: none;");
    }, 5000);
  }

  public criarMovimentacao(index : number){
    this.serviceop.create(this.ordemPagamento).subscribe(result => {
      this.movimentacao.ordempagId = result.id;

      this.linkGerado[index] = result.link;

      if (result.id == this.movimentacao.ordempagId && this.formapag[index] != 'LINK ONLINE'){
        this.service.create(this.movimentacao).subscribe( res => {

            this.router.navigate(["/extratovendedora"]);
        });
      }
    });
  }

  public ativaBotao(index: number){
    (document.getElementById('botaopag'+index) as HTMLButtonElement).disabled = false;
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

  public filtrarporData(de: string, ate: string) {

    if(this.perfil != 'VENDEDOR'){
    this.service.findFromDataToDataAreceber(de, ate).subscribe(res => {
      console.log(res[0]);
      console.log(this.listaMovimentacao[0]);

      let novo: any [] = [];
      
      // for (let ls of res){
      //   for (let item of this.listaMovimentacao){
      //     if (ls.id == item[4]){

      //       novo.push(item);
      //     }
      //   }
      // }

      this.listaMovimentacao = res;
      console.log(this.listaMovimentacao);

    });
  }else{

    let id = parseInt(localStorage.getItem("idVend"));

    this.service.findFromDataToDataVendAreceber(id, de, ate).subscribe(res => {
      console.log(res[0]);
      console.log(this.listaMovimentacao[0]);

      let novo: any [] = [];
      
      // for (let ls of res){
      //   for (let item of this.listaMovimentacao){
      //     if (ls.id == item[4]){

      //       novo.push(item);
      //     }
      //   }
      // }

      this.listaMovimentacao = res;

    });

  }

  }


  // public filtrarporCliente(nome: string) {
  //   let novo: any[] = [];

  //   for (let ls of this.listaMovimentacao) {
  //     if (ls[0] == nome) {
  //       novo.push(ls);
  //     }
  //   }

  //   this.listaMovimentacao = novo;
  // }


  public filtrarporCliente(nome: string) {

    let msg: string;
    let id = parseInt(localStorage.getItem("idVend"));
      msg = this.filtroCliente;
    if(this.perfil != 'VENDEDOR'){

      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.service.findByNameAreceber(msg).subscribe(res => {
          this.listaMovimentacao = res;

        });
      } else {
        this.listaMovimentacao = [];
      }
    }else{
      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.service.findByNameAreceberVend(msg, id).subscribe(res => {
          this.listaMovimentacao = res;

        });
      } else {
        this.listaMovimentacao = [];
      }
    }
    

  }


  public filtrar() {
    if (this.selected1 == "periodo") {
      this.filtrarporData(this.de, this.ate);
    } else if (this.selected1 == "cliente") {
      this.filtrarporCliente(this.filtroCliente);
    }
  }

  public copiarLink(index) {
    let input = document.getElementById("linkpagto"+index);
    (input as HTMLInputElement).select();
    document.execCommand('copy');
    // inputElement.setSelectionRange(0, 0);
    document.getElementById("msgcopiado").setAttribute("style", "display:flex; color:green;");
  }

}
