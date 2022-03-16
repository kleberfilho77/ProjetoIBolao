import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadBolao } from '../model/cadbolao';
import { PrestacaoContas } from '../model/prestacaocontas';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { UsuarioUnidadeLoterica } from '../model/UsuarioUnidadeLoterica';
import { CadBolaoService } from '../service/cadbolaoservice';
import { PrestaContasService } from '../service/prestacontasservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';
import { UsuarioUnidadeLotericaService } from '../service/usuariounidadelotericaservice';

@Component({
  selector: 'app-usuarioequipevendedor',
  templateUrl: './usuarioequipevendedor.component.html',
  styleUrls: ['./usuarioequipevendedor.component.css']
})
export class UsuarioequipevendedorComponent implements OnInit {

  mobile: boolean = false;
  flag:string;

  equipe: UsuarioEquipeVendedor = new UsuarioEquipeVendedor();

  boloes:CadBolao[]=[];

  pago: PrestacaoContas;


  constructor(private service: UsuarioEquipeVendedorService, private serviceundlot: UsuarioUnidadeLotericaService,
    private serviceb: CadBolaoService, private servicepago: PrestaContasService, private router:Router) {

  }

  ngOnInit() {

    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
    localStorage.getItem("perfil") == 'VENDEDOR' || 
    localStorage.getItem("perfil") == 'LOTERICA'){
      
    }else{
      this.router.navigate(['/login']);
    }

    this.pago = new PrestacaoContas();

    this.pago.valorPago = 0;
    this.pago.valorVendas = 0;
    this.pago.lancamentoPrevio = '-';

    let today = new Date();

    today.setDate(today.getDate()-1);

    if (today.getDate() < 10){
      if ((today.getMonth()+1)<10){
        this.pago.data = today.getFullYear()+"-0"+(today.getMonth()+1)+"-0"+today.getDate();
      }else{
        this.pago.data = today.getFullYear()+"-"+(today.getMonth()+1)+"-0"+today.getDate();
      }
    }else{
      if ((today.getMonth()+1)<10){
        this.pago.data = today.getFullYear()+"-0"+(today.getMonth()+1)+"-"+today.getDate(); 
      }else{
        this.pago.data = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
      }
    }

    this.flag="false";
    if (window.screen.width <= 500) {
      this.mobile = true;
    }

    this.setLoterica();
    window.scrollTo( 0,0);

    this.listarBoloes();
  }

  public listarBoloes(){
    this.serviceb.findAll().subscribe(res=>{
      this.boloes = res;
    });
  }


  public testaCPF() {
    var Soma = 0;

    // Esta função retira os caracteres . e - da string do cpf, deixando apenas os números 
    var strCPF = this.equipe.cpf.replace('.', '').replace('.', '').replace('-', '');
    // Testa as sequencias que possuem todos os dígitos iguais e, se o cpf não tem 11 dígitos, retorna falso e exibe uma msg de erro
    if (strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' || 
    strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' || strCPF === '88888888888' || 
    strCPF === '99999999999' || strCPF.length !== 11) {
      alert("Não contém os 11 dígitos ou não apresenta uma sequência válida");
      this.equipe.cpf = "";
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
      this.equipe.cpf = "";
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
      this.equipe.cpf = "";
    }

  }


public setLoterica(){

  this.serviceundlot.findAll().subscribe(res=>{
    console.log(res[0].id);
    this.equipe.idUsuariounidadeloterica = res[0].id;
    console.log(this.equipe.idUsuariounidadeloterica);
    
  });
}

public buscaCep(vcep:string){
  let cep = vcep.replace('.','').replace('-','');
  this.buscarcep(cep);
}

public buscarcep(cep:string){
  this.service.buscaCep(cep).subscribe(res=>{
    this.equipe.bairro = res.bairro;
    this.equipe.endereco = res.logradouro;
    this.equipe.cidade = res.cidade;
    this.equipe.estado = res.estado;
  });
}

  public gravar() {

    if ((document.getElementById("nome") as HTMLInputElement).value == '' ||
      (document.getElementById("cpf") as HTMLInputElement).value == '' ||
      (document.getElementById("cep") as HTMLInputElement).value == '' ||
      (document.getElementById("endereco") as HTMLInputElement).value == '' ||
      (document.getElementById("numero") as HTMLInputElement).value == '' ||
      (document.getElementById("bairro") as HTMLInputElement).value == '' ||
      this.flag == "false" ||
      (document.getElementById("cidade") as HTMLInputElement).value == '' ||
      (document.getElementById("estado") as HTMLInputElement).value == '' ||
      (document.getElementById("emailprincipal") as HTMLInputElement).value == '' ||
      (document.getElementById("contato1") as HTMLInputElement).value == '' ) {

      alert("Preencha todos os campos obrigatórios");

    } else {


    try {
      
      // console.log(this.equipe.idUsuariounidadeloterica);
      this.equipe.perfil = "VENDEDOR"
      console.log(this.equipe);
      this.service.create(this.equipe).subscribe(res => {
        console.log(" dados gravados ");
        this.pago.vendedor = res;

        if (this.pago.vendedor != undefined){
          this.servicepago.create(this.pago).subscribe(result=>{
            console.log(result);
          });
        }

        if (this.boloes.length >= 1){

          this.serviceb.createCotasBolaoVendedor(res).subscribe(res2=>{
            console.log("cotas gravadas");
          })
  
        }
      });

      
      
      this.equipe = new UsuarioEquipeVendedor();
      document.getElementById("divsuccess").setAttribute("style", "color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

      let timer = setTimeout(function () {
        document.getElementById("divsuccess").setAttribute("style", "display: none;");
      }, 5000);
    } catch {
      alert("Usuário inválido! tente novamente");
       this.equipe = new UsuarioEquipeVendedor();
    }
  
}

  this.flag = "false";
}

public limpar(){
  this.equipe = new UsuarioEquipeVendedor();
  this.flag = "false"
}

  public gravarSexoMasc() {
    this.equipe.sexo = "MASCULINO";
    this.flag="true";
  }

  public gravarSexoFem() {
    this.equipe.sexo = "FEMININO";
    this.flag="true";
  }

  public gravarSexoOther() {
    this.equipe.sexo = "OUTROS";
    this.flag="true";
  }

}
