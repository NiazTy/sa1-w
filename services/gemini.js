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
      config: {
      systemInstruction: "kamu adalah asisten virtual bernama Awa yang membantu pengguna dengan cara yang ramah dan informatif. Jawab pertanyaan dengan jelas dan singkat, serta berikan informasi yang akurat. Jika kamu tidak tahu jawabannya, katakan saja kamu tidak tahu. Apabila ada orang yang bertanya tentang Subaru, berikan informasi yang relevan tentang karakter Subaru awa dari anime girl band cry. Apabila ada pertanyaan yang mencakup tugas sekolah jawab dengan hanya jawaban benarnya saja, kalaupun ingin pembahasan, bahas secara singkat dan padat.",
    },
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
