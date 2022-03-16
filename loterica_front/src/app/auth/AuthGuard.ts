// import { LoginService } from './../service/login.service';
// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';



// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//     constructor(private authservice: LoginService,
//         private router: Router) {
//     }

//     canActivate(next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): boolean |
//         Observable<boolean> | Promise<boolean> {

//         if (this.authservice.isLogado())
//             return true;

//         this.router.navigate(['login']);
//         return false;
//     }
// }