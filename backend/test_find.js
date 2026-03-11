import dotenv from 'dotenv';
dotenv.config();

const findFlash = async () => {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const flash = data.models.find(m => m.name.includes('gemini-1.5-flash'));
        if (flash) {
            console.log('Model Found:', flash.name);
            console.log('Supported Methods:', flash.supportedGenerationMethods);
        } else {
            console.log('Gemini 1.5 Flash NOT found in the list!');
            console.log('First 5 models:', data.models.slice(0, 5).map(m => m.name));
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
};

findFlash();
