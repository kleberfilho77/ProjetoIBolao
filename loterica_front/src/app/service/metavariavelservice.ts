import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MetaVariavel } from "../model/metavariavel";
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class MetaVariavelService{
    constructor(private https : HttpClient){
    
    }

    public create(painel : MetaVariavel):any{
        return  this.https.post(`${URL}/metavar/create`,painel);
    }

    public findAll(){
        return this.https.get<MetaVariavel[]>(`${URL}/metavar/findAll`);
    }

    public update(meta : MetaVariavel){
        return this.https.patch(`${URL}/metavar/update`,meta);
    }

    public remove(metaid : number){
        return this.https.delete(`${URL}/metavar/remove/`+metaid);
    }
}