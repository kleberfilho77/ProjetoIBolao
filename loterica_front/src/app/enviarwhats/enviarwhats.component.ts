import { Component, OnInit } from '@angular/core';
import { UsuarioClienteFinal } from '../model/usuarioclientefinal';
import { UsuarioClienteFinalService } from '../service/usuarioclientefinalservice';

@Component({
  selector: 'app-enviarwhats',
  templateUrl: './enviarwhats.component.html',
  styleUrls: ['./enviarwhats.component.css']
})
export class EnviarwhatsComponent implements OnInit {

  clientes : UsuarioClienteFinal [] = [];

  telefone : string;
  nome : string;
  mobile: boolean = false;

  constructor(private servicecli : UsuarioClienteFinalService) { }

  ngOnInit() {

    if (window.screen.width <= 500) { 
      this.mobile = true;
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

  public ajustaTelefone(){
    let ajuste;

    if (this.clientes.length == 0){
      ajuste = "";
      (document.getElementById('tel') as HTMLInputElement).disabled = false;

    }else{
      ajuste = this.clientes[0].contato1;

      (document.getElementById('tel') as HTMLInputElement).disabled = true;
    }

    this.telefone = ajuste;
  }

  public escolherNome() {
    // this.telefone = "";
    // this.cpf = "";
    // this.email = "";
    if (this.clientes[0] != undefined) {

      this.servicecli.findById(this.clientes[0].id).subscribe(res => {

        this.nome = res.nome;
        this.telefone = res.contato1;

      });
    }

  }

  public enviar(){
    if (this.telefone == undefined || this.telefone == ""){
      return;
    }

    let ajuste : string = this.telefone.replace('(','').replace(')','').replace(' ','').replace('-','');
    let path : string = localStorage.getItem('imgpath');

    // if(this.mobile != false){

    //   window.open("https://web.whatsapp.com/send?phone=+55"+ajuste+"&text=Ola, estou te enviando a imagem do bolao, vamos fazer esta aposta?\n\n"+path, "_self");

    // }else{
      //  console.log("foi pelo celular");

      window.open("https://api.whatsapp.com/send?phone=55"+ajuste+"&text=Ola%2C%20estou%20te%20enviando%20a%20imagem%20do%20bolao%2C%20vamos%20fazer%20esta%20aposta%3F"+path, "_self");

    // }

   

  }

}
