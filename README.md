# Seiwa API

API para consolidação de repasses e informações financeiras de médicos. O sistema permite gerenciar médicos, registrar produções médicas e controlar repasses financeiros, calculando o saldo consolidado por período.

## O que esse sistema faz

- Cadastra e gerencia médicos (nome, CRM, especialidade)
- Registra produções médicas vinculadas a hospitais
- Controla repasses financeiros com status (pendente, processado, cancelado)
- Calcula o saldo consolidado: quanto o médico tem a receber

## Tecnologias

- NestJS (framework Node.js)
- Prisma ORM
- SQLite (banco de dados local)
- TypeScript

## Como rodar o projeto

### 1. Clone e instale as dependências

```bash
npm install
```

### 2. Configure o ambiente

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

O padrão já funciona para desenvolvimento local com SQLite.

### 3. Configure o banco de dados

Gere o client do Prisma e aplique as migrations:

```bash
npx prisma generate --schema=src/infrastructure/database/prisma/schema.prisma
npx prisma migrate deploy --schema=src/infrastructure/database/prisma/schema.prisma
```

Se preferir resetar o banco (apaga tudo e recria):

```bash
npx prisma migrate reset --schema=src/infrastructure/database/prisma/schema.prisma
```

### 4. Rode o projeto

```bash
# Desenvolvimento (com hot reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

## Documentação da API

Acesse `http://localhost:3000/docs` para ver a documentação interativa (Swagger).

## Endpoints principais

| Recurso | Endpoints |
|---------|-----------|
| Médicos | `GET/POST /medicos`, `GET/PUT /medicos/:id` |
| Produções | `GET/POST /producoes`, `GET /producoes/:id` |
| Repasses | `GET/POST /repasses`, `GET /repasses/:id` |
| Saldo | `GET /medicos/:id/saldo?data_inicio=...&data_fim=...` |

## Testes

```bash
# Testes unitários
npm run test

# Testes com watch
npm run test:watch

# Testes e2e
npm run test:e2e
```

## Estrutura do projeto

```
src/
├── application/       # Casos de uso e DTOs
├── domain/            # Entidades, repositórios e regras de negócio
├── infrastructure/    # Banco de dados (Prisma) e implementações
└── presentation/      # Controllers HTTP e filtros
```

## Documentação completa

Veja o arquivo [REQUISITOS.md](./REQUISITOS.md) para entender as regras de negócio e decisões de design.
