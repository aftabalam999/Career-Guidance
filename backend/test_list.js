import dotenv from 'dotenv';
dotenv.config();

const listFetch = async () => {
    const key = process.env.GEMINI_API_KEY;
    console.log('Using Key Path Start:', key.substring(0, 7));
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);

        console.log('HTTP Status:', response.status);
        console.log('HTTP Status Text:', response.statusText);
        
        const data = await response.json();
        console.log('Full JSON Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch Error:', err.message);
    }
};

listFetch();
