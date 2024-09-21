import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
router.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/chat/chat.html'));
});


export default router;
