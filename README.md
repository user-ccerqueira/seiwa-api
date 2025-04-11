# SEIWA API

API Procedimentos Médicos

## Inicialização

### Clonar projeto

```sh
git clone https://github.com/user-ccerqueira/seiwa-api.git
```

### Create DB

```sh
yarn db:create
yarn db:migrate
yarn db:seed
```

### Credenciais

```sh
Username: user-seiwa
Password: Seiwa@123
```

### Instalar dependências

```sh
yarn
```

## Utilização

```sh
yarn dev
```

## Swagger

```sh
url: http://localhost:1001/docs/
```

## Desafio
```sh
 Cadastrar um novo procedimento médico com os seguintes dados: 
    ID do médico
    ID do paciente
    Data do procedimento
    Valor do procedimento
    Status do pagamento (pago, pendente, glosado)
 endpoint: medical/create-procedure

 Gerar um relatório diário de procedimentos por médico.
 endpoint: report/daily-procedure-doctor

 Gerar um relatório de glosas por período.
 endpoint: report/glosses-period

 Gerar um relatório financeiro por médico.
 endpoint: report/financial-doctor


 A documentação da API (pode ser em formato Swagger).
 url: http://localhost:1001/docs/

 Explicação de como a API lida com erros e exceções.
 [Candidato]: Em todas as API foram tratados os erros e exceções, na api "medical/create-procedure" foi tratado todos os inputs de entrada.

 Explicação de como a API garante a segurança dos dados.
 [Candidato]: Foi criado uma rota de login para autenticação em todas as rotas, com isso garantimos minimamente a segurança dos dados. 
```