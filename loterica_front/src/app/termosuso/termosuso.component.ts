import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termosuso',
  templateUrl: './termosuso.component.html',
  styleUrls: ['./termosuso.component.css']
})
export class TermosusoComponent implements OnInit {

  mobile:boolean = false;

  constructor(private router:Router) { 

  }

  ngOnInit(){

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
