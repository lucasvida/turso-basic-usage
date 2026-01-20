import { createClient } from "@libsql/client";
import env from "dotenv";

env.config();

// Conexão com o banco de dados

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const users = await turso.execute("SELECT * FROM users");
const dados = await turso.execute({
  sql: "SELECT * FROM dados where id = ?",
  args: [1],
});

console.log(users.rows);
console.log(dados.rows);

// Sincronização local

const client = createClient({
  url: "file:./database/local.db",         
  syncUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await client.sync();
