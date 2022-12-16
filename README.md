# API - YumiStore

API desenvolvida com Node, Express e MongoDB, para armazenar os dados necessarios para construção da aplicação Yumi Store.
[Link do Deploy](https://yumi-store-api.onrender.com/)

### Endpoints:

- /auth/register -> Registro de usuario
- /auth/login -> Logar o usuario
- /auth/user/id -> GET dos dados do usuario
- /auth/user/id -> PUT dos dados do usuario
- /products -> GET e POST dos produtos
- /products/:productId -> GET, PUT e DELETE dos produtos
- /orders -> GET e POST dos pedidos *endpoint necessita de autenticação*
- /orders/:oerderId -> GET, PUT e DELETE dos pedidos *endpoint necessita de autenticação*
- /payment/checkout/:id/:email/:description/:amount -> GET para fazer a comunicação com o mercadopago
- /payment/success -> GET para pagina de sucesso
- /payment/failure -> GET para pagina de falha
- /payment/pending -> GET para pagina de pendente

### Corpo das requisições:

- Registro -> POST
  ```
  {
    "name": "test name",
    "cpf": "00000000000",
    "email": "mail@mail.com",
    "phone_number": "21940028922",
    "password": "123456",
    "address": {
      "cep": "",
      "street": "",
      "number": "",
      "complement": "",
      "district": "",
      "city": "",
      "uf": ""
    }
  }
  ```
- Login -> POST
  ```
  {
    "email": "mail@mail.com",
    "password": "123456"
  }
  ```
 - Products -> GET, POST, PUT, DELETE
  ```
  {
    "name": "Cama M1 Urban Puppy para Cães Microfibra Lisa Marinho",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "category": 1,
    "specie": "cachorro",
    "sizes": ["P", "M", "G"],
    "price": "149,99",
    "member_price": "134,99",
    "image_url": "https://staticpetz.stoom.com.br/fotos/1525443192336.jpg",
    "rating": {
      "comments": ["Fofo!", "Tamanho ideal", "Meu cachorro adorou"],
      "grades": [4, 5, 3, 2, 1, 0, 3, 4, 5, 5, 5]
      }
   }
  ```
- Orders -> GET, POST, PUT, DELETE *precisa do token de autenticação*
  ```
  {
    "cart": [
     {
       "productId": "1",
       "size": "P",
       "quantity": 2
     }
    ],
    "total_price": "110.0",
    "payment": {
      "method": "credit card",
      "isPaid": true
     }
   }
  ```
- Payments -> GET
  ```
    .../payment/checkout/:id/:email/:description/:amount
  ```
