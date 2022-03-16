import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class ArquivoService{

    constructor(private http: HttpClient){}

    public salvaImagem(img : File){
        let formData: FormData = new FormData();

        formData.append('file', img);

        let req = new HttpRequest('POST', URL + `/imagem`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
    
        return this.http.request(req);
    }

    public loadImage(path : string){
        return this.http.get<any>(URL + "/files/"+path);
    }

}