import { Router } from '@angular/router';
import { Login } from '../login/login';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-redefinirsenha',
  templateUrl: './redefinirsenha.component.html',
  styleUrls: ['./redefinirsenha.component.css']
})
export class RedefinirSenhaComponent{
  
  login: Login;

  constructor(
    private server: LoginService,
    private router: Router
  ) {
    this.login = new Login();
  }

     public seguir(){ 
      
        this.router.navigate(['/home']);
    
  }

}