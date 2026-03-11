import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const listModels = async () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return console.error('Missing key');
  
  try {
    const genAI = new GoogleGenerativeAI(key);
    // There is no easy 'listModels' in the SDK itself for simple key-based auth without more setup
    // But we can try to hit a known universal model like 'gemini-1.5-flash-latest'
    console.log('Testing gemini-1.5-flash-latest...');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent("test");
    console.log('Success with gemini-1.5-flash-latest!');
  } catch (err) {
    console.error('Failed with gemini-1.5-flash-latest:', err.message);
  }
};

listModels();
