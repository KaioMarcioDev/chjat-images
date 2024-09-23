import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {createServer} from 'http'
import routes from './app/routes/routes.js';
import {Server} from 'socket.io'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app)
const PORT = process.env.PORT || 3000;
const io = new Server(server)


//configurar armazenamento de arquivo
const storage = multer.diskStorage({
  destination :(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename :(red,file,cb)=>{
    cb(null, Date.now() + path.extname(file.originalname))
  }

})

console.log(storage)

const upload =multer ({storage:storage})


// Configurar o middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, './app/public')));
app.use('/uploads', express.static("uploads"))

// Usar as rotas definidas em routes.js
app.use('/', routes);
app.use('/chat',routes)
app.use('/admin',routes)

let countClient = 0

app.post('/upload', upload.single('image'), (req,res)=>{
  if(req.file){
    res.json({imageUrl : `/uploads/${req.file.filename}`})
  }else{
    res.status(400).json({error:"Nenhum arquivo enviado"})
  }
})

io.on('connection',(socket)=>{
  const clientIp = socket.handshake.address
  console.log('Cliente conectado: ' + clientIp);

  countClient++
  console.log("clientes conectado", countClient)


  io.emit('clientCount',countClient)
  socket.on('chat', (msg) => {
    const timestamp = new Date().toISOString()
    io.emit('chat', {message:msg, timestamp: timestamp});
   // console.log('message: ' + msg);
  });

  socket.on('image',(imageUrl)=>{
    const timestamp = new Date().toISOString()
    io.emit('image',{imageUrl:imageUrl, timestamp:timestamp})
  })

  socket.on('disconnect', () => {
    countClient--
    console.log('Cliente desconectado. Total de clientes: ' + countClient)
    io.emit('clientCount', countClient)
  });

})

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
