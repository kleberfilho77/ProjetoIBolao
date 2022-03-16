import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movimentacao } from '../model/movimentacaoentrada';
import { PrestacaoContas } from '../model/prestacaocontas';
import { MovimentacaoService } from '../service/movimentacaoservice';
import { PrestaContasService } from '../service/prestacontasservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';

@Component({
  selector: 'app-extratovendedora',
  templateUrl: './extratovendedora.component.html',
  styleUrls: ['./extratovendedora.component.css']
})
export class ExtratovendedoraComponent implements OnInit {

  mobile: boolean = false;
  nave: string;
  perfil: string;
  nome: string = "";
  telefone: string = "";
  cpf: string = "";
  email: string = "";
  valorCombo: number[] = [];
  valorSubTotal: number[] = [];
  valoresMulti: number[] = [];
  movimentacao: Movimentacao;
  somaCotas: number = 0;
  valor = 0;
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
  valor1: number;

  valorQuitado = 0;
  valorAQuitar = 0;;
  valorAReceber = 0;

  lastDate: Date;

  listaExtrato;

  listaVendedores;
  idVendedor;

  valorTotal = 0;
  cotaTotal = 0;

  selected1: string = "";
  filtroCliente;
  valorPago;
  de;
  ate;
  prestaconta: PrestacaoContas;

  resumoDeContas: number[] = [];

  constructor(private servicemov: MovimentacaoService, private router: Router,
    private servicevend: UsuarioEquipeVendedorService, private serviceconta: PrestaContasService) { }

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

    this.perfil = localStorage.getItem("perfil");

    this.listar();

    window.scrollTo(0, 0);

    if (this.perfil == 'VENDEDOR') {
      this.preparaContas();
    }
  }

  public listar() {

    if (this.perfil == "VENDEDOR") {

      this.servicemov.findAllMovVend(parseInt(localStorage.getItem("idVend"))).subscribe(result => {
        this.listaExtrato = result;

        this.preparaContas();


        // this.valorTotal = 0;
        // this.cotaTotal = 0;

        // for (let ls of result) {
        //   if (ls[2] == 0) {
        //     this.valorAReceber += ls[1];
        //   }

        //   md = ls[3].split('-');
        //   movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

        //   if (movDate.getTime() > this.lastDate.getTime()) {
        //     this.valorAQuitar += ls[1];
        //   } else {
        //     this.valorQuitado += ls[1];
        //   }

        //   this.valorTotal += ls[1];
        //   this.cotaTotal += ls[2];
        // }

        this.filtrar();

      });
    } else {

      if (this.idVendedor == undefined) {

        this.servicevend.findAll().subscribe(res => {
          this.listaVendedores = res;
        })

        this.servicemov.findAllMov().subscribe(result => {
          this.listaExtrato = result;

          this.filtrar();
        });
      } else {
        this.servicemov.findAllMovVend(parseInt(this.idVendedor)).subscribe(result => {
          this.listaExtrato = result;

          this.preparaContas();

          this.filtrar();
        });
      }


    }
  }

  public preparaContas() {
    if (this.perfil == 'ADMINISTRADOR') {
      this.serviceconta.findByIdVendedor(parseInt(this.idVendedor)).subscribe(res => {
        let novo: number[] = [];
        novo.push(0);
        novo.push(0);
        novo.push(0);
        novo.push(0);
        novo.push(0);

        console.log(res);
        let ld = res[res.length - 1].data.split('-');
        this.lastDate = new Date(parseInt(ld[0]), (parseInt(ld[1]) - 1), parseInt(ld[2]));
        let md;
        let movDate: Date;

        this.valorTotal = 0;
        this.cotaTotal = 0;
        this.valorAQuitar = 0;
        this.valorQuitado = 0;

        for (let ls of this.listaExtrato) {
          md = ls[3].split('-');
          movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

          if (movDate.getTime() > this.lastDate.getTime()) {
            novo[0] += ls[8];
            novo[1] += ls[7];
            novo[2] += ls[6];
            novo[3] += ls[10];
            novo[4] += ls[9];

            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }
  
            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));
  
            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }
  
            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }
        }

        this.resumoDeContas = novo;
      });
    } else {

      this.serviceconta.findByIdVendedor(parseInt(localStorage.getItem("idVend"))).subscribe(res => {
        let novo: number[] = [];
        novo.push(0);
        novo.push(0);
        novo.push(0);
        novo.push(0);
        novo.push(0);

        console.log(res);
        let ld = res[res.length - 1].data.split('-');
        this.lastDate = new Date(parseInt(ld[0]), (parseInt(ld[1]) - 1), parseInt(ld[2]));
        let md;
        let movDate: Date;

        this.valorTotal = 0;
        this.cotaTotal = 0;
        this.valorAQuitar = 0;
        this.valorQuitado = 0;

        for (let ls of this.listaExtrato) {
          md = ls[3].split('-');
          movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

          if (movDate.getTime() > this.lastDate.getTime()) {
            novo[0] += ls[8];
            novo[1] += ls[7];
            novo[2] += ls[6];
            novo[3] += ls[10];
            novo[4] += ls[9];

            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }
  
            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));
  
            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }
  
            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }
        }

        this.resumoDeContas = novo;
      });

    }

  }

  public arremataConta() {

    this.servicevend.findById(parseInt(this.idVendedor)).subscribe(res => {
      this.prestaconta = new PrestacaoContas();
      let today = new Date();

      this.serviceconta.findByIdVendedor(this.idVendedor).subscribe(result => {
        this.prestaconta.lancamentoPrevio = result[result.length - 1].data;


        if (today.getDate() < 10) {
          if ((today.getMonth() + 1) < 10) {
            this.prestaconta.data = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-0" + today.getDate();
          } else {
            this.prestaconta.data = today.getFullYear() + "-" + (today.getMonth() + 1) + "-0" + today.getDate();
          }
        } else {
          if ((today.getMonth() + 1) < 10) {
            this.prestaconta.data = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate();
          } else {
            this.prestaconta.data = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
          }
        }

        this.valorPago = this.valorPago.replace(",", "");

        while (this.valorPago.includes(".")) {
          this.valorPago = this.valorPago.replace(".", "");
        }

        this.prestaconta.valorPago = parseInt(this.valorPago);
        this.prestaconta.valorVendas = (this.resumoDeContas[0] + this.resumoDeContas[1] + this.resumoDeContas[2] + this.resumoDeContas[3] + this.resumoDeContas[4]);
        this.prestaconta.vendedor = res;

        this.criaPrestaContas();
      });
    });

  }



  public criaPrestaContas() {
    this.serviceconta.create(this.prestaconta).subscribe(res => {

      document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

      let timer = setTimeout(function () {
        document.getElementById("divsuccess").setAttribute("style", "display: none;");
      }, 5000);

      this.valorPago = 0;
    });
  }

  public somaValores(ls): number {
    let soma = ls[0];

    return soma;
  }


  public areceber() {
    this.router.navigate(['/pagamentoareceber']);
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

  logout() {
    this.router.navigate(['/login']);
  }

  public home() {
    this.router.navigate(['/home']);
  }

  public cadastrousuario() {
    this.router.navigate(['/cadastrousuario']);
  }

  public cadastrocombo() {
    this.router.navigate(['/cadastrocombo']);
  }

  public painelvendedora() {
    this.router.navigate(["/painelvendedora"]);
  }

  public extratovendedora() {
    this.router.navigate(['/extratovendedora']);
  }

  public prestacontas() {
    this.router.navigate(['/prestacontas']);
  }

  public cadbolaovend() {
    this.router.navigate(['/cadastrobolaovendedor']);
  }



  public trataValor(valor: string) {
    let novo = valor.replace(",", "");
    return novo;
  }



  public ajustaCentavos(id: string) {
    let valor = (document.getElementById(id) as HTMLInputElement).value;

    if (valor.length == 1) {
      valor = "R$ 0,0" + valor;
    }
    else if (valor.length == 2) {
      valor = "R$ 0," + valor;
    }
    else {
      valor = "R$ " + valor;
    }

    (document.getElementById(id) as HTMLInputElement).value = valor;
  }

  // public calculaTotal(valor:string, tipo: string){

  //   this.ajustaCentavos(tipo.toLowerCase());

  //   let valornovo = valor;
  //   if(valor == ""){
  //     valornovo = "0";
  //   }
  //   while(valor.includes(".")){
  //   valornovo = valornovo.replace(".","");
  //   }
  //    valornovo = valornovo.replace(",","").replace("R$ ","");

  //    if (tipo == 'DINHEIRO')
  //   {
  //      this.dinheiro = parseInt(valornovo);
  //   }else if(tipo == 'OUTROS'){
  //     this.outros = parseInt(valornovo);
  //   }else if(tipo == 'CREDITO'){
  //     this.credito = parseInt(valornovo);
  //   }else if(tipo == 'DEBITO'){
  //     this.debito = parseInt(valornovo);
  //   }else{
  //     this.pix = parseInt(valornovo);
  //   }
  // }

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

  public detalhes(id) {

    localStorage.setItem("idextrato", id);

    this.router.navigate(['detalhesextrato']);

  }

  public filtrarporData() {

    let md, movDate;

    if (this.perfil == 'VENDEDOR') {

      if (this.mobile == true) {

        let from;
        let to;

        from = this.de.substring(6, 10) + "-" + this.de.substring(3, 5) + "-" + this.de.substring(0, 2);
        to = this.ate.substring(6, 10) + "-" + this.ate.substring(3, 5) + "-" + this.ate.substring(0, 2);

        this.servicemov.findFromDataToDataVend(parseInt(localStorage.getItem("idVend")), from, to).subscribe(res => {
          console.log(res);
          this.listaExtrato = res;

          this.valorTotal = 0;
          this.cotaTotal = 0;
          this.valorAQuitar = 0;
          this.valorQuitado = 0;

          for (let ls of this.listaExtrato) {
            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }

            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }

            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }

        });

      } else {

        this.servicemov.findFromDataToDataVend(parseInt(localStorage.getItem("idVend")), this.de, this.ate).subscribe(res => {
          console.log(res);
          this.listaExtrato = res;

          this.valorTotal = 0;
          this.cotaTotal = 0;
          this.valorAQuitar = 0;
          this.valorQuitado = 0;


          for (let ls of this.listaExtrato) {
            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }

            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }
            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }
        });
      }


    } else {

      if (this.mobile == true) {

        let from;
        let to;

        from = this.de.substring(6, 10) + "-" + this.de.substring(3, 5) + "-" + this.de.substring(0, 2);
        to = this.ate.substring(6, 10) + "-" + this.ate.substring(3, 5) + "-" + this.ate.substring(0, 2);

        this.servicemov.findFromDataToDataVend(parseInt(this.idVendedor), from, to).subscribe(res => {

          this.listaExtrato = res;

          this.valorTotal = 0;
          this.cotaTotal = 0;
          this.valorAQuitar = 0;
          this.valorQuitado = 0;

          for (let ls of this.listaExtrato) {
            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }

            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }

            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }

        });

      } else {

        this.servicemov.findFromDataToDataVend(parseInt(this.idVendedor), this.de, this.ate).subscribe(res => {

          this.listaExtrato = res;

          this.valorTotal = 0;
          this.cotaTotal = 0;
          this.valorAQuitar = 0;
          this.valorQuitado = 0;

          for (let ls of this.listaExtrato) {
            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }

            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }

            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }

        });

      }

    }

  }

  public filtrarporCliente(nome: string) {
    let md, movDate;

    let msg: string;
    if (this.perfil == "VENDEDOR") {
      let id: number = parseInt(localStorage.getItem("idVend"));
      msg = this.filtroCliente;
      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.servicemov.findByNameFromVendedor(msg, id).subscribe(res => {
          this.listaExtrato = res;

          this.valorTotal = 0;
          this.cotaTotal = 0;
          this.valorAQuitar = 0;
          this.valorQuitado = 0;

          for (let ls of this.listaExtrato) {
            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }

            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }

            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }
        });
      } else {
        this.listaExtrato = [];
      }
    } else {

      let id: number = parseInt(this.idVendedor);
      msg = this.filtroCliente;

      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.servicemov.findByNameFromVendedor(msg, id).subscribe(res => {
          this.listaExtrato = res;

          this.valorTotal = 0;
          this.cotaTotal = 0;
          this.valorAQuitar = 0;
          this.valorQuitado = 0;

          for (let ls of this.listaExtrato) {
            if (ls[2] == 0) {
              this.valorAReceber += ls[1];
            }

            md = ls[3].split('-');
            movDate = new Date(parseInt(md[0]), (parseInt(md[1]) - 1), parseInt(md[2]));

            if (movDate.getTime() > this.lastDate.getTime()) {
              this.valorAQuitar += ls[1];
            } else {
              this.valorQuitado += ls[1];
            }

            this.valorTotal += ls[1];
            this.cotaTotal += ls[2];
          }
        });
      } else {
        this.listaExtrato = [];
      }

    }

  }

  public filtrar() {
    if (this.selected1 == "periodo") {
      this.filtrarporData();
    } else if (this.selected1 == "cliente") {
      this.filtrarporCliente(this.filtroCliente);
    }
  }

}
