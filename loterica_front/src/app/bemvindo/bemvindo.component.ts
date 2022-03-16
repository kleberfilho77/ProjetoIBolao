import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bemvindo',
  templateUrl: './bemvindo.component.html',
  styleUrls: ['./bemvindo.component.css']
})
export class BemvindoComponent implements OnInit {

  mobile:boolean = false;
  nave: string;
  perfil:string;
  nomeuser:string;

  constructor(private router:Router) { 

  }

  ngOnInit() {
    if(localStorage.getItem("perfil") == 'ADMINISTRADOR' ||
     localStorage.getItem("perfil") == 'VENDEDOR' || 
    localStorage.getItem("perfil") == 'LOTERICA'){
      
    }else{
      this.router.navigate(['/login']);
    }

    this.perfil = localStorage.getItem("perfil");
   
    if (window.screen.width <= 500) { 
      this.mobile = true;
    }
    localStorage.setItem("flag","false");
    this.nomeuser = localStorage.getItem("nome");

    window.scrollTo( 0,0);
  }

}
