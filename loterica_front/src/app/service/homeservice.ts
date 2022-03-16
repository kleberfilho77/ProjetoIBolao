import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Home } from "../model/Home";
import { Constants } from '../constants';

 const URL = Constants.URL;

@Injectable()
export class HomeService{

     constructor(private https : HttpClient){
  
     }

     public create(home : Home){
      return  this.https.post(`${URL}/create`,home);
  }

    public findAll(){
    return  this.https.get(`${URL}/create`);
  }
 

}