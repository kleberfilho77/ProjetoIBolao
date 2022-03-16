import { UsuarioEquipeAdminService } from './../service/usuarioequipeadminservice';
import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { UsuarioEquipeAdmin } from './../model/usuarioequipeadmin';
import { UsuarioClienteFinal } from '../model/usuarioclientefinal';
import { Component, OnInit } from '@angular/core';
import { UsuarioClienteFinalService } from '../service/usuarioclientefinalservice';
import { UsuarioEquipeVendedor } from '../model/usuarioequipevendedor';
import { UsuarioUnidadeLoterica } from '../model/UsuarioUnidadeLoterica';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  mobile: boolean = false;
  nave: string;

  perfil: string;

  clientes: any[] = [];
  vendedores: UsuarioEquipeVendedor[] = [];
  loterica: UsuarioUnidadeLoterica[] = [];
  administradores: UsuarioEquipeAdmin[] = [];
  selectedValue: any;
  listanomes: UsuarioEquipeVendedor[] = [];

  constructor(private servicecli: UsuarioClienteFinalService, private servicevend: UsuarioEquipeVendedorService,
    private serviceadmin: UsuarioEquipeAdminService, private router: Router) { }

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

    this.listarcli();
    this.listarvendedores();
    this.listaradministradores();



    this.selectedValue = "1";
    window.scrollTo(0, 0);
  }


  public buscarNomeCliente() {

    let msg: string;
    if (this.perfil == "VENDEDOR") {
      let id: number = parseInt(localStorage.getItem("idVend"));
      msg = (document.getElementById("nomecliente") as HTMLInputElement).value;
      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.servicecli.findByNameFromVendedor(msg, id).subscribe(res => {
          this.clientes = res;

        });
      } else {
        this.clientes = [];
      }
    } else {

      let id: number = parseInt(localStorage.getItem("idVend"));
      msg = (document.getElementById("nomecliente") as HTMLInputElement).value;
      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.servicecli.findByName(msg).subscribe(res => {
          this.clientes = res;

        });
      } else {
        this.clientes = [];
      }

    }
  }

  public buscarCpfCliente() {
    let msg: string;
    if (this.perfil == "VENDEDOR") {
      let id: number = parseInt(localStorage.getItem("idVend"));
      msg = (document.getElementById("cpfcliente") as HTMLInputElement).value;
      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.servicecli.findByCpfFromVendedor(msg, id).subscribe(res => {
          this.clientes = res;

        });
      } else {
        this.clientes = [];
      }
    } else {
      let id: number = parseInt(localStorage.getItem("idVend"));
      msg = (document.getElementById("cpfcliente") as HTMLInputElement).value;
      if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
        this.servicecli.findByCpf(msg).subscribe(res => {
          this.clientes = res;

        });
      } else {
        this.clientes = [];
      }
    }
  }


  public buscarNomeVendedor() {
    let msg: string;
    msg = (document.getElementById("nomevendedor") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.servicevend.findByName(msg).subscribe(res => {
        this.vendedores = res;

      });
    } else {
      this.vendedores = [];
    }
  }

  public buscarCpfVendedor() {
    let msg: string;
    msg = (document.getElementById("cpfvendedor") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.servicevend.findByCpf(msg).subscribe(res => {
        this.vendedores = res;

      });
    } else {
      this.vendedores = [];
    }
  }

  public buscarNomeAdministrador() {
    let msg: string;
    msg = (document.getElementById("nomeadministrador") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.serviceadmin.findByName(msg).subscribe(res => {
        this.administradores = res;

      });
    } else {
      this.administradores = [];
    }
  }

  public buscarCpfAdministrador() {
    let msg: string;
    msg = (document.getElementById("cpfadministrador") as HTMLInputElement).value;
    if (msg[msg.length - 1] != ' ' && msg[msg.length - 1] != null) {
      this.serviceadmin.findByCpf(msg).subscribe(res => {
        this.administradores = res;

      });
    } else {
      this.administradores = [];
    }
  }

  public refresh() {
    window.location.reload();
  }

  public listarcli() {
    if (this.perfil != 'VENDEDOR') {

      this.servicecli.findRelatorioClienteAdmin().subscribe(resp => {
        this.clientes = resp;
      })

      // this.servicecli.findAll().subscribe(res => {
      //   this.clientes = res;
      //   for (let i = 0; i < res.length; i++) {
      //     if (res[i].idVendedor != undefined) {
      //       this.servicevend.findById(res[i].idVendedor).subscribe(res2 => {
      //         this.listanomes.push(res2);
      //       });
      //     }
      //   }
      // })
    } else {
      this.servicecli.findRelatorioClienteVend(parseInt(localStorage.getItem("idVend"))).subscribe(res => {
        this.clientes = res;

      })
    }
  }

  public listarvendedores() {
    this.servicevend.findAll().subscribe(res => {
      this.vendedores = res;
    })
  }

  public listaradministradores() {
    this.serviceadmin.findAll().subscribe(res => {
      this.administradores = res;
    })
  }

  public detalhes(id, i) {

    let idvendedor;

    this.servicevend.findByName(this.clientes[i][4]).subscribe(res=>{
      idvendedor = res[0].id;

      localStorage.setItem("detalhesClienteSelecionado", id);

      localStorage.setItem("Vendedorid", idvendedor);
    

    this.router.navigate(['detalhescliente']);
    })

    
  }

  public detalhesvend(id) {

    localStorage.setItem("detalhesVendSelecionado", id);

    this.router.navigate(['detalhesvendedor']);

  }

  public detalhesadmin(id) {

    localStorage.setItem("detalhesAdminSelecionado", id);

    this.router.navigate(['detalhesadministrador']);

  }
}
