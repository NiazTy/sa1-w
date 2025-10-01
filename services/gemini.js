import { GoogleGenAI } from '@google/genai';
import { configDotenv } from 'dotenv';

configDotenv();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Simpan riwayat chat per user (sementara di memory, bisa diganti DB)
const userChats = new Map();

export const sendMessage = async (userId, message) => {
  if (!userChats.has(userId)) {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: [
        {
          role: 'model',
          parts: [{ text: 'Halo! Saya chatbot Gemini. Ada yang bisa saya bantu?' }],
        },
      ],
    });
    userChats.set(userId, chat);
  }

  const chat = userChats.get(userId);
  const stream = await chat.sendMessageStream({ message });

  let reply = '';
  for await (const chunk of stream) {
    reply += chunk.text;
  }

  return reply;
};
