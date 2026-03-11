import { GoogleGenerativeAI } from '@google/generative-ai';
import College from '../models/College.js';
import User from '../models/User.js';

// Initialize Gemini API
const getGenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing from env variables');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// @desc    Get AI College Recommendations
// @route   POST /api/ai/recommend
// @access  Private
export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = user.studentProfile || {};
    
    // Fetch all top colleges to pass logic to AI
    const colleges = await College.find({}).limit(10).lean();

    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      As an expert AI Career Advisor, evaluate the following student profile:
      Marks: 10th(${profile.marks10 || 0}%) 12th(${profile.marks12 || 0}%)
      Budget: ${profile.budget || 'Not specified'}
      Interests: ${profile.interests || 'Not specified'}
      Location Preference: ${profile.preferredLocation || 'Any'}
      Aptitude Score: ${profile.aptitudeScore || 0}%

      Rank the following top colleges out of 100 based on fit, returning a formatted JSON array containing the college ID (id), match percentage (match, 0-100 integer), and a short 1 sentence reason (reason).
      Colleges Data: ${JSON.stringify(colleges.map(c => ({ id: c._id, name: c.name, location: c.location, fees: c.feesRange, type: c.collegeType })))}

      ONLY RETURN A VALID JSON ARRAY. No markdown wrapping.
      Example: [{"id": "ID_HERE", "match": 95, "reason": "Reason here"}]
    `;

    const result = await model.generateContent(prompt);
    let output = result.response.text();
    output = output.replace(/```json/g, '').replace(/```/g, '').trim();

    const aiRecs = JSON.parse(output);

    // Merge AI recommendations with full college data
    const recommendations = aiRecs.map(rec => {
      const collegeData = colleges.find(c => c._id.toString() === rec.id.toString());
      return { ...rec, college: collegeData };
    }).filter(r => r.college); // Ensure we only return if college exists

    res.json({ recommendations });
  } catch (error) {
    if (error.message.includes('API key not valid')) {
      return res.status(500).json({ 
        message: "The Gemini API Key provided in the backend .env is invalid. Please get a fresh key from 'aistudio.google.com' and update your .env file." 
      });
    }
    if (error.message.includes('429') || error.message.includes('Resource has been exhausted')) {
      return res.status(500).json({ 
        message: "AI quota reached. Please wait a minute before trying again (Gemini Free Tier limit)." 
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process natural language queries to DB
// @route   POST /api/ai/chat
// @access  Private
export const aiChatQuery = async (req, res) => {
  try {
    const { message } = req.body;
    
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are CareerPath AI, a friendly conversational career advisor. 
      Student asked: "${message}"
      
      Provide a brief, helpful answer. E.g., if they ask what college they can get with 85%, tell them generalizations about good engineering or medical colleges and tell them to check the Explorer page. Keep the response to 2 paragraphs maximum.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ response: text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
