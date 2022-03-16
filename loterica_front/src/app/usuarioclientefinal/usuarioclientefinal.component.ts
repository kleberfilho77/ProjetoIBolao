import { Vendedor } from './../model/vendedor';
import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { UsuarioClienteFinalService } from './../service/usuarioclientefinalservice';
import { Component, OnInit } from '@angular/core';
import { UsuarioClienteFinal } from '../model/usuarioclientefinal';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarioclientefinal',
  templateUrl: './usuarioclientefinal.component.html',
  styleUrls: ['./usuarioclientefinal.component.css']
})
export class UsuarioclientefinalComponent implements OnInit {

  mobile: boolean = false;
  perfil: string;
  id_vendedor: number;
  flag: string;

  vendedor: number;
  vendedores: UsuarioEquipeVendedor[] = [];
  clientes: UsuarioClienteFinal[] = [];
  clientefinal: UsuarioClienteFinal = new UsuarioClienteFinal();
  nomevendedor: string;


  constructor(private service: UsuarioClienteFinalService,
    private servicevend: UsuarioEquipeVendedorService,
    private router: Router) {

  }

  ngOnInit() {

    if (localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
      localStorage.getItem("perfil") == 'VENDEDOR' ||
      localStorage.getItem("perfil") == 'LOTERICA') {

    } else {
      this.router.navigate(['/login']);
    }

    this.flag = "false";

    if (window.screen.width <= 500) {
      this.mobile = true;
    }

    this.vendedor = parseInt(localStorage.getItem("idVend"));
    this.perfil = localStorage.getItem("perfil");

    this.listar();

    window.scrollTo(0, 0);
  }

  public pegarIdVendedor() {
    let VendId = 0;
    VendId = (document.getElementById("vendedor") as HTMLSelectElement).selectedIndex + 1;

    this.id_vendedor = this.vendedores[VendId - 1].id;
    this.clientefinal.idVendedor = this.vendedores[VendId - 1].id;

  }

  public buscaCep(vcep: string) {
    let cep = vcep.replace('.', '').replace('-', '');
    this.buscarcep(cep);
  }

  public buscarcep(cep: string) {
    this.service.buscaCep(cep).subscribe(res => {
      this.clientefinal.bairro = res.bairro;
      this.clientefinal.endereco = res.logradouro;
      this.clientefinal.cidade = res.cidade;
      this.clientefinal.estado = res.estado;
    });
  }



  public testaCPF() {
    var Soma = 0;

    // Esta função retira os caracteres . e - da string do cpf, deixando apenas os números 
    var strCPF = this.clientefinal.cpf.replace('.', '').replace('.', '').replace('-', '');
    // Testa as sequencias que possuem todos os dígitos iguais e, se o cpf não tem 11 dígitos, retorna falso e exibe uma msg de erro
    if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' ||
      strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' ||
      strCPF === '99999999999' || strCPF.length !== 11) {
      alert("Não contém os 11 dígitos ou não apresenta uma sequência válida");
      this.clientefinal.cpf = "";
    }

    // Os seis blocos seguintes de funções vão realizar a validação do CPF propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
    // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número para ser testado

    //Multiplica cada digito por numeros de 1 a 9, soma-os e multiplica-os por 10. Depois, divide o resultado encontrado por 11 para encontrar o resto
    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    var Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }

    if (Resto !== parseInt(strCPF.substring(9, 10))) {
      alert("cpf inválido");
      this.clientefinal.cpf = "";
    }

    Soma = 0;
    for (let k = 1; k <= 10; k++) {
      Soma = Soma + parseInt(strCPF.substring(k - 1, k)) * (12 - k)
    }

    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }

    if (Resto !== parseInt(strCPF.substring(10, 11))) {
      alert("cpf inválido");
      this.clientefinal.cpf = "";
    }

  }




  public gravar() {
    if (this.perfil == "VENDEDOR"){
      this.clientefinal.idVendedor = parseInt(localStorage.getItem("idVend"));
    }

    this.gravaCliente();
  }

  public gravaCliente() {

    if ((document.getElementById("nome") as HTMLInputElement).value == '' ||
      (document.getElementById("cpf") as HTMLInputElement).value == '' ||
      (document.getElementById("cep") as HTMLInputElement).value == '' ||
      (document.getElementById("endereco") as HTMLInputElement).value == '' ||
      (document.getElementById("numero") as HTMLInputElement).value == '' ||
      (document.getElementById("bairro") as HTMLInputElement).value == '' ||
      (document.getElementById("cidade") as HTMLInputElement).value == '' ||
      (document.getElementById("estado") as HTMLInputElement).value == '' ||
      (document.getElementById("emailprincipal") as HTMLInputElement).value == '' ||
      (document.getElementById("contato1") as HTMLInputElement).value == '') {

      alert("Preencha todos os campos obrigatórios");

    } else {

      this.service.findByCpf(this.clientefinal.cpf).subscribe(result => {
        console.log(result.length);
        if (result.length != 0) {
          alert("este usuário já está cadastrado no sistema");
        } else {
          console.log(this.clientefinal);
          this.service.create(this.clientefinal).subscribe(res => {
            let cliente = res;

            if (localStorage.getItem("perfil") == "VENDEDOR") {
              this.service.updateVendedor(cliente, this.vendedor).subscribe(res2 => {
                console.log(" dados gravados ");
              });
            } else {
              this.service.updateVendedor(cliente, this.clientefinal.idVendedor).subscribe(res3 => {
                console.log(" dados gravados ");
              });
            }

            document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

            let timer = setTimeout(function () {
              document.getElementById("divsuccess").setAttribute("style", "display: none;");
            }, 5000);

          });
        }
        this.clientefinal = new UsuarioClienteFinal();
        this.id_vendedor = null;
        (document.getElementById("vendedor") as HTMLInputElement).value = ''
        this.flag = "false";

      });
    }
  }

  public limpar() {
    this.clientefinal = new UsuarioClienteFinal();
    this.id_vendedor = null;
    (document.getElementById("vendedor") as HTMLInputElement).value = ''
    this.flag = "false"
  }

  public listar() {
    if (this.perfil != 'VENDEDOR') {
      this.servicevend.findAll().subscribe(res => {
        this.vendedores = res;
      })
    } else {
      this.servicevend.findById(parseInt(localStorage.getItem("idVend"))).subscribe(res => {
        this.nomevendedor = res.nome;
      })

    }
  }

  public gravarSexoMasc() {
    this.clientefinal.sexo = "MASCULINO";
    this.flag = "true";
  }

  public gravarSexoFem() {
    this.clientefinal.sexo = "FEMININO";
    this.flag = "true";
  }

  public gravarSexoOther() {
    this.clientefinal.sexo = "OUTROS";
    this.flag = "true";
  }

}
