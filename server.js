import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {createServer} from 'http'
import routes from './app/routes/routes.js';
import {Server} from 'socket.io'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app)
const PORT = process.env.PORT || 3000;
const io = new Server(server)

// Configurar o middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, './app/public')));

// Usar as rotas definidas em routes.js
app.use('/', routes);
app.use('/chat',routes)

let countClient = 0


io.on('connection',(socket)=>{

  countClient++
  console.log("clientes conectado", countClient)


  io.emit('clientCount',countClient)
  socket.on('chat', (msg) => {
    io.emit('chat', msg);
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    countClient--
    console.log('Cliente desconectado. Total de clientes: ' + countClient)
    io.emit('clientCount', countClient)
  });

})

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
