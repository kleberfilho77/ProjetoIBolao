import { MovimentacaoService } from './../service/movimentacaoservice';
import { Movimentacao } from './../model/movimentacaoentrada';
import { Combopainel } from './../model/combopainel';
import { UsuarioClienteFinal } from './../model/usuarioclientefinal';
import { UsuarioClienteFinalService } from './../service/usuarioclientefinalservice';
import { CadBolaoService } from './../service/cadbolaoservice';
import { PainelVendedoraService } from './../service/painelvendedoraservice';
import { Component, OnInit } from '@angular/core';
import { CadBolao } from '../model/cadbolao';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CadComboService } from '../service/cadcomboservice';
import { CotaService } from '../service/cotaservice';
import { BolaoVendedor } from '../model/bolaovendedor';
import { PagamentoService } from '../service/pagamentoservice';
import { PagamentoPagCom } from '../model/pagamentopagcom';
import { UserToken } from '../model/usertoken';
import { Ordempagamento } from '../model/ordempagamento';
import { OrdemPagamentoService } from '../service/ordempagamentoservice';
import { Cota } from '../model/cota';
import { CadCombo } from '../model/CadCombo';
import { ArquivoService } from '../service/arquivoservice';
import { UsuarioUnidadeLotericaService } from '../service/usuariounidadelotericaservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';
import { UsuarioEquipeAdminService } from '../service/usuarioequipeadminservice';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';


@Component({
  selector: 'app-painelvendedora',
  templateUrl: './painelvendedora.component.html',
  styleUrls: ['./painelvendedora.component.css']
})

export class PainelvendedoraComponent implements OnInit {


  mobile: boolean = false;
  nave: string;
  perfil: string;
  nome: string = "";
  telefone: string = "";
  cpf: string = "";
  email: string = "";
  cliente: UsuarioClienteFinal = new UsuarioClienteFinal();
  clientes: UsuarioClienteFinal[] = [];
  BolaoSelecao: number[] = [];
  ComboSelecao: Combopainel[] = [];
  movimentacao: Movimentacao = new Movimentacao();
  valorsubMega: number[] = [];
  valorsubQuina: number[] = [];
  valorsubLote: number[] = [];
  valorsubDupl: number[] = [];
  valorsubDias: number[] = [];
  valorsubBilh: number[] = [];
  valorsubLfac: number[] = [];
  valorsubLtma: number[] = [];
  valorsubTime: number[] = [];
  valorsubSup7: number[] = [];

  numcotaMega: number[] = [];
  numcotaQuina: number[] = [];
  numcotaLote: number[] = [];
  numcotaDupl: number[] = [];
  numcotaDias: number[] = [];
  numcotaBilh: number[] = [];
  numcotaLfac: number[] = [];
  numcotaLtma: number[] = [];
  numcotaTime: number[] = [];
  numcotaSup7: number[] = [];

  listanumMega: number[] = [];
  listanumQuina: number[] = [];
  listanumLote: number[] = [];
  listanumDupl: number[] = [];
  listanumDias: number[] = [];
  listanumBilh: number[] = [];
  listanumLfac: number[] = [];
  listanumLtma: number[] = [];
  listanumTime: number[] = [];
  listanumSup7: number[] = [];
  listanum: number[] = [];

  listanumCotaCombo: number[] = [];

  listanumCombo: number[] = [];

  boloesVendedorMega: BolaoVendedor[] = [];
  boloesVendedorQuina: BolaoVendedor[] = [];
  boloesVendedorLote: BolaoVendedor[] = [];
  boloesVendedorDupl: BolaoVendedor[] = [];
  boloesVendedorDias: BolaoVendedor[] = [];
  boloesVendedorBilh: BolaoVendedor[] = [];
  boloesVendedorLfac: BolaoVendedor[] = [];
  boloesVendedorLtma: BolaoVendedor[] = [];
  boloesVendedorTime: BolaoVendedor[] = [];
  boloesVendedorSup7: BolaoVendedor[] = [];
  comboPainel: Combopainel[] = [];
  // numCotaCombos: number[] = [];
  numCotaCombos: string[] = [];
  valorCombo: number[] = [];
  valorSubTotal: number[] = [];
  valoresMulti: number[] = []
  somaCotas: number = 0;
  ordempagamento = new Ordempagamento();
  valor = 0;
  valor1: number;
  idsbolaocombo: number[] = [];

  dinheiro = 0;
  dinheirostring: string;
  credito = 0;
  creditostring: string;
  debito = 0;
  debitostring: string;
  pix = 0;
  pixstring: string;
  outros = 0;
  outrosstring: string;
  link = 0;
  linkstring: string;
  habilita : string;
  idOrdemPagto : number;
  selectedValue :string;

  constructor(private servicecota: CotaService, private servicemov: MovimentacaoService,
    private servicecb: CadBolaoService, private servicecli: UsuarioClienteFinalService,
    private servicecc: CadComboService, private router: Router, public authService: LoginService,
    private service: OrdemPagamentoService, private arqserv: ArquivoService, private serviceadmin : UsuarioEquipeAdminService,
    private serviceundlot: UsuarioUnidadeLotericaService, private servicevend : UsuarioEquipeVendedorService,
  ) {

  }

  ngOnInit() {

    if (localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
      localStorage.getItem("perfil") == 'VENDEDOR' ||
      localStorage.getItem("perfil") == 'LOTERICA') {

    } else {
      this.router.navigate(['/login']);
    }
 
    this.habilita = localStorage.getItem("habilitavenda");

    if (window.screen.width <= 500) {
      this.mobile = true;

    }
    localStorage.setItem("flag", "false");

    this.perfil = localStorage.getItem("perfil");
    this.setLoterica();

    
    window.scrollTo(0, 0);
  }


  public voltarmenuinicial(){


      this.servicevend.findById(parseInt(localStorage.getItem("idVend"))).subscribe(res=>{
        console.log(res);


        
  
      this.serviceadmin.findByEmail(res.email).subscribe(res3=>{
        console.log(res3);

            this.gravaLocalStorage(res3.perfil, res3);
            localStorage.setItem("habilitavenda","NAO");
            this.router.navigate(['/home']);
        
      });
    });


  }

  public gravaLocalStorage(perfil: string, user: any){

    localStorage.setItem("perfil", perfil);

    if (perfil == "VENDEDOR"){
      localStorage.setItem("nome",user.nome);
      localStorage.setItem("idVend",user.id);

    }else{
      localStorage.setItem("nome",user.nome);
      localStorage.setItem("idAdmin",user.id);

    }

  }

  public refresh() {
    window.location.reload();
  }

  public setLoterica() {

    this.serviceundlot.findAll().subscribe(res => {
      localStorage.setItem("cnpj", res[0].cnpj);
      localStorage.setItem("nomeloterica", res[0].nomeFantasia);

    });
  }

  public limparCarrinho() {
    window.location.reload();
  }

  public areceber(){
    this.router.navigate(['/pagamentoareceber']);
  }

  public templates(){
    this.router.navigate(['/templates']);
  }

  public calculaMega(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotasmega_" + index + "") as HTMLInputElement).value > this.boloesVendedorMega[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");

    } else {
      this.listanum.push(this.listanumMega[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubMega[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubMega[index];
      }
      this.somaCotas = this.somaCotas + this.listanumMega[index];

      this.valorsubMega[index] = valorcota * this.listanumMega[index];

      let temp = this.listanumMega[index];

      //funcao pra atualizar as cotas disponíveis

      if (this.boloesVendedorMega[index][3] > temp) {
        this.boloesVendedorMega[index][3] = this.numcotaMega[index] - temp;

      } else {
        this.boloesVendedorMega[index][3] = this.numcotaMega[index] - temp;

      }
      this.valor += this.valorsubMega[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);

      (document.getElementById("qtdcotasmega_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");

    }

  }

  public calculaQuina(valorcota: number, index: number) {


    if ((document.getElementById("qtdcotasquina_" + index + "") as HTMLInputElement).value > this.boloesVendedorQuina[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotasquina_" + index + "") as HTMLInputElement).value = "";

    } else {


      this.listanum.push(this.listanumQuina[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubQuina[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubQuina[index];
      }
      this.somaCotas = this.somaCotas + this.listanumQuina[index];
      // alert(listanum[index]);
      this.valorsubQuina[index] = valorcota * this.listanumQuina[index];


      let temp = this.listanumQuina[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorQuina[index][3] > temp) {
        this.boloesVendedorQuina[index][3] = this.numcotaQuina[index] - temp;
      } else {
        this.boloesVendedorQuina[index][3] = this.numcotaQuina[index] - temp;

      }
      this.valor += this.valorsubQuina[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);

      (document.getElementById("qtdcotasquina_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaLote(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotaslote_" + index + "") as HTMLInputElement).value > this.boloesVendedorLote[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotaslote_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumLote[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubLote[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubLote[index];
      }
      this.somaCotas = this.somaCotas + this.listanumLote[index];
      // alert(listanum[index]);
      this.valorsubLote[index] = valorcota * this.listanumLote[index];


      let temp = this.listanumLote[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorLote[index][3] > temp) {
        this.boloesVendedorLote[index][3] = this.numcotaLote[index] - temp;
      } else {
        this.boloesVendedorLote[index][3] = this.numcotaLote[index] - temp;

      }
      this.valor += this.valorsubMega[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotaslote_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaDupl(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotasdupl_" + index + "") as HTMLInputElement).value > this.boloesVendedorDupl[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotasdupl_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumDupl[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubDupl[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubDupl[index];
      }
      this.somaCotas = this.somaCotas + this.listanumDupl[index];
      // alert(listanum[index]);
      this.valorsubDupl[index] = valorcota * this.listanumDupl[index];


      let temp = this.listanumDupl[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorDupl[index][3] > temp) {
        this.boloesVendedorDupl[index][3] = this.numcotaDupl[index] - temp;
      } else {
        this.boloesVendedorDupl[index][3] = this.numcotaDupl[index] - temp;

      }
      this.valor += this.valorsubDupl[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotasdupl_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaDias(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotasdias_" + index + "") as HTMLInputElement).value > this.boloesVendedorDias[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotasdias_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumDias[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubDias[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubDias[index];
      }

      this.somaCotas = this.somaCotas + this.listanumDias[index];
      // alert(listanum[index]);
      this.valorsubDias[index] = valorcota * this.listanumDias[index];


      let temp = this.listanumDias[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorDias[index][3] > temp) {
        this.boloesVendedorDias[index][3] = this.numcotaDias[index] - temp;
      } else {
        this.boloesVendedorDias[index][3] = this.numcotaDias[index] - temp;

      }
      this.valor += this.valorsubDias[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotasdias_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaBilh(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotasbilh_" + index + "") as HTMLInputElement).value > this.boloesVendedorBilh[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotasbilh_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumBilh[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubBilh[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubBilh[index];
      }

      this.somaCotas = this.somaCotas + this.listanumBilh[index];
      // alert(listanum[index]);
      this.valorsubBilh[index] = valorcota * this.listanumBilh[index];


      let temp = this.listanumBilh[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorBilh[index][3] > temp) {
        this.boloesVendedorBilh[index][3] = this.numcotaBilh[index] - temp;
      } else {
        this.boloesVendedorBilh[index][3] = this.numcotaBilh[index] - temp;

      }
      this.valor += this.valorsubBilh[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotasbilh_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaLfac(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotaslfac_" + index + "") as HTMLInputElement).value > this.boloesVendedorLfac[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotaslfac_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumLfac[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubLfac[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubLfac[index];
      }

      this.somaCotas = this.somaCotas + this.listanumLfac[index];
      // alert(listanum[index]);
      this.valorsubLfac[index] = valorcota * this.listanumLfac[index];


      let temp = this.listanumLfac[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorLfac[index][3] > temp) {
        this.boloesVendedorLfac[index][3] = this.numcotaLfac[index] - temp;
      } else {
        this.boloesVendedorLfac[index][3] = this.numcotaLfac[index] - temp;

      }
      this.valor += this.valorsubLfac[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotaslfac_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaLtma(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotasltma_" + index + "") as HTMLInputElement).value > this.boloesVendedorLtma[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotasltma_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumLtma[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubLtma[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubLtma[index];
      }

      this.somaCotas = this.somaCotas + this.listanumLtma[index];
      // alert(listanum[index]);
      this.valorsubLtma[index] = valorcota * this.listanumLtma[index];


      let temp = this.listanumLtma[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorLtma[index][3] > temp) {
        this.boloesVendedorLtma[index][3] = this.numcotaLtma[index] - temp;
      } else {
        this.boloesVendedorLtma[index][3] = this.numcotaLtma[index] - temp;

      }
      this.valor += this.valorsubLtma[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotasltma_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaTime(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotastime_" + index + "") as HTMLInputElement).value > this.boloesVendedorTime[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotastime_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumTime[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubTime[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubTime[index];
      }

      this.somaCotas = this.somaCotas + this.listanumTime[index];
      // alert(listanum[index]);
      this.valorsubTime[index] = valorcota * this.listanumTime[index];


      let temp = this.listanumTime[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorTime[index][3] > temp) {
        this.boloesVendedorTime[index][3] = this.numcotaTime[index] - temp;
      } else {
        this.boloesVendedorTime[index][3] = this.numcotaTime[index] - temp;

      }
      this.valor += this.valorsubTime[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotastime_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaSup7(valorcota: number, index: number) {

    if ((document.getElementById("qtdcotassup7_" + index + "") as HTMLInputElement).value > this.boloesVendedorSup7[index][3]) {

      alert("O valor de cotas inserido não pode ultrapassar o valor de cotas disponíveis para venda");
      (document.getElementById("qtdcotassup7_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanum.push(this.listanumSup7[index]);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;

      let aux: number;
      if (this.valorsubSup7[index] == undefined) {
        aux = 0;
      } else {
        aux = this.valorsubSup7[index];
      }

      this.somaCotas = this.somaCotas + this.listanumSup7[index];
      // alert(listanum[index]);
      this.valorsubSup7[index] = valorcota * this.listanumSup7[index];


      let temp = this.listanumSup7[index];
      //funcao pra atualizar as cotas disponíveis
      if (this.boloesVendedorSup7[index][3] > temp) {
        this.boloesVendedorSup7[index][3] = this.numcotaSup7[index] - temp;
      } else {
        this.boloesVendedorSup7[index][3] = this.numcotaSup7[index] - temp;

      }
      this.valor += this.valorsubSup7[index] - aux;
      this.link = this.valor;
      this.linkstring = this.visualizaValor(this.valor);
      (document.getElementById("qtdcotassup7_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");
    }
  }

  public calculaCombo(valorcombo: number, index: number) {

    if (parseInt((document.getElementById("unidcombos_" + index + "") as HTMLInputElement).value) > this.comboPainel[index].multiplicador) {

      alert("O número de unidades inserido não pode ultrapassar a quantidade disponível para venda");
      (document.getElementById("unidcombos_" + index + "") as HTMLInputElement).value = "";

    } else {

      this.listanumCombo.push(parseInt((document.getElementById("unidcombos_" + index) as HTMLInputElement).value));

    let aux: number;
    if (this.valorSubTotal[index] == undefined) {
      aux = 0;
    } else {
      aux = this.valorSubTotal[index];
    }

    let temp = parseInt((document.getElementById("unidcombos_" + index) as HTMLInputElement).value);

    if (temp > 0) {
      this.valorSubTotal[index] = valorcombo * temp;
    } else {
      this.valorSubTotal[index] = 0;
    }
    this.comboPainel[index].multiplicador = this.valoresMulti[index] - temp;
    this.valor += this.valorSubTotal[index] - aux;
    this.link = this.valor;
    this.linkstring = this.visualizaValor(this.valor);

      (document.getElementById('nomecomprador') as HTMLInputElement).disabled = false;
      (document.getElementById('telefonecliente') as HTMLInputElement).disabled = false;
      (document.getElementById('cpfcliente') as HTMLInputElement).disabled = false;
      (document.getElementById('emailcliente') as HTMLInputElement).disabled = false;

      (document.getElementById('modalidade') as HTMLInputElement).disabled = false;


      (document.getElementById("unidcombos_" + index + "") as HTMLInputElement).setAttribute("disabled", "true");


    }

    
  }

  public buscarNome() {
    let msg: string;
    msg = (document.getElementById("nomecomprador") as HTMLInputElement).value;
    if (msg[msg.length - 1] != null) {
      this.servicecli.findByName(msg).subscribe(res => {
        this.clientes = res;
      });
    } else {
      this.clientes = [];
    }
  }

  public escolherNome() {
    // this.telefone = "";
    // this.cpf = "";
    // this.email = "";
    if (this.clientes[0] != undefined) {

      this.servicecli.findById(this.clientes[0].id).subscribe(res => {

        this.nome = res.nome;
        this.telefone = res.contato1;
        this.cpf = res.cpf;
        this.email = res.email;

        this.cliente = res;
      });
    }

  }

  public addCarrinho(id: number, cota: number, input: string, index: number) {

    document.getElementById(input + "_" + index).removeAttribute("disabled");



    console.log(this.BolaoSelecao);

    for (let i = 0; i <= this.BolaoSelecao.length; i++) {
      if (this.BolaoSelecao[i] == id) {
        this.BolaoSelecao.splice(i);
        return;
      }
    }

    this.BolaoSelecao.push(id);
  }

  public addCarrinhoCombo(index: number) {

    
    // this.listanumCombo.push(parseInt((document.getElementById("unidcombos_" + index) as HTMLInputElement).value));

    this.listanumCotaCombo.push(parseInt((document.getElementById("cotacombo" + index) as HTMLInputElement).value))

    for (let i = 0; i <= this.ComboSelecao.length; i++) {
      if (this.ComboSelecao[i] == this.comboPainel[index]) {
        this.ComboSelecao.splice(i, 1)
      }
    }
    this.ComboSelecao.push(this.comboPainel[index]);
    this.ComboSelecao[this.ComboSelecao.length - 1].multiplicador = this.comboPainel[index].multiplicador;
    this.ComboSelecao[this.ComboSelecao.length - 1].id = this.comboPainel[index].id;
    console.log(this.ComboSelecao[this.ComboSelecao.length - 1]);
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public home() {
    this.router.navigate(['/home']);
  }

  public cadastrousuario() {
    this.router.navigate(['/cadastrousuario']);
  }

  public cadbolaovend() {
    this.router.navigate(['/cadastrobolaovendedor']);
  }

  public cadastrocombo() {
    this.router.navigate(['/cadastrocombo']);
  }

  public prestacontas() {
    this.router.navigate(['/prestacontas']);
  }

  public extratovendedora() {
    this.router.navigate(['/extratovendedora']);
  }

  public tutorial() {
    this.router.navigate(['/bemvindo']);
  }

  public listausuarios() {
    this.router.navigate(['/listausuarios']);
  }

  public listaboloes() {
    this.router.navigate(['/listaboloes']);
  }

  public listacotas() {
    this.router.navigate(['/listacotas']);
  }

  public listametas() {
    this.router.navigate(['/listametas']);
  }

  public vendaspendentes() {
    this.router.navigate(['/vendaspendentes']);
  }

  public listacombos() {
    this.router.navigate(['/listacombos']);
  }

  public indices() {
    this.router.navigate(['/indices']);
  }

  public addMega() {

  if(this.boloesVendedorMega.length > 0){

    for (let j = 0; j < this.boloesVendedorMega.length; j++) {
      this.numcotaMega[j] = null;
    }
    this.boloesVendedorMega = [];

    document.getElementById("showInputField1").setAttribute("style", "display: none;");

    document.getElementById("divmega").setAttribute("style", "display:none");
    

  }else{

    this.servicecota.findByModalidadeVendedor('MEGA', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorMega = res;
      for (let j = 0; j < this.boloesVendedorMega.length; j++) {
        this.numcotaMega[j] = this.boloesVendedorMega[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField1').appendChild(row);
    document.getElementById("showInputField1").setAttribute("style", "display: inline;");

    document.getElementById("divmega").setAttribute("style", "display:block");
    //  this.boloes = [];

  }

    
  }


  public addQuin() {

    if(this.boloesVendedorQuina.length > 0){

      for (let j = 0; j < this.boloesVendedorQuina.length; j++) {
        this.numcotaQuina[j] = null;
      }
      this.boloesVendedorQuina = [];
  
      document.getElementById("showInputField2").setAttribute("style", "display: none;");
  
      document.getElementById("divquina").setAttribute("style", "display:none");
      
  
    }else{


    this.servicecota.findByModalidadeVendedor('QUINA', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorQuina = res;
      for (let j = 0; j < this.boloesVendedorQuina.length; j++) {
        this.numcotaQuina[j] = this.boloesVendedorQuina[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField2').appendChild(row);
    document.getElementById("showInputField2").setAttribute("style", "display: inline;");
    document.getElementById("divquina").setAttribute("style", "display:block");
  }
  }

  public addLote() {

    if(this.boloesVendedorLote.length > 0){

      for (let j = 0; j < this.boloesVendedorLote.length; j++) {
        this.numcotaLote[j] = null;
      }
      this.boloesVendedorLote = [];
  
      document.getElementById("showInputField3").setAttribute("style", "display: none;");
  
      document.getElementById("divlote").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('LOTE', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorLote = res;
      for (let j = 0; j < this.boloesVendedorLote.length; j++) {
        this.numcotaLote[j] = this.boloesVendedorLote[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField3').appendChild(row);
    document.getElementById("showInputField3").setAttribute("style", "display: inline;");
    document.getElementById("divlote").setAttribute("style", "display:block");

  }
  }

  public addDupl() {

    if(this.boloesVendedorDupl.length > 0){

      for (let j = 0; j < this.boloesVendedorDupl.length; j++) {
        this.numcotaDupl[j] = null;
      }
      this.boloesVendedorDupl = [];
  
      document.getElementById("showInputField4").setAttribute("style", "display: none;");
  
      document.getElementById("divdupl").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('DUPL', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorDupl = res;
      for (let j = 0; j < this.boloesVendedorDupl.length; j++) {
        this.numcotaDupl[j] = this.boloesVendedorDupl[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField4').appendChild(row);
    document.getElementById("showInputField4").setAttribute("style", "display: inline;");
    document.getElementById("divdupl").setAttribute("style", "display:block");
  }
  }

  public addDias() {

    if(this.boloesVendedorDias.length > 0){

      for (let j = 0; j < this.boloesVendedorDias.length; j++) {
        this.numcotaDias[j] = null;
      }
      this.boloesVendedorDias = [];
  
      document.getElementById("showInputField5").setAttribute("style", "display: none;");
  
      document.getElementById("divdias").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('DIAS', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorDias = res;
      for (let j = 0; j < this.boloesVendedorDias.length; j++) {
        this.numcotaDias[j] = this.boloesVendedorDias[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField5').appendChild(row);
    document.getElementById("showInputField5").setAttribute("style", "display: inline;");
    document.getElementById("divdias").setAttribute("style", "display:block");
  }
  }

  public addBilh() {

    if(this.boloesVendedorBilh.length > 0){

      for (let j = 0; j < this.boloesVendedorBilh.length; j++) {
        this.numcotaBilh[j] = null;
      }
      this.boloesVendedorBilh = [];
  
      document.getElementById("showInputField6").setAttribute("style", "display: none;");
  
      document.getElementById("divbilh").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('BILH', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorBilh = res;
      for (let j = 0; j < this.boloesVendedorBilh.length; j++) {
        this.numcotaBilh[j] = this.boloesVendedorBilh[j][3];
      }
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField6').appendChild(row);
    document.getElementById("showInputField6").setAttribute("style", "display: inline;");
    document.getElementById("divbilh").setAttribute("style", "display:block");
  }
  }

  public addLfac() {

    if(this.boloesVendedorLfac.length > 0){

      for (let j = 0; j < this.boloesVendedorLfac.length; j++) {
        this.numcotaLfac[j] = null;
      }
      this.boloesVendedorLfac = [];
  
      document.getElementById("showInputField7").setAttribute("style", "display: none;");
  
      document.getElementById("divlfac").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('LFAC', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorLfac = res;
      for (let j = 0; j < this.boloesVendedorLfac.length; j++) {
        this.numcotaLfac[j] = this.boloesVendedorLfac[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField7').appendChild(row);
    document.getElementById("showInputField7").setAttribute("style", "display: inline;");
    document.getElementById("divlfac").setAttribute("style", "display:block");
  }
  }

  public addLtma() {

    if(this.boloesVendedorLtma.length > 0){

      for (let j = 0; j < this.boloesVendedorLtma.length; j++) {
        this.numcotaLtma[j] = null;
      }
      this.boloesVendedorLtma = [];
  
      document.getElementById("showInputField8").setAttribute("style", "display: none;");
  
      document.getElementById("divltma").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('LTMA', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorLtma = res;
      for (let j = 0; j < this.boloesVendedorLtma.length; j++) {
        this.numcotaLtma[j] = this.boloesVendedorLtma[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField8').appendChild(row);
    document.getElementById("showInputField8").setAttribute("style", "display: inline;");
    document.getElementById("divltma").setAttribute("style", "display:block");
  }
  }

  public addTime() {

    if(this.boloesVendedorTime.length > 0){

      for (let j = 0; j < this.boloesVendedorTime.length; j++) {
        this.numcotaTime[j] = null;
      }
      this.boloesVendedorTime = [];
  
      document.getElementById("showInputField10").setAttribute("style", "display: none;");
  
      document.getElementById("divtime").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('TIME', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorTime = res;
      for (let j = 0; j < this.boloesVendedorTime.length; j++) {
        this.numcotaTime[j] = this.boloesVendedorTime[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField10').appendChild(row);
    document.getElementById("showInputField10").setAttribute("style", "display: inline;");
    document.getElementById("divtime").setAttribute("style", "display:block");
  }
  }

  public addSup7() {

    if(this.boloesVendedorSup7.length > 0){

      for (let j = 0; j < this.boloesVendedorSup7.length; j++) {
        this.numcotaSup7[j] = null;
      }
      this.boloesVendedorSup7 = [];
  
      document.getElementById("showInputField11").setAttribute("style", "display: none;");
  
      document.getElementById("divsup7").setAttribute("style", "display:none");
      
  
    }else{

    this.servicecota.findByModalidadeVendedor('SUP7', parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      //this.servicecota.findByModalidadeVendedor('MEGA',1).subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      this.boloesVendedorSup7 = res;
      for (let j = 0; j < this.boloesVendedorSup7.length; j++) {
        this.numcotaSup7[j] = this.boloesVendedorSup7[j][3];
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField11').appendChild(row);
    document.getElementById("showInputField11").setAttribute("style", "display: inline;");
    document.getElementById("divsup7").setAttribute("style", "display:block");
  }
  }

  public addCombo() {


    if(this.comboPainel.length > 0){

        this.valoresMulti = [];
        this.idsbolaocombo = [];
        this.comboPainel = [];
        this.numCotaCombos = [];
        let temp: null;
        let aux = "";
        let interruptor = true;
  
        document.getElementById("showInputField9").setAttribute("style", "display: none;");
        document.getElementById("divcombo").setAttribute("style", "display:none");
      
  
    }else{


      let temp: number;
      let aux = "";
      let interruptor = true;
      this.servicecc.findList().subscribe(res => {
  
  
  
        console.log("inicio", res);
        temp = res[0][0];
  
        this.numCotaCombos.push("");
        this.valorCombo.push(0);
        for (let i = 0; i < res.length; i++) {
  
  
          if (res[i][0] == temp) {
            this.numCotaCombos[this.numCotaCombos.length - 1] += "," + res[i][2];
            console.log("diga me as cotas", this.numCotaCombos[this.numCotaCombos.length - 1]);
            this.valorCombo[this.valorCombo.length - 1] += res[i][3] * res[i][2];
            console.log(i + " rodada")
            if (interruptor) {
              aux = aux + res[i][1];
              interruptor = false;
            }
            else {
              aux = aux + " + " + res[i][1];
            }
  
          }
          else {
            this.idsbolaocombo.push(res[i][6]);
            this.valorCombo.push(0);
            this.valorCombo[this.valorCombo.length - 1] += res[i][3] * res[i][2];
            this.numCotaCombos.push("");
  
            this.numCotaCombos[this.numCotaCombos.length - 1] += "," + res[i][2];
            console.log("diga me as cotas", this.numCotaCombos[this.numCotaCombos.length - 1]);
            this.comboPainel.push(new Combopainel());
            this.comboPainel[this.comboPainel.length - 1].descricao = aux;
            this.comboPainel[this.comboPainel.length - 1].id = temp;
            console.log("mult:   " + res[i][7] + " - temp: " + temp);
            this.comboPainel[this.comboPainel.length - 1].multiplicador = res[i - 1][7];
            this.valoresMulti.push(res[i - 1][7]);
            temp = res[i][0];
            aux = "";
            aux = aux + res[i][1];
  
          }
          if (i == res.length - 1) {
            this.idsbolaocombo.push(res[i][6]);
            console.log("diga me as cotas", this.numCotaCombos[this.numCotaCombos.length - 1]);
            this.comboPainel.push(new Combopainel());
            this.comboPainel[this.comboPainel.length - 1].descricao = aux;
            this.comboPainel[this.comboPainel.length - 1].id = temp;
            this.comboPainel[this.comboPainel.length - 1].multiplicador = res[i][7];
            this.valoresMulti.push(res[i][7]);
          }
        }
        console.log("final ", this.comboPainel);
  
      });
      document.getElementById("showInputField9").setAttribute("style", "display: inline;");
      document.getElementById("divcombo").setAttribute("style", "display:block");

    }


   
  }

  public compartilhaWhats(event) {

    let fileList = event.target.files;
    let link = (document.getElementById("linkpagto") as HTMLInputElement).value;
    let compart = (window.navigator as any);

    if (compart.canShare && compart.canShare({ files: fileList })) {
      compart.share({ text: link, files: fileList, }).catch((error) => {
        alert('Error sharing');
      });
    } else {
      alert("Your operational system doesn't support sharing files");
    }

  }

  public verify() {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
    <div>
      <div class="form-row">
        <div class="form-group col-md-2" style="text-align: center;">
          <label><b>Forma:</b></label>
        </div>
        <div class="form-group col-md-4"> 
          <input type="text" class="form-control" name="formapagto" id="formapagto">
        </div>
        
        <div class="form-group col-md-2" style="text-align: center;">
          <label><b>Valor:</b></label>
        </div>
        <div class="form-group col-md-4"> 
        <input type="text" class="form-control" onkeypress="$(this).mask('#.##0,00', {reverse: true});" name="outrasformas" id="outrasformas" [(ngModel)]="painelv.pagamento.outrasformas">
        </div>
      </div>  
    </div>`;
    document.querySelector('#test').appendChild(row);

  }

  public verifymob() {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
    <div style="width:200px; padding-left:15px">
      <div class="form-row">
        <div class="form-group col-md-2">
          <label><b>Forma:</b></label>
        </div>
        <div class="form-group col-md-4"> 
          <input type="text" class="form-control" name="formapagto" id="formapagto">
        </div>
        
        <div class="form-group col-md-2" >
          <label><b>Valor:</b></label>
        </div>
        <div class="form-group col-md-4"> 
        <input type="text" class="form-control" onkeypress="$(this).mask('#.##0,00', {reverse: true});" name="outrasformas" id="outrasformas" [(ngModel)]="painelv.pagamento.outrasformas">
        </div>
      </div>  
    </div>`;
    document.querySelector('#test').appendChild(row);

  }

  public trataValor(valor: string) {
    let novo = valor.replace(",", "");
    return novo;
  }


  public copiarLink(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    document.getElementById("msgcopiado").setAttribute("style", "display:flex; color:green;");
  }

  public atualizaUnidadeCombo(combo: CadCombo) {
    this.servicecc.update(combo);
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

  public limparDadosCliente() {

    (document.getElementById("nomecomprador") as HTMLInputElement).value = "";
    (document.getElementById("telefonecliente") as HTMLInputElement).value = "";
    (document.getElementById("cpfcliente") as HTMLInputElement).value = "";
    (document.getElementById("emailcliente") as HTMLInputElement).value = "";

    this.cliente = new UsuarioClienteFinal();

    this.nome = "";
    this.telefone = "";
    this.cpf = "";
    this.email = "";

  }

  public cadastraCliente(){
    if (this.clientes.length == 0) {
      this.cliente.nome = (document.getElementById("nomecomprador") as HTMLInputElement).value;
      this.cliente.cpf = (document.getElementById("cpfcliente") as HTMLInputElement).value;
      this.cliente.contato1 = (document.getElementById("telefonecliente") as HTMLInputElement).value;
      this.cliente.email = (document.getElementById("emailcliente") as HTMLInputElement).value;
      this.cliente.idVendedor = parseInt(localStorage.getItem("idVend"));
      this.servicecli.create(this.cliente).subscribe(res=>{

        console.log(res);
        this.servicecli.updateVendedor(res, this.cliente.idVendedor).subscribe(res2 => {
          console.log(" update ok ");
        });

      });
    }
  }


  public gerarLink() {

  if(this.link > 0 || this.link != undefined){
    if((document.getElementById("nomecomprador") as HTMLInputElement).value == "" || (document.getElementById("telefonecliente") as HTMLInputElement).value == ""
     || (document.getElementById("cpfcliente") as HTMLInputElement).value == "" || (document.getElementById("emailcliente") as HTMLInputElement).value == ""){

      alert("Todos os campos relacionados ao comprador devem estar preenchidos");
     }else{

      this.cliente.idVendedor = parseInt(localStorage.getItem("idVend"));
      console.log("vendedor id definido: "+ this.cliente.idVendedor);
  
      console.log(this.BolaoSelecao.length);
  
      this.cadastraCliente();
  
      this.ordempagamento.idCota = "";
      let cota = new Cota();
  
      for (let i = 0; i < this.BolaoSelecao.length; i++) {
        cota.idCota = this.BolaoSelecao[i][4];
  
        // cota.quantidadeCotaVendedor = this.BolaoSelecao[i][3];
        this.ordempagamento.idCota += cota.idCota + '@' + this.listanum[i] + ',';
        // this.servicecota.update(cota);
  
      }
  
      console.log(this.ordempagamento.idCota);
  
      let combo = new CadCombo();
  
      for (let j = 0; j < this.ComboSelecao.length; j++) {
        combo.id = this.ComboSelecao[j].id;
  
  
        // combo.multiplicador = this.ComboSelecao[j].multiplicador;
        this.ordempagamento.idCombo = combo.id + '@' + this.listanumCombo[j] + ',';
  
        // this.atualizaUnidadeCombo(combo);
      }
  
  
  
      if (this.valor != undefined || this.valor != 0) {
        console.log(this.email);
  
        this.ordempagamento.nomeCliente = this.cliente.nome;
        this.ordempagamento.emailCliente = this.email;
        if (this.email == "") {
          this.ordempagamento.emailCliente = this.cliente.email;
        }
        this.ordempagamento.vendedorId = parseInt(localStorage.getItem("idVend"));
  
        let foi = 0;
        for (let i = 0; i < this.listanum.length; i++) {
          foi += this.listanum[i];
        }
        console.log(foi);
        console.log(this.listanum);
        console.log(this.listanumCotaCombo);
        console.log(this.BolaoSelecao)
  
        // for (let i of this.listanumCotaCombo) {
        //   foi += i;
        // }

        for (let i = 0; i < this.listanumCotaCombo.length; i++) {
          foi += this.listanumCombo[i];;
        }
  
        this.ordempagamento.qtdCotasVendidas = foi;
  
        this.ordempagamento.descricao = " ";
        for (let i = 0; i < this.BolaoSelecao.length; i++) {
          if (i == this.BolaoSelecao.length - 1) {
            this.ordempagamento.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts";
          } else {
            this.ordempagamento.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts " + ", ";
          }
        }
  
        for (let i = 0; i < this.ComboSelecao.length; i++) {
          if (i == this.ComboSelecao.length - 1) {
            this.ordempagamento.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao;
          } else {
            this.ordempagamento.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao + ", ";
          }
        }
  
        // this.valor1 = parseFloat(this.valor.toString().replace('.','').replace(',',''));
  
        this.ordempagamento.valor = this.link;
  
        this.ordempagamento.nomeLoterica = localStorage.getItem("nomeloterica");
        this.ordempagamento.cnpjLoterica = localStorage.getItem("cnpj");
  
        this.service.create(this.ordempagamento).subscribe(res => {

  
          (document.getElementById("linkpagto") as HTMLInputElement).value = res.link;
          if (this.mobile == false) {
            document.getElementById("linkpagto").setAttribute("style", "display:flex; width:400px; border:none;");
            document.getElementById("btnlinkpagto").setAttribute("style", "display:flex;");
          } else {
            document.getElementById("linkpagto").setAttribute("style", "display:flex; width:350px; border:none;");
            document.getElementById("btnlinkpagto").setAttribute("style", "display:flex;");
          }
          document.getElementById("sharediv").setAttribute("style", "justify-content: center; align-items: center; display: flex;");
          //  document.getElementById("btnlinkpagto").setAttribute("style", "display:flex;");
  
          this.ordempagamento = new Ordempagamento();
        });
  
      }
  
      // console.log(this.somaCotas);
      // this.movimentacao.qtdCotasVendidas = this.somaCotas;
  
  
      // let total: number = 0;
      // let dinheiro = parseFloat(this.trataValor((document.getElementById("dinheiro") as HTMLInputElement).value));
      // let debito = parseFloat(this.trataValor((document.getElementById("debito") as HTMLInputElement).value));
      // let credito = parseFloat(this.trataValor((document.getElementById("credito") as HTMLInputElement).value));
      // let pix = parseFloat(this.trataValor((document.getElementById("pix") as HTMLInputElement).value));
  
      // this.movimentacao.valorcotaEntrada = (dinheiro + debito + credito + pix);
      // localStorage.setItem("totalvenda", this.movimentacao.valorcotaEntrada.toString())
      // var today = new Date();
      // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      // this.movimentacao.dataMovimentacao = date;
  
      // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      
      // this.movimentacao.idVendedor = parseInt(localStorage.getItem("idVend"));
      // this.movimentacao.idAdministrador = parseInt(localStorage.getItem("idAdmin"));
  
      // for (let item of this.valorSubTotal) {
      //   if (item != undefined) {
      //     total = total + item;
      //   }
      // }
  
      // this.movimentacao.valorCombo = total;
      // this.servicemov.create(this.movimentacao).subscribe(res => {
      //   console.log(" dados gravados ");
      // });
      // this.movimentacao = new Movimentacao();
  
      // if (this.mobile == true) {
  
      //   const availHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
      //   const width = 375;
      //   const height = Math.min(availHeight, 667);
      //   const top = (availHeight / 2) - (height / 2);
      //   const left = (window.screen.availWidth / 2) - (width / 2);
      //   window.open('http://localhost:4200/pagamento', '_blank', `height=${height}, width=${width},top=${top},left=${left}`);
  
      // } else {
      //   const availHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
      //   const width = 1150;
      //   const height = Math.min(availHeight, 700);
      //   const top = (availHeight / 2) - (height / 2);
      //   const left = (window.screen.availWidth / 2) - (width / 2);
      //   window.open('http://localhost:4200/pagamento', '_blank', `height=${height}, width=${width},top=${top},left=${left}`);
      // }
  
      // window.open('http://api.ibolao.com.br/detalhescliente',  '_blank', `height=${height}, width=${width},top=${top},left=${left}`);

     }
  }

    
  }

  public gravar() {

    if((this.valor - this.dinheiro - this.credito - this.debito - this.pix - this.outros) > 0){

      if((document.getElementById("nomecomprador") as HTMLInputElement).value == "" || (document.getElementById("telefonecliente") as HTMLInputElement).value == ""){
        alert("Os campos nome e telefone do comprador devem estar preenchidos");
      
      }else{
        let cota = new Cota();
        this.ordempagamento.idCota = "";
    
        for (let i = 0; i < this.BolaoSelecao.length; i++) {
          cota.idCota = this.BolaoSelecao[i][4];
          cota.quantidadeCotaVendedor = this.BolaoSelecao[i][3];
          this.ordempagamento.idCota += cota.idCota + '@' + this.listanum[i] + ',';
          this.servicecota.update(cota);
        }
        let combo = new CadCombo();
        for (let j = 0; j < this.ComboSelecao.length; j++) {
          combo.id = this.ComboSelecao[j].id;
    
          this.ordempagamento.idCombo = combo.id + '@' + this.listanumCombo[j] + ',';
          combo.multiplicador = this.ComboSelecao[j].multiplicador;
    
          this.atualizaUnidadeCombo(combo);
        }
    
        console.log(this.somaCotas);
        this.movimentacao.qtdCotasVendidas = this.somaCotas;
    
        this.movimentacao.descricao = " ";
        for (let i = 0; i < this.BolaoSelecao.length; i++) {
          if (i == this.BolaoSelecao.length - 1) {
            this.movimentacao.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0]+ " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts ";
          } else {
            this.movimentacao.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts " + ", ";
          }
        }
    
        for (let i = 0; i < this.ComboSelecao.length; i++) {
          if (i == this.ComboSelecao.length - 1) {
            this.movimentacao.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao;
          } else {
            this.movimentacao.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao + ", ";
          }
        }
    
        this.movimentacao.dinheiro = this.dinheiro;
        this.movimentacao.debito = this.debito;
        this.movimentacao.credito = this.credito;
        this.movimentacao.pix = this.pix;
        this.movimentacao.outros = this.outros;
        this.movimentacao.pendente = this.valor - this.dinheiro - this.credito - this.debito - this.pix - this.outros;
    
        this.cliente.idVendedor = parseInt(localStorage.getItem("idVend"));
        this.cadastraCliente();
    
        var today = new Date();
    
        var date = "";
    
        if (today.getDate().toString().length == 1) {
          if ((today.getMonth() + 1).toString().length == 1) {
            date = "0" + today.getDate() + '/0' + (today.getMonth() + 1) + '/' + today.getFullYear();
          } else {
            date = "0" + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
          }
        } else {
          if ((today.getMonth() + 1).toString().length == 1) {
            date = today.getDate() + '/0' + (today.getMonth() + 1) + '/' + today.getFullYear();
          } else {
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
          }
        }
    
        this.movimentacao.data = date;
        this.movimentacao.vendedor = new UsuarioEquipeVendedor();
        this.movimentacao.vendedor.id = parseInt(localStorage.getItem("idVend"));
    
        console.log('quase gravando');
        console.log(this.ordempagamento.idCota);
    
        if (this.valor != undefined || this.valor != 0) {
          console.log(this.email);
    
          this.ordempagamento.nomeCliente = this.cliente.nome;
          this.ordempagamento.emailCliente = this.email;
          if (this.email == "") {
            this.ordempagamento.emailCliente = this.cliente.email;
          }
          this.ordempagamento.vendedorId = parseInt(localStorage.getItem("idVend"));
    
          let foi = 0;
          for (let i = 0; i < this.listanum.length; i++) {
            foi += this.listanum[i];
          }
    
          // for (let i of this.listanumCotaCombo) {
        //   foi += i;
        // }

        for (let i = 0; i < this.listanumCotaCombo.length; i++) {
          foi += this.listanumCombo[i];;
        }
    
          this.ordempagamento.qtdCotasVendidas = foi;
          this.ordempagamento.isPago = "true";
    
          this.ordempagamento.descricao = " ";
          for (let i = 0; i < this.BolaoSelecao.length; i++) {
            if (i == this.BolaoSelecao.length - 1) {
              this.ordempagamento.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts";
            } else {
              this.ordempagamento.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts " + ", ";
            }
          }
    
          for (let i = 0; i < this.ComboSelecao.length; i++) {
            if (i == this.ComboSelecao.length - 1) {
              this.ordempagamento.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao;
            } else {
              this.ordempagamento.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao + ", ";
            }
          }
    
          // this.valor1 = parseFloat(this.valor.toString().replace('.','').replace(',',''));
    
          this.ordempagamento.valor = this.dinheiro + this.pix + this.credito + this.debito + this.outros;
    
          this.ordempagamento.nomeLoterica = localStorage.getItem("nomeloterica");
          this.ordempagamento.cnpjLoterica = localStorage.getItem("cnpj");
    
          this.service.create(this.ordempagamento).subscribe(res => {
    
            this.idOrdemPagto = res.id;
    
            this.ordempagamento = new Ordempagamento();
          });
        }
    
        document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");
    
        let timer = setTimeout(function () {
          document.getElementById("divsuccess").setAttribute("style", "display: none;");
        }, 5000);
    
        this.movimentacao.ordempagId = this.idOrdemPagto;
        this.criaMovimentacao();

      }

    }else{

      let cota = new Cota();
        this.ordempagamento.idCota = "";
    
        for (let i = 0; i < this.BolaoSelecao.length; i++) {
          cota.idCota = this.BolaoSelecao[i][4];
          cota.quantidadeCotaVendedor = this.BolaoSelecao[i][3];
          this.ordempagamento.idCota += cota.idCota + '@' + this.listanum[i] + ',';
          this.servicecota.update(cota);
        }
        let combo = new CadCombo();
        for (let j = 0; j < this.ComboSelecao.length; j++) {
          combo.id = this.ComboSelecao[j].id;
    
          this.ordempagamento.idCombo = combo.id + '@' + this.listanumCombo[j] + ',';
          combo.multiplicador = this.ComboSelecao[j].multiplicador;
    
          this.atualizaUnidadeCombo(combo);
        }
    
        console.log(this.somaCotas);
        this.movimentacao.qtdCotasVendidas = this.somaCotas;
    
        this.movimentacao.descricao = " ";
        for (let i = 0; i < this.BolaoSelecao.length; i++) {
          if (i == this.BolaoSelecao.length - 1) {
            this.movimentacao.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0];
          } else {
            this.movimentacao.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + ", ";
          }
        }
    
        for (let i = 0; i < this.ComboSelecao.length; i++) {
          if (i == this.ComboSelecao.length - 1) {
            this.movimentacao.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao;
          } else {
            this.movimentacao.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao + ", ";
          }
        }
    
        this.movimentacao.dinheiro = this.dinheiro;
        this.movimentacao.debito = this.debito;
        this.movimentacao.credito = this.credito;
        this.movimentacao.pix = this.pix;
        this.movimentacao.outros = this.outros;
        this.movimentacao.pendente = this.valor - this.dinheiro - this.credito - this.debito - this.pix - this.outros;
    
        this.cliente.idVendedor = parseInt(localStorage.getItem("idVend"));
        this.cadastraCliente();
    
        var today = new Date();
    
        var date = "";
    
        if (today.getDate().toString().length == 1) {
          if ((today.getMonth() + 1).toString().length == 1) {
            date = "0" + today.getDate() + '/0' + (today.getMonth() + 1) + '/' + today.getFullYear();
          } else {
            date = "0" + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
          }
        } else {
          if ((today.getMonth() + 1).toString().length == 1) {
            date = today.getDate() + '/0' + (today.getMonth() + 1) + '/' + today.getFullYear();
          } else {
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
          }
        }
    
        this.movimentacao.data = date;
        this.movimentacao.vendedor = new UsuarioEquipeVendedor();
        this.movimentacao.vendedor.id = parseInt(localStorage.getItem("idVend"));
    
        console.log('quase gravando');
        console.log(this.ordempagamento.idCota);
    
        if (this.valor != undefined || this.valor != 0) {
          console.log(this.email);
    
          this.ordempagamento.nomeCliente = this.cliente.nome;
          this.ordempagamento.emailCliente = this.email;
          if (this.email == "") {
            this.ordempagamento.emailCliente = this.cliente.email;
          }
          this.ordempagamento.vendedorId = parseInt(localStorage.getItem("idVend"));
    
          let foi = 0;
          for (let i = 0; i < this.listanum.length; i++) {
            foi += this.listanum[i];
          }
    
          for (let i of this.listanumCotaCombo) {
            foi += i;
          }
    
          this.ordempagamento.qtdCotasVendidas = foi;
          this.ordempagamento.isPago = "true";
    
          this.ordempagamento.descricao = " ";
          for (let i = 0; i < this.BolaoSelecao.length; i++) {
            if (i == this.BolaoSelecao.length - 1) {
              this.ordempagamento.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts";
            } else {
              this.ordempagamento.descricao += this.listanum[i] + " cota(s) " + this.BolaoSelecao[i][0] + " - " + this.visualizaValor(this.BolaoSelecao[i][2]) + " - " + this.BolaoSelecao[i][7] + " cts " + ", ";
            }
          }
    
          for (let i = 0; i < this.ComboSelecao.length; i++) {
            if (i == this.ComboSelecao.length - 1) {
              this.ordempagamento.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao;
            } else {
              this.ordempagamento.descricao += this.listanumCombo[i] + " unidade(s) do Combo: " + this.ComboSelecao[i].descricao + ", ";
            }
          }
    
          // this.valor1 = parseFloat(this.valor.toString().replace('.','').replace(',',''));
    
          this.ordempagamento.valor = this.dinheiro + this.pix + this.credito + this.debito + this.outros;
    
          this.ordempagamento.nomeLoterica = localStorage.getItem("nomeloterica");
          this.ordempagamento.cnpjLoterica = localStorage.getItem("cnpj");
          this.ordempagamento.nomeCliente = "NAO INFORMADO";
          this.ordempagamento.emailCliente = "NAO INFORMADO";
    
          this.service.create(this.ordempagamento).subscribe(res => {
    
            this.idOrdemPagto = res.id;
    
            this.ordempagamento = new Ordempagamento();
          });
        }
    
        document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");
    
        let timer = setTimeout(function () {
          document.getElementById("divsuccess").setAttribute("style", "display: none;");
        }, 5000);
    
        this.movimentacao.ordempagId = this.idOrdemPagto;
        this.criaMovimentacao();
    }

    document.getElementById("btnnewsale").setAttribute("style", "display: flex;");
    
  }

  public criaMovimentacao() {
    console.log("cheogu aqui..")
    
    this.servicemov.create(this.movimentacao).subscribe(res => {
      console.log(" dados gravados ");
      this.movimentacao = new Movimentacao();
      this.idOrdemPagto = undefined;

    });

    // window.location.reload();
  }

  public novaVenda(){
    
    document.getElementById("btnnewsale").setAttribute("style", "display: none;");

    window.scrollTo(0, 0);
    
    window.location.reload();
  }


  public calculaTotal(valor: string, tipo: string) {

    // this.ajustaCentavos(tipo.toLowerCase());

    let valornovo = valor;
    if (valor == "") {
      valornovo = "0";
    }

    while (valornovo.includes(".")) {
      valornovo = valornovo.replace(".", "");
    }
    valornovo = valornovo.replace(",", "").replace("R$ ", "");

    if (tipo == 'DINHEIRO') {
      this.dinheiro = parseInt(valornovo);
    } else if (tipo == 'OUTROS') {
      this.outros = parseInt(valornovo);
    } else if (tipo == 'CREDITO') {
      this.credito = parseInt(valornovo);
    } else if (tipo == 'DEBITO') {
      this.debito = parseInt(valornovo);
    } else if (tipo == 'LINK') {
      this.link = parseInt(valornovo);

      if (parseInt(valornovo) > 0) {
        (document.getElementById('botaolink') as HTMLButtonElement).disabled = false;
      } else {
        (document.getElementById('botaolink') as HTMLButtonElement).disabled = true;
        // document.getElementById('botaolink').setAttribute('disabled','false');
      }
    } else {
      this.pix = parseInt(valornovo);
    }
  }

}
