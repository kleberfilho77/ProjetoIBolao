import { Login } from './../login/login';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class LoginService{
    logado:Login;

    constructor(private https: HttpClient,
        private router: Router) {
            this.logado = new Login();
        }

        public registrar(login: Login): Observable<Login>{
            return this.https.post<Login>(`${URL}/register`, login);
        }

        public login(login: Login): Observable<Login>{
            return this.https.post<Login>(`${URL}/auth`, login);
        }

        public create(login: Login) {
            return this.https.post<Login>(`${URL}`, login);
            }
            public findAll() {
            return this.https.get<Login[]>(`${URL}`);
            }
            public findById(id: number) {
            return this.https.get<Login>(`${URL}/${id}`);
            }

        // public findByLogin(login: Login) {
        //     return this.https.post<Login>(`${URLDOIS}`, login);
        //     }
        
        public armazenaStorage(login: Login) {
            localStorage.setItem('logado', JSON.stringify(login));
            }
            isLogado() {
            try {
            let logado = localStorage.getItem('logado');
            console.log('Parte Um verificar');
            if (logado) {
            return true;
            }
            return false;
            } catch (error) {
            console.log('Parte dois verificado - deu ruim ');
            return false;
            }
            }
            public logout() {
            localStorage.removeItem('logado');
            this.router.navigateByUrl('login');
            }
            getLogado() {
            return JSON.parse(localStorage.getItem('logado')[0]);
            }
           }
    

