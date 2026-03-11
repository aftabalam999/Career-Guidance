import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const universalTest = async () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return;
  
  try {
    const genAI = new GoogleGenerativeAI(key);
    console.log('Testing gemini-1.0-pro (Universal)...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const result = await model.generateContent("Say I am alive");
    console.log('Gemini Response:', result.response.text());
    console.log('Status: SUCCESS');
  } catch (err) {
    console.error('Unified Error:', err.message);
  }
};

universalTest();
