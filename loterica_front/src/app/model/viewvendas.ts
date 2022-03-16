export class ViewVendas{

    tipoModalidade: string;
    valorCota: number;
    qtdCotasVendidas: number;

    constructor(tipoModalidade ?: string, valorCota ?: number, qtdCotasVendidas ?: number){
        this.tipoModalidade = tipoModalidade;
        this.valorCota = valorCota;
        this.qtdCotasVendidas = qtdCotasVendidas;
    }

}