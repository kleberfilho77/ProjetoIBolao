import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilestackService } from '@filestack/angular';
import { TooltipConfig } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { Constants } from '../constants';
import { CadBolao } from '../model/cadbolao';
import { Cota } from '../model/cota';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { ArquivoService } from '../service/arquivoservice';
import { CadBolaoService } from '../service/cadbolaoservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';


@Component({
  selector: 'app-cadastrobolaovendedor',
  templateUrl: './cadastrobolaovendedor.component.html',
  styleUrls: ['./cadastrobolaovendedor.component.css']
})
export class CadastrobolaovendedorComponent implements OnInit {

  mobile: boolean = false;
  nave: string;

  valor1: number;
  valor2: number;

  listanum: number[] = [];
  vlcota = 0;
  vlpremio = 0;
  cotasdisponiveis: number;
  vendedorid: number;

  foto: File;
  loading: boolean = false;

  vendedores: UsuarioEquipeVendedor[] = [];
  bolao: CadBolao = new CadBolao();
  cotas: Cota[];
  cota: Cota = new Cota();

  constructor(private servicevend: UsuarioEquipeVendedorService, private service: CadBolaoService,
    private arqservice: ArquivoService, private router: Router, private fileService: FilestackService) {
  }

  ngOnInit() {

    this.fileService.init(Constants.API_KEY);

    if (localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
      localStorage.getItem("perfil") == 'VENDEDOR' ||
      localStorage.getItem("perfil") == 'LOTERICA') {

    } else {
      this.router.navigate(['/login']);
    }

    $(document).ready(function () {
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

      (document.getElementById("databolao") as HTMLInputElement).value = '' + date;

    });

    if (window.screen.width <= 500) {
      this.mobile = true;
    }
    localStorage.setItem("flag", "false");
    this.vendedorid = parseInt(localStorage.getItem("idVend"));

    this.listar();

    window.scrollTo(0, 0);

  }


  public verificarHoraFechamento() {

    if(this.mobile == true){
    if (this.bolao.horarioSorteio.length < 4) {
      alert("O horário inserido não foi preenchido corretamente. Preencha com hora e minuto");
      this.bolao.horarioSorteio = "";
      document.getElementById("horasorteio").focus();
    }
    if (parseInt(this.bolao.horarioSorteio.substring(0, 2)) > 23 || parseInt(this.bolao.horarioSorteio.substring(3)) > 59) {
      alert(" O horário inserido não foi preenchido corretamente");
      this.bolao.horarioSorteio = "";
    }
  }else{
    if (this.bolao.horarioSorteio.length < 5) {
      alert("O horário inserido não foi preenchido corretamente. Preencha com hora e minuto");
      this.bolao.horarioSorteio = "";
      document.getElementById("horasorteio").focus();
    }
    if (parseInt(this.bolao.horarioSorteio.substring(0, 2)) > 23 || parseInt(this.bolao.horarioSorteio.substring(3)) > 59) {
      alert(" O horário inserido não foi preenchido corretamente");
      this.bolao.horarioSorteio = "";
    }
  }
  }

  public verificarHora() {
    console.log(this.bolao.horarioFechamento.length)
    if(this.mobile == true){
    if (this.bolao.horarioFechamento.length < 6) {
      alert("O horário inserido não foi preenchido corretamente. Preencha com hora, minuto e segundo");
      this.bolao.horarioFechamento = "";
      document.getElementById("horacadastro").focus();
    }
    if (parseInt(this.bolao.horarioFechamento.substring(0, 2)) > 23 || parseInt(this.bolao.horarioFechamento.substring(3, 5)) > 59 || parseInt(this.bolao.horarioFechamento.substring(6)) > 59) {
      alert(" O horário inserido não foi preenchido corretamente");
      this.bolao.horarioFechamento = "";
    }
  }else{
    if (this.bolao.horarioFechamento.length < 8) {
      alert("O horário inserido não foi preenchido corretamente. Preencha com hora, minuto e segundo");
      this.bolao.horarioFechamento = "";
      document.getElementById("horacadastro").focus();
    }
    if (parseInt(this.bolao.horarioFechamento.substring(0, 2)) > 23 || parseInt(this.bolao.horarioFechamento.substring(3, 5)) > 59 || parseInt(this.bolao.horarioFechamento.substring(6)) > 59) {
      alert(" O horário inserido não foi preenchido corretamente");
      this.bolao.horarioFechamento = "";
    }
  }

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

  public carregaImagem(event) {

    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0];

      this.bolao.imgpath = this.foto.name;

    }

  }

  public selecionaImagem(event) {
    this.foto = event.target.files[0];
  }

  public cadastrar() {

    var maskedInput = $("#vlresult").data('mask');
    if (maskedInput) {
      maskedInput.remove();
    }

    let result = (document.getElementById("vlresult") as HTMLInputElement).value
  }

  public verifycategory() {
    if (this.bolao.tipoModalidade == null || this.bolao.tipoModalidade == undefined) {
      alert("escolha a modalidade");
    }
  }

  public zeraInput(index: number) {
    (document.getElementById("qtdcotavendedor_" + index + "") as HTMLInputElement).value = "";
  }

  public zeraInputPremio() {
    (document.getElementById("premioprev") as HTMLInputElement).value = "";
  }

  public zeraInputCota() {
    (document.getElementById("vlresult") as HTMLInputElement).value = "";
  }


  public atualizactodisp(index: number) {

    let temp = parseInt((document.getElementById("qtdcotavendedor_" + index + "") as HTMLInputElement).value);

    let soma: number = 0;

    for (let i = 0; i < this.listanum.length; i++) {
      soma += this.listanum[i];
    }

    let operacao: number;
    this.cotasdisponiveis = this.bolao.qtdCotas;
    //funcao pra atualizar as cotas disponíveis
    this.cotasdisponiveis = this.cotasdisponiveis - soma;

    operacao = 0;
  }

  public gravaBolao() {
    if (this.foto != undefined) {
      this.loading = true;
      scrollTo(0, outerHeight / 2);
      this.fileService.upload(this.foto).subscribe(response => {
        let resp: any = response;

        this.bolao.imgpath = resp.url;
        this.loading = false;
        this.foto = undefined;
        scrollTo(0, 0);

        if (this.bolao.imgpath != undefined) {
          this.service.createCotas(this.bolao).subscribe(res => {
            console.log(res, " dados gravados ");

            document.getElementById("showInputField1").setAttribute("style", "display: none;");
            document.getElementById("showInputField2").setAttribute("style", "display: none;");
            document.getElementById("showInputField3").setAttribute("style", "display: none;");
            document.getElementById("showInputField4").setAttribute("style", "display: none;");
            document.getElementById("showInputField5").setAttribute("style", "display: none;");
            document.getElementById("showInputField6").setAttribute("style", "display: none;");
            document.getElementById("showInputField7").setAttribute("style", "display: none;");
            document.getElementById("showInputField8").setAttribute("style", "display: none;");
            document.getElementById("showInputField10").setAttribute("style", "display: none;");
            document.getElementById("showInputField11").setAttribute("style", "display: none;");

            document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

            let timer = setTimeout(function () {
              document.getElementById("divsuccess").setAttribute("style", "display: none;");
            }, 5000);

            this.bolao = new CadBolao();
            this.vlcota = 0;
            this.vlpremio = 0;
            this.listanum = [];
            this.cotasdisponiveis = 0;
            this.loading = false;
            this.foto = undefined;
          });
        }

      });
    } else {
      this.service.createCotas(this.bolao).subscribe(res => {
        console.log(res, " dados gravados ");

        document.getElementById("showInputField1").setAttribute("style", "display: none;");
        document.getElementById("showInputField2").setAttribute("style", "display: none;");
        document.getElementById("showInputField3").setAttribute("style", "display: none;");
        document.getElementById("showInputField4").setAttribute("style", "display: none;");
        document.getElementById("showInputField5").setAttribute("style", "display: none;");
        document.getElementById("showInputField6").setAttribute("style", "display: none;");
        document.getElementById("showInputField7").setAttribute("style", "display: none;");
        document.getElementById("showInputField8").setAttribute("style", "display: none;");
        document.getElementById("showInputField10").setAttribute("style", "display: none;");
        document.getElementById("showInputField11").setAttribute("style", "display: none;");

        document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

        let timer = setTimeout(function () {
          document.getElementById("divsuccess").setAttribute("style", "display: none;");
        }, 5000);

        this.bolao = new CadBolao();
        this.vlcota = 0;
        this.vlpremio = 0;
        this.listanum = [];
        this.cotasdisponiveis = 0;
      });
    }
  }

  public gravar() {
    moment.locale('pt-br');



    if (this.mobile == true) {



      if ((document.getElementById("numerosorteio") as HTMLInputElement).value == '' ||
        (document.getElementById("datasorteio") as HTMLInputElement).value == '' ||
        (document.getElementById("horacadastro") as HTMLInputElement).value == '' ||
        (document.getElementById("qtdjogos") as HTMLInputElement).value == '' ||
        (document.getElementById("qtddez") as HTMLInputElement).value == '' ||
        (document.getElementById("qtdcotas") as HTMLInputElement).value == '' ||
        (document.getElementById("vlresult") as HTMLInputElement).value == '' ||
        (document.getElementById("premioprev") as HTMLInputElement).value == '' ||
        this.bolao.tipoModalidade == undefined) {

        alert("Preencha todos os campos obrigatórios");

      } else if (this.bolao.dataSorteio.toString().substring(4, 8) < moment().format('L').substring(6, 10)) {
        alert("A data do sorteio não pode ser inferior a data do cadastro");
        return

      } else if (this.bolao.dataSorteio.toString().substring(2, 4) < moment().format('L').substring(3, 5)) {
        alert("A data do sorteio não pode ser inferior a data do cadastro");
        return

      } else if (this.bolao.dataSorteio.toString().substring(0, 2) < moment().format('L').substring(0, 2) && this.bolao.dataSorteio.toString().substring(2, 4) == moment().format('L').substring(3, 5)) {
        alert("A data do sorteio não pode ser inferior a data do cadastro");
        return

      } else if (this.vendedores.length < 1) {
        alert("O bolão deve estar associado a um ou mais vendedores");
        return

      } else if (this.vlcota <= 0) {
        alert("O valor da cota deve ser superior a zero");
        return

      } else if (this.vlpremio <= 0) {
        alert("O valor do prêmio deve ser superior a zero");
        return
      } else {

        if (this.bolao.horarioSorteio == undefined) {
          this.bolao.horarioSorteio = "19:00"
        }

        let today2 = new Date();
        let date2 = today2.getDate() + 1 + '/' + (today2.getMonth() + 1) + '/' + today2.getFullYear();

        this.bolao.dataBolao = date2;

        this.bolao.dataSorteio = new Date(this.bolao.dataSorteio.toString().substring(4, 8) + "-" + this.bolao.dataSorteio.toString().substring(2, 4) + "-" + this.bolao.dataSorteio.toString().substring(0, 2));
        this.bolao.dataSorteio.setDate(this.bolao.dataSorteio.getDate() + 1);

        let tratado: string = this.vlpremio.toString().replace('.', '').replace(',', '');

        while (tratado.includes('.')) {
          tratado = tratado.replace('.', '');
        }

        this.valor1 = parseFloat(this.vlcota.toString().replace('.', '').replace(',', '').replace("R$ ", ""));
        this.valor2 = parseFloat(tratado.replace("R$ ", ""));

        let somacotas = this.bolao.qtdCotas;
        this.bolao.valorCota = this.valor1;
        this.bolao.premioPrevisto = this.valor2;


        this.cotas = [];
        for (let i = 0; i < this.vendedores.length; i++) {

          if (this.listanum[i] == undefined) {
            console.log(this.listanum[i]);
            this.listanum[i] = 0;
          }

          // if(this.listanum[i] != 0 && this.listanum[i] != null){
          if (this.listanum[i] != null) {
            somacotas -= this.listanum[i];
            if (somacotas < 0) {
              this.cotas = [];
              alert("Você excedeu o número de cotas disponíveis para esse bolão");
              return;
            } else {
              if(this.vendedores[i].id == this.vendedorid){

                this.cota.vendedor = this.vendedores[i];
                this.cota.quantidadeCotaVendedor = this.bolao.qtdCotas;
                this.cota.valorCota = this.bolao.valorCota;
                // this.cota.bolao = this.bolao;
                this.cotas.push(this.cota);
                this.cota = new Cota();
    
              }else{
                this.cota.vendedor = this.vendedores[i];
                this.cota.quantidadeCotaVendedor = 0;
                this.cota.valorCota = this.bolao.valorCota;
                // this.cota.bolao = this.bolao;
                this.cotas.push(this.cota);
                this.cota = new Cota();
              }
            }
          }
        }

        this.bolao.qtdCotasDisponiveis = 0;

        this.bolao.cotas = this.cotas;


        this.gravaBolao();

      }



    } else {

      if ((document.getElementById("numerosorteio") as HTMLInputElement).value == '' ||
        (document.getElementById("datasorteio") as HTMLInputElement).value == '' ||
        (document.getElementById("horacadastro") as HTMLInputElement).value == '' ||
        (document.getElementById("qtdjogos") as HTMLInputElement).value == '' ||
        (document.getElementById("qtddez") as HTMLInputElement).value == '' ||
        (document.getElementById("qtdcotas") as HTMLInputElement).value == '' ||
        (document.getElementById("vlresult") as HTMLInputElement).value == '' ||
        (document.getElementById("premioprev") as HTMLInputElement).value == '' ||
        this.bolao.tipoModalidade == undefined) {

        alert("Preencha todos os campos obrigatórios");

      } else if (this.bolao.dataSorteio.toString().substring(0, 4) < moment().format('L').substring(6, 10)) {
        alert("A data do sorteio não pode ser inferior a data do cadastro");
        return

      } else if (this.bolao.dataSorteio.toString().substring(5, 7) < moment().format('L').substring(3, 5)) {
        alert("A data do sorteio não pode ser inferior a data do cadastro");
        return

      } else if (this.bolao.dataSorteio.toString().substring(8, 10) < moment().format('L').substring(0, 2) && this.bolao.dataSorteio.toString().substring(5, 7) == moment().format('L').substring(3, 5)) {
        alert("A data do sorteio não pode ser inferior a data do cadastro");
        return

      } else if (this.vendedores.length < 1) {
        alert("O bolão deve estar associado a um ou mais vendedores");
        return

      } else if (this.vlcota <= 0) {
        alert("O valor da cota deve ser superior a zero");
        return

      } else if (this.vlpremio <= 0) {
        alert("O valor do prêmio deve ser superior a zero");
        return
      } else {

        if (this.bolao.horarioSorteio == undefined) {
          this.bolao.horarioSorteio = "18:00"
        }

        let today2 = new Date();
        let date2 = today2.getDate() + 1 + '/' + (today2.getMonth() + 1) + '/' + today2.getFullYear();

        this.bolao.dataBolao = date2;

        this.bolao.dataSorteio = new Date(this.bolao.dataSorteio.toString().substring(4, 8) + "-" + this.bolao.dataSorteio.toString().substring(2, 4) + "-" + this.bolao.dataSorteio.toString().substring(0, 2));
        this.bolao.dataSorteio.setDate(this.bolao.dataSorteio.getDate() + 1);

        let tratado: string = this.vlpremio.toString().replace('.', '').replace(',', '');

        while (tratado.includes('.')) {
          tratado = tratado.replace('.', '');
        }

        this.valor1 = parseFloat(this.vlcota.toString().replace('.', '').replace(',', '').replace("R$ ", ""));
        this.valor2 = parseFloat(tratado.replace("R$ ", ""));

        let somacotas = this.bolao.qtdCotas;
        this.bolao.valorCota = this.valor1;
        this.bolao.premioPrevisto = this.valor2;


        this.cotas = [];
        for (let i = 0; i < this.vendedores.length; i++) {

          if (this.listanum[i] == undefined) {
            console.log(this.listanum[i]);
            this.listanum[i] = 0;
          }

          // if(this.listanum[i] != 0 && this.listanum[i] != null){
          if (this.listanum[i] != null) {
            somacotas -= this.listanum[i];
            if (somacotas < 0) {
              this.cotas = [];
              alert("Você excedeu o número de cotas disponíveis para esse bolão");
              return;
            } else {
              if (this.vendedores[i].id == this.vendedorid) {

                this.cota.vendedor = this.vendedores[i];
                this.cota.quantidadeCotaVendedor = this.bolao.qtdCotas;
                this.cota.valorCota = this.bolao.valorCota;
                // this.cota.bolao = this.bolao;
                this.cotas.push(this.cota);
                this.cota = new Cota();

              } else {
                this.cota.vendedor = this.vendedores[i];
                this.cota.quantidadeCotaVendedor = 0;
                this.cota.valorCota = this.bolao.valorCota;
                // this.cota.bolao = this.bolao;
                this.cotas.push(this.cota);
                this.cota = new Cota();
              }


            }
          }
        }

        this.bolao.qtdCotasDisponiveis = 0;

        this.bolao.cotas = this.cotas;


        this.gravaBolao();

      }
    }

  }

  public limpar() {
    this.bolao = new CadBolao();
    this.vlcota = 0;
    this.vlpremio = 0;
    this.listanum = [];
  }


  public listar() {
    this.servicevend.findAll().subscribe(res => {
      this.vendedores = res;
      for (let i = 0; i < this.vendedores.length; i++) {
        this.listanum.push(0);
      }
    })
  }

  public atualizacota() {
    var qtd = (document.getElementById("qtdcotas") as HTMLInputElement).value;
    this.cotasdisponiveis = 0;
    // this.listanum[0] = this.bolao.qtdCotas;
    // (document.getElementById("online")as HTMLInputElement).value = ''+qtd;
  }

  public addMega() {
    // let row = document.createElement('p');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   ✓`;
    //   document.querySelector('.showInputField1').appendChild(row);

    document.getElementById("showInputField1").setAttribute("style", "font-size: 30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");

    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'MEGA';
  }

  public addQuin() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField2').appendChild(row);
    document.getElementById("showInputField2").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'QUINA';
  }

  public addLote() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField3').appendChild(row);
    document.getElementById("showInputField3").setAttribute("style", "font-size:30px;display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'LOTE';
  }
  public addDupl() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField4').appendChild(row);
    document.getElementById("showInputField4").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'DUPL';
  }
  public addDias() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField5').appendChild(row);
    document.getElementById("showInputField5").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'DIAS';
  }
  public addBilh() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField6').appendChild(row);
    document.getElementById("showInputField6").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'BILH';
  }
  public addLfac() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField7').appendChild(row);
    document.getElementById("showInputField7").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'LFAC';
  }
  public addLtma() {

    alert("Essa modalidade não possui bolão disponível");

    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField8').appendChild(row);
    // document.getElementById("showInputField8").setAttribute("style","font-size:30px; display: inline;");
    // document.getElementById("showInputField2").setAttribute("style","display: none;");
    // document.getElementById("showInputField3").setAttribute("style","display: none;");
    // document.getElementById("showInputField4").setAttribute("style","display: none;");
    // document.getElementById("showInputField5").setAttribute("style","display: none;");
    // document.getElementById("showInputField6").setAttribute("style","display: none;");
    // document.getElementById("showInputField7").setAttribute("style","display: none;");
    // document.getElementById("showInputField1").setAttribute("style","display: none;");
    // document.getElementById("showInputField10").setAttribute("style","display: none;");
    // document.getElementById("showInputField11").setAttribute("style","display: none;");
    //   window.location.href='#abc';
    //   this.bolao.tipoModalidade = 'LTMA';
  }
  // public addLgol(){

  //   document.getElementById("showInputField9").setAttribute("style","display: inline;");
  //     window.location.href='#abc';
  //     this.bolao.tipoModalidade = 'COMBO';
  // }
  public addTime() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField10').appendChild(row);
    document.getElementById("showInputField10").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    document.getElementById("showInputField11").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'TIME';
  }
  public addSup7() {
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField11').appendChild(row);
    document.getElementById("showInputField11").setAttribute("style", "font-size:30px; display: inline;");
    document.getElementById("showInputField2").setAttribute("style", "display: none;");
    document.getElementById("showInputField3").setAttribute("style", "display: none;");
    document.getElementById("showInputField4").setAttribute("style", "display: none;");
    document.getElementById("showInputField5").setAttribute("style", "display: none;");
    document.getElementById("showInputField6").setAttribute("style", "display: none;");
    document.getElementById("showInputField7").setAttribute("style", "display: none;");
    document.getElementById("showInputField8").setAttribute("style", "display: none;");
    document.getElementById("showInputField10").setAttribute("style", "display: none;");
    document.getElementById("showInputField1").setAttribute("style", "display: none;");
    window.location.href = '#abc';
    this.bolao.tipoModalidade = 'SUP7';
  }

  public proxtela() {
    window.location.href = '#next'
  }

}
