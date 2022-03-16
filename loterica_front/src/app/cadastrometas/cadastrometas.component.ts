import { Router } from '@angular/router';
import { CadMetas } from './../model/cadmetas';

import { Component, OnInit, NgModule } from '@angular/core';
import { CadMetasService } from '../service/cadmetasservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { Meta } from '@angular/platform-browser';
import { MetaVariavel } from '../model/metavariavel';
import { MetaVariavelService } from '../service/metavariavelservice';
import { reduceEachLeadingCommentRange } from 'typescript';

@Component({
  selector: 'app-cadastrometas',
  templateUrl: './cadastrometas.component.html',
  styleUrls: ['./cadastrometas.component.css']
})

export class CadastrometasComponent implements OnInit {

  mobile: boolean = false;
  nave: string;
  valor1: number;
  conserta: string;
  doOnce: boolean;

  listanum: number[] = [];
  meta: CadMetas = new CadMetas();
  vendedores: UsuarioEquipeVendedor[] = [];

  metavar: MetaVariavel[] = [];

  constructor(private service: CadMetasService,
    private servicevend: UsuarioEquipeVendedorService,
    private servicemetavar: MetaVariavelService,
    private router: Router) {

  }

  ngOnInit() {

    if (localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
      localStorage.getItem("perfil") == 'VENDEDOR' ||
      localStorage.getItem("perfil") == 'LOTERICA') {

    } else {
      this.router.navigate(['/login']);
    }

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    $(document).ready(function () {
      var today = new Date();
      var date = today.getFullYear().toString();
      (document.getElementById("ano") as HTMLInputElement).value = '' + date;
      (document.getElementById("mes") as HTMLInputElement).value = monthNames[today.getMonth()]
    });

    let data = new Date();

    this.meta.ano = data.getFullYear();
    this.meta.mes = monthNames[data.getMonth()];

    if (window.screen.width <= 500) {
      this.mobile = true;
    }
    localStorage.setItem("flag", "false");

    this.listar();

    window.scrollTo(0, 0);
  }

  public selecionaData() {
    for (let i = 0; i < this.vendedores.length; i++) {
      this.service.findAllMetasVend(this.vendedores[i].id).subscribe(result => {
        console.log(result);

        

        if (result.length == 0) {
          this.listanum.push(0);
        } else {
          this.listanum.push(null);
          let formatter;

          for (let item of result) {
            if (item.mes == this.meta.mes && item.ano == this.meta.ano) {
              formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(item.valor / 100);
              break;
            }else{
              formatter = "R$ 0,00";
            }
          }

          this.listanum = [];
          (document.getElementById('premioprev' + i) as HTMLInputElement).value = "";
          document.getElementById('premioprev' + i).setAttribute('placeholder', formatter);
          // document.getElementById('premioprev'+i).setAttribute('disabled','true');
        }
      });
    }
  }

  public preparaComissao(valor) {

    if (valor == undefined) {
      return "";
    }


    // console.log("indeed: "+valor);

    let formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(valor / 1000);

    // if (!this.doOnce){
    //   this.conserta = formatter;
    //   this.doOnce = true;
    // }
    // else
    //   formatter = this.conserta;

    return formatter;
  }


  public preparaValorDe(valor) {
    let inteiro = valor / 100 + 1;
    let resto = "" + (valor % 100);

    if (valor % 100 < 10)
      resto += "0";
    let novo = "R$ " + inteiro + "," + resto;

    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor / 100);

    return formatter;
  }

  public preparaValorPara(valor) {
    if (valor == undefined) {
      return "R$ ";
    }

    let inteiro: string;

    if (valor % 100 > 0) {
      inteiro = "" + valor / 100;
    }
    else {
      inteiro = "" + ((valor / 100) - valor % 100);
    }

    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor / 100);

    return formatter;


  }

  public alteraMetavarComissao(index: number) {


    // if (this.metavar[index].comissao == undefined && index > 0){
    //   if (this.trataComissao((document.getElementById("com"+index) as HTMLInputElement).value) > this.metavar[index-1].comissao){
    //     this.metavar[index].comissao = this.trataComissao((document.getElementById("com"+index) as HTMLInputElement).value);
    //     return;
    //   }
    // }

    // if (this.metavar[index].comissao < this.metavar[index+1].comissao){
    //   if (index > 0){
    //     if (this.metavar[index].comissao < this.metavar[index-1].comissao){
    //       (document.getElementById("com"+index) as HTMLInputElement).value = this.preparaComissao(this.metavar[index].comissao);
    //       return;
    //     }
    //   }

    //   this.metavar[index].comissao = this.trataComissao((document.getElementById("com"+index) as HTMLInputElement).value); 
    //   this.servicemetavar.update(this.metavar[index]).subscribe(res=>{

    //   });
    // }

    // this.doOnce = false;
    let aux = (document.getElementById("com" + index) as HTMLInputElement).value.replace("%", "");


    while (aux.includes(",")) {
      aux = aux.replace(",", "");
    }


    if (index != 0) {

      if (parseInt(aux) <= this.metavar[index - 1].comissao) {

        alert("O valor de comissão digitado é inferior ou igual ao valor que o antecede.");

      }
    }


    this.associaIdMetaVar(index, parseFloat(aux));



    // this.metavar[index].id = this.metavar[this.metavar.length-1].id
    // this.metavar[index].comissao = parseFloat(aux); 
    // console.log(this.metavar[index])
    // this.salvaComissao(index);

    // (document.getElementById("com"+index) as HTMLInputElement).value = this.preparaComissao(aux);

  }

  public associaIdMetaVar(index: number, aux: number) {

    this.servicemetavar.findAll().subscribe(res => {
      // this.metavar[index].id = res[0].id;
      this.metavar[index].comissao = aux;
      this.salvaComissao(index);
      // (document.getElementById("com"+index) as HTMLInputElement).value = this.preparaComissao(aux);
    });

  }

  public salvaComissao(index: number) {

    this.servicemetavar.update(this.metavar[index]).subscribe(res => {
      console.log(res);
    });
  }


  public alteraMetavarValor(index: number) {

    // if (index > 0){
    //   if (index == this.metavar.length -1 || index == this.metavar.length -2){
    //     this.metavar[index].valor = this.trataValor((document.getElementById("input"+index) as HTMLInputElement).value);
    //   }
    //   else if (this.metavar[index].valor > this.metavar[index - 1].valor && this.metavar[index].valor < this.metavar[index + 1].valor){
    //     this.metavar[index].valor = this.trataValor((document.getElementById("input"+index) as HTMLInputElement).value);

    //   }
    //   else{
    //     (document.getElementById("input"+index) as HTMLInputElement).value = this.preparaValorPara(this.metavar[index].valor);
    //     return;
    //   } 
    // }else{
    //   if (this.metavar[index].valor < this.metavar[index + 1].valor){
    //     this.metavar[index].valor = this.trataValor((document.getElementById("input"+index) as HTMLInputElement).value);
    //   }
    //   else{
    //     (document.getElementById("input"+index) as HTMLInputElement).value = this.preparaValorPara(this.metavar[index].valor);
    //     return;
    //   }

    // }
    // alert(this.metavar[index-1].valor+100);
    // alert(parseInt((document.getElementById("input"+index) as HTMLInputElement).value.replace(",","")));
    let numero = (document.getElementById("input" + index) as HTMLInputElement).value.replace(",", "")

    while (numero.includes(".")) {
      numero = numero.replace(".", "");
    }
    if (index == 0) {
      this.metavar[index].id = this.metavar[this.metavar.length - 1].id
      this.metavar[index].valor = this.trataValor(((document.getElementById("input" + index) as HTMLInputElement).value));

      this.atualizaMetaVar(this.metavar[index]);

    } else {
      if (parseInt(numero) <= this.metavar[index - 1].valor + 100) {

        alert("O valor digitado precisa ser superior ao valor que o antecede.");
        (document.getElementById("input" + index) as HTMLInputElement).value = "";

      } else {
        this.metavar[index].id = this.metavar[this.metavar.length - 1].id
        this.metavar[index].valor = this.trataValor(((document.getElementById("input" + index) as HTMLInputElement).value));

        this.atualizaMetaVar(this.metavar[index]);

      }
    }


  }

  public atualizaMetaVar(metavar: MetaVariavel) {
    this.servicemetavar.update(metavar).subscribe(res => {
      // console.log("update metavar linha "+index);
    });
  }

  public addNovaMetavarFirst() {
    (document.getElementById("input0") as HTMLInputElement).setAttribute("disabled", "true");
    (document.getElementById("com0") as HTMLInputElement).setAttribute("disabled", "true");
    let novo = new MetaVariavel();
    this.addNovoMetavar(novo);
    // this.addIdNovoMetavar(novo);
    //alert(this.metavar[1].id);

  }

  public addNovaMetavar() {
    let novo = new MetaVariavel();
    if (this.metavar[this.metavar.length - 1].valor != null && this.metavar[this.metavar.length - 1].comissao != null) {
      this.addNovoMetavar(novo);
    }
    // this.addIdNovoMetavar(novo);
    //alert(this.metavar[1].id);

  }


  public addNovoMetavar(novo: MetaVariavel) {
    this.servicemetavar.create(novo).subscribe(res => {
      this.servicemetavar.findAll().subscribe(res2 => {
        let novo2 = novo;
        novo2.id = res2[res2.length - 1].id;
        this.metavar.push(novo2);
        console.log(this.metavar)
      });
    });

  }

  // public addIdNovoMetavar(novo: MetaVariavel){
  //   this.servicemetavar.findAll().subscribe(res=>{
  //     console.log(res);
  //     novo.id = res[res.length-1].id;
  //   });
  // }

  public removeNovaMetavar(index: number) {
    let val = this.metavar.length - 1;
    this.servicemetavar.remove(this.metavar[val].id).subscribe(res => {
      console.log(res);
    });

    this.metavar.pop();
    console.log(index);
    if (index == 1) {
      (document.getElementById("input0") as HTMLInputElement).removeAttribute("disabled");
      (document.getElementById("com0") as HTMLInputElement).removeAttribute("disabled");
    }
  }

  trataValor(txt: string) {

    let novo = txt.replace("R$ ", "").replace(",", "");
    while (novo.includes('.')) {
      novo = novo.replace(".", "");
    }



    return parseInt(novo);
  }

  trataComissao(txt: string) {
    let novo = txt.replace(".", "").replace("%", "");

    console.log(novo);

    return parseInt(novo);
  }

  public resumeNome(index) {
    let nome = this.vendedores[index].nome;
    if (nome.indexOf(" ") != -1) {
      let sobremesa: string = nome.substring(nome.indexOf(" ") + 1);

      if (sobremesa.substring(0, sobremesa.indexOf(" ")).length <= 3) {
        let aux = sobremesa.substring(sobremesa.indexOf(" ") + 1);

        nome = nome.substring(0, nome.indexOf(" ")) + " " + aux.substring(0, aux.indexOf(" "));
      }
      else {
        sobremesa = sobremesa.substring(0, sobremesa.indexOf(" "));

        nome = nome.substring(0, nome.indexOf(" ")) + " " + sobremesa;
      }

      return nome;
    } else {
      return nome;
    }
  }

  public listar() {

    this.servicemetavar.findAll().subscribe(res => {
      this.metavar = res;

      console.log(res);
      if (res.length == 0) {
        // this.metavar.push(new MetaVariavel());
        this.addNovaMetavar();
      } else if (res.length > 1) {
        (document.getElementById("input0") as HTMLInputElement).setAttribute("disabled", "true");
        (document.getElementById("com0") as HTMLInputElement).setAttribute("disabled", "true");
      }

    });

    this.servicevend.findAll().subscribe(res => {
      this.vendedores = res;
      for (let i = 0; i < this.vendedores.length; i++) {
        this.service.findAllMetasVend(res[i].id).subscribe(result => {
          console.log(result.length);

          if (result.length == 0) {
            this.listanum.push(0);
          } else {
            this.listanum.push(null);
            let formatter;

            for (let item of result) {
              if (item.mes == this.meta.mes && item.ano == this.meta.ano) {
                formatter = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.valor / 100);
                break;
              }
            }

            document.getElementById('premioprev' + i).setAttribute('placeholder', formatter);
            // document.getElementById('premioprev'+i).setAttribute('disabled','true');
          }
        });
      }

    });
  }

  public apagarconteudo(index: number) {
    (document.getElementById("input" + index + "") as HTMLInputElement).value = "";
  }


  public gravar() {


    for (let i = 0; i < this.vendedores.length; i++) {

      if (this.listanum[i] != 0 && this.listanum[i] != null) {
        this.service.findAllMetasVend(this.vendedores[i].id).subscribe(result => {
          this.valor1 = parseFloat(this.listanum[i].toString().replace('.', '').replace('.', '')
            .replace('.', '').replace(',', '').replace('R$ ', ''));

          this.meta.ano = parseInt((document.getElementById("ano") as HTMLInputElement).value);
          this.meta.mes = (document.getElementById("mes") as HTMLInputElement).value;
          this.meta.valor = this.valor1;
          this.meta.vendedor = this.vendedores[i];

          for (let item of result) {
            if (item.mes == this.meta.mes && item.ano == this.meta.ano) {
              this.meta.id = item.id;
              console.log(this.meta);
              this.service.update(this.meta);
              return;
            }
          }

          this.service.create(this.meta).subscribe(res => {
            console.log(res, " dados gravados ");
          });
        });

      }

    }

    document.getElementById("divsuccess").setAttribute("style", "color: white; background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

    let timer = setTimeout(function () {
      document.getElementById("divsuccess").setAttribute("style", "display: none;");
    }, 5000);
  }

}


