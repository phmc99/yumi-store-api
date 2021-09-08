# API - YumiStore

### Endpoints:

- /register -> Registro de usuario
- /login -> Logar o usuario

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
