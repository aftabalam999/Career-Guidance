import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const testGemini = async () => {
  const key = process.env.GEMINI_API_KEY;
  console.log('Using Key:', key ? `${key.substring(0, 5)}...${key.substring(key.length - 4)}` : 'MISSING');
  
  if (!key) {
    console.error('Error: GEMINI_API_KEY is not set in .env');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say 'Hello if you work' exactly.");
    console.log('Gemini Response:', result.response.text());
    console.log('Status: SUCCESS');
  } catch (error) {
    console.error('Gemini Test Failed:');
    console.error(error.message);
  }
};

testGemini();
