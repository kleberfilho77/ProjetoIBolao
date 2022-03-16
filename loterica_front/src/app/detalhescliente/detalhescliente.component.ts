import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { UsuarioEquipeVendedor } from './../model/usuarioequipevendedor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioClienteFinal } from '../model/usuarioclientefinal';
import { UsuarioClienteFinalService } from '../service/usuarioclientefinalservice';

@Component({
  selector: 'app-detalhescliente',
  templateUrl: './detalhescliente.component.html',
  styleUrls: ['./detalhescliente.component.css']
})
export class DetalhesClienteComponent implements OnInit {

  clientefinal: UsuarioClienteFinal;
  mobile: boolean = false;
  nave: string;
  id_vendedor: number;
  vendedores : UsuarioEquipeVendedor[]=[];
  perfil : string;
  idvendedor : number;
  vendedor : UsuarioEquipeVendedor = new UsuarioEquipeVendedor;
  nomeVendedor : string;

  constructor(private service: UsuarioClienteFinalService, private servicevend : UsuarioEquipeVendedorService, private route: Router) { }

  ngOnInit() {

    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
     localStorage.getItem("perfil") == 'VENDEDOR' || 
    localStorage.getItem("perfil") == 'LOTERICA'){
      
    }else{
      this.route.navigate(['/login']);
    }

    if (window.screen.width <= 500) { 
      this.mobile = true;
    }
    localStorage.setItem("flag","false");

    this.service.findById(parseInt(localStorage.getItem("detalhesClienteSelecionado"))).subscribe(res=>{
      this.clientefinal = res;
    });

    this.listarVendedores();

    this.perfil = localStorage.getItem("perfil");

    this.idvendedor = parseInt(localStorage.getItem("Vendedorid"));
    this.listarVend();
    

    window.scrollTo( 0,0);
  }

  public listarVend(){
    this.servicevend.findById(this.idvendedor).subscribe(res=>{
      this.vendedor = res;
      this.nomeVendedor = res.nome;
    });
  }

  public listarVendedores(){
    this.servicevend.findAll().subscribe(res=>{
       this.vendedores = res;
      // for(let i =0; i < res.length; i++){
      //   console.log(res[i].nome);
      //   console.log(this.clientefinal);
      //   if(res[i].nome != this.clientefinal..nome){
      //     this.vendedores.push(res[i]);
      //   }
      // }
      
    })
  }

  public gravar(){
    this.clientefinal.idVendedor = this.id_vendedor;
    this.service.update(this.clientefinal).subscribe(res=>{

      
        this.service.updateVendedor(this.clientefinal, this.id_vendedor).subscribe(res3 => {
          console.log(" dados gravados ");
        });
      

      this.route.navigate(["home"]);
    });
  }

  public pegarIdVendedor(){
    let VendId = (document.getElementById("vendedor") as HTMLSelectElement).selectedIndex;
    // this.clientefinal.vendedorVinculado.id = this.id_vendedor;
    this.id_vendedor=parseInt((document.getElementById("vend_"+(VendId-1))as HTMLOptionElement).value);
  }

  back() {
    this.route.navigate(['/listausuarios']);
  }

}
