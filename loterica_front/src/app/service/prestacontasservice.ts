import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../constants";
import { PrestacaoContas } from "../model/prestacaocontas";

const URL = Constants.URL;

@Injectable()
export class PrestaContasService {

  constructor(private https: HttpClient) {

  }

  public create(prestacontas: PrestacaoContas) {
    return this.https.post(`${URL}/prestacaocontas/create`, prestacontas);
  }

  public findAll() {
    return this.https.get<PrestacaoContas[]>(`${URL}/prestacaocontas/findAll`);
  }

  public update(prestacontas: PrestacaoContas) {
    return this.https.patch<PrestacaoContas>(`${URL}/prestacaocontas/update`, prestacontas)
  }

  public findAllPrestaContasVend() {
    return this.https.get<any[]>(`${URL}/prestacaocontas/findAllPrestaContasVend`);
  }

  public findAllPrestaContasByVend(idvend: number) {
    return this.https.get<any[]>(`${URL}/prestacaocontas/findAllPrestaContasByVend/` + idvend);
  }

  public findByIdVendedor(idvend: number) {
    return this.https.get<PrestacaoContas[]>(`${URL}/prestacaocontas/findByIdVendedor/` + idvend);
  }

  public findFromDataToData(idvend:number,de:string, ate:string){
    return this.https.get<any[]>(`${URL}/prestacaocontas/findFromDatatoData/`+idvend+`/`+de+`/`+ate);
  }

}