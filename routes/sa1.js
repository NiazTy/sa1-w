import express from 'express';
import { sendMessage } from '../services/gemini.js';
import { verifyToken } from '../middlewares/authMiddlerware.js';

let router = express.Router();

// Pakai verifyToken
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId; // ambil dari token
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: 'Message wajib diisi' });

    const reply = await sendMessage(userId, message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
});

export default router;
