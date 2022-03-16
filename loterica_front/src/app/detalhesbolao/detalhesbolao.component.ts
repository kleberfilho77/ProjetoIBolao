import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadBolao } from '../model/cadbolao';
import { ArquivoService } from '../service/arquivoservice';
import { BolaoComboService } from '../service/bolaocomboservice';
import { CadBolaoService } from '../service/cadbolaoservice';
import { UsuarioEquipeVendedorService } from '../service/usuarioequipevendedorservice';

@Component({
  selector: 'app-detalhesbolao',
  templateUrl: './detalhesbolao.component.html',
  styleUrls: ['./detalhesbolao.component.css']
})
export class DetalhesbolaoComponent implements OnInit {

  mobile: boolean = false;
  nave: string;
  listanum: number[] = [];

  vendedoresbolao : any[]=[];
  datasorteiobolao : string;
  perfil:string;
  somacotas:number=0;
  cotascombo:number=0;

  bolao: CadBolao = new CadBolao();

  constructor(private service : CadBolaoService, private servicevendbolao : UsuarioEquipeVendedorService,
    private arqservice: ArquivoService, private service4: BolaoComboService, private router : Router) { }


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

    this.listarBolao();

    this.preparaValor(this.bolao.valorCota);
    this.preparaValor(this.bolao.premioPrevisto);
    this.perfil = localStorage.getItem("perfil");

    window.scrollTo( 0,0);
    
  }

public listarBolao(){
  this.service.findById(parseInt(localStorage.getItem("detalhesBolaoSelecionado"))).subscribe(res=>{
    console.log(res);
    this.bolao = res;
    this.datasorteiobolao = this.bolao.dataSorteio.toString().substring(8,10) +"/"+ this.bolao.dataSorteio.toString().substring(5,7) +"/"+ this.bolao.dataSorteio.toString().substring(0,4)
    this.listarCotaCombo();
    if (res.imgpath != undefined){
      (document.getElementById('imagepath') as HTMLImageElement).src = res.imgpath;
    }else{
      (document.getElementById('imagepath') as HTMLImageElement).style.display = 'none';
    }
  });

}

public listarCotaCombo(){
  this.service4.findById(this.bolao.id).subscribe(res3=>{

    for(let i=0; i < res3.length; i++){
      this.cotascombo += res3[i].qtdCotas;
    }
    this.listarVendedores();
  });
}

public listarVendedores(){
  this.servicevendbolao.findBolaoVendedores(parseInt(localStorage.getItem("detalhesBolaoSelecionado"))).subscribe(res=>{
    console.log(res.length);
    console.log(res);
    for(let i=0;i<res.length;i++){
      if(res[i][1] > 0)
      this.vendedoresbolao.push(res[i]);
    }
    console.log(this.vendedoresbolao);
    
    if(this.vendedoresbolao.length > 0){
    
      for (let i = 0; i < this.vendedoresbolao.length; i++) {
         console.log(this.vendedoresbolao[i][1]);
        if (this.vendedoresbolao[i][1] != undefined) {
          this.somacotas += this.vendedoresbolao[i][1];
        }
        console.log(this.somacotas);
      }
    }
    console.log(this.bolao.qtdCotasDisponiveis);
    this.somacotas += this.bolao.qtdCotasDisponiveis;
    console.log(this.somacotas);
    
  });

}

  public preparaValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;

  }

  public irparatransf(){
    this.router.navigate(['/transferenciacota']);
  }

  back() {
    this.router.navigate(['/listaboloes']);
  }

  deletar() {
    if (confirm('Tem certeza que deseja excluir esse bolão?')) {
      // Save it!
      this.bolao.status = "INVALIDO";
      this.service.updateContent(this.bolao);
      this.router.navigate(['/home']);
    } else {
      // Do nothing!
      console.log('bolao não foi excluido da base de dados.');
    }
    
  }

}
