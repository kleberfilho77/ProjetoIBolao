import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserToken } from "../model/usertoken";

@Injectable()
export class PagamentoService {

    constructor(private https: HttpClient) {
    }

    public pagamentoPost(am: string, ch: string, em: string, ey: string, p: string, 
    poc: number, sch: string, sc: string, token: string) {
        return this.https.post("https://adm.pagcom.net/api/v1/payments", {
            payment:{
                amount : am,
                cardHolderName : ch,
                expiryMonth : em,
                expiryYear : ey,
                pan : p,
                paymentOptionCode : poc,
                scheme : sch,
                securityCode : sc
            }
        }, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('Authorization', token)
        });
    }

    public autenticador() {
        return this.https.post<UserToken>("https://adm.pagcom.net/api/v1/sessions", {user:{email:"rodrigo@mendesecavalcanti.com.br", password:"pagcom123"}});
    }

    public autenticadorLoterica(id:number) {
        return this.https.get<any>("http://adm.pagcom.net/api/v1/partners/"+ id);
    }

}