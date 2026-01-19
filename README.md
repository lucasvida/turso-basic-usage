# Guia Rapido Turso (TypeScript / JS)

Comece a usar o Turso e TypeScript com o cliente libSQL em alguns passos simples.

Neste guia rapido de JavaScript, aprenderemos como:

* Obter credenciais do banco de dados
* Instalar o cliente libSQL para JavaScript
* Conectar a um banco de dados Turso remoto
* Executar uma consulta usando SQL

## 1. Obter credenciais do banco de dados

Voce precisara de um banco de dados existente para continuar. Se voce nao tiver um, crie um no painel do Turso ou via CLI.

Serao necessarias as seguintes informacoes:
* URL do banco de dados (TURSO_DATABASE_URL)
* Token de autenticacao (TURSO_AUTH_TOKEN)

Recomenda-se armazenar esses valores como variaveis de ambiente em um arquivo .env.

## 2. Instalar @libsql/client

Instale o pacote necessario usando seu gerenciador de pacotes preferido:

```bash
npm install @libsql/client
# ou
pnpm add @libsql/client
```

## 3. Inicializar um novo cliente

Adicione a URL do seu banco de dados e o token de autenticacao:

```javascript
import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
```

## 4. Executar uma consulta usando SQL

Voce pode executar uma consulta SQL no seu banco de dados chamando o metodo execute():

```javascript
await turso.execute("SELECT * FROM users");
```

Se precisar usar espacos reservados (placeholders) para valores, voce pode fazer desta forma:

### Argumentos Posicionais

```javascript
await turso.execute({
  sql: "SELECT * FROM users WHERE id = ?",
  args: [1],
});
```

### Argumentos Nomeados

```javascript
await turso.execute({
  sql: "INSERT INTO users VALUES (:name)",
  args: { name: "Iku" },
});

---

Para encontrar navegacao e outras paginas nesta documentacao, acesse o arquivo llms.txt em: https://docs.turso.tech/llms.txt
Links uteis:
https://docs.turso.tech/js/quickstart
