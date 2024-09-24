import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

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


export default router;
