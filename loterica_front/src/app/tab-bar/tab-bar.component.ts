import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

  constructor(private router: Router,
    public authService: LoginService) { }

  ngOnInit() {
  }

  public home(){
    this.router.navigate(['/home']);
  }

  public cadastrousuario(){
    this.router.navigate(['/cadastrousuario']);
  }

  public institucional(){
    this.router.navigate(['/institucional']);
  }

  logout() {
    this.authService.logout();
    localStorage.setItem("perfil","");
    this.router.navigate(['/login']);
    }

}
