import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, 'users.json');

// Função para ler os usuários do arquivo
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Se o arquivo não existir, retorna um array vazio
      return [];
    }
    throw error;
  }
}

// Função para salvar os usuários no arquivo
async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Função para adicionar um novo usuário
export async function addUser(email, password) {
  const users = await readUsers();
  const newUser = { email, password };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

// Função para verificar as credenciais do usuário
export async function verifyUser(email, password) {
  const users = await readUsers();
  return users.find(user => user.email === email && user.password === password);
}