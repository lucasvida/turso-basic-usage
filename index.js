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

// Inserindo dados

const addUser = async ()=>{
  try{
    await turso.execute({
      sql: "INSERT INTO users (nome, email, telefone) VALUES (?, ?, ?)",
      args: ["teste", "teste@teste.com", "1234567890"],
    });
    console.log("User added successfully");
  }catch(error){
    console.log(error);
  }
}
addUser();

// Atualizando dados

const updateUser = async ()=>{
  try{
    await turso.execute({
      sql: "UPDATE users SET nome = ?, email = ?, telefone = ? WHERE id = ?",
      args: ["teste", "teste@teste.com", "1234567890", 1],
    });
    console.log("User updated successfully");
  }catch(error){
    console.log(error);
  }
}
updateUser();

// Sincronização local

const client = createClient({
  url: "file:./database/local.db",         
  syncUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await client.sync();
