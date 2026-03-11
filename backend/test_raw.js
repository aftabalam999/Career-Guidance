import dotenv from 'dotenv';
dotenv.config();

const rawFetchTest = async () => {
    const key = process.env.GEMINI_API_KEY;
    console.log('Using Key Path Start:', key.substring(0, 7));
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const payload = {
        contents: [{ parts: [{ text: "Explain coding in 5 words." }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log('HTTP Status:', response.status);
        console.log('HTTP Status Text:', response.statusText);
        
        const data = await response.json();
        console.log('Full JSON Response:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch Error:', err.message);
    }
};

rawFetchTest();
