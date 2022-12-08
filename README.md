
# Simple API

Simple code to match.dev
This API was constructed to get some information if the specific company is Simple Nacional. Simples Nacional is a kind of company in Brazil

## Environment variables
`TOKEN_JWT`ApRIn(23AaSDppOE)!@dA
`DATABASE`backoffice_api_h
`PORT_DATABASE`1433

## deploy commands

install command
```bash
  npm install 
```
run application in developer mode
```bash
  npm start 
```
run application in test mode
```bash
  npm test
```
build application
```bash
  npm build
```
run application in production mode
```bash
  npm run prod
```

### Authentication

```http
  POST /api/auth
```

| Prop   | type       | description                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **required** match.dev
| `password` | `string` | **required** 123456
#### result:

```json
{
    "token": "eyJ0eXAiOiJKV1QA...",
    "issued": 1666880946612,
    "expires": 1666883946612
}
```


### Register Simples Nacional

```http
  POST /api/simplesNacional

```
Header
| Header   | type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Token`      | `string` | **required**. Token  

Body:

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `cnpj`      | `string` | **required**. cnpj 

#### Result:

```json
{
    "id": "cc54bc03-e19f-4f05-b2b3-fc442d64d890",
    "cnpj": "21065835000108",
    "isSimplesNacional": true,
    "startDate": "2022-10-27T13:43:45.520Z",
    "endDate": "2022-11-27T13:43:45.520Z",
    "statusSimeiStr": "NÃO enquadrado no SIMEI",
    "statusSimplesNacionalStr": "Optante pelo Simples Nacional desde 18/09/2014"
}

