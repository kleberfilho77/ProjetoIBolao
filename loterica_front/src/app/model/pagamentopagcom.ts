export class PagamentoPagCom{
    cardHolderName: string;
    paymentOptionCode: number;
    scheme: string;
    amount: string;
    pan: string;
    expiryMonth: string;
    expiryYear: string;
    securityCode: string;

    constructor(cardHolderName ?: string, paymentOptionCode ?: number, amount ?: string, scheme ?: string,
        pan ?: string, expiryMonth ?: string, expiryYear ?: string, securityCode ?: string){

        this.cardHolderName = cardHolderName;
        this.paymentOptionCode = paymentOptionCode;
        this.amount = amount; 
        this.scheme = scheme;
        this.pan = pan;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.securityCode = securityCode;
    }
}