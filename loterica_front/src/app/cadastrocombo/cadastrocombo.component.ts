
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadCombo } from '../model/CadCombo';
import { CadComboService } from '../service/cadcomboservice';
import { CadBolao } from '../model/cadbolao';
import { CadBolaoService } from '../service/cadbolaoservice';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BolaoCombo } from '../model/bolaoCombo';

@Component({
  selector: 'app-cadastrocombo',
  templateUrl: './cadastrocombo.component.html',
  styleUrls: ['./cadastrocombo.component.css']
})
export class CadastrocomboComponent implements OnInit {

  mobile:boolean = false;
  nave: string;
  sinal : number;
  today2 = new Date();
  valorsub : number[]=[];
  numcota : number[]=[];
  temp : number;
  valortotal :number =0;

  loading: boolean = false;

  listanum : number[]=[];
  BolaoSelecao:number[]=[];
  combo : CadCombo = new CadCombo();
  boloes: CadBolao[] = [];
  boloesMega: CadBolao[] = [];
  boloesQuina: CadBolao[] = [];
  boloesLote: CadBolao[] = [];
  boloesDupl: CadBolao[] = [];
  boloesDias: CadBolao[] = [];
  boloesBilh: CadBolao[] = [];
  boloesLfac: CadBolao[] = [];
  boloesLtma: CadBolao[] = [];
  boloesTime: CadBolao[] = [];
  boloesSup7: CadBolao[] = [];
  constructor(private service : CadComboService, private servicecb : CadBolaoService, private router:Router) { 

  }

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
    
    window.scrollTo( 0,0);
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


  public formataValor(valor){

    let formatter = new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(valor/100);

    return formatter;
  }

  public ajustaCentavos(valor:number) {
    if(valor.toString().length >=4){
    valor = valor/100;
    }else{

    }
    return valor;
  }

  
  
  public subtotal(){

    
    document.getElementById("resumotable").setAttribute("style","display: flex;");
    document.getElementById("repeticao").setAttribute("style","display: flex; justify-content: center;");
    for(let j=0; j < this.boloes.length; j++){
      this.numcota[j] = this.boloes[j].qtdCotasDisponiveis;
      this.listanum[j] = 1;
      this.boloes[j].qtdCotasDisponiveis += -1;
    }
    for(let i =0; i < this.listanum.length; i++){
      this.valorsub[i] = this.boloes[i].valorCota * this.listanum[i];
      this.valortotal += this.valorsub[i];
    }
  }

  public addQtd(){
    var qtd = parseInt((document.getElementById("qtdvezes")as HTMLInputElement).value);
    
    let valido : boolean = true;

    console.log(this.boloes);
    for (let i = 0; i < this.boloes.length; i++){
      if (this.numcota[i] - (qtd+1) * this.listanum[i] < 0){
        valido = false;
        break;
      }
    }

    if (valido){
      qtd++;
      (document.getElementById("qtdvezes")as HTMLInputElement).value = ''+qtd;
      this.mudarCotaDisponivel();
    }
    else{
      alert("Limite de cotas disponíveis excedido");
    }

  }

  public removeQtd(){
    var qtd = parseInt((document.getElementById("qtdvezes")as HTMLInputElement).value);

    if (qtd > 1){
      qtd--;
      (document.getElementById("qtdvezes")as HTMLInputElement).value = ''+qtd;
      this.mudarCotaDisponivelMinus();
    }
  }


  // public addCarrinho(id:number){
  //   for(let i=0; i<=this.BolaoSelecao.length;i++){
  //     if(this.BolaoSelecao[i] == id){
  //       this.BolaoSelecao.splice(i,1);
  //       return
  //     }
  //   }
  //   this.BolaoSelecao.push(id);
  // }

  public addCarrinho(bolaoselecionado:CadBolao){
    
    this.boloes.push(bolaoselecionado);
  }




  public calcula(valorcota:number, index : number){
    // alert(listanum[index]);
    this.valortotal -= this.valorsub[index];
    this.valorsub[index] = valorcota * this.listanum[index];
    this.valortotal += this.valorsub[index];

    if((document.getElementById("qtdvezes") as HTMLInputElement).value == "0"){
      this.temp = 1;
    }else{
    this.temp = parseInt((document.getElementById("qtdvezes") as HTMLInputElement).value) * this.listanum[index] ;
    }
    //funcao pra atualizar as cotas disponíveis
    
    if(this.numcota[index] > this.temp){
     this.boloes[index].qtdCotasDisponiveis = this.numcota[index] - this.temp;
    }else{
      if (this.boloes[index].qtdCotasDisponiveis - this.temp < 0){
        alert("Limite de cotas disponíveis excedido");

        this.listanum[index] = 1;
        (document.getElementById("qtdvezes") as HTMLInputElement).value = '1';
        this.boloes[index].qtdCotasDisponiveis = this.numcota[index] - 1;

      }else{
        this.boloes[index].qtdCotasDisponiveis = this.numcota[index] - this.temp;
      }
      // this.listanum[index] = this.boloes[index].qtdCotasDisponiveis;
      // this.boloes[index].qtdCotasDisponiveis = 0;
      // this.valorsub[index] = valorcota * this.listanum[index];
    }
  }

  public addMega(){
    this.servicecb.findAllBoloesByModalidade('MEGA').subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesMega.push(res[i]);
      // }
      // this.boloesMega = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesMega.push(res[i]);
      }
      
      if(this.boloesMega.length != 0){
        document.getElementById("trmega").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField1').appendChild(row);
    document.getElementById("showInputField1").setAttribute("style","display: inline;");

     document.getElementById("divmega").setAttribute("style","display:block");
     
    //  this.boloes = [];
}

  public addQuin(){
    this.servicecb.findAllBoloesByModalidade('QUINA').subscribe(res=>{
      console.log(res);
      // for(let i=0; i<res.length;i++){
      //   this.boloesQuina.push(res[i]);
      // }
      // this.boloesQuina = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesQuina.push(res[i]);
      }
      if(this.boloesQuina.length != 0){
        document.getElementById("trquina").setAttribute("style","display:inline");
      }else{
        return;
      }
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField2').appendChild(row);
    document.getElementById("showInputField2").setAttribute("style","display: inline;");
      document.getElementById("divquina").setAttribute("style","display:block");
  }

  public addLote(){
    this.servicecb.findAllBoloesByModalidade('LOTE').subscribe(res=>{
      console.log(res);
      // this.boloesLote = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesLote.push(res[i]);
      }

      if(this.boloesLote.length != 0){
        document.getElementById("trlote").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField3').appendChild(row);
    document.getElementById("showInputField3").setAttribute("style","display: inline;");
      document.getElementById("divlote").setAttribute("style","display:block");
  }

  public addDupl(){
    this.servicecb.findAllBoloesByModalidade('DUPL').subscribe(res=>{
      console.log(res);
      // this.boloesDupl = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesDupl.push(res[i]);
      }

      if(this.boloesDupl.length != 0){
        document.getElementById("trdupl").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField4').appendChild(row);
    document.getElementById("showInputField4").setAttribute("style","display: inline;");
      document.getElementById("divdupl").setAttribute("style","display:block");
  }

  public addDias(){
    this.servicecb.findAllBoloesByModalidade('DIAS').subscribe(res=>{
      console.log(res);
      // this.boloesDias = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesDias.push(res[i]);
      }

      if(this.boloesDias.length != 0){
        document.getElementById("trdias").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField5').appendChild(row);
    document.getElementById("showInputField5").setAttribute("style","display: inline;");
      document.getElementById("divdias").setAttribute("style","display:block");
  }

  public addBilh(){
    this.servicecb.findAllBoloesByModalidade('BILH').subscribe(res=>{
      console.log(res);
      
      // this.boloesBilh = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesBilh.push(res[i]);
      }

      if(this.boloesBilh.length != 0){
        document.getElementById("trbilh").setAttribute("style","display:inline");
      }else{
        return;
      }

    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField6').appendChild(row);
    document.getElementById("showInputField6").setAttribute("style","display: inline;");
      document.getElementById("divbilh").setAttribute("style","display:block");
  }

  public addLfac(){
    this.servicecb.findAllBoloesByModalidade('LFAC').subscribe(res=>{
      console.log(res);
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesLfac.push(res[i]);
      }
      // this.boloesLfac = res;

      if(this.boloesLfac.length != 0){
        document.getElementById("trlfac").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField7').appendChild(row);
    document.getElementById("showInputField7").setAttribute("style","display: inline;");
      document.getElementById("divlfac").setAttribute("style","display:block");
  }

  public addLtma(){
    this.servicecb.findAllBoloesByModalidade('LTMA').subscribe(res=>{
      console.log(res);
      
      // this.boloesLtma = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesLtma.push(res[i]);
      }

      if(this.boloesLtma.length != 0){
        document.getElementById("trltma").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField8').appendChild(row);
    document.getElementById("showInputField8").setAttribute("style","display: inline;");
      document.getElementById("divltma").setAttribute("style","display:block");
  }

  public addTime(){
    this.servicecb.findAllBoloesByModalidade('TIME').subscribe(res=>{
      console.log(res);
      
      // this.boloesTime = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesTime.push(res[i]);
      }

      if(this.boloesTime.length != 0){
        document.getElementById("trtime").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField10').appendChild(row);
    document.getElementById("showInputField10").setAttribute("style","display: inline;");
      document.getElementById("divtime").setAttribute("style","display:block");
  }

  public addSup7(){
    this.servicecb.findAllBoloesByModalidade('SUP7').subscribe(res=>{
      console.log(res);
      
      // this.boloesSup7 = res;
      for(let i=0;i<res.length;i++){
        if(res[i].qtdCotasDisponiveis > 0)
        this.boloesSup7.push(res[i]);
      }

      if(this.boloesSup7.length != 0){
        document.getElementById("trsup7").setAttribute("style","display:inline");
      }else{
        return;
      }
      
    });
    // let row = document.createElement('label');  
    //   row.className = 'row';
    //   row.innerHTML = `
    //   <label style="color:white;"> ✓ </label>`;
    //   document.querySelector('.showInputField11').appendChild(row);
    document.getElementById("showInputField11").setAttribute("style","display: inline;");
      document.getElementById("divsup7").setAttribute("style","display:block");
  }

public mudarCotaDisponivel(){
  let contab = parseInt((document.getElementById("qtdvezes") as HTMLInputElement).value);

  let valido : boolean = true;

    for (let i = 0; i < this.boloes.length; i++){
      if (this.numcota[i] - contab * this.listanum[i] < 0){
        valido = false;
        break;
      }
    }
  
  if (valido){
    for(let i=0; i<this.boloes.length; i++){
      this.boloes[i].qtdCotasDisponiveis = this.numcota[i] - (contab * this.listanum[i]);

    }
  }else{
    alert("Limite de cotas disponíveis excedido");
    contab = 1;
    (document.getElementById("qtdvezes") as HTMLInputElement).value = ""+contab;
    for(let i=0; i<this.boloes.length; i++){ 
      this.boloes[i].qtdCotasDisponiveis = this.numcota[i] - (contab * this.listanum[i]);
    }
  }
}

public mudarCotaDisponivelMinus(){
  let contab = parseInt((document.getElementById("qtdvezes") as HTMLInputElement).value);
  
  for(let i=0; i<this.boloes.length; i++){
    this.boloes[i].qtdCotasDisponiveis = this.numcota[i] - (contab * this.listanum[i]);
  }
}

  public cadastrar(){

    this.combo.bolaoCombo = [];

    let interruptor = false;
    let badmsg = "";

    for (let item = 0; item < this.boloes.length; item++){
      if (this.boloes[item].qtdCotasDisponiveis < 0){
        badmsg += "Limite de cotas disponíveis excedido";
        interruptor = true;
      }
    }
    if (interruptor){
      alert(badmsg);
      return;
    }

    let i = 0;
    this.combo.multiplicador = parseInt((document.getElementById("qtdvezes") as HTMLInputElement).value);
    for (let item2 of this.boloes){

      this.servicecb.update(item2);
      // item2.qtdCotas = document.getElementById()
        this.combo.bolaoCombo.push(new BolaoCombo());
        this.combo.bolaoCombo[this.combo.bolaoCombo.length-1].qtdCotas = this.listanum[i]*this.combo.multiplicador;
        this.combo.bolaoCombo[this.combo.bolaoCombo.length-1].bolao = item2;
        this.combo.bolaoCombo[this.combo.bolaoCombo.length-1].dataRegistro = new Date(this.today2.getFullYear()+"-"+(this.today2.getMonth()+1)+"-"+(this.today2.getDate()+1));
        // this.combo.bolaoCombo[this.combo.bolaoCombo.length-1].combo = this.combo;
      i++;
    }
    
    this.gravar();

    document.getElementById("showInputField1").setAttribute("style","display: none;");
    document.getElementById("showInputField2").setAttribute("style","display: none;");
    document.getElementById("showInputField3").setAttribute("style","display: none;");
    document.getElementById("showInputField4").setAttribute("style","display: none;");
    document.getElementById("showInputField5").setAttribute("style","display: none;");
    document.getElementById("showInputField6").setAttribute("style","display: none;");
    document.getElementById("showInputField7").setAttribute("style","display: none;");
    document.getElementById("showInputField8").setAttribute("style","display: none;");
    document.getElementById("showInputField10").setAttribute("style","display: none;");
    document.getElementById("showInputField11").setAttribute("style","display: none;");
    
  }

  public gravar(){

    this.service.create(this.combo).subscribe(res=>{
      console.log(" dados gravados ");
   });

    document.getElementById("divsuccess").setAttribute("style","color: white;background-color: rgb(96, 219, 96); align-items: center; justify-content: center; display:flex; vertical-align: 50%; padding:3px;");

    let timer = setTimeout(function(){    
      document.getElementById("divsuccess").setAttribute("style","display: none;");
    }, 5000);
  }


}
