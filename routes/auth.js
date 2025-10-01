import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
let router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.AUTH_USER) {
    return res.status(401).json({ error: 'User tidak ditemukan' });
  }

  const valid = await bcrypt.compare(password, process.env.AUTH_PASS_HASH);
  if (!valid) return res.status(401).json({ error: 'Password salah' });

  const token = jwt.sign({ userId: username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

export default router;
