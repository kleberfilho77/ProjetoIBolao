
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.css']
})
export class InstitucionalComponent {


  mobile:boolean = false;
  nave: string;

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

  back() {
    this.router.navigate(['/login']);
  }

  public proxtela(){
    window.location.href='#next'
  }

}
