import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const flash2Test = async () => {
    const key = process.env.GEMINI_API_KEY;
    console.log('Using Key:', key.substring(0, 5));
    
    try {
        const genAI = new GoogleGenerativeAI(key);
        // Using the most common modern flash model
        console.log('Testing gemini-2.0-flash...');
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("test");
        console.log('Success with gemini-2.0-flash!');
    } catch (err) {
        console.error('Failed with 2.0:', err.message);
    }
};

flash2Test();
