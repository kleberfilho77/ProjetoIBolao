import { CadBolaoService } from './../service/cadbolaoservice';
import { UsuarioEquipeVendedorService } from './../service/usuarioequipevendedorservice';
import { CotaService } from './../service/cotaservice';
import { Component, OnInit } from '@angular/core';
import { Cota } from '../model/cota';
import { BolaoVendedor } from '../model/bolaovendedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listacotas',
  templateUrl: './listacotas.component.html',
  styleUrls: ['./listacotas.component.css']
})
export class ListacotasComponent implements OnInit {

  mobile:boolean=false;
  nave:string;


  //  cotas: Cota[] = [];
  perfil : string;

  cotas: BolaoVendedor[]=[];

  constructor(private servicecota : CotaService, private servicevend : UsuarioEquipeVendedorService,
    private servicebolao : CadBolaoService, private router:Router) { }

  ngOnInit() {

    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
    localStorage.getItem("perfil") == 'VENDEDOR' || 
   localStorage.getItem("perfil") == 'LOTERICA'){
     
   }else{
     this.router.navigate(['/login']);
   }

    if (window.screen.width <= 500) { 
      this.mobile = true;
    }
    localStorage.setItem("flag","false");

    this.listar();

    window.scrollTo( 0,0);
  }

  public listar(){
    //  this.servicecota.findAll().subscribe(res=>{
    //    console.log(res);

    //   for(let item of res){
    //   this.servicebolao.findById(item.bolao.id).subscribe(res2=>{
    //     console.log(res2);
        
    //   })
    //   }
    //   this.cotas = res;
    //    console.log(this.cotas);
    //  })


    if (localStorage.getItem("perfil") == "VENDEDOR"){
      let id = parseInt(localStorage.getItem("idVend"));

      this.servicecota.findByVendedor(id).subscribe(res=>{
        
        for (let p = 0; p < res.length; p++){
          this.cotas.push(new BolaoVendedor());
          this.cotas[this.cotas.length-1].tipoModalidade = res[p][0];
          this.cotas[this.cotas.length-1].dataBolao = res[p][1];
          this.cotas[this.cotas.length-1].valorCota = res[p][2];
          this.cotas[this.cotas.length-1].quantidadeCotaVendedor = res[p][3]
        }
      });
    }
    else{
      this.servicecota.findAll2().subscribe(res=>{
        for (let p = 0; p < res.length; p++){
          this.cotas.push(new BolaoVendedor());
          this.cotas[this.cotas.length-1].tipoModalidade = res[p][0];
          this.cotas[this.cotas.length-1].dataBolao = res[p][1];
          this.cotas[this.cotas.length-1].valorCota = res[p][2];
          this.cotas[this.cotas.length-1].quantidadeCotaVendedor = res[p][3];
        }
      })
    }
  }

  public preparaValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;

  }
     
  }

