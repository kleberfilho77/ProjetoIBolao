export class TransferenciaDto{
  idUsuarioVendedorDe : number = 0;
  idUsuarioVendedorPara : number = 0;
  idCotaDe : number =0;
  idCotaPara:number =0;

	quantidadeTransferencia: number = 0;

    constructor(  idUsuarioVendedorDe ?: number,idUsuarioVendedorPara ?: number,
        idCotaDe ?: number, idCotaPara ?: number 
        ){
            this.idUsuarioVendedorDe = idUsuarioVendedorDe;
            this.idUsuarioVendedorPara = idUsuarioVendedorPara;
            this.idCotaDe = idCotaDe;
            this.idCotaPara  = idCotaPara;
        }

 

        




}