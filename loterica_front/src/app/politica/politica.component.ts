import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css']
})
export class PoliticaComponent implements OnInit {

  mobile:boolean = false;

  constructor(private router:Router) { 

  }

  ngOnInit(){
    $(document).ready(function(){
      var today = new Date();
      var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear().toString();
      (document.getElementById("databolao")as HTMLInputElement).value = ''+date;
  });

  if (window.screen.width <= 500) { 
    this.mobile = true;
  }
  localStorage.setItem("flag","false");

  window.scrollTo( 0,0);
  }

  public proxtela(){
    window.location.href='#next'
  }

  back() {
    this.router.navigate(['/login']);
  }

}
