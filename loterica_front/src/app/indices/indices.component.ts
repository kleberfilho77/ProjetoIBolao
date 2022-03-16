import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indices',
  templateUrl: './indices.component.html',
  styleUrls: ['./indices.component.css']
})
export class IndicesComponent implements OnInit {

  mobile:boolean = false;
  nave: string; 
  selectedValue:any;
  selectedValue2:any;
  constructor(private router:Router) { }

  ngOnInit(){

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

  isShown: boolean = false ; // hidden by default


toggleShow() {
this.isShown = ! this.isShown;
}

}
