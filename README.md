# API - YumiStore

API desenvolvida com Node, Express e MongoDB, para armazenar os dados necessarios para construção da aplicação Yumi Store.

### Endpoints:

- /register -> Registro de usuario
- /login -> Logar o usuario
- /products -> GET e POST dos produtos
- /products/:productId -> GET, PUT e DELETE dos produtos
- /orders -> GET e POST dos pedidos *endpoint necessita de autenticação*
- /orders/:oerderId -> GET, PUT e DELETE dos pedidos *endpoint necessita de autenticação*

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
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
