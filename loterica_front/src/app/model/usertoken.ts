
export class UserToken {
    
    account_id: number;
    balance: number;
    id: number;

    partner: string;

    token: string;

    useremail: string;

    username: string;

    constructor(account_id?: number, balance?: number, id?: number,
        partner?: string, token?: string, useremail?: string, username?: string) {
        
            this.account_id =  account_id ;
            this.balance = balance ;
            this.id = id ;
            this.partner = partner;   
            this.token = token;
            this.useremail = useremail;
            this.username = username;
    }
}