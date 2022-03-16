import { TsCompilerAotCompilerTypeCheckHostAdapter } from '@angular/compiler-cli/src/transformers/compiler_host';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BolaoCombo } from '../model/bolaocombo';
import { CadBolao } from '../model/cadbolao';
import { CadCombo } from '../model/CadCombo';
import { BolaoComboService } from '../service/bolaocomboservice';
import { CadBolaoService } from '../service/cadbolaoservice';

@Component({
  selector: 'app-detalhescombo',
  templateUrl: './detalhescombo.component.html',
  styleUrls: ['./detalhescombo.component.css']
})
export class DetalhescomboComponent implements OnInit {

  mobile:boolean = false;
  nave: string;
  perfil:string;
  valortotal :number =0;
  subtotal : number[]=[];

  bolaocombo = new BolaoCombo();
  boloes: CadBolao[]=[];
  ids : string[]=[];
  cotas : string[]=[];
  bcids : string[]=[];
  flag: string;

  constructor( private service : CadBolaoService, private servicebc: BolaoComboService,
    private router: Router) { }

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


  // public listar(){

  //   let idcombo = localStorage.getItem("detalhesComboId");

  //   this.servicec.findListById(parseInt(idcombo)).subscribe(res=>{
      
  //     console.log(res)

  //     for(let i=0;i<res.length;i++){
  //       this.ids.push(res[i][1]);
  //       this.cotas.push(res[i][0]);
  //     }
  //     console.log(this.ids);
  //     console.log(this.cotas);

  //     this.buscarBoloes();

  //   });

  // }

  public listar(){

    let ids = localStorage.getItem("detalhesComboSelecionadoIds");
    let cotas = localStorage.getItem("detalhesComboSelecionadoCotas");
    let bcids = localStorage.getItem("idbolaocombo");
    console.log(ids);
    console.log(cotas);
    console.log(bcids);


    let f=0;
    for(let i = 0; i< ids.length; i++){
      // console.log(ids);
       //console.log(cotas);
      
        // alert(ids.substring(f,ids.indexOf(",")))
        this.ids.push(ids.substring(f,ids.indexOf(",")));
        
        
        f = ids.indexOf(",")+1;
        ids = ids.substring(f)
        f=0;
        
        // alert(ids);
        if(ids.indexOf(",") == -1){
           this.ids.push(ids);
          i = ids.length-1;
        }
    
    }
    console.log(this.ids);

    for(let i = 0; i< cotas.length; i++){
      
      // alert(ids.substring(f,ids.indexOf(",")))
      this.cotas.push(cotas.substring(f,cotas.indexOf("-")));
      
      
      f = cotas.indexOf("-")+1;
      cotas = cotas.substring(f)
      f=0;

      // alert(ids);
      if(cotas.indexOf("-") == -1){
        this.cotas.push(cotas);
        i = cotas.length-1;
      }
  
  }
  console.log(this.cotas);
  
  for(let i = 0; i< bcids.length; i++){
    // console.log(ids);
     //console.log(cotas);
    
      // alert(ids.substring(f,ids.indexOf(",")))
      this.bcids.push(bcids.substring(f,bcids.indexOf(",")));
      
      
      f = bcids.indexOf(",")+1;
      bcids = bcids.substring(f)
      f=0;

      // alert(ids);
      if(bcids.indexOf(",") == -1){
        this.bcids.push(bcids);
        i = bcids.length-1;
      }
  
  }
  // for(let i=0; i< this.bcids.length; i++){
    
  //   if(bcids[i] == undefined){
  //     this.bcids.splice(i,1);
  //   }
  // }
console.log(this.bcids);

  this.buscarBoloes();

  }


  // public buscarBoloes(){
  //   for(let i=0;i<this.ids.length;i++){
  //     this.service.findById(this.ids[i]).subscribe(res=>{
  //       this.boloes.push(res);
  //       this.subtotal.push(this.cotas[i]*res.valorCota);
  //        this.valortotal += this.cotas[i]*res.valorCota;
  //     });
  //   }
  // }

  public buscarBoloes(){
    for(let i=0;i<this.ids.length;i++){
      this.service.findById(parseInt(this.ids[i])).subscribe(res=>{
        this.boloes.push(res);
        this.subtotal.push(parseInt(this.cotas[i])*res.valorCota);
         this.valortotal += parseInt(this.cotas[i])*res.valorCota;
      });
    }
  }

  public preparaValorDe(valor) {
    let inteiro = valor/100 + 1;
    let resto = ""+(valor%100);
  
    if (valor%100 < 10)
      resto += "0";
    let novo = "R$ "+inteiro+","+resto;
  
    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);
  
    return formatter;
  }

  back() {
    this.router.navigate(['/listacombos']);
  }

  deletar() {
    if (confirm('Tem certeza que deseja excluir esse bolão?')) {
      // Save it!
      
      for(let i=0;i<this.ids.length;i++){
        
       
        this.boloes[i].qtdCotasDisponiveis += parseInt(this.cotas[i]);
        this.service.updateCotasDisponiveis(this.boloes[i]);
      }
      console.log(this.bcids);
      for(let i=0;i<this.bcids.length;i++){
      
      this.servicebc.findByIdBolaoCombo(parseInt(this.bcids[i])).subscribe(res=>{
        console.log(res);
        this.bolaocombo = res;
        this.bolaocombo.status  = "INVALIDO";
        this.servicebc.updateContent(this.bolaocombo);
        this.bolaocombo = new BolaoCombo();
      })
      }
      document.getElementById("divsuccess").setAttribute("style","color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

      let timer = setTimeout(function(){    
      document.getElementById("divsuccess").setAttribute("style","display: none;");
      }, 5000);

      this.router.navigate(['listacombos']);
      //this.router.navigate(['/home']);
    } else {
      // Do nothing!
      console.log('o combo não foi excluido da base de dados.');
    }

    
  }

}
