import dotenv from 'dotenv';
dotenv.config();

const findAnyFlash = async () => {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Find ANY flash model that supports generateContent
        const flashModels = data.models.filter(m => 
            m.name.includes('flash') && 
            m.supportedGenerationMethods.includes('generateContent')
        );
        
        if (flashModels.length > 0) {
            console.log('Available Flash Models:');
            flashModels.forEach(m => console.log(`- ${m.name} (v: ${m.version})`));
        } else {
            console.log('No Flash models with generateContent found!');
            console.log('Full Model List Names:', data.models.map(m => m.name));
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
};

findAnyFlash();
