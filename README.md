# SEIWA API

API Procedimentos Médicos

## Inicialização

### Clonar projeto

```sh
git clone https://gitlab.com/digital-republic/gfx-api.git
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
 Gerar um relatório diário de procedimentos por médico.
 Gerar um relatório de glosas por período.
 Gerar um relatório financeiro por médico.
```