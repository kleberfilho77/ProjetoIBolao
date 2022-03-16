

POST_Create Bolao
 http://localhost:1237/bolao/create
 
 body _ falta {token}
 
 "id":created _ auto
{
"tipoModalidade":"MEGA",
 "numeroSorteio":1000,
 "dataBolao":"10/10/2021",
 "dataSorteio":"12/10/2021",
 "horarioFechamento":"11:50:00",
 "qtdDezenas":10,
 "valorCotas":100.,
 "qtdJogos":3,
 "qtdCotas":20,
 "premioPrevisto":50000.00,
 }
   
 =================
 http://localhost:1237/bolao/createcota
  {
 "tipoModalidade":"QUINA",
 "numeroSorteio":400,
 "dataBolao":"10/10/2021",
 "dataSorteio":"12/10/2021",
 "horarioFechamento":"11:50:00",
 "qtdDezenas":10,
 "valor_cota":200.30,
 "qtdJogos":2,
 "qtdCotas":10,
 "premioPrevisto":50000.00,
   "cotas":[
   	{
   	"valor-cota":300,
   	"quantidade-cota-vendedor":1,
 "vendedor":
 {
  "cpf":"02295351782",
   "nome":"edson belem de souza",
   "endereco":"av Jose Carlos Nogueira Diniz",
   "numero":"75",
 "complemento":"apto 703",
 "bairro":"Recreio dos Bandeirantes",
 "cidade":"Rio de Janeiro",
 "estado":"RJ",
 "contato1":"contato um",
 "contato2":"contato dois",
 "email":"profedsonbelem@gmail.com",
  "sexo":"MASCULINO",
  "isSms": 1,
  "password":"123456",
  "perfil":"Adm"
 }   	
 }
 ]
}
 
 
 
 =================
 
 
 
 
 
 
 bolao create
 {
 "tipoModalidade":"MEGA",
 "numeroSorteio":1000,
 "dataBolao":"10/10/2021",
 "dataSorteio":"12/10/2021",
 "horarioFechamento":"11:50:00",
 "qtdDezenas":10,
 "valorCotas":100.30,
 "qtdJogos":3,
 "qtdCotas":20,
 "premioPrevisto":50000.00,
   "cotas":[{
   	"valor-cota":200,
   	"quantidade-cota-vendedor":10,
	    "vendedores":[{
	    	 "cpf":"02295351782",
          "nome":"edson belem de souza",
       "endereco":"av Jose Carlos Nogueira Diniz",
      "numero":"75",
 "complemento":"apto 703",
 "bairro":"Recreio dos Bandeirantes",
 "cidade":"Rio de Janeiro",
 "estado":"RJ",
 "contato1":"contato um",
 "contato2":"contato dois",
 "email":"profedsonbelem@gmail.com",
  "sexo":"MASCULINO",
  "isSms": 1,
  "password":"123456",
  "perfil":"Adm"
	    } ]  	
 }]
}

==========================
 
 
 
POST_Created_  http://localhost:1237/admin/create 
"id":"1,
"uuid":"nao precisa",

  {
 "cpf":"02295351782",
 "nome":"edson belem",
 "endereco":"av Jose Carlos Nogueira Diniz",
 "numero":"75",
 "complemento":"apto 703",
 "bairro":"Recreio dos Bandeirantes",
 "cidade":"Rio de Janeiro",
 "estado":"RJ",
 "contato1":"contato um",
 "contato2":"contato dois",
 "email":"profedsonbelem@gmail.com",
  "sexo":"MASCULINO",
  "isSms": 1,
  "password":"123456",
  "perfil":"Adm"
  
  
}
 



==================

(POST) 
 http://localhost:1237/rest/createadmin

 {
  "nome":"edson belem",
  "email":"profedsonbelem@gmail.com",
  "password":"123456",
  "perfil":"ADMIN",
  "cpf":"02295351782",
 "endereco":"av Jose Carlos Nogueira Diniz",
 "numero":"75",
 "complemento":"apto 703",
 "bairro":"Recreio dos Bandeirantes",
 "cidade":"Rio de Janeiro",
 "estado":"RJ",
 "contato1":"contato um",
 "contato2":"contato dois",
  "sexo":"MASCULINO",
  "isSms": 1
}
 ================
 (POST) 
http://localhost:1237/rest/createvendedor

{
    "id": 503,
    "cpf": "02295351782",
    "endereco": "av Jose Carlos Nogueira Diniz",
    "numero": "75",
    "complemento": "apto 703",
    "bairro": "Recreio dos Bandeirantes",
    "cidade": "Rio de Janeiro",
    "estado": "RJ",
    "cep": "222444",
    "contato1": "contato um",
    "contato2": "contato dois",
    "sexo": "MASCULINO",
    "isSms": true,
    "perfil": "VENDEDOR",
    "uuid": "b124af75-d213-40ac-876b-b958106045cb",
    "email": "profedsonbelem@gmail.com",
    "cotas": null,
    "nome": "edson belem",
    "password": "14715c5d4563d3a70dec99a360770b90",
    "token": "a8f4fb76-dd3a-4c56-a8bc-babee9f90140"
}

===========================
Atualizar usuario e gravar cota
 POST = http://localhost:1237/bolao/createcota
  {
 "tipoModalidade":"QUINA",
 "numeroSorteio":400,
 "dataBolao":"10/10/2021",
 "dataSorteio":"12/10/2021",
 "horarioFechamento":"11:50:00",
 "qtdDezenas":10,
 "valor_cota":200.30,
 "qtdJogos":2,
 "qtdCotas":10,
 "premioPrevisto":50000.00,
   "cotas":[
   	{
   	"valor-cota":300,
   	"quantidade-cota-vendedor":1,
 "vendedor":
 {"id":506,
  "cpf":"02295351782",
   "nome":"edson belem de souza",
   "endereco":"av Jose Carlos Nogueira Diniz",
   "numero":"75",
 "complemento":"apto 703",
 "bairro":"Recreio dos Bandeirantes",
 "cidade":"Rio de Janeiro",
 "estado":"RJ",
 "contato1":"contato um",
 "contato2":"contato dois",
 "email":"profedsonbelem@gmail.com",
  "sexo":"MASCULINO",
  "isSms": 1,
  "password":"123456",
  "perfil":"Adm"
 }   	
 }
 ]
}
===================================

POST salvarvendedor
http://localhost:1237/vendedor/saved

{
  "cpf":"02295351782",
   "nome":"edson belem de souza",
   "endereco":"av Jose Carlos Nogueira Diniz",
   "numero":"75",
 "complemento":"apto 703",
 "bairro":"Recreio dos Bandeirantes",
 "cidade":"Rio de Janeiro",
 "estado":"RJ",
 "contato1":"contato um",
 "contato2":"contato dois",
 "email":"profedsonbelem@gmail.com",
  "sexo":"MASCULINO",
  "isSms": 1,
  "password":"123456",
  "perfil":"VENDEDOR"
}

========================================

http://localhost:1237/vendedor/findAll

[
    {
        "id": 505,
        "cpf": "02295351782",
        "endereco": "av Jose Carlos Nogueira Diniz",
        "numero": "75",
        "complemento": "apto 703",
        "bairro": "Recreio dos Bandeirantes",
        "cidade": "Rio de Janeiro",
        "estado": "RJ",
        "cep": null,
        "contato1": "contato um",
        "contato2": "contato dois",
        "sexo": "MASCULINO",
        "isSms": true,
        "perfil": "VENDEDOR",
        "uuid": "86bec0c7-e4b5-4693-b6d0-8612c3a8aafb",
        "email": "profedsonbelem@gmail.com",
        "cotas": [
            {
                "idCota": 13,
                "valor-cota": 300,
                "quantidade-cota-vendedor": 0
            }
        ],
        "nome": "edson belem de souza",
        "password": "123456",
        "token": null
    },
    {
        "id": 506,
        "cpf": "02295351782",
        "endereco": "av Jose Carlos Nogueira Diniz",
        "numero": "75",
        "complemento": "apto 703",
        "bairro": "Recreio dos Bandeirantes",
        "cidade": "Rio de Janeiro",
        "estado": "RJ",
        "cep": null,
        "contato1": "contato um",
        "contato2": "contato dois",
        "sexo": "MASCULINO",
        "isSms": true,
        "perfil": "VENDEDOR",
        "uuid": "ab14dad7-b143-45ad-9de6-be890215d95b",
        "email": "profedsonbelem@gmail.com",
        "cotas": [
            {
                "idCota": 12,
                "valor-cota": 300,
                "quantidade-cota-vendedor": 2
            }
        ],
        "nome": "marcio",
        "password": "123456",
        "token": null
    },
    {
        "id": 507,
        "cpf": "02295351782",
        "endereco": "av Jose Carlos Nogueira Diniz",
        "numero": "75",
        "complemento": "apto 703",
        "bairro": "Recreio dos Bandeirantes",
        "cidade": "Rio de Janeiro",
        "estado": "RJ",
        "cep": null,
        "contato1": "contato um",
        "contato2": "contato dois",
        "sexo": "FEMININO",
        "isSms": true,
        "perfil": "VENDEDOR",
        "uuid": "45dbf3a8-9b23-42c3-8f06-f7ba69403f2a",
        "email": "profedsonbelem@gmail.com",
        "cotas": [],
        "nome": "luciana",
        "password": "123456",
        "token": null
    }
]

==========================================




