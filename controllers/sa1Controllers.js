import { sendMessage } from '../services/gemini.js';

export const handleChat = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ error: 'userId dan message wajib diisi' });
    }

    const reply = await sendMessage(userId, message);

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan di server.' });
  }
};
