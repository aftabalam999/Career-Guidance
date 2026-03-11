import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const v1Test = async () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return console.error('Missing key');
  
  try {
    // Explicitly target the stable v1 endpoint
    console.log('Testing gemini-1.5-flash with v1 API...');
    const genAI = new GoogleGenerativeAI(key, { apiVersion: 'v1' });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log('Success with gemini-1.5-flash on v1!');
  } catch (err) {
    console.error('Failed with v1:', err.message);
  }
};

v1Test();
