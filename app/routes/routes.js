import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { addUser, verifyUser } from '../../userManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

router.use(express.static(path.join(__dirname, './app/public')));
router.use(express.json());

const storage = multer.diskStorage({
  destination :(req,file,cb)=>{
    cb(null,'uploads')
  },
  filename :(red,file,cb)=>{
    cb(null, Date.now() + path.extname(file.originalname))
  }

})

const upload =multer ({storage:storage})



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/chat/chat.html'));
});
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin/admin.html'));
});

router.post('/upload', upload.single('image'), (req,res)=>{
  if(req.file){
    res.json({imageUrl : `/uploads/${req.file.filename}`})
  }else{
    res.status(400).json({error:"Nenhum arquivo enviado"})
  }
})
// Rota para registro de usuário
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await addUser(email, password);
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await verifyUser(email, password);
    if (user) {
      res.json({ message: 'Login bem-sucedido', user });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});


export default router;
