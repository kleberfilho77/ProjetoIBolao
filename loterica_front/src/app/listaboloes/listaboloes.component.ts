import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadBolao } from '../model/cadbolao';
import { UsuarioClienteFinal } from '../model/usuarioclientefinal';
import { CadBolaoService } from '../service/cadbolaoservice';
import { UsuarioClienteFinalService } from '../service/usuarioclientefinalservice';

@Component({
  selector: 'app-listaboloes',
  templateUrl: './listaboloes.component.html',
  styleUrls: ['./listaboloes.component.css']
})
export class ListaboloesComponent implements OnInit {

  mobile: boolean = false;
  nave: string;
  perfil: string;

  boloes: CadBolao[] = [];
  boloesvend: CadBolao[] = [];
  de: string;
  ate: string;

  constructor(private service: CadBolaoService, private router: Router) { }

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

    if (this.perfil != 'VENDEDOR') {
      this.listar();
    } else {
      this.listarVend();
    }
    window.scrollTo(0, 0);
  }

  public listarVend() {
    this.service.FindAllBoloesVend(parseInt(localStorage.getItem("idVend"))).subscribe(res => {
      console.log(res);
      this.boloesvend = res;
    })
  }

  public refresh() {
    window.location.reload();
  }

  public buscarTipoModalidade() {
    let msg: string;
    msg = (document.getElementById("tipodamodalidade") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.service.findByTipoMod(msg).subscribe(res => {
        this.boloes = res;
        this.boloesvend = res;

      });
    } else {
      this.boloes = [];
      this.boloesvend = [];
    }
  }


  public listar() {
    this.service.findAllByMonth().subscribe(res => {
      this.boloes = res;
    })
  }

  public preparaValor(valor) {

    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor / 100);

    return formatter;

  }

  public detalhes(id) {

    localStorage.setItem("detalhesBolaoSelecionado", id);

    this.router.navigate(['detalhesbolao']);

  }

  public filtraExtrato() {

    if (this.mobile == true) {
      let from;
      let to;
      from = this.de.substring(6, 10) + "-" + this.de.substring(3, 5) + "-" + this.de.substring(0, 2);
      to = this.ate.substring(6, 10) + "-" + this.ate.substring(3, 5) + "-" + this.ate.substring(0, 2);

      this.filtrarporData(from, to);
    } else {
      this.filtrarporData(this.de, this.ate);
    }


  }

  filtrarporData(de: string, ate: string) {

    if (this.perfil != 'VENDEDOR') {
      this.service.findFromDataToData(de, ate).subscribe(res => {
        this.boloes = res;

      });
    } else {
      this.service.findFromDataToDataVend(parseInt(localStorage.getItem("idVend")), de, ate).subscribe(res => {
        this.boloesvend = res;

      });
    }

  }

  public whatsapp(index : number){


    if (this.perfil != 'VENDEDOR') {
      localStorage.setItem('imgpath',this.boloes[index].imgpath);
    } else {
      localStorage.setItem('imgpath',this.boloesvend[index].imgpath);
    }

    window.open('/#/enviarwhats');
    
  }

  

}
