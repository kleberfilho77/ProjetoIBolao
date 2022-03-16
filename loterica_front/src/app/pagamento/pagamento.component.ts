import { Router } from '@angular/router';
import { OrdemPagamentoService } from './../service/ordempagamentoservice';
import { Pagamento } from './../model/pagamento';
import { Component, OnInit } from '@angular/core';
import { formattedError } from '@angular/compiler';
import { PagamentoService } from '../service/pagamentoservice';
import { PagamentoPagCom } from '../model/pagamentopagcom';
import { UserToken } from '../model/usertoken';
import { Ordempagamento } from '../model/ordempagamento';
import { Movimentacao } from '../model/movimentacaoentrada';
import { MovimentacaoService } from '../service/movimentacaoservice';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { CotaService } from '../service/cotaservice';
import { CadComboService } from '../service/cadcomboservice';
import { Cota } from '../model/cota';
import { CadCombo } from '../model/CadCombo';
import { exitCode } from 'process';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {

  mobile: boolean = false;
  nave: string;
  pagamento: Pagamento = new Pagamento();
  ordempagamento : Ordempagamento = new Ordempagamento();
  chave : string;

  movimentacao: Movimentacao = new Movimentacao();

  valortotal : number;
  descricaocompra : string;
  public loading = false;

  vendedorId : number;
  cotasVendidas: number;
  cotaId:number[]=[];
  cotaQtd:number[]=[];
  comboId:number[]=[];
  comboQtd:number[]=[];

  qtdAtualCota: number [] = [];
  qtdAtualCombo: number [] = [];


  constructor(private serviceop : OrdemPagamentoService, private movserv: MovimentacaoService,
     private pagservice: PagamentoService, private servicecota: CotaService, private servicecombo: CadComboService, private router : Router) { }

  ngOnInit() {

    if (window.screen.width <= 500) {
      this.mobile = true;
    }
    localStorage.setItem("flag", "false");
    
    this.chave = window.location.href.substring(window.location.href.indexOf('=')+1);

    this.buscarInfo();

    this.geraToken();

    // this.movimentacao.credito = this.valortotal;
    // this.movimentacao.descricao = this.descricaocompra;
    // this.movimentacao.qtdCotasVendidas = this.cotasVendidas;
    // this.movimentacao.vendedor = new UsuarioEquipeVendedor();
    // this.movimentacao.vendedor.id = this.vendedorId;

    
    
    // console.log(this.cotaId);
    // console.log(this.cotaQtd);
  }

  public trataOrdemPagamento(){

    let trigger : boolean = false;

    let cotaStringId: string = "";
    let cotaStringQtd: string = "";

    console.log(this.ordempagamento);

    for (let i = 0; i < this.ordempagamento.idCota.length; i++){
        if (this.ordempagamento.idCota[i] == '@'){

            this.cotaId.push(parseInt(cotaStringId));

            cotaStringId = "";
            trigger = true;
        }else if (this.ordempagamento.idCota[i] == ','){

            this.cotaQtd.push(parseInt(cotaStringQtd));

            cotaStringQtd = "";
            trigger = false;
        }else{

            if (trigger){
                cotaStringQtd += this.ordempagamento.idCota[i];
            }else{
                cotaStringId += this.ordempagamento.idCota[i];
            }

        }
    }

    let today = new Date();
    if (today.getDate().toString().length == 1){
      if ((today.getMonth()+1).toString().length == 1){
        this.movimentacao.data = "0"+today.getDate()+"/0"+(today.getMonth()+1)+"/"+today.getFullYear();
      }else{
        this.movimentacao.data = "0"+today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
      }

    }else{
      if ((today.getMonth()+1).toString().length == 1){
        this.movimentacao.data = today.getDate()+"/0"+(today.getMonth()+1)+"/"+today.getFullYear();
      }else{
        this.movimentacao.data = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
      }
    }

    for (let i = 0; i < this.cotaQtd.length; i++){
      this.servicecota.findById(this.cotaId[i]).subscribe(result=>{
        if ( 0 > result.quantidadeCotaVendedor - this.cotaQtd[i]){
          this.router.navigate(["/linkexpirado"]);
        }else{
          this.qtdAtualCota.push(result.quantidadeCotaVendedor);
        }
      });
    }

    


    let comboStringId: string = "";
    let comboStringQtd: string = "";

    for (let i = 0; i < this.ordempagamento.idCombo.length; i++){
        if (this.ordempagamento.idCombo[i] == '@'){

            this.comboId.push(parseInt(comboStringId));

            comboStringId = "";
            trigger = true;
        }else if (this.ordempagamento.idCombo[i] == ','){

            this.comboQtd.push(parseInt(comboStringQtd));

            comboStringQtd = "";
            trigger = false;
        }else{

            if (trigger){
                comboStringQtd += this.ordempagamento.idCombo[i];
            }else{
                comboStringId += this.ordempagamento.idCombo[i];
            }

        }
    }

    for (let i = 0; i < this.comboId.length; i++){
      this.servicecombo.findById(this.comboId[i]).subscribe(result=>{
        if ( 0 > result.multiplicador - this.comboQtd[i]){
          this.router.navigate(["/linkexpirado"]);
        }
        else{
          this.qtdAtualCombo.push(result.multiplicador);
        }
      });
    }

  }


  public buscarInfo(){
    this.serviceop.findById(parseInt(this.chave)).subscribe(res=>{
      console.log(res);


      // let valorTratado = res.valor.toString().replace(",","").replace("R$ ", "");
      let valorTratado = res.valor.toString();

      while(valorTratado.includes(".")){
        valorTratado = valorTratado.replace(".","");
      }

      this.valortotal = parseInt(valorTratado);
      console.log(this.valortotal);

      this.descricaocompra = res.descricao;

      this.vendedorId = res.vendedorId;
      console.log(this.vendedorId);
      this.cotasVendidas = res.qtdCotasVendidas;

      this.movimentacao.credito = this.valortotal;
      this.movimentacao.debito = 0;
      this.movimentacao.dinheiro = 0;
      this.movimentacao.outros = 0;
      this.movimentacao.pix = 0;
      this.movimentacao.pendente = 0;
      this.movimentacao.ordempagId = res.id;

      this.movimentacao.descricao = this.descricaocompra;
      this.movimentacao.qtdCotasVendidas = this.cotasVendidas;
      console.log(this.movimentacao.qtdCotasVendidas);
      this.movimentacao.vendedor = new UsuarioEquipeVendedor();
      this.movimentacao.vendedor.id = this.vendedorId;

      this.ordempagamento.id = res.id;
      this.ordempagamento.nomeCliente = res.nomeCliente;
      this.ordempagamento.emailCliente = res.emailCliente;
      this.ordempagamento.nomeLoterica = res.nomeLoterica;
      this.ordempagamento.cnpjLoterica = res.cnpjLoterica;
      this.ordempagamento.idCota = res.idCota;
      this.ordempagamento.idCombo = res.idCombo;
      this.ordempagamento.cnpjLoterica = res.cnpjLoterica.substring(0, 2) + "." + res.cnpjLoterica.substring(2, 5) + "." + 
      res.cnpjLoterica.substring(5,8) + "/" + res.cnpjLoterica.substring(8,12) + "-" + res.cnpjLoterica.substring(12,14);

      this.pagamento.valor = this.formataValor(res.valor.toString());

      this.trataOrdemPagamento();
    })
    
  }

  public formataValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;
  }
  
  public pagamentoApi(){
    window.location.href='#story';

    localStorage.setItem("aprovnomecliente",this.ordempagamento.nomeCliente);
    localStorage.setItem("aprovemailcliente",this.ordempagamento.emailCliente);
    localStorage.setItem("aprovnomelot", this.ordempagamento.nomeLoterica);
    localStorage.setItem("aprovcnpjlot", this.ordempagamento.cnpjLoterica);

    localStorage.setItem("aprovvalor",this.pagamento.valor);

    let pag : PagamentoPagCom = new PagamentoPagCom();
    
    pag.amount = this.valortotal.toString();

    this.ordempagamento.valor = this.valortotal;

    if(this.pagamento.titular != null && this.pagamento.titular != undefined){
    pag.cardHolderName = this.pagamento.titular.toUpperCase();
    }
    if(this.pagamento.validade != null && this.pagamento.validade != undefined){
    pag.expiryMonth = this.pagamento.validade.substring(this.pagamento.validade.indexOf("/"),-1);
    }
    if(this.pagamento.validade != null && this.pagamento.validade != undefined){
    pag.expiryYear = '20'+ this.pagamento.validade.substring(this.pagamento.validade.indexOf("/")+1);
    }
    if(this.pagamento.numerocartao != null && this.pagamento.numerocartao != undefined){
    pag.pan = this.pagamento.numerocartao.replace(' ','').replace(' ','').replace(' ','');
    }
    pag.paymentOptionCode = 1;
    pag.scheme = this.pagamento.bandeira;
    pag.securityCode = this.pagamento.codseguranca;

    // console.log(pag);
    this.chamaServicoPagamento(pag,localStorage.getItem("token"));
  }

  public geraToken(){
    localStorage.setItem("token","Bearer ZFp3eWlvcGFHZFNIdFhMdXZGOUk5T01tdDVQQVgrK0RIbzBaN1NXd2JYST0=")
    // this.pagservice.autenticador().subscribe(res=>{
    //   let resp : UserToken = res;
    //   localStorage.setItem("token", resp.token);
    // });
    // this.pagservice.autenticadorLoterica().subscribe(res=>{
    //   let resp : any = res;
    //   localStorage.setItem("token", resp.token);
    // });
  }
  
  public chamaServicoPagamento(obj: PagamentoPagCom, token: string){ //
    
    this.loading = true;

    this.pagservice.pagamentoPost(obj.amount, obj.cardHolderName, obj.expiryMonth, obj.expiryYear,
      obj.pan, obj.paymentOptionCode, obj.scheme, obj.securityCode, token).subscribe(res=>{
      // console.log(obj);

      this.ordempagamento.isPago = "true"; 

      let cota : Cota;
      for(let i=0; i < this.cotaId.length; i++){
        cota = new Cota();
        cota.idCota = this.cotaId[i];
        console.log(this.qtdAtualCota[i]);
        console.log(this.cotaQtd[i]);
        cota.quantidadeCotaVendedor = this.qtdAtualCota[i] - this.cotaQtd[i];
        if(cota.quantidadeCotaVendedor != undefined){
        this.servicecota.update(cota);
        }
      }

      let combo : CadCombo;
      for(let i=0; i < this.comboId.length; i++){
        combo = new CadCombo();
        combo.id = this.comboId[i];
        combo.multiplicador = this.qtdAtualCombo[i] - this.comboQtd[i];
        this.servicecombo.update(combo);
      }

      this.serviceop.update(this.ordempagamento);
      this.loading = false;
      this.serviceop.enviarEmailCompra(this.ordempagamento).subscribe();

      this.movserv.create(this.movimentacao).subscribe(result =>{
        console.log(result);
      });

      this.router.navigate(['pagamentoaprovado']);
      
    },error=>{
      this.loading = false;
      this.router.navigate(['pagamentorecusado']);
    });
  }


}
